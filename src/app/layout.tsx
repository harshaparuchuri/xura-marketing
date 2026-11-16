import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";
import { siteConfig } from "@/lib/site";

import { AnalyticsEvents } from "@/components/common/analytics-events";
import { GoogleAnalytics } from "@/components/common/google-analytics";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { AiHelpAgent } from "@/components/graphics/ai-help-agent";
import { CookieBanner } from "@/components/common/cookie-banner";
import { SkipLink } from "@/components/common/skip-link";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/**
 * Typeface: Figtree (variable, self-hosted) — the only font on the site.
 * Bitter (serif, from Google Fonts) was removed 2026-11-16: no live page used
 * it, yet every page preloaded it, and the build fetched it from Google Fonts
 * (a CI failure point). `--font-serif-display` now falls back to Figtree.
 */
const figtree = localFont({
  src: "../fonts/Figtree-variable.woff2",
  variable: "--font-figtree",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = generateMetadata({
  title: {
    default: `${siteConfig.name} AI: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name} AI`,
  },
});
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <SkipLink />
        <ScrollLayout>
          <AdaptiveGrid coef={1} />
          <ReducedMotion />
          {children}
          <AiHelpAgent />
          <CookieBanner />
          <AnalyticsEvents />
        </ScrollLayout>
      </body>
    </html>
  );
}
