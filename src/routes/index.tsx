import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CtaLink, ArrowLink } from "@/components/cta-link";
import { InnerCircleForm } from "@/components/inner-circle-form";
import keyart from "@/assets/stockholm-keyart.jpg";
import shot1 from "@/assets/stockholm-shot-1.jpg";
import shot2 from "@/assets/stockholm-shot-2.jpg";
import shot3 from "@/assets/stockholm-shot-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ratter Studios - Independent Games" },
      {
        name: "description",
        content:
          "Ratter Studios is an independent gaming studio. Makers of Stockholm 1646, a noir narrative game set in 17th-century Sweden.",
      },
      { property: "og:title", content: "Ratter Studios - Independent Games" },
      {
        property: "og:description",
        content: "Independent gaming studio. Makers of Stockholm 1646.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function Index() {
  return (
    <SiteLayout>
      {/* --- Hero --- */}
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={keyart}
            alt=""
            width={1920}
            height={1080}
            className="ken-burns h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/70 to-background" />
        </div>
        {/* Candlelight glow */}
        <div
          aria-hidden
          className="flicker pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 32%, transparent) 0%, color-mix(in oklab, var(--primary) 10%, transparent) 38%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-36 text-center md:px-8">
          <p
            className="enter text-[0.75rem] uppercase tracking-[0.5em] text-primary/70"
            style={delay(100)}
          >
            Ratter Studios
          </p>
          <h1 className="mt-8 font-display font-medium leading-[0.95]">
            <span
              className="enter block text-5xl text-foreground sm:text-6xl md:text-8xl lg:text-[7.5rem]"
              style={delay(250)}
            >
              Making History
            </span>
            <span
              className="enter block text-5xl italic text-primary sm:text-6xl md:text-8xl lg:text-[7.5rem]"
              style={delay(420)}
            >
              Playable.
            </span>
          </h1>
          <p
            className="enter mx-auto mt-10 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg"
            style={delay(580)}
          >
            An independent studio turning forgotten archives into cinematic, living worlds.
          </p>
          <div className="enter mt-12 flex flex-wrap justify-center gap-6" style={delay(720)}>
            <CtaLink to="/our-games">Our Games</CtaLink>
            <ArrowLink to="/news" className="h-12">
              Join the Inner Circle
            </ArrowLink>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="enter absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
          style={delay(1100)}
        >
          <span className="text-xs italic tracking-[0.2em] text-foreground/35">Scroll</span>
          <span
            aria-hidden
            className="scroll-hint block h-12 w-px bg-gradient-to-b from-primary/70 to-transparent"
          />
        </div>
      </section>

      {/* --- Featured game --- */}
      <section className="relative overflow-hidden border-t border-border/40 py-28 md:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[1.05fr_1fr] md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Featured · In Development"
              title={
                <>
                  Stockholm 1646: <em className="text-primary">Järntorget</em>
                </>
              }
            />
            <p className="mt-4 text-sm italic tracking-[0.04em] text-foreground/45">
              A narrative noir for PC
            </p>
            <p className="mt-8 max-w-lg leading-relaxed text-foreground/70">
              On the iron-market square, beneath the smoke of the foundries, a maid walks errands
              that will decide a court lady's fate. Every name, every ledger, every shadow is real.
            </p>
            <div className="mt-10">
              <ArrowLink to="/games">Enter the city</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/games"
                className="group relative col-span-2 block overflow-hidden border border-border/50"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={shot1}
                    alt="Järntorget - concept art of a candlelit Stockholm street"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
              </Link>
              {[shot2, shot3].map((src, i) => (
                <Link
                  key={i}
                  to="/games"
                  className="group relative block overflow-hidden border border-border/50"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={src}
                      alt={`Järntorget - atmosphere study ${i + 2}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Studio --- */}
      <section className="border-y border-border/40 bg-card/25 py-28 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:px-8">
          <Reveal>
            <blockquote className="font-display text-4xl font-medium italic leading-[1.15] text-primary md:text-5xl">
              "We make history playable."
            </blockquote>
            <p className="mt-6 text-xs italic tracking-[0.1em] text-foreground/40">
              The studio principle
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="leading-[1.85] text-foreground/70">
              Ratter Studios was founded by a small team of writers, historians, and game-makers who
              couldn't shake the feeling that the most extraordinary stories were already written -
              buried in court ledgers, parish books, and the quiet margins of the archive.
            </p>
            <div className="mt-8">
              <ArrowLink to="/about">Our story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Join --- */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div aria-hidden className="rule-gold absolute inset-x-0 top-0" />
        <div
          aria-hidden
          className="flicker pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-6 text-center md:px-8">
          <Reveal>
            <p className="text-[0.75rem] uppercase tracking-[0.4em] text-primary/70">
              The Inner Circle
            </p>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] md:text-5xl">
              Walk with us <em className="text-primary">through 1646.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-foreground/65">
              Research finds, early trailers, and first notice when the playtests open.
            </p>
            <div className="mt-10">
              <InnerCircleForm />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
