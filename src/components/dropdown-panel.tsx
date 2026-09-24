import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Card with a title button that expands to show its content. */
export function DropdownPanel({ title, children }: { title: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-xl shadow-black/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl p-6 text-left md:p-7"
      >
        <span className="font-display text-xl font-medium text-primary/90">{title}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            "h-5 w-5 shrink-0 text-primary/70 transition-[color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-primary",
            open && "rotate-180",
          )}
        />
      </button>

      {/* inert: no tabbing into hidden content */}
      <div
        id={id}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-6 mb-6 border-t border-border/50 pt-6 md:mx-7 md:mb-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
