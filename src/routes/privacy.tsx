import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Ratter Studios" },
      {
        name: "description",
        content:
          "How Ratter Studios collects and handles your data. GDPR-compliant, no third-party sales, unsubscribe anytime.",
      },
      { property: "og:title", content: "Privacy Policy - Ratter Studios" },
      { property: "og:description", content: "How Ratter Studios collects and handles your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "June 2026";
  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 pb-32 pt-44 md:px-8">
        <h1 className="enter mt-8 font-display text-5xl font-medium leading-[1.02] md:text-6xl">
          Privacy <em className="text-primary">Policy</em>
        </h1>
        <p className="mt-6 text-xs italic tracking-[0.05em] text-muted-foreground">
          Last updated · {updated}
        </p>

        <div className="mt-16 space-y-12 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-medium text-primary">In short</h2>
            <p className="mt-4">
              We only collect what we need to send you community updates: your email address. We
              never sell it. You can leave at any time, and your data leaves with you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Who we are</h2>
            <p className="mt-4">
              Ratter Studios is the data controller for the information described in this policy. If
              you have any questions, write to us at{" "}
              <a href="mailto:hello@ratter.studio" className="text-primary hover:underline">
                hello@ratter.studio
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">What we collect</h2>
            <p className="mt-4">
              When you join our Inner Circle, we store the email address you provide and the date
              you signed up. That's it. We don't ask for your name, location, or any other personal
              detail.
            </p>
            <p className="mt-4">
              Our website may collect minimal, anonymous analytics (such as page views) to
              understand what people find useful. This data is aggregated and cannot be used to
              identify you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Why we collect it</h2>
            <p className="mt-4">
              Your email is used for one purpose: to send you occasional dispatches about
              Järntorget, behind-the-scenes research, and community updates. Our legal basis under
              the GDPR is your consent, given when you sign up.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">
              We never sell your data
            </h2>
            <p className="mt-4">
              We do not sell, rent, or trade your personal information to any third party. Ever. We
              share your email only with the service providers strictly necessary to deliver our
              newsletter (for example, our email delivery provider), and only under contracts that
              require them to protect your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Your rights</h2>
            <p className="mt-4">
              Under the GDPR you have the right to access, correct, export, or delete your personal
              data, and to withdraw your consent at any time. You can unsubscribe from every email
              we send via the link in the footer of that email - one click, no questions asked. To
              exercise any other right, email{" "}
              <a href="mailto:hello@ratter.studio" className="text-primary hover:underline">
                hello@ratter.studio
              </a>{" "}
              and we'll respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">How long we keep it</h2>
            <p className="mt-4">
              We keep your email until you unsubscribe or ask us to delete it. Once you do, your
              record is removed from our active systems promptly and from any backups within a
              reasonable rotation period.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-primary">Changes</h2>
            <p className="mt-4">
              If we ever change this policy, we'll update the date at the top of this page and, for
              material changes, let subscribers know by email before the change takes effect.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
