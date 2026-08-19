import { writeFileSync } from "node:fs";
import { features } from "../src/data/features.js";
import { getLessonList } from "../src/data/lessons/index.js";

const SITE_URL = "https://learn-n5-jlpt.vercel.app";

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  ...features
    .filter((feature) => feature.status !== "coming-soon")
    .map((feature) => ({ path: feature.path, priority: "0.8", changefreq: "weekly" })),
];

const lessonRoutes = getLessonList()
  .filter((lesson) => lesson.status === "available")
  .map((lesson) => ({ path: `/bai-hoc/${lesson.id}`, priority: "0.7", changefreq: "monthly" }));

const routes = [...staticRoutes, ...lessonRoutes];

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
