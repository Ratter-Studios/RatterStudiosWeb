import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// TanStack Start app config.
// Special files in src/ are auto-detected by the framework:
//   - router.tsx  - router factory
//   - start.ts    - global start instance / request middleware
//   - server.ts   - custom server entry (our SSR error wrapper)
export default defineConfig({
  // Sub-path the site is served from. "/" for local dev (so `bun run dev` is
  // unaffected); the GitHub Pages deploy workflow sets VITE_BASE_PATH to
  // "/RatterStudiosWeb/" for the production build.
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    // Resolves the "@/*" path alias from tsconfig.json.
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Pre-render every route to static HTML at build time, so the site can be
      // served by a static host (GitHub Pages). crawlLinks follows <a> tags from
      // the home page to discover all routes automatically.
      prerender: { enabled: true, crawlLinks: true },
    }),
    viteReact(),
  ],
});
