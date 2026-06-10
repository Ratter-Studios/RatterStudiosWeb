import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Ratter Studios" },
      {
        name: "description",
        content:
          "Ratter Studios — an independent studio born from a love of history, archives, and the stories left untold.",
      },
      { property: "og:title", content: "Our Story — Ratter Studios" },
      {
        property: "og:description",
        content: "An independent studio born from a love of history and the stories left untold.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: StoryPage,
});

const pillars = [
  {
    num: "01",
    title: "Archival Truth",
    body: "We work from real court records, parish books, and historical data. No Hollywood tropes — only what the past actually whispered.",
  },
  {
    num: "02",
    title: "A Living World",
    body: "History is bright, warm, and human. We capture the authentic atmosphere of 1646 — candlelit rooms, crowded streets, breath in the cold.",
  },
  {
    num: "03",
    title: "Shared Journey",
    body: "We open our research, our process, and our discoveries to the community as we build. The Inner Circle walks with us.",
  },
];

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function StoryPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-44 text-center md:px-8">
        <p
          className="enter text-[0.75rem] uppercase tracking-[0.5em] text-primary/70"
          style={delay(100)}
        >
          Our Story
        </p>
        <h1
          className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          A small studio. <br />
          <em className="text-primary">A long memory.</em>
        </h1>
      </section>

      <section className="mx-auto max-w-2xl space-y-8 px-6 pb-24 text-lg leading-[1.85] text-foreground/75 md:px-8">
        <p className="enter" style={delay(450)}>
          Ratter Studios was founded by a small team of writers, historians, and game-makers who
          couldn't shake the feeling that the most extraordinary stories were already written —
          buried in court ledgers, parish books, and the quiet margins of the archive.
        </p>
        <p className="enter" style={delay(550)}>
          We started this studio to bring those stories back into the light. Not as costume drama,
          not as fantasy in period dress, but as the past actually was: warm, complicated, alive,
          and infinitely strange.
        </p>
        <p className="enter font-display text-2xl italic text-primary" style={delay(650)}>
          We make history playable.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-32 md:px-8">
        <div className="border-t border-border/50">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 120}>
              <div className="group grid gap-4 border-b border-border/50 py-12 md:grid-cols-[8rem_1fr] md:gap-12 md:py-14">
                <div
                  aria-hidden
                  className="font-display text-6xl italic leading-none text-primary/15 transition-colors duration-700 group-hover:text-primary/40 md:text-7xl"
                >
                  {p.num}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium text-foreground md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
