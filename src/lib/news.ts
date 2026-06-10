export type NewsPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
};

export const news: NewsPost[] = [
  {
    slug: "stockholm-1646-announced",
    date: "2026-05-12",
    title: "Stockholm 1646 - Officially Announced",
    excerpt:
      "Today we're lifting the veil on our debut title: a narrative noir set in the candlelit streets of 17th-century Stockholm.",
    tag: "Announcement",
  },
  {
    slug: "devlog-01-the-old-town",
    date: "2026-05-26",
    title: "Devlog #01 - Rebuilding Gamla Stan",
    excerpt:
      "How we reconstructed the alleys of Gamla Stan from period maps, sketches, and a lot of fog.",
    tag: "Devlog",
  },
  {
    slug: "devlog-02-the-light-system",
    date: "2026-06-02",
    title: "Devlog #02 - A Game Lit by Candles",
    excerpt:
      "Our custom lighting pipeline lets a single flame change how a room, and a scene, reads to the player.",
    tag: "Devlog",
  },
  {
    slug: "soundtrack-teaser",
    date: "2026-06-03",
    title: "First Listen - Stockholm 1646 Main Theme",
    excerpt:
      "Composer Elsa Lindgren shares a short excerpt of the main theme: nyckelharpa, low strings, and silence.",
    tag: "Audio",
  },
];
