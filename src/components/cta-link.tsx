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

const ctaClasses = "btn-ratter h-12 rounded-[3px] px-9 text-sm tracking-[0.05em]";
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

export const pillClasses = "btn-ratter rounded-full px-5 py-2 text-xs tracking-[0.06em]";

export function PillLink({ children, className, ...rest }: CtaProps) {
  if ("href" in rest && rest.href) {
    return (
      <a href={rest.href} target="_blank" rel="noreferrer" className={cn(pillClasses, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link to={(rest as InternalProps).to} className={cn(pillClasses, className)}>
      {children}
    </Link>
  );
}
