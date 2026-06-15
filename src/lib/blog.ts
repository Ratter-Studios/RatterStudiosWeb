// Dev blog data layer.

// Posts are `.md` files in src/content/blog (authored via Pages CMS).
// plugin in vite.config.ts turns each file into a module exposing `frontmatter`
// pre-rendered `html`, so this module never parses markdown at runtime.

export type PostFrontmatter = {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  cover?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  html: string;
};

type PostModule = { frontmatter: PostFrontmatter; html: string };

const modules = import.meta.glob<PostModule>("../content/blog/*.md", { eager: true });

// Newest first (date is an ISO string from the frontmatter).
export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split("/").pop()!.replace(/\.md$/, ""),
    frontmatter: mod.frontmatter,
    html: mod.html,
  }))
  .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function withBase(path?: string): string | undefined {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + "/" + path.replace(/^\//, "");
}

export function baseifyHtml(html: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!base) return html;
  return html.replace(/(\s(?:src|href))="\/(?!\/)/g, `$1="${base}/`);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Format an ISO date string ("2026-06-15...")
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
