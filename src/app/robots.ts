import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Generates `/robots.txt`. Allows all crawlers — including AI crawlers
 * (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), which is deliberate for
 * AEO — and points them at the sitemap. No `Host:` (Yandex-only, non-standard).
 * Tighten the rules per environment (e.g. disallow `/` on staging).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

export const dynamic = "force-static";
