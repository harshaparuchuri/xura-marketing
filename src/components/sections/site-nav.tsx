import Link from "next/link";

import { XuraLogo } from "@/components/brand/logo";

// Docs live in a separate repo (xuradocs) so the same content can back
// both the marketing site and in-product help. Currently on Mintlify's
// default subdomain; swap to https://docs.xuralabs.com once the custom
// domain + CNAME are live.
const DOCS_URL = "https://xura.mintlify.site/introduction/welcome";

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Product", href: "/#features" },
  { label: "Industries", href: "/industries" },
  { label: "Docs", href: DOCS_URL, external: true },
  { label: "Why Xura", href: "/#why-xura" },
];

/**
 * Top navigation — wordmark left, links centred, dual CTAs on the right
 * ("Start Free Trial" dark-outlined → fills on hover; "Sign in"
 * dark-filled). Matches xuralabs.com.
 * Transparent over the page gradient.
 */
export const SiteNav = () => (
  <header className="relative z-20">
    <nav className="shell flex items-center justify-between gap-6 py-5">
      <Link href="/" aria-label="Xura AI home">
        <XuraLogo />
      </Link>

      <ul className="hidden items-center gap-7 md:flex">
        {LINKS.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-xs text-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <Link
          href="/trial"
          className="hidden rounded-full border border-foreground px-4 py-1.5 text-xs font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-foreground hover:text-background sm:inline-flex"
        >
          Start Free Trial
        </Link>
        <Link
          href="https://app.xuralabs.com"
          className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-85"
        >
          Sign in
        </Link>
      </div>
    </nav>
  </header>
);
