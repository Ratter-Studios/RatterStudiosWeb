import { Link } from "@tanstack/react-router";
import wordmark from "@/assets/ratter-wordmark.png";

const explore = [
  { to: "/", label: "Home" },
  { to: "/our-games", label: "Our Games" },
  { to: "/about", label: "Our Story" },
  { to: "/news", label: "Community" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/40">
      <div aria-hidden className="rule-gold absolute inset-x-0 -top-px" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <img src={wordmark} alt="Ratter Studios" className="h-9 w-auto object-contain" />
            <p className="mt-6 font-display text-lg italic leading-snug text-foreground/50">
              Turning forgotten archives into cinematic, living worlds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/60">Explore</p>
              <ul className="mt-6 space-y-3">
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
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/60">Connect</p>
              <ul className="mt-6 space-y-3">
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-foreground/60 transition-colors duration-300 hover:text-primary"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-sm text-foreground/60 transition-colors duration-300 hover:text-primary"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@ratter.studio"
                    className="text-sm text-foreground/60 transition-colors duration-300 hover:text-primary"
                  >
                    Contact
                  </a>
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

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-8 sm:flex-row">
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
