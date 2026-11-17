import Link from "next/link";

import { XuraLogo } from "@/components/brand/logo";
import { CookieSettingsButton } from "@/components/common/cookie-banner";
import { PixelWordmark } from "@/components/graphics/pixel-wordmark";

import { INDUSTRIES } from "@/data/industries";
import { siteConfig } from "@/lib/site";
import { TALK_URL } from "@/components/common/cta-pair";

const DOCS_URL = "https://xura.mintlify.site/introduction/welcome";

type FooterLink = { label: string; href: string; external?: boolean };

const PRODUCT: FooterLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "AI employees", href: "/ai-employees" },
  { label: "Workflows", href: "/workflows" },
  { label: "Apps", href: "/apps" },
  { label: "Integrations", href: "/integrations" },
  { label: "Security", href: "/security" },
  { label: "Docs", href: DOCS_URL, external: true },
];

/** Mirrors the header's "How we work" menu, plus the comparison pages. */
const HOW_WE_WORK: FooterLink[] = [
  { label: "AI transformation", href: "/ai-transformation" },
  { label: "2-day bootcamp", href: "/bootcamp" },
  { label: "Deployment", href: "/deployment" },
  { label: "Use cases", href: "/use-cases" },
  { label: "AI agents vs RPA", href: "/compare/ai-agents-vs-rpa" },
  { label: "Partner-led vs in-house AI", href: "/compare/partner-led-vs-in-house-ai" },
  { label: "AI employees vs chatbots", href: "/compare/ai-employees-vs-chatbots" },
];

const COMPANY: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact us", href: `mailto:${siteConfig.email}` },
  { label: "Privacy policy", href: "/privacy" },
];

/** Review and launch profiles; entries with no URL yet are skipped. */
const FIND_US: FooterLink[] = [
  { label: "G2 reviews", href: siteConfig.profiles.g2 ?? "", external: true },
  { label: "Product Hunt", href: siteConfig.profiles.productHunt, external: true },
  { label: "LinkedIn", href: siteConfig.profiles.linkedin, external: true },
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

const Column = ({
  title,
  links,
  extra,
}: {
  title: string;
  links: FooterLink[];
  /** Optional trailing item that isn't a link, e.g. the cookie settings button. */
  extra?: React.ReactNode;
}) => (
  <nav aria-label={title}>
    <h2 className="text-[0.6875rem] font-semibold uppercase tracking-widest opacity-60">{title}</h2>
    <ul className="mt-3 space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.label}>
          <FooterAnchor {...link} />
        </li>
      ))}
      {extra && <li>{extra}</li>}
    </ul>
  </nav>
);

/**
 * Footer — dark band with a brand blurb and the two actions as pills (Book a
 * bootcamp, Sign in; links styled as buttons, since they navigate), five link
 * columns (Product, How we work, Industries, Company, Find us — G2 / Product
 * Hunt / LinkedIn / YouTube from `siteConfig.profiles`), then the oversized
 * pixel wordmark and the legal line.
 */
export const SiteFooter = () => (
  <footer
    className="relative isolate overflow-hidden border-t border-background/15 bg-foreground bg-cover bg-bottom text-white"
    style={{ backgroundImage: "var(--field-1)" }}
  >
    <div className="shell relative grid grid-cols-2 gap-x-6 gap-y-10 pt-14 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
      <div className="col-span-2 max-w-xs lg:col-span-1">
        <Link href="/" aria-label="Xura home" className="inline-flex min-h-11 min-w-11 items-center">
          <XuraLogo markOnly />
        </Link>
        <p className="mt-4 text-sm leading-relaxed opacity-70">
          AI employees, workflows and apps, custom-built by our team on your
          systems, with you approving every step.
        </p>
        <address className="mt-4 text-sm not-italic leading-relaxed opacity-60">
          {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}, {siteConfig.address.country}
        </address>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={TALK_URL} className="pill pill-inverse justify-center whitespace-nowrap max-sm:w-full">
            Talk to us <span aria-hidden>→</span>
          </Link>
          <a
            href={siteConfig.signinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill justify-center whitespace-nowrap bg-transparent max-sm:w-full text-background ring-1 ring-background/30 hover:bg-background/10"
          >
            Sign in <span aria-hidden className="opacity-60">↗</span>
          </a>
        </div>
      </div>
      <Column title="Product" links={PRODUCT} />
      <Column title="How we work" links={HOW_WE_WORK} />
      <Column
        title="Industries"
        links={INDUSTRIES.map((i) => ({ label: i.label, href: `/industries/${i.slug}` }))}
      />
      <Column
        title="Company"
        links={COMPANY}
        extra={<CookieSettingsButton className={`${linkClass} -my-3 inline-flex min-h-11 items-center`} />}
      />
      <Column title="Find us" links={FIND_US} />
    </div>
    <div className="shell relative">
      {/* Mobile: keep the flat oversized wordmark, cropped by the page edge. */}
      <p
        aria-hidden
        className="mt-8 select-none text-center font-bold leading-[0.8] tracking-[-0.04em] md:hidden"
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

    <p className="shell py-4 text-center text-xs uppercase tracking-widest opacity-50">
      © {new Date().getFullYear()} {siteConfig.legalName} · All rights reserved
    </p>
  </footer>
);
