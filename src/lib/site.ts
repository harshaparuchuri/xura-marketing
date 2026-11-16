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
  tagline: "AI employees, apps and flows, built by our team",
  description: "Xura's team finds the work that needs attention and custom-builds AI employees, apps and agentic flows on your ERP, CRM and spreadsheets. You approve every output.",
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
  email: "admin@xuralabs.com",
  /** "Start free" — the app's auth page, opened on the Sign up tab. */
  signupUrl: "https://app.xuralabs.com/?tab=signup",
  /**
   * Calendly event for step 3 of the demo form ("Pick a time"), e.g.
   * "https://calendly.com/xura/demo". `null` turns step 3 off and the form
   * ends after the details step.
   */
  calendlyUrl: "https://calendly.com/admin-xuralabs/30min" as string | null,
  /** "Sign in" for existing customers — the app's auth page. */
  signinUrl: "https://app.xuralabs.com/",
  /** "Book a 2-day bootcamp" — the on-site request form (`/trial`). */
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
    linkedin: "https://www.linkedin.com/company/xuralabs/",
  },
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#f2f213",
} as const;
