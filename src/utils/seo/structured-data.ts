/**
 * @fileoverview JSON-LD structured data helpers.
 *
 * Structured data lets search engines understand the site as entities
 * (Organization, WebSite) rather than just text — improving rich results.
 * Render the output inside a `<script type="application/ld+json">` tag.
 */

import { siteConfig } from "@/lib/site";

/**
 * Organization + WebSite schema for the site root. Emit once, in the root
 * layout. The two nodes are linked by `@id` so crawlers treat them as related.
 */
export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: `${siteConfig.name} AI`,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/android-icon-192x192.png`,
        email: siteConfig.email,
        sameAs: Object.values(siteConfig.profiles).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList for a page's trail, e.g. Home › Industries › Pharma. */
export function getBreadcrumbStructuredData(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`,
    })),
  };
}

/**
 * SoftwareApplication with one Offer per priced plan, for the pricing page.
 * `price` is the per-user monthly price as a number string ("0", "50").
 */
export function getProductStructuredData(
  offers: { name: string; price: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${siteConfig.name} AI`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Slack, Microsoft Teams, WhatsApp",
    description: siteConfig.description,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "USD",
      description: o.description,
      url: `${siteConfig.url}/pricing`,
    })),
  };
}
