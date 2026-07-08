import path from "node:path";

import type { Config } from "@react-router/dev/config";

import { getAllPostSlugs } from "./src/lib/posts.server";
import { writeSitemap } from "./src/lib/sitemap.server";

export default {
  appDirectory: "src",
  ssr: false,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
    // v8_viteEnvironmentApi wymaga Vite 6+ (projekt ma Vite 5)
  },
  async prerender({ getStaticPaths }) {
    const slugs = await getAllPostSlugs();
    return [...getStaticPaths(), ...slugs.map((slug) => `/blog/${slug}`)];
  },
  async buildEnd({ reactRouterConfig }) {
    const clientDir = path.join(reactRouterConfig.buildDirectory, "client");
    await writeSitemap(clientDir);
  },
} satisfies Config;
