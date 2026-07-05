import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { User } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import {websiteImg} from "@/lib/assets.ts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Ratter Studios" },
      {
        name: "description",
        content:
          "Ratter Studios - an independent studio born from a love of history, archives, and the stories left untold.",
      },
      { property: "og:title", content: "About Us - Ratter Studios" },
      {
        property: "og:description",
        content: "A small studio. A long memory.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: StoryPage,
});

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

type TeamMember = {
  name: string;
  title: string;
  /** Portrait in /public/website. Leave undefined for a placeholder icon. */
  image?: string;
};

const executiveTeam: TeamMember[] = [
  { name: "Karin Hellqvist", title: "CEO, Historical lead" }, // add img
  { name: "Makrina Hjälm Ellnemyr", title: "Deputy CEO, Historical lead" }, // add img
  { name: "Daniel Björck", title: "Board Member" }, // add img
];

const gameDevTeam: TeamMember[] = [
  { name: "Jamie Kofler", title: "Programmer, Tech Lead", image: websiteImg("JamieKImg.jpeg") },
  { name: "Leon Cederberg", title: "Designer, Narrative", image: websiteImg("LeonCImg.jpeg") },
  { name: "Name", title: "Role" },
  { name: "Name", title: "Role" },
];

const backEndTeam: TeamMember[] = [
  { name: "Lily Clairevelle", title: "Fullstack developer", image: websiteImg("LilyCImg.jpeg") },
  { name: "Name", title: "Role" },
  { name: "Name", title: "Role" },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-3">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-background/50">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary/30">
            <User className="h-8 w-8" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-display text-lg font-medium leading-tight text-foreground">
          {member.name}
        </p>
        <p className="mt-1 text-sm tracking-[0.02em] text-primary/80">{member.title}</p>
      </div>
    </div>
  );
}

function TeamColumn({ label, members }: { label: string; members: TeamMember[] }) {
  return (
    <div>
      <p className="text-sm font-medium tracking-[0.04em] text-primary/70">{label}</p>
      <div className="mt-6 space-y-4">
        {members.map((member, i) => (
          <TeamCard key={i} member={member} />
        ))}
      </div>
    </div>
  );
}

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
          When the best of two worlds collided -historians- and
          <br />
          -game developers- Ratter Studios was born.
        </p>
        <p className="enter" style={delay(550)}>
          Today, we are a small team of historians and game developers, working together to turn historical sources into immersive PC games.
          <br />
          The most extraordinary stories are already written, buried in the archives.
          <br />
          <br />
          We started this journey to bring those unfiltered stories back to life and show how the past actually was: warm, complicated, alive, colourful and raw.
          <br />
          <br />
          A small studio. A long memory.
        </p>
        <p className="enter font-display text-2xl italic text-primary" style={delay(650)}>
          We make history playable.
        </p>
      </section>

      {/* --- Meet the Team --- */}
      <section className="border-t border-border/40 bg-card/20">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:px-8 md:pb-28 md:pt-12">
          <Reveal className="text-center">
            <h2 className="font-display text-4xl font-medium leading-[1.05] md:text-5xl">
              Meet <em className="text-primary">the Team</em>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
            <Reveal>
              <TeamColumn label="Executive Team" members={executiveTeam} />
            </Reveal>
            <Reveal delay={120}>
              <TeamColumn label="Game Dev Team" members={gameDevTeam} />
            </Reveal>
            <Reveal delay={240}>
              <TeamColumn label="Back End Team" members={backEndTeam} />
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
