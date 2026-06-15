import { defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function markdownData(): Plugin {
  return {
    name: "ratter-markdown-data",
    enforce: "pre",
    async transform(code, id) {
      const cleanId = id.split("?")[0].replace(/\\/g, "/");
      if (!cleanId.endsWith(".md") || !cleanId.includes("/src/content/blog/")) return;

      const yaml = await import("js-yaml");
      const { marked } = await import("marked");
      const match = FRONTMATTER.exec(code);
      const frontmatter = match ? (yaml.load(match[1]) ?? {}) : {};
      const content = match ? match[2] : code;
      const html = marked.parse(content, { async: false }) as string;

      return {
        code: `export const frontmatter = ${JSON.stringify(frontmatter)};\nexport const html = ${JSON.stringify(html)};\n`,
        map: null,
      };
    },
  };
}

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
    markdownData(),
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
