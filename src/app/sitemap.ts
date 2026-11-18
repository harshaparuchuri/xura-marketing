import type { MetadataRoute } from "next";

import { COMPARE_PAGES } from "@/data/compare";
import { INDUSTRIES } from "@/data/industries";
import { USE_CASES } from "@/data/use-cases";
import { siteConfig } from "@/lib/site";

/**
 * Generates `/sitemap.xml` with every public, indexable route. Industry pages
 * come from `INDUSTRIES`, so new industries are listed automatically. Add a
 * line here whenever a new top-level route is created.
 *
 * No `lastModified`: a build-time date on every URL tells Google every page
 * changed on every deploy, so it learns to ignore the field. Omitted until
 * there is a real per-page edit date. /trial is noindex and not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: `${siteConfig.url}${path}`, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/platform", 0.9),
    entry("/ai-employees", 0.9),
    entry("/workflows", 0.9),
    entry("/apps", 0.9),
    entry("/pulse", 0.9),
    entry("/integrations", 0.8),
    entry("/security", 0.8),
    entry("/ai-transformation", 0.9),
    entry("/bootcamp", 0.9),
    entry("/deployment", 0.9),
    entry("/industries", 0.8),
    ...INDUSTRIES.map((i) => entry(`/industries/${i.slug}`, 0.8)),
    entry("/use-cases", 0.8),
    ...USE_CASES.map((u) => entry(`/use-cases/${u.slug}`, 0.8)),
    ...COMPARE_PAGES.map((c) => entry(`/compare/${c.slug}`, 0.7)),
    entry("/about", 0.6),
    entry("/privacy", 0.3, "yearly"),
  ];
}

export const dynamic = "force-static";
