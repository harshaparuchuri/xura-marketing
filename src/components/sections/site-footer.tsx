import Link from "next/link";

import { XuraLogo } from "@/components/brand/logo";
import { PixelWordmark } from "@/components/graphics/pixel-wordmark";

import { INDUSTRIES } from "@/data/industries";
import { siteConfig } from "@/lib/site";

const DOCS_URL = "https://xura.mintlify.site/introduction/welcome";

type FooterLink = { label: string; href: string; external?: boolean };

const PRODUCT: FooterLink[] = [
  { label: "AI employees", href: "/#ai-employees" },
  { label: "Product tour", href: "/#tour" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: DOCS_URL, external: true },
  { label: "Book a demo", href: siteConfig.demoUrl },
  { label: "Get started for free", href: siteConfig.signupUrl, external: true },
];

const COMPANY: FooterLink[] = [
  { label: "Contact us", href: `mailto:${siteConfig.email}` },
];

/** Review and launch profiles; entries with no URL yet are skipped. */
const FIND_US: FooterLink[] = [
  { label: "G2 reviews", href: siteConfig.profiles.g2 ?? "", external: true },
  { label: "Product Hunt", href: siteConfig.profiles.productHunt, external: true },
  { label: "YouTube", href: siteConfig.profiles.youtube, external: true },
].filter((l) => l.href);

const linkClass =
  "transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-60";

const FooterAnchor = ({ label, href, external }: FooterLink) =>
  external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label} <span aria-hidden className="opacity-60">↗</span>
    </a>
  ) : (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );

const Column = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <nav aria-label={title}>
    <h2 className="text-[0.6875rem] font-semibold uppercase tracking-widest opacity-60">{title}</h2>
    <ul className="mt-3 space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.label}>
          <FooterAnchor {...link} />
        </li>
      ))}
    </ul>
  </nav>
);

/**
 * Footer — dark band with a brand blurb and four link columns (Product,
 * Industries, Company, Find us — G2 / Product Hunt / YouTube from
 * `siteConfig.profiles`), then the oversized pixel wordmark and the legal
 * line.
 */
export const SiteFooter = () => (
  <footer className="texture relative isolate overflow-hidden bg-brand-ink text-white">
    <div className="shell relative grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
      <div className="max-w-xs sm:col-span-2 lg:col-span-1">
        <Link href="/" aria-label="Xura home">
          <XuraLogo markOnly />
        </Link>
        <p className="mt-4 text-sm leading-relaxed opacity-70">
          AI employees that answer, explain and act, with you approving every
          step.
        </p>
      </div>
      <Column title="Product" links={PRODUCT} />
      <Column
        title="Industries"
        links={INDUSTRIES.map((i) => ({ label: i.label, href: `/industries/${i.slug}` }))}
      />
      <Column title="Company" links={COMPANY} />
      <Column title="Find us" links={FIND_US} />
    </div>
    <div className="shell relative">
      {/* Mobile: keep the flat oversized wordmark, cropped by the page edge. */}
      <p
        aria-hidden
        className="-mb-[0.12em] mt-6 select-none text-center font-bold leading-[0.8] tracking-[-0.04em] md:hidden"
        style={{ fontSize: "clamp(4rem, 19vw, 17rem)" }}
      >
        Xura AI
      </p>
    </div>

    {/* Desktop: full-bleed pixel wordmark with a cursor field. */}
    <div
      className="relative mt-4 hidden w-full pb-2 md:block"
      style={{ height: "clamp(10rem, 22vw, 22rem)" }}
    >
      <PixelWordmark text="Xura AI" cellSize={22} radius={55} />
    </div>

    <p className="shell py-3 text-center text-[10px] uppercase tracking-widest opacity-40">
      © {new Date().getFullYear()} {siteConfig.legalName} · All rights reserved
    </p>
  </footer>
);
