/**
 * @fileoverview Standardised metadata + viewport generators for pages.
 *
 * `generateMetadata` builds a Next.js `Metadata` object — basic meta tags,
 * OpenGraph, Twitter cards, canonical URL, icons, robots. `metadataBase` is
 * always set (from `siteConfig`) so relative URLs (OG image, canonical)
 * resolve to absolute — required by social scrapers.
 *
 * `generateViewport` builds the `Viewport` export. `themeColor` lives here, not
 * in `Metadata` — Next deprecated it on the metadata object.
 */

import { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/site";

interface MetadataProps {
  /** Plain string, or a Next `{ default, template, absolute }` object. */
  title?: Metadata["title"];
  description?: string;
  /** Canonical path (e.g. `/about`) or absolute URL for this page. */
  url?: string;
  /** Open Graph / Twitter image — path under `public/` or absolute URL. */
  ogImage?: string;
  twitterHandle?: string;
  author?: string;
  siteName?: string;
}

export function generateMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  url = "/",
  ogImage = siteConfig.ogImage,
  twitterHandle = siteConfig.twitterHandle,
  author = siteConfig.author,
  siteName = siteConfig.name,
}: MetadataProps = {}): Metadata {
  return {
    // Resolves every relative URL below to an absolute one.
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      // Dimensions must match the real asset; 1200×630 is the ideal size.
      images: [{ url: ogImage, width: 900, height: 600 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: twitterHandle,
      creator: twitterHandle,
      images: [ogImage],
    },
    // Icons come from `src/app/icon.tsx` (Next.js app-router auto-discovery),
    // which renders the Xura logo with a rounded corner. Do NOT re-declare
    // them here or the old public/favicon-*.png assets will override it.
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateViewport(): Viewport {
  return {
    themeColor: siteConfig.themeColor,
    width: "device-width",
    initialScale: 1,
  };
}
