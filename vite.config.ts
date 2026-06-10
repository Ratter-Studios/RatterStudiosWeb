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
  plugins: [
    // Resolves the "@/*" path alias from tsconfig.json.
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
