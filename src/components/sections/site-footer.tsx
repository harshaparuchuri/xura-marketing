import Link from "next/link";

import { XuraLogo } from "@/components/brand/logo";
import { PixelWordmark } from "@/components/graphics/pixel-wordmark";

import { INDUSTRIES } from "@/data/industries";

const LINKS: { label: string; href: string }[] = [
  { label: "Product", href: "/#features" },
  { label: "On WhatsApp", href: "/#whatsapp" },
  { label: "Industries", href: "/industries" },
  { label: "Start free trial", href: "/trial" },
];

/**
 * Footer — the loudest surface on the page: a full-bleed accent band carrying a
 * link row, the legal line, and an oversized wordmark clipped by the bottom
 * edge. Textured to match the values band.
 */
export const SiteFooter = () => (
  <footer className="texture relative isolate overflow-hidden bg-brand-ink text-white">
    <div className="shell relative">
      <ul className="flex flex-wrap items-center gap-5 pt-5 text-xs">
        <li className="mr-1">
          <Link href="/" aria-label="Xura home">
            <XuraLogo markOnly />
          </Link>
        </li>
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-60"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs opacity-80">
        <li className="mr-1 font-semibold uppercase tracking-wide opacity-70">
          Industries
        </li>
        {INDUSTRIES.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/industries/${i.slug}`}
              className="transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-60"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>

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
      © {new Date().getFullYear()} · All rights reserved
    </p>
  </footer>
);
