import fs from "node:fs/promises";
import path from "node:path";

import { getAllPostSlugs } from "./posts.server";
import { SITE_URL } from "../config/site";

const STATIC_PATHS = ["/", "/contributions", "/contact", "/blog"];

export async function writeSitemap(clientDir: string): Promise<void> {
  const slugs = await getAllPostSlugs();
  const urls = [
    ...STATIC_PATHS.map((p) => `${SITE_URL}${p === "/" ? "/" : p}`),
    ...slugs.map((slug) => `${SITE_URL}/blog/${slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  await fs.writeFile(path.join(clientDir, "sitemap.xml"), xml, "utf-8");
}
