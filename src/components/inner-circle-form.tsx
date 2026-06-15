import { Link } from "@tanstack/react-router";
import { useState } from "react";

/**
 * Newsletter signup - editorial underline input + gold sweep button.
 * No backend yet: submitting simply acknowledges locally.
 */
export function InnerCircleForm() {
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <p className="enter font-display text-2xl italic text-primary">
        Welcome to the circle. We'll write soon.
      </p>
    );
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setJoined(true);
        }}
        className="mx-auto flex w-full max-w-md items-end gap-6"
      >
        <label className="sr-only" htmlFor="inner-circle-email">
          Email address
        </label>
        <input
          id="inner-circle-email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-none border-0 border-b border-foreground/25 bg-transparent px-0 py-3 text-sm tracking-[0.03em] text-foreground outline-none transition-colors duration-300 placeholder:text-foreground/35 focus:border-primary"
        />
        <button
          type="submit"
          className="btn-ratter shrink-0 rounded-[3px] px-7 py-2.5 text-sm tracking-[0.05em]"
        >
          Join
        </button>
      </form>
      <p className="mt-5 text-xs leading-relaxed text-foreground/40">
        By joining, you agree to our{" "}
        <Link to="/privacy" className="text-foreground/60 transition-colors hover:text-primary">
          Privacy Policy
        </Link>
        . No spam, just history.
      </p>
    </div>
  );
}
