import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type InternalProps = CommonProps & { to: string; href?: never };
type ExternalProps = CommonProps & { href: string; to?: never };
type CtaProps = InternalProps | ExternalProps;

const ctaClasses =
  "btn-sweep inline-flex h-12 items-center justify-center border border-primary/50 px-9 text-sm tracking-[0.05em] text-primary";

/** Primary call-to-action: bordered gold button with a sweeping fill on hover. */
export function CtaLink({ children, className, ...rest }: CtaProps) {
  if ("href" in rest && rest.href) {
    return (
      <a href={rest.href} target="_blank" rel="noreferrer" className={cn(ctaClasses, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link to={(rest as InternalProps).to} className={cn(ctaClasses, className)}>
      {children}
    </Link>
  );
}

const arrowClasses =
  "group inline-flex items-center gap-2.5 text-sm italic tracking-[0.02em] text-foreground/60 transition-colors duration-300 hover:text-primary";

/** Quiet text link with an arrow that slides on hover. */
export function ArrowLink({ children, className, ...rest }: CtaProps) {
  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
      >
        →
      </span>
    </>
  );
  if ("href" in rest && rest.href) {
    return (
      <a href={rest.href} target="_blank" rel="noreferrer" className={cn(arrowClasses, className)}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={(rest as InternalProps).to} className={cn(arrowClasses, className)}>
      {inner}
    </Link>
  );
}
