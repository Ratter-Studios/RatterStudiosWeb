// GET /<tag>/<file>: streams a release file (or its .001, .002, ... parts) as one download.
// GET /counts: completed downloads per "<tag>/<file>".

import { DurableObject } from "cloudflare:workers";

const RELEASES = "https://github.com/Ratter-Studios/Stockholm1646-Builds/releases/download";

// ~4 subrequests per part; the free plan allows 50.
const MAX_PARTS = 12;

// No slashes and no leading dot (so no "..").
const SAFE_NAME = /^[\w-][\w.-]*$/;

type Part = { url: string; start: number; size: number; version: string; modified: number };
type Env = { COUNTER: DurableObjectNamespace<DownloadCounter> };

/** Completed-download counts, stored in one Durable Object. */
export class DownloadCounter extends DurableObject<Env> {
  async increment(key: string) {
    await this.ctx.storage.put(key, ((await this.ctx.storage.get<number>(key)) ?? 0) + 1);
  }

  async all() {
    return Object.fromEntries(await this.ctx.storage.list<number>());
  }
}

const counter = (env: Env) => env.COUNTER.getByName("downloads");

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const segments = new URL(request.url).pathname.split("/").filter(Boolean);
    if (segments.length === 1 && segments[0] === "counts") {
      return Response.json(await counter(env).all(), {
        headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" },
      });
    }

    const [tag, file] = segments;
    if (segments.length !== 2 || !SAFE_NAME.test(tag) || !SAFE_NAME.test(file)) {
      return new Response("Not found", { status: 404 });
    }

    let parts: Part[];
    try {
      parts = await findParts(tag, file);
    } catch (err) {
      console.error(err);
      return new Response("Couldn't load this build from GitHub, please try again in a minute.", {
        status: 502,
      });
    }
    if (parts.length === 0) return new Response("Not found", { status: 404 });

    const total = parts.reduce((sum, part) => sum + part.size, 0);
    const etag = `"${await digest(parts.map((part) => `${part.version}:${part.size}`).join("|"))}"`;
    const lastModified = new Date(Math.max(...parts.map((part) => part.modified))).toUTCString();
    const headers = new Headers({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file}"`,
      "Accept-Ranges": "bytes",
      ETag: etag,
      "Last-Modified": lastModified,
    });

    // Resume support
    let start = 0;
    let end = total - 1;
    const range = request.headers.get("Range");
    const ifRange = request.headers.get("If-Range");
    if (range && (!ifRange || ifRange === etag || ifRange === lastModified)) {
      const parsed = parseRange(range, total);
      if (parsed === "unsatisfiable") {
        return new Response(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${total}` },
        });
      }
      if (parsed) {
        [start, end] = parsed;
        headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
      }
    }
    const length = end - start + 1;
    headers.set("Content-Length", String(length));
    const status = headers.has("Content-Range") ? 206 : 200;
    if (request.method === "HEAD") return new Response(null, { status, headers });

    // Counted once the last byte is sent; the 10% minimum ignores small tail requests.
    const counted = end === total - 1 && length >= total / 10;

    // Native pipe (no CPU time) that errors instead of ending short.
    const { readable, writable } = new FixedLengthStream(length);
    ctx.waitUntil(
      streamParts(parts, start, end, writable)
        .then(async () => {
          if (counted) await counter(env).increment(`${tag}/${file}`);
        })
        .catch(async (err) => {
          console.error(err);
          await writable.abort(err).catch(() => {});
        }),
    );
    return new Response(readable, { status, headers });
  },
} satisfies ExportedHandler<Env>;

/** The file's parts: <file>.001, .002, ... or the file itself if it isn't split. */
async function findParts(tag: string, file: string): Promise<Part[]> {
  const parts: Part[] = [];
  for (let n = 1, start = 0; ; n++) {
    const part = await probe(`${RELEASES}/${tag}/${file}.${String(n).padStart(3, "0")}`, start);
    if (!part) break;
    if (n > MAX_PARTS) throw new Error(`${file} has more than ${MAX_PARTS} parts`);
    parts.push(part);
    start += part.size;
  }
  if (parts.length > 0) return parts;
  const whole = await probe(`${RELEASES}/${tag}/${file}`, 0);
  return whole ? [whole] : [];
}

/** Size and version of one release file, or null if it doesn't exist. */
async function probe(url: string, start: number): Promise<Part | null> {
  const res = await fetch(url, { method: "HEAD" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub answered ${res.status} for ${url}`);
  const size = Number(res.headers.get("Content-Length"));
  if (!Number.isSafeInteger(size) || size <= 0) throw new Error(`No size for ${url}`);
  return {
    url,
    start,
    size,
    version: res.headers.get("ETag") ?? "",
    modified: Date.parse(res.headers.get("Last-Modified") ?? "") || 0,
  };
}

/** Single "bytes=a-b" range; null = send the whole file. */
function parseRange(header: string, total: number): [number, number] | "unsatisfiable" | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (!match[1] && !match[2])) return null;
  const [, from, to] = match;
  // "bytes=-500" means the last 500 bytes
  const start = from ? Number(from) : Math.max(0, total - Number(to));
  const end = from && to ? Math.min(Number(to), total - 1) : total - 1;
  return start <= end ? [start, end] : "unsatisfiable";
}

/** Pipes bytes start..end of the joined file into out, part by part. */
async function streamParts(parts: Part[], start: number, end: number, out: WritableStream) {
  for (const part of parts) {
    const from = Math.max(start, part.start) - part.start;
    const to = Math.min(end, part.start + part.size - 1) - part.start;
    if (from > to) continue;

    const whole = from === 0 && to === part.size - 1;
    const res = await fetch(part.url, whole ? {} : { headers: { Range: `bytes=${from}-${to}` } });
    if (res.status !== (whole ? 200 : 206) || !res.body) {
      throw new Error(`GitHub answered ${res.status} for ${part.url}`);
    }
    await res.body.pipeTo(out, { preventClose: true });
  }
  await out.close();
}

/** Short hex hash for the ETag. */
async function digest(text: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(hash).slice(0, 12)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
