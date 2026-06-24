import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { pillClasses } from "@/components/cta-link";
import { websiteImg } from "@/lib/assets";
import { ZoomableImage } from "@/components/zoomable-image";
import { cn } from "@/lib/utils";

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
  { label: "Engine", value: "Unreal Engine v5.8+" },
  { label: "Language", value: "C++" },
  { label: "Status", value: "In Development" },
];

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
            {/* Sticky dossier panel - stays beside the content while scrolling */}
            <aside className="enter md:sticky md:top-28 md:self-start" style={delay(150)}>
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
                      TEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMPTEST TEMP
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
                Stockholm 1646: <em className="text-primary">Järntorget</em>
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
                        alt={`Järntorget concept art ${i + 1}`}
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
