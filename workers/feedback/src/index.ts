// POST /: playtest feedback from ratterstudios.com/sthlm1646/<build>/feedback, sent to the team as
// one email with the files attached. Form fields: email, message, build, files, website (bot trap).

import { DurableObject } from "cloudflare:workers";
import { Buffer } from "node:buffer";

// Same limits as src/components/feedback-dialog.tsx.
const MAX_FILES = 15;
const MAX_TOTAL_BYTES = 25 * 1024 ** 2;
const MAX_MESSAGE_LENGTH = 10_000;
const EXTENSIONS = ["txt", "log", "png", "jpg", "jpeg", "webp", "gif"];

// Release names like "v0.15.2-alpha-dev1".
const SAFE_BUILD = /^[\w.-]{1,64}$/;
const EMAIL = /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/;

const ORIGINS = ["https://ratterstudios.com", "https://www.ratterstudios.com"];
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

type Env = {
  SENDER: DurableObjectNamespace<FeedbackSender>;
  LIMITER: RateLimit;
  FROM: string;
  RESEND_API_KEY: string;
  FEEDBACK_TO: string;
};

/** JSON answer the site shows to the player. */
const reply = (status: number, message: string) => Response.json({ message }, { status });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    if (!ORIGINS.includes(origin) && !LOCAL_ORIGIN.test(origin)) return reply(403, "Forbidden");
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      Vary: "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    let response: Response;
    if (request.method !== "POST") {
      response = reply(405, "Method not allowed");
    } else if (Number(request.headers.get("Content-Length")) > MAX_TOTAL_BYTES + 1024 ** 2) {
      response = reply(413, "Your files are over 25 MB together, please remove some.");
    } else if (
      !(await env.LIMITER.limit({ key: request.headers.get("CF-Connecting-IP") ?? "" })).success
    ) {
      response = reply(429, "Too many sends, please wait a minute and try again.");
    } else {
      // A new object per send, so sends never wait on each other.
      response = await env.SENDER.get(env.SENDER.newUniqueId()).fetch(request);
    }

    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(cors)) headers.set(name, value);
    return new Response(response.body, { status: response.status, headers });
  },
} satisfies ExportedHandler<Env>;

/** Reads the form and sends the email, here for the CPU time a free Worker doesn't get. */
export class FeedbackSender extends DurableObject<Env> {
  async fetch(request: Request) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return reply(400, "That didn't look like a feedback form.");
    }

    // People never see this field, bots fill it in. They get "Sent" without an email.
    if (field(form, "website")) return reply(200, "Sent");

    const email = field(form, "email");
    const message = field(form, "message");
    const build = SAFE_BUILD.test(field(form, "build")) ? field(form, "build") : "unknown";
    const files = form
      .getAll("files")
      .filter((file): file is File => file instanceof File && file.size > 0);

    if (email.length > 254 || !EMAIL.test(email)) {
      return reply(400, "Please enter a valid email address.");
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return reply(400, `Please keep the message under ${MAX_MESSAGE_LENGTH} characters.`);
    }
    if (files.length === 0 && !message)
      return reply(400, "Please attach a file or write a message.");
    if (files.length > MAX_FILES) return reply(400, `You can attach up to ${MAX_FILES} files.`);
    const wrongType = files.find((file) => !EXTENSIONS.includes(extension(file.name)));
    if (wrongType) return reply(400, `${cleanName(wrongType.name)} isn't a text file or image.`);
    if (files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) {
      return reply(413, "Your files are over 25 MB together, please remove some.");
    }

    if (!this.env.RESEND_API_KEY || !this.env.FEEDBACK_TO) {
      console.error("RESEND_API_KEY or FEEDBACK_TO is not set");
      return reply(500, "Feedback can't be sent right now, please try again later.");
    }

    const sent = stockholmTime(new Date());
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: cleanName(file.name),
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      })),
    );

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.env.FROM,
        to: this.env.FEEDBACK_TO.split(",")
          .map((address) => address.trim())
          .filter(Boolean),
        reply_to: email,
        subject: `Playtest Feedback ${build} ${sent}`,
        text: emailText(build, email, sent, message, files),
        attachments,
      }),
    });
    if (!res.ok) {
      console.error(`Resend answered ${res.status}: ${await res.text()}`);
      return reply(502, "The email couldn't be sent right now, please try again in a minute.");
    }
    return reply(200, "Sent");
  }
}

const field = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

const extension = (name: string) => /\.([^.]+)$/.exec(name)?.[1].toLowerCase() ?? "";

/** File name without paths or characters mail clients choke on. */
const cleanName = (name: string) => name.replace(/[\p{Cc}\\/:*?"<>|]/gu, "_").slice(-120) || "file";

const formatSize = (bytes: number) =>
  bytes >= 1024 ** 2
    ? `${(bytes / 1024 ** 2).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** "2026-10-28 14:25" in Swedish time, summer time included. */
const stockholmTime = (date: Date) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);

function emailText(build: string, email: string, sent: string, message: string, files: File[]) {
  const list = files.map((file) => `- ${cleanName(file.name)} (${formatSize(file.size)})`);
  return [
    `Playtest feedback for Stockholm1646 ${build}`,
    `From: ${email} (reply to this email to answer them)`,
    `Sent: ${sent} Stockholm time`,
    "",
    message || "(No message)",
    "",
    files.length > 0 ? `Attached files:\n${list.join("\n")}` : "No files attached.",
  ].join("\n");
}
