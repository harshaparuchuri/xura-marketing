/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Xura",
  /** Short strapline appended to the site name for the browser tab / SERP title. */
  tagline: "agentic intelligence platform",
  description: "WhatsApp-native AI over your business data.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@xuralabs",
  author: "Xura Labs",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#f2f213",
} as const;
