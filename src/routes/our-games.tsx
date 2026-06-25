import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { websiteImg } from "@/lib/assets";

const keyart = websiteImg("webTitle.jpeg");

export const Route = createFileRoute("/our-games")({
  head: () => ({
    meta: [
      { title: "Our Games - Ratter Studios" },
      {
        name: "description",
        content: "The catalog of games from Ratter Studios - cinematic, historical, hand-crafted.",
      },
      { property: "og:title", content: "Our Games - Ratter Studios" },
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
        <h1
          className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          Our <em className="text-primary">Games</em>
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 md:px-8">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-2xl border border-border/50 bg-card md:grid-cols-[5fr_4fr]">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[22rem]">
              <img
                src={keyart}
                alt="Stockholm 1646: Järntorget key art"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />
            </div>
            <div className="relative flex flex-col p-8 md:p-12">
              <p className="text-sm tracking-[0.04em] text-foreground/45">Demo Coming Soon</p>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.02] md:text-5xl">
                Stockholm 1646: <em className="text-primary">Järntorget</em>
              </h2>
              <p className="mt-6 leading-relaxed text-foreground/70">
                In our small team, we have started to craft a demo for Stockholm 1646: Järntorget.
              </p>
              <Link
                to="/sthlm-jrn"
                className="btn-ratter mt-6 self-start rounded-full px-5 py-2 text-xs tracking-[0.06em]"
              >
                View game
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
