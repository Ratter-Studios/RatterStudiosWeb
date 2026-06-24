import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { websiteImg } from "@/lib/assets";
import { ZoomableImage } from "@/components/zoomable-image";

const keyart = websiteImg("webTitle.jpeg");

export const Route = createFileRoute("/sthlm-jrn")({
  head: () => ({
    meta: [
      { title: "Järntorget - Ratter Studios" },
      {
        name: "description",
        content:
          "Järntorget - our first playable history. A cinematic narrative experience set in 1646 Stockholm.",
      },
      { property: "og:title", content: "Järntorget - Ratter Studios" },
      {
        property: "og:description",
        content: "A cinematic narrative experience set in 1646 Stockholm. Coming soon.",
      },
      { property: "og:url", content: "/sthlm-jrn" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: "/sthlm-jrn" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Järntorget",
          publisher: { "@type": "Organization", name: "Ratter Studios" },
          gamePlatform: ["PC"],
          genre: ["Narrative", "Historical", "Adventure"],
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
  { label: "Genre", value: "Historical Narrative" },
  { label: "Platform", value: "PC" },
  { label: "Status", value: "In Development" },
];

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function GamesPage() {
  return (
    <SiteLayout>
      {/* Cinematic title plate */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={keyart} alt="" className="ken-burns h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/75 to-background" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-48 text-center md:px-8 md:pb-36 md:pt-56">
          <p
            className="enter text-[0.75rem] uppercase tracking-[0.5em] text-primary/70"
            style={delay(100)}
          >
            Stockholm 1646
          </p>
          <h1
            className="enter mt-8 font-display text-6xl font-medium italic text-primary md:text-8xl lg:text-[8.5rem]"
            style={delay(250)}
          >
            Järntorget
          </h1>
          <p
            className="enter mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-foreground/75"
            style={delay(450)}
          >
            On the iron-market square, beneath the smoke of the foundries, a maid walks errands that
            will decide a court lady's fate. A whispered story drawn from the silence of the
            archives - where every name, every ledger, every shadow is real.
          </p>
        </div>
      </section>

      {/* Dossier facts */}
      <section className="border-y border-border/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border/40 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="px-4 py-8 text-center">
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-foreground/40">
                {fact.label}
              </p>
              <p className="mt-3 font-display text-lg font-medium text-primary/90 md:text-xl">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Concept art */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-28">
        <Reveal>
          <SectionHeading
            title={
              <>
                Concept &amp; <em className="text-primary">atmosphere</em>
              </>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {shots.map((src, i) => (
            <Reveal key={i} delay={i * 120}>
              <ZoomableImage
                src={src}
                alt={`Järntorget concept art ${i + 1}`}
                className="aspect-[4/5] overflow-hidden rounded-2xl border border-border/50 bg-card"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Synopsis details */}
      <section className="mx-auto max-w-4xl px-6 pb-32 md:px-8">
        <div className="grid gap-12 border-t border-border/50 pt-16 md:grid-cols-2">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">Setting</p>
            <p className="mt-5 leading-[1.85] text-foreground/75">
              17th-century Stockholm. A city of timber and tar, candlelight and court intrigue,
              drawn from real parish records and trial transcripts.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">Release</p>
            <p className="mt-5 leading-[1.85] text-foreground/75">
              PC - first chapter releasing 2026. Wishlist details and trailer to follow.
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
