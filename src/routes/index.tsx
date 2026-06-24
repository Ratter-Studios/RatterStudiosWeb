import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CtaLink, PillLink } from "@/components/cta-link";
import { websiteImg } from "@/lib/assets";
import { ZoomableImage } from "@/components/zoomable-image";

const titleImage = websiteImg("webTitle.jpeg");
const shot1 = websiteImg("devCapture1.jpeg");
const shot2 = websiteImg("devCapture2.jpeg");
const shot3 = websiteImg("devCapture3.jpeg");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ratter Studios" },
      {
        name: "description",
        content:
          "Ratter Studios is an independent game dev studio. Makers of Stockholm 1646, a historical narrative game series set in 17th-century Sweden.",
      },
      { property: "og:title", content: "Ratter Studios" },
      {
        property: "og:description",
        content: "Independent game dev studio. Makers of Stockholm 1646.",
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
            src={titleImage}
            alt=""
            width={1920}
            height={1080}
            className="ken-burns h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
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
            <CtaLink to="/community">Join the Community</CtaLink>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          aria-hidden
          className="enter absolute bottom-8 left-1/2 -translate-x-1/2"
          style={delay(1100)}
        >
          <ArrowDown className="scroll-arrow h-6 w-6 text-primary" strokeWidth={1.75} />
        </div>
      </section>

      {/* --- Featured game --- */}
      <section className="relative overflow-hidden border-t border-border/40 py-28 md:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[1.05fr_1fr] md:px-8">
          <Reveal>
            <SectionHeading
              title={
                <>
                  Stockholm 1646: <em className="text-primary">Järntorget</em>
                </>
              }
            />
            <p className="mt-4 text-sm italic tracking-[0.04em] text-foreground/45">
              A historical narrative for PC
            </p>
            <p className="mt-8 max-w-lg leading-relaxed text-foreground/70">
              On Järntorget 17th century a maid's goal is to rebuild her life from the very bottom.
              <br />
              How will she handle stressful and tricky tasks in order to climb the human hierarchy?
            </p>
            <div className="mt-10">
              <PillLink to="/sthlm-jrn">View Game</PillLink>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-3">
              <ZoomableImage
                src={shot1}
                alt="Järntorget concept 1"
                className="col-span-2 aspect-video overflow-hidden rounded-2xl border border-border/50"
              />
              {[shot2, shot3].map((src, i) => (
                <ZoomableImage
                  key={i}
                  src={src}
                  alt={`Järntorget concept ${i + 2}`}
                  className="aspect-square overflow-hidden rounded-2xl border border-border/50"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Studio principle + Inner Circle signup --- */}
      <section className="border-t border-border/40 bg-card/25 pt-28 pb-20 md:pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-16 md:px-8">
          <Reveal>
            <blockquote className="font-display text-4xl font-medium italic leading-[1.15] text-primary md:text-5xl">
              We make history playable.
            </blockquote>
            <p className="mt-8 leading-[1.85] text-foreground/70">
              Ratter Studios
              <br />
              A small studio. A long memory.
              <br />
              When the best of two worlds collided -historians- and
              <br /> 
              -game developers- Ratter Studios was born....
            </p>
            <div className="mt-8">
              <PillLink to="/about">Our story</PillLink>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-3xl font-medium leading-[1.05] md:text-4xl">
              Walk with us <em className="text-primary">through 1646.</em>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-foreground/65">
              Follow the reclaiming of history on our social media, Discord and Patreon and 
            </p>
            <div className="mt-8">
              <PillLink to="/community">Join the Community</PillLink>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
