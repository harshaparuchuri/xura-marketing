import Link from "next/link";

import { XuraLogo } from "@/components/brand/logo";
import { IndustriesMenu } from "@/components/sections/industries-menu";
import { HowMenu, PlatformMenu } from "@/components/sections/platform-menu";
import { StickyHeader } from "@/components/sections/sticky-header";
import { INDUSTRIES } from "@/data/industries";
import { HOW_MENU, PLATFORM_MENU } from "@/data/platform";
import { siteConfig } from "@/lib/site";
import { TALK_URL } from "@/components/common/cta-pair";

// Extra top-level links after the menus. Docs moved to the footer only
// (owner, 2026-11-16); add entries here to bring a plain link back.
const LINKS: { label: string; href: string; external?: boolean }[] = [];

type MenuLink = { label: string; href: string };
const flat = (cols: readonly (readonly MenuLink[])[]) => cols.flat().map(({ label, href }) => ({ label, href }));

/** Phone menu: every page, grouped like the desktop mega-menus. */
const MOBILE_GROUPS: { title: string; links: MenuLink[] }[] = [
  { title: "Platform", links: flat(PLATFORM_MENU.columns) },
  { title: "How we work", links: flat(HOW_MENU.columns) },
  {
    title: "Industries",
    links: [...INDUSTRIES.map((i) => ({ label: i.label, href: `/industries/${i.slug}` })), { label: "All industries", href: "/industries" }],
  },
];

// Ink comes from `--nav-ink` (set by StickyHeader over dark heroes),
// falling back to the foreground colour.
const linkClass =
  "text-[0.9375rem] font-medium text-[color:var(--nav-ink,var(--foreground))] opacity-80 transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-100";

const NavLink = ({ label, href, external, className = "" }: (typeof LINKS)[number] & { className?: string }) =>
  external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} ${className}`}>
      {label}
      <span aria-hidden className="ml-0.5 text-[0.7em]">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={`${linkClass} ${className}`}>
      {label}
    </Link>
  );

/**
 * Top navigation — wordmark and links left, CTAs right: "Talk to us"
 * filled primary (always shown) and "Sign in" outlined (lg+;
 * in the mobile menu below that). No separate
 * Sign in — the app's auth page (Get started) has both tabs.
 * Links sit left, right after the logo (auto · 1fr · auto grid at md+).
 * Below `md` the links collapse into a native `<details>` menu (no JS).
 * Pinned to the top via StickyHeader: transparent over the hero, frosted
 * once the page scrolls.
 */
export const SiteNav = ({ overDark = false }: { overDark?: boolean }) => (
  <StickyHeader overDark={overDark}>
    <nav
      aria-label="Main"
      className="shell grid h-[4.5rem] grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[auto_1fr_auto] md:gap-10"
    >
      <Link href="/" aria-label="Xura AI home" className="flex min-h-11 items-center justify-self-start text-[color:var(--nav-ink,var(--foreground))]">
        <XuraLogo />
      </Link>

      <ul className="hidden items-center gap-8 justify-self-start md:flex">
        <li>
          <PlatformMenu linkClass={linkClass} />
        </li>
        <li>
          <HowMenu linkClass={linkClass} />
        </li>
        <li>
          <IndustriesMenu linkClass={linkClass} />
        </li>
        {LINKS.map((link) => (
          <li key={link.label}>
            <NavLink {...link} />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 justify-self-end">
        <a
          href={TALK_URL}
          className="rounded-full bg-[color:var(--nav-ink,var(--foreground))] px-4 py-2 text-sm font-semibold text-[color:var(--nav-paper,var(--background))] transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-85"
        >
          Talk to us
        </a>
        <a
          href={siteConfig.signinUrl}
          className="hidden rounded-full border border-[color:var(--nav-ink,var(--foreground))] px-4 py-2 text-sm font-semibold text-[color:var(--nav-ink,var(--foreground))] transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-80 lg:inline-flex"
        >
          Sign in
        </a>

        {/* Mobile menu */}
        <details className="group relative md:hidden">
          <summary
            aria-label="Menu"
            className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-background text-foreground [&::-webkit-details-marker]:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
            </svg>
          </summary>
          <div className="absolute right-0 top-11 max-h-[calc(100svh-6rem)] w-[min(20rem,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border border-line bg-background p-4 shadow-product [--nav-ink:var(--foreground)]">
            {MOBILE_GROUPS.map((g) => (
              <div key={g.title} className="border-b border-line pb-3 pt-1 not-first:pt-3">
                <p className="px-2 pb-1 text-xs font-medium text-muted">{g.title}</p>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex min-h-11 items-center rounded-lg px-2 text-[0.9375rem] text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-line-soft">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="pt-2">
              {LINKS.map((link) => (
                <li key={link.label} className="px-2">
                  <NavLink {...link} className="flex min-h-11 items-center" />
                </li>
              ))}
              <li className="px-2">
                <a href={siteConfig.signinUrl} className={`${linkClass} flex min-h-11 items-center`}>
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </nav>
  </StickyHeader>
);
