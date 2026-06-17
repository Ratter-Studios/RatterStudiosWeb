import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Reveal } from "@/components/reveal";
import { posts, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Dev Blog - Ratter Studios" },
      {
        name: "description",
        content:
          "Development updates from the team at Ratter Studios - research, progress, and studio news.",
      },
      { property: "og:title", content: "Dev Blog - Ratter Studios" },
      {
        property: "og:description",
        content: "Development updates straight from the workshop.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

function BlogIndex() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-44 text-center md:px-8">
        <p
          className="enter text-[0.7rem] uppercase tracking-[0.3em] text-primary/70"
          style={delay(150)}
        >
        </p>
        <h1
          className="enter mt-6 font-display text-5xl font-medium leading-[1.02] md:text-7xl"
          style={delay(250)}
        >
          Dev <em className="text-primary">Blog</em>
        </h1>
        <p
          className="enter mt-8 text-lg leading-relaxed text-foreground/70"
          style={delay(400)}
        >
          Development updates from the team at Ratter Studios - research, progress, and studio news.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32 md:px-8">
        {posts.length === 0 ? (
          <p className="text-center italic text-foreground/45">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 80}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group block rounded-2xl border border-border/50 bg-card p-8 transition-colors duration-500 hover:border-primary/40 md:p-10"
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">
                      {formatDate(post.frontmatter.date)} · {post.frontmatter.author}
                    </p>
                    <h2 className="mt-5 font-display text-3xl font-medium transition-colors duration-300 group-hover:text-primary md:text-4xl">
                      {post.frontmatter.title}
                    </h2>
                    {post.frontmatter.excerpt ? (
                      <p className="mt-4 leading-relaxed text-foreground/65">
                        {post.frontmatter.excerpt}
                      </p>
                    ) : null}
                    <span className="btn-ratter mt-8 inline-flex self-start rounded-full px-5 py-2 text-xs tracking-[0.06em] group-hover:border-primary">
                      Read more
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SiteLayout>
  );
}
