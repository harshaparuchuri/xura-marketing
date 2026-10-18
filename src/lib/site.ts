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
  tagline: "AI employees that answer, explain and act",
  description: "AI employees that answer from your own data, explain the reason behind every number, and draft the next step for your approval, in WhatsApp, Slack and Teams.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph-v3.png",
  twitterHandle: "@xuralabs",
  author: "Xura Labs",
  /** Contact address shown in the footer. */
  email: "hello@xuralabs.com",
  /** "Get started for free" — the app's auth page, opened on the Sign up tab. */
  signupUrl: "https://app.xuralabs.com/?tab=signup",
  /**
   * Calendly event for step 3 of the demo form ("Pick a time"), e.g.
   * "https://calendly.com/xura/demo". `null` turns step 3 off and the form
   * ends after the details step.
   */
  calendlyUrl: "https://calendly.com/admin-xuralabs/30min" as string | null,
  /** "Book a demo" — the on-site request form (`/trial`). */
  demoUrl: "/trial",
  /** Legal entity for the copyright line. */
  legalName: "Xurian Labs LLP",
  /**
   * Third-party profiles linked from the footer. A `null` URL hides the link.
   */
  profiles: {
    g2: "https://www.g2.com/products/xura-ai/reviews" as string | null,
    productHunt: "https://www.producthunt.com/products/xura-ai",
    youtube: "https://www.youtube.com/@XuraLabs",
  },
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#f2f213",
} as const;
