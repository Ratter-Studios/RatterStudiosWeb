import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { ChevronDown, Download } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { pillClasses } from "@/components/cta-link";
import { websiteImg } from "@/lib/assets";
import { ZoomableImage } from "@/components/zoomable-image";
import { cn } from "@/lib/utils";

const keyart = websiteImg("webTitle.jpeg");

export const Route = createFileRoute("/sthlm1646")({
  head: () => ({
    meta: [
      { title: "Stockholm1646 - Ratter Studios" },
      {
        name: "description",
        content:
          "Stockholm1646 - our first playable history. A cinematic historical RPG set in 1646 Stockholm.",
      },
      { property: "og:title", content: "Stockholm1646 - Ratter Studios" },
      {
        property: "og:description",
        content: "Stockholm1646",
      },
      { property: "og:url", content: "/sthlm1646" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: "/sthlm1646" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Stockholm1646",
          publisher: { "@type": "Organization", name: "Ratter Studios" },
          gamePlatform: ["PC"],
          genre: ["Historical", "RPG"],
        }),
      },
    ],
  }),
  component: GamesPage,
});

const shots = ["webTitle", "devCapture1", "devCapture2", "devCapture3", "devCapture4", "devCapture5"].map(
  (n) => websiteImg(`${n}.jpeg`),
);

const facts = [
  { label: "Setting", value: "Stockholm, 1646" },
  { label: "Genre", value: "Historical RPG" },
  { label: "Platform", value: "PC" },
  { label: "Engine", value: "Unreal Engine v5.8+" },
  { label: "Language", value: "C++" },
  { label: "Status", value: "In Development" },
];

// Builds come live from the GitHub releases; downloads and counts go through workers/downloads.
const BUILDS_RELEASES = "https://github.com/Ratter-Studios/Stockholm1646-Builds/releases";
const DOWNLOADS_WORKER = "https://stockholm1646-downloads.ratterstudios.workers.dev";
const MAX_BUILDS = 3;

type Build = { tag: string; file: string; size: number };
type Release = {
  tag_name: string;
  draft: boolean;
  published_at: string | null;
  assets: { name: string; size: number }[];
};

/** Release files as downloads, newest first, split parts merged. */
function toBuilds(releases: Release[]): Build[] {
  return releases
    .filter((release) => !release.draft && release.published_at)
    .sort((a, b) => Date.parse(b.published_at ?? "") - Date.parse(a.published_at ?? ""))
    .flatMap((release) => {
      const files = new Map<string, Build>();
      for (const asset of release.assets) {
        const file = asset.name.replace(/\.\d{3}$/, ""); // "x.zip.001" -> "x.zip"
        const build = files.get(file);
        if (build) build.size += asset.size;
        else files.set(file, { tag: release.tag_name, file, size: asset.size });
      }
      return [...files.values()];
    });
}

const formatSize = (bytes: number) =>
  bytes >= 1024 ** 3
    ? `${(bytes / 1024 ** 3).toFixed(2)} GB`
    : `${Math.round(bytes / 1024 ** 2)} MB`;

/** undefined = loading, "error" = GitHub unreachable. */
function usePlaytestBuilds() {
  const [builds, setBuilds] = useState<Build[] | "error">();
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/repos/Ratter-Studios/Stockholm1646-Builds/releases", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
        return res.json() as Promise<Release[]>;
      })
      .then((releases) => setBuilds(toBuilds(releases)))
      .catch(() => {
        if (!controller.signal.aborted) setBuilds("error");
      });
    return () => controller.abort();
  }, []);
  return builds;
}

