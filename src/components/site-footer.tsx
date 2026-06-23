import { Link } from "@tanstack/react-router";
import { websiteImg } from "@/lib/assets";

const wordmark = websiteImg("ratter-wordmark.png");
import { DevLoginDialog } from "@/components/dev-login-dialog";

const explore = [
  { to: "/", label: "Home" },
  { to: "/our-games", label: "Our Games" },
  { to: "/about", label: "Our Story" },
  { to: "/blog", label: "Dev Blog" },
  { to: "/news", label: "Community" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40">
      <div aria-hidden className="rule-gold absolute inset-x-0 -top-px" />
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-14 md:flex-row md:items-stretch md:justify-between">
          <div className="flex max-w-xs flex-col">
            <img src={wordmark} alt="Ratter Studios" className="h-9 w-auto self-start object-contain" />
            <p className="mt-6 font-display text-lg italic leading-snug text-foreground/50">
              Turning forgotten archives into cinematic, living worlds.
            </p>
            <div className="mt-10 md:mt-auto">
              <DevLoginDialog />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <p className="text-sm font-medium tracking-[0.04em] text-primary/70">Explore</p>
              <ul className="mt-6 grid grid-flow-col grid-rows-3 gap-x-10 gap-y-3">
                {explore.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-foreground/60 transition-colors duration-300 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium tracking-[0.04em] text-primary/70">Contact</p>
              <ul className="mt-6 space-y-3">
                <li>
                  <span className="text-sm text-foreground/60">Contact</span>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-foreground/60 transition-colors duration-300 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs tracking-[0.05em] text-foreground/35">
            © {new Date().getFullYear()} Ratter Studios
          </p>
          <p className="text-xs italic tracking-[0.05em] text-foreground/35">
            An independent game studio
          </p>
        </div>
      </div>
    </footer>
  );
}
