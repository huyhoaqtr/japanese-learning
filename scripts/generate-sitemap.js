import { writeFileSync } from "node:fs";
import { getPublicRoutes } from "./routes.js";

const SITE_URL = "https://learn-n5-jlpt.vercel.app";

const routes = getPublicRoutes();

const urlEntries = routes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Đã tạo public/sitemap.xml với ${routes.length} URL.`);