/** Completed downloads per "<tag>/<file>"; undefined until loaded (or if unavailable). */
function useDownloadCounts() {
  const [counts, setCounts] = useState<Record<string, number>>();
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${DOWNLOADS_WORKER}/counts`, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<Record<string, number>>) : undefined))
      .then(setCounts)
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return counts;
}

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function GamesPage() {
  const [open, setOpen] = useState(false);

  return (
    <SiteLayout>
      <section className="relative">
        {/* Cinematic keyart, fading into the page behind the hero */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[78vh] overflow-hidden">
          <img src={keyart} alt="" className="ken-burns h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/80 to-background" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-44 md:px-8 md:pt-52">
          <div className="grid gap-10 md:grid-cols-[15rem_1fr] md:gap-14 lg:grid-cols-[17rem_1fr] lg:gap-20">
            {/* Sticky dossier panels - stay beside the content while scrolling */}
            <aside className="enter space-y-5 md:sticky md:top-28 md:self-start" style={delay(150)}>
              <PlaytestBuilds />

              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-xl shadow-black/40 md:p-7">
                <dl className="space-y-5">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-sm tracking-[0.04em] text-foreground/45">{fact.label}</dt>
                      <dd className="mt-1 font-display text-lg font-medium text-primary/90">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className={cn(pillClasses, "mt-6")}
                >
                  {open ? "Less Info" : "More Info"}
                </button>

                {/* Expandable story blurb - smooth height via grid rows */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="mt-6 border-t border-border/50 pt-6 text-sm leading-[1.85] text-foreground/70 [overflow-wrap:anywhere]">
                      This game demo takes place at the Inn “Blå Örn”.
                      <br />
                      <br />
                      Working at the historic Inn “Blå Örn”, you will man the bar, serve drinks, and mainly serve your “enemies” while coaxing secrets out of them. Pretend to party with the patrons while fishing out useful information. Some of this knowledge might be useful for certain tasks...
                      <br />
                      <br />
                      In the future, we plan to expand the demo with new parts of Järntorget, new features, mechanics, and more.
                      <br />
                      <br />
                      Feel free to join our{" "}
                      <Link
                        to="/community"
                        className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                      >
                        community Discord server
                      </Link>
                      , follow us on social media for game updates, and check out our{" "}
                      <Link
                        to="/community"
                        className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                      >
                        Patreon
                      </Link>{" "}
                      for behind-the-scenes content and more detailed development updates.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Title + content */}
            <div>
              <h1
                className="enter font-display text-5xl font-medium leading-[1.05] text-foreground md:text-6xl lg:text-7xl"
                style={delay(250)}
              >
                Stockholm<em className="text-primary">1646</em>
              </h1>
              <p
                className="enter mt-10 max-w-2xl text-lg leading-relaxed text-foreground/75"
                style={delay(400)}
              >
                On Järntorget 17th century a maid's goal is to rebuild her life from the very bottom.
                <br />
                How will she handle stressful and tricky tasks in order to climb the human hierarchy?
              </p>

              {/* Concept art */}
              <div className="mt-24 md:mt-28">
                <Reveal>
                  <SectionHeading
                    title={
                      <>
                        Images &amp; <em className="text-primary">atmosphere</em>
                      </>
                    }
                  />
                </Reveal>
                <div className="mt-14 grid gap-5 sm:grid-cols-2">
                  {shots.map((src, i) => (
                    <Reveal key={i} delay={i * 120}>
                      <ZoomableImage
                        src={src}
                        alt={`Stockholm1646 concept art ${i + 1}`}
                        className="aspect-[4/5] overflow-hidden rounded-2xl border border-border/50 bg-card"
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/** Collapsible playtest builds panel. */
function PlaytestBuilds() {
  const [open, setOpen] = useState(false);
  const builds = usePlaytestBuilds();
  const counts = useDownloadCounts();

  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-xl shadow-black/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="playtest-builds"
        className="group flex w-full items-center justify-between gap-4 rounded-2xl p-6 text-left md:p-7"
      >
        <span className="font-display text-xl font-medium text-primary/90">Playtest builds</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            "h-5 w-5 shrink-0 text-primary/70 transition-[color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-primary",
            open && "rotate-180",
          )}
        />
      </button>

      {/* inert: no tabbing into hidden links */}
      <div
        id="playtest-builds"
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-6 mb-6 border-t border-border/50 pt-6 md:mx-7 md:mb-7">
            <BuildList builds={builds} counts={counts} />
          </div>
        </div>
      </div>
    </div>
  );
}

const linkClasses =
  "text-primary underline underline-offset-2 transition-colors hover:text-primary/80";

/** Loading, error or the list of downloads. */
function BuildList({
  builds,
  counts,
}: {
  builds: Build[] | "error" | undefined;
  counts: Record<string, number> | undefined;
}) {
  if (builds === undefined) return <p className="text-sm text-foreground/45">Loading builds…</p>;
  if (builds === "error") {
    return (
      <p className="text-sm leading-relaxed text-foreground/45">
        Couldn't load the builds right now.{" "}
        <a href={BUILDS_RELEASES} target="_blank" rel="noreferrer" className={linkClasses}>
          See them on GitHub
        </a>
      </p>
    );
  }
  if (builds.length === 0) return <p className="text-sm text-foreground/45">No builds yet.</p>;

  return (
    <>
      <ul className="space-y-6">
        {builds.slice(0, MAX_BUILDS).map((build) => {
          const key = `${build.tag}/${build.file}`;
          return (
            <li key={key}>
              <p className="font-display text-lg font-medium text-primary/90 [overflow-wrap:anywhere]">
                {build.file}
              </p>
              <p className="mt-1 text-sm tracking-[0.04em] text-foreground/45">
                {build.tag === builds[0].tag && "Latest - "}
                {formatSize(build.size)}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                {/* Same tab: the download starts without leaving the page */}
                <a href={`${DOWNLOADS_WORKER}/${key}`} className={cn(pillClasses, "gap-2")}>
                  <Download aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Download
                </a>
                {counts && (
                  <span
                    title="Completed downloads"
                    className="inline-flex items-center gap-1 text-xs tabular-nums text-foreground/45"
                  >
                    {(counts[key] ?? 0).toLocaleString("en")}
                    <Download aria-hidden className="h-3 w-3" strokeWidth={1.75} />
                    <span className="sr-only"> completed downloads</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {builds.length > MAX_BUILDS && (
        <a
          href={BUILDS_RELEASES}
          target="_blank"
          rel="noreferrer"
          className={cn(linkClasses, "mt-6 inline-block text-sm")}
        >
          Older builds on GitHub
        </a>
      )}
    </>
  );
}
