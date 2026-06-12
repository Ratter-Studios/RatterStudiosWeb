import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Serve correctly from a sub-path (e.g. GitHub Pages: /RatterStudiosWeb/).
    // BASE_URL is "/" in dev and whatever `vite build --base=...` sets in prod,
    // so local development is unaffected.
    basepath: import.meta.env.BASE_URL,
  });

  return router;
};
