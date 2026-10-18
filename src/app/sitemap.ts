import type { MetadataRoute } from "next";

import { INDUSTRIES } from "@/data/industries";
import { siteConfig } from "@/lib/site";

/**
 * Generates `/sitemap.xml` with every public, indexable route. Industry pages
 * come from `INDUSTRIES`, so new industries are listed automatically. Add a
 * line here whenever a new top-level route is created.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/pricing", 0.9),
    entry("/industries", 0.8),
    ...INDUSTRIES.map((i) => entry(`/industries/${i.slug}`, 0.8)),
    entry("/trial", 0.7),
  ];
}

export const dynamic = "force-static";
