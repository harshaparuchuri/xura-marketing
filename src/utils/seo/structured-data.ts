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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        areaServed: ["India", "Southeast Asia"],
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

/**
 * Service schema for the home page: AI employees deployed by Xura's own
 * team, for pharma and manufacturing companies in India and Southeast Asia.
 */
export function getServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service`,
    name: "AI transformation, built for your business",
    serviceType: "AI implementation",
    description:
      "Xura's deployment team finds the work that needs attention in pharma and manufacturing companies and custom-builds AI employees, agentic workflows and apps on the Xura platform. Engagements start with a two-day bootcamp; you see it live in about two weeks.",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: ["India", "Southeast Asia"],
    audience: { "@type": "BusinessAudience", audienceType: "Pharma and manufacturing companies" },
    url: siteConfig.url,
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
 * SoftwareApplication for /platform — tells search and AI answer engines what
 * the product is. No `offers`: pricing is quoted per company.
 */
export function getPlatformStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/platform#software`,
    name: `${siteConfig.name} AI platform`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI agents and workflow automation",
    operatingSystem: "Web, WhatsApp, Slack, Microsoft Teams, email",
    description:
      "AI employees, agentic workflows and custom apps on one platform: a live knowledge graph over your ERP, CRM and spreadsheets, with every output approved in WhatsApp, Slack or Teams.",
    url: `${siteConfig.url}/platform`,
    featureList: [
      "AI employees for sales reviews, quality tracking, leadership decks and hiring",
      "Agentic workflows with approval steps",
      "Internal apps built by describing them in chat",
      "MCP and 50+ native integrations including SAP, Salesforce, HubSpot and Snowflake",
      "Runs in Xura cloud, your VPC or on premises",
      "Audit logs and row-level permissions",
    ],
    publisher: { "@id": `${siteConfig.url}/#organization` },
    provider: { "@id": `${siteConfig.url}/#organization` },
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
