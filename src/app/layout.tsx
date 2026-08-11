import type { Metadata, Viewport } from "next";
import { Bitter } from "next/font/google";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { AiHelpAgent } from "@/components/graphics/ai-help-agent";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/**
 * Typefaces:
 *  - Figtree (variable, self-hosted) — sans for UI, body, and the sans half of mixed headings
 *  - Bitter (Google) — serif for display
 */
const figtree = localFont({
  src: "../fonts/Figtree-variable.woff2",
  variable: "--font-figtree",
  display: "swap",
  weight: "300 900",
});

const serifDisplay = Bitter({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${serifDisplay.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          {children}
          <AiHelpAgent />
        </ScrollLayout>
      </body>
    </html>
  );
}
