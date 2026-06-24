import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story - Ratter Studios" },
      {
        name: "description",
        content:
          "Ratter Studios - an independent studio born from a love of history, archives, and the stories left untold.",
      },
      { property: "og:title", content: "Our Story - Ratter Studios" },
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

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function StoryPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-44 text-center md:px-8">
        <h1
          className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          A small studio. <br />
          <em className="text-primary">A long memory.</em>
        </h1>
      </section>

      <section className="mx-auto max-w-2xl space-y-8 px-6 pb-24 text-center text-lg leading-[1.85] text-foreground/75 md:px-8">
        <p className="enter" style={delay(450)}>
          Ratter Studios
          <br />
          A small studio. A long memory.
          <br />
          When the best of two worlds collided -historians- and
          <br />
          -game developers- Ratter Studios was born.
        </p>
        <p className="enter" style={delay(550)}>
          Today, we are a small team of historians and game developers, working together to turn historical sources into immersive PC games.
          <br />
          The most extraordinary stories are already written, buried in the archives.
          <br />
          We started this journey to bring those unfiltered stories back to life and show how the past actually was: warm, complicated, alive, colourful and raw.
        </p>
        <p className="enter font-display text-2xl italic text-primary" style={delay(650)}>
          We make history playable.
        </p>
      </section>
    </SiteLayout>
  );
}
