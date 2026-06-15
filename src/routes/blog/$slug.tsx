import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getPost, formatDate, withBase, baseifyHtml } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.frontmatter.title} - Ratter Studios` },
          { name: "description", content: loaderData.frontmatter.excerpt ?? "" },
          { property: "og:title", content: loaderData.frontmatter.title },
          { property: "og:description", content: loaderData.frontmatter.excerpt ?? "" },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `/blog/${loaderData.slug}` },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/blog/${loaderData.slug}` }] : [],
  }),
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();
  const { title, date, author, cover } = post.frontmatter;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pb-32 pt-36 md:px-8 md:pt-44">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 text-sm italic text-foreground/55 transition-colors duration-300 hover:text-primary"
        >
          <span
            aria-hidden
            className="inline-block not-italic transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Dev Blog
        </Link>

        <header className="mt-8">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">
            {formatDate(date)} · {author}
          </p>
          <h1 className="enter mt-5 font-display text-4xl font-medium leading-[1.05] md:text-6xl">
            {title}
          </h1>
        </header>

        {cover ? (
          <img
            src={withBase(cover)}
            alt=""
            className="mt-10 w-full border border-border/40 object-cover"
          />
        ) : null}

        <div
          className="blog-content mt-10"
          dangerouslySetInnerHTML={{ __html: baseifyHtml(post.html) }}
        />
      </article>
    </SiteLayout>
  );
}
