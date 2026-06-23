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

      <section className="mx-auto max-w-2xl space-y-8 px-6 pb-24 text-lg leading-[1.85] text-foreground/75 md:px-8">
        <p className="enter" style={delay(450)}>
          Ratter Studios was founded by a small team of writers, historians, and game-makers who
          couldn't shake the feeling that the most extraordinary stories were already written -
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
    </SiteLayout>
  );
}
