import Link from "next/link";

import { XuraLogo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site";

// Docs live in a separate repo (xuradocs) so the same content can back
// both the marketing site and in-product help. Currently on Mintlify's
// default subdomain; swap to https://docs.xuralabs.com once the custom
// domain + CNAME are live.
const DOCS_URL = "https://xura.mintlify.site/introduction/welcome";

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "AI employees", href: "/#ai-employees" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: DOCS_URL, external: true },
];

const linkClass =
  "text-sm text-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground";

const NavLink = ({ label, href, external }: (typeof LINKS)[number]) =>
  external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label}
      <span aria-hidden className="ml-0.5 text-[0.7em]">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );

/**
 * Top navigation — wordmark left, links centred, CTAs right: "Book a demo"
 * filled primary (always shown) and "Get started for free" outlined (lg+;
 * in the mobile menu below that). No separate
 * Sign in — the app's auth page (Get started) has both tabs.
 * A 1fr · auto · 1fr grid keeps the links on the true page centre
 * regardless of the logo and CTA widths.
 * Below `md` the links collapse into a native `<details>` menu (no JS).
 * Transparent over the page gradient.
 */
export const SiteNav = () => (
  <header className="relative z-20">
    <nav
      aria-label="Main"
      className="shell grid grid-cols-[1fr_auto] items-center gap-6 py-5 md:grid-cols-[1fr_auto_1fr]"
    >
      <Link href="/" aria-label="Xura AI home" className="justify-self-start">
        <XuraLogo />
      </Link>

      <ul className="hidden items-center gap-7 md:flex">
        {LINKS.map((link) => (
          <li key={link.label}>
            <NavLink {...link} />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 justify-self-end">
        <a
          href={siteConfig.demoUrl}
          className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-85"
        >
          Book a demo
        </a>
        <a
          href={siteConfig.signupUrl}
          className="hidden rounded-full border border-foreground px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-foreground hover:text-background lg:inline-flex"
        >
          Get started for free
        </a>

        {/* Mobile menu */}
        <details className="group relative md:hidden">
          <summary
            aria-label="Menu"
            className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-background [&::-webkit-details-marker]:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
            </svg>
          </summary>
          <ul className="absolute right-0 top-11 w-52 space-y-1 rounded-2xl border border-line bg-background p-3 shadow-product">
            {LINKS.map((link) => (
              <li key={link.label} className="px-2 py-1.5">
                <NavLink {...link} />
              </li>
            ))}
            <li className="border-t border-line px-2 pt-2.5">
              <a href={siteConfig.signupUrl} className={linkClass}>
                Get started for free
              </a>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  </header>
);
