import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Ratter Studios" },
      {
        name: "description",
        content:
          "RATTER Studios privacy policy. We do not collect, store, or process personal data from visitors to our website.",
      },
      { property: "og:title", content: "Privacy Policy - Ratter Studios" },
      {
        property: "og:description",
        content: "We do not collect, store, or process personal data from visitors to our website.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 pb-32 pt-44 md:px-8">
        <h1 className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-6xl">
          Privacy <em className="text-primary">Policy</em>
        </h1>
        <p className="mt-6 text-xs italic tracking-[0.05em] text-muted-foreground">
          Effective Date · June 24, 2026
        </p>

        <div className="mt-16 space-y-12 text-foreground/80 leading-relaxed">
          <p>
            At RATTER Studios, we believe in transparency and keeping things simple.
          </p>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Data we do not collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                We do not collect, store, or process any personal data from visitors to our website.
              </li>
              <li>We do not have accounts or user registrations.</li>
              <li>We do not collect email addresses or contact details through this site.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Cookies and tracking</h2>
            <p className="mt-4">
              Our website is a simple, informative landing page. We do not use tracking cookies,
              marketing pixels, or third-party analytics that track your behavior across the web.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Third-Party links</h2>
            <p className="mt-4">
              Our site may contain links to external platforms (such as our social media channels or
              industry partners). Once you leave our site, the privacy policies of those specific
              platforms apply.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Contact us</h2>
            <p className="mt-4">
              If you have any questions about this policy, you can reach out to us directly through
              our official channels.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
