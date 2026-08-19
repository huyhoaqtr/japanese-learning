import { features } from "../src/data/features.js";
import { getLessonList } from "../src/data/lessons/index.js";

export function getPublicRoutes() {
  const staticRoutes = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    ...features
      .filter((feature) => feature.status !== "coming-soon")
      .map((feature) => ({ path: feature.path, priority: "0.8", changefreq: "weekly" })),
  ];

  const lessonRoutes = getLessonList()
    .filter((lesson) => lesson.status === "available")
    .map((lesson) => ({ path: `/bai-hoc/${lesson.id}`, priority: "0.7", changefreq: "monthly" }));

  return [...staticRoutes, ...lessonRoutes];
}
