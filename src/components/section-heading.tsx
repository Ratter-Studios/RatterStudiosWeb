import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Editorial section heading: mono eyebrow with a gold tick, display serif title. */
export function SectionHeading({ eyebrow, title, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.3em] text-primary/70",
          align === "center" && "justify-center",
        )}
      >
        {align === "left" && <span aria-hidden className="h-px w-10 bg-primary/40" />}
        {eyebrow}
      </p>
      <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-foreground md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
