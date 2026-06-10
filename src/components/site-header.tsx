import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import wordmark from "@/assets/ratter-wordmark.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/our-games", label: "Our Games" },
  { to: "/about", label: "Our Story" },
  { to: "/news", label: "Community" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="Ratter Studios — Home"
            className="group relative z-10"
          >
            <img
              src={wordmark}
              alt="Ratter Studios"
              className="h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link text-sm tracking-[0.04em]"
                activeProps={{ className: "nav-link is-active text-sm tracking-[0.04em]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-px w-6 bg-foreground transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-foreground transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu — sibling of the header so no ancestor filter/transform can
          break its fixed positioning. Solid backdrop for readability. */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 transition-opacity duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-background" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 70%)",
          }}
        />
        <nav className="relative flex h-full flex-col items-center justify-center gap-9 px-8">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className={`font-display text-4xl font-medium text-foreground/85 transition-all duration-500 hover:text-primary ${
                open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
              activeProps={{
                className: `font-display text-4xl font-medium italic text-primary transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`,
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
