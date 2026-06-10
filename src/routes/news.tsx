import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { InnerCircleForm } from "@/components/inner-circle-form";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Community — Ratter Studios" },
      {
        name: "description",
        content:
          "Join the Inner Circle. Behind-the-scenes research, early access, and the conversation around Järntorget.",
      },
      { property: "og:title", content: "The Inner Circle — Ratter Studios" },
      {
        property: "og:description",
        content:
          "Behind-the-scenes research, early access, and the conversation around Järntorget.",
      },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: CommunityPage,
});

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function CommunityPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-44 text-center md:px-8">
        <p
          className="enter text-[0.75rem] uppercase tracking-[0.5em] text-primary/70"
          style={delay(100)}
        >
          The Inner Circle
        </p>
        <h1
          className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          Step inside <em className="text-primary">the workshop.</em>
        </h1>
        <p className="enter mt-8 text-lg leading-relaxed text-foreground/70" style={delay(400)}>
          We don't believe in newsletters that go silent for months. We share the raw research, the
          false starts, and the candlelit breakthroughs — as they happen.
        </p>
        <p className="enter mt-6 leading-relaxed text-foreground/80" style={delay(500)}>
          Join us for major development updates straight from the archives, early looks at upcoming
          trailers, and first notice when we open up for playtests.
        </p>

        <div className="enter mt-12" style={delay(620)}>
          <InnerCircleForm />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-32 md:px-8">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-line group relative border border-border/50 bg-card p-8 transition-colors duration-500 hover:border-primary/40 md:p-10">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">Discord</p>
              <h2 className="mt-8 font-display text-3xl font-medium md:text-4xl">
                The <em className="text-primary">conversation</em>
              </h2>
              <p className="mt-5 leading-relaxed text-foreground/65">
                Long-form research threads, early playtests, and direct conversation with the team.
                The closest seat to the workbench.
              </p>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="group/link mt-8 inline-flex items-center gap-2.5 text-sm italic text-foreground/60 transition-colors duration-300 hover:text-primary"
              >
                Join the server
                <span
                  aria-hidden
                  className="inline-block not-italic transition-transform duration-300 group-hover/link:translate-x-1.5"
                >
                  →
                </span>
              </a>
              <div className="mt-8 overflow-hidden border border-border/40 bg-background/40 p-3">
                <iframe
                  src="https://discord.com/widget?id=1511691078527352922&theme=dark"
                  width="100%"
                  height="350"
                  allowTransparency
                  frameBorder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  title="Ratter Studios Discord"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="card-line group relative block border border-border/50 bg-card p-8 transition-colors duration-500 hover:border-primary/40 md:p-10"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">TikTok</p>
              <h2 className="mt-8 font-display text-3xl font-medium md:text-4xl">
                The <em className="text-primary">Field Notes</em>
              </h2>
              <p className="mt-5 leading-relaxed text-foreground/65">
                Short dispatches from the archive — strange entries, surprising characters, the
                day-to-day of building a 17th-century city in pixels.
              </p>
              <p className="mt-8 inline-flex items-center gap-2.5 text-sm italic text-foreground/60 transition-colors duration-300 group-hover:text-primary">
                Follow on TikTok
                <span
                  aria-hidden
                  className="inline-block not-italic transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </p>
            </a>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
