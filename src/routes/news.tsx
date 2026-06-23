import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { PillLink } from "@/components/cta-link";
import { QrButton } from "@/components/qr-button";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Community - Ratter Studios" },
      {
        name: "description",
        content:
          "Join the Inner Circle. Behind-the-scenes research, early access, and the conversation around Järntorget.",
      },
      { property: "og:title", content: "The Inner Circle - Ratter Studios" },
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
        <h1
          className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          Step inside <em className="text-primary">the workshop.</em>
        </h1>
        <p className="enter mt-8 text-lg leading-relaxed text-foreground/70" style={delay(400)}>
          We don't believe in newsletters that go silent for months. We share the raw research, the
          false starts, and the candlelit breakthroughs - as they happen.
        </p>
        <p className="enter mt-6 leading-relaxed text-foreground/80" style={delay(500)}>
          Join us for major development updates straight from the archives, early looks at upcoming
          trailers, and first notice when we open up for playtests.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-32 md:px-8">
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <Reveal>
            <div className="relative h-full rounded-2xl border border-border/50 bg-card p-8 md:p-10">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">Discord</p>
              <h2 className="mt-8 font-display text-3xl font-medium md:text-4xl">
                The <em className="text-primary">conversation</em>
              </h2>
              <div className="mt-8 flex items-start gap-3">
                <PillLink href="https://discord.gg/rafM3mDBVC">Join the server</PillLink>
                <QrButton file="discord-qr.png" label="Discord" />
              </div>
              <div className="mt-8 overflow-hidden rounded-xl border border-border/40 bg-background/40 p-3">
                <iframe
                  src="https://discord.com/widget?id=1511691078527352922&theme=dark"
                  width="100%"
                  height="350"
                  frameBorder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  title="Ratter Studios Discord"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 md:p-10">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">Patreon</p>
              <h2 className="mt-8 font-display text-3xl font-medium md:text-4xl">
                The <em className="text-primary">patrons</em>
              </h2>
              <p className="mt-5 leading-relaxed text-foreground/65">
                Back the studio directly - behind-the-scenes builds, dev logs, and a hand in shaping
                1646.
              </p>
              <div className="mt-8 flex items-start gap-3">
                <PillLink href="https://patreon.com/RatterStudios">Join on Patreon</PillLink>
                <QrButton file="patreon-qr.png" label="Patreon" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
