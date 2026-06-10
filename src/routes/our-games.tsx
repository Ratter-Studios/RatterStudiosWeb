import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import keyart from "@/assets/stockholm-keyart.jpg";

export const Route = createFileRoute("/our-games")({
  head: () => ({
    meta: [
      { title: "Our Games — Ratter Studios" },
      {
        name: "description",
        content: "The catalog of games from Ratter Studios — cinematic, historical, hand-crafted.",
      },
      { property: "og:title", content: "Our Games — Ratter Studios" },
      { property: "og:description", content: "The catalog of games from Ratter Studios." },
      { property: "og:url", content: "/our-games" },
    ],
    links: [{ rel: "canonical", href: "/our-games" }],
  }),
  component: OurGamesPage,
});

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function OurGamesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-44 text-center md:px-8">
        <p
          className="enter text-[0.75rem] uppercase tracking-[0.5em] text-primary/70"
          style={delay(100)}
        >
          The Catalog
        </p>
        <h1
          className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          Our <em className="text-primary">Games</em>
        </h1>
        <p className="enter mt-8 text-lg leading-relaxed text-foreground/70" style={delay(420)}>
          Each title is a quiet act of historical fiction — hand-crafted, researched, and shaped by
          the archives that inspired it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 md:px-8">
        <Reveal>
          <Link
            to="/games"
            className="card-line group relative grid overflow-hidden border border-border/50 bg-card transition-colors duration-500 hover:border-primary/40 md:grid-cols-[5fr_4fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[28rem]">
              <img
                src={keyart}
                alt="Stockholm 1646: Järntorget key art"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />
            </div>
            <div className="relative flex flex-col p-8 md:p-12">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">
                Coming Soon
              </p>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.02] md:text-5xl">
                Stockholm 1646: <em className="text-primary">Järntorget</em>
              </h2>
              <p className="mt-4 text-sm italic tracking-[0.04em] text-foreground/45">
                A narrative noir for PC
              </p>
              <p className="mt-6 leading-relaxed text-foreground/70">
                A cinematic narrative experience drawn from the silence of the archives — candlelit
                streets, court intrigue, and a maid's errand that will decide a lady's fate.
              </p>
              <p className="mt-auto inline-flex items-center gap-2.5 pt-10 text-sm italic text-foreground/60 transition-colors duration-300 group-hover:text-primary">
                View game
                <span
                  aria-hidden
                  className="inline-block not-italic transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </p>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border border-border/40 bg-card/20 px-8 py-12 text-center md:flex-row md:text-left">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/50">
                In the workshop
              </p>
              <p className="mt-4 font-display text-2xl italic text-foreground/45">
                Whispered about. Not yet named.
              </p>
            </div>
            <p className="text-xs italic tracking-[0.05em] text-foreground/30">
              Announcement to follow
            </p>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
