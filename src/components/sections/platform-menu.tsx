"use client";

import Image from "next/image";
import Link from "next/link";

import { NavDropdown } from "@/components/sections/nav-dropdown";
import { HOW_MENU, PLATFORM_MENU } from "@/data/platform";
import { siteConfig } from "@/lib/site";

type Item = { label: string; href: string; body: string };
type Menu = { columns: readonly (readonly Item[])[]; feature: typeof PLATFORM_MENU.feature };

/**
 * Mega-menu (Platform, How we work): two columns of links + a bootcamp
 * feature card. (A hover-driven image per item was tried 2026-11-16 and
 * reverted at the owner's request; items keep their `image` data unused.)
 */
const MegaMenu = ({ label, id, menu, linkClass }: { label: string; id: string; menu: Menu; linkClass: string }) => (
  <NavDropdown label={label} id={id} linkClass={linkClass}>
    {(close) => (
      <div className="shell grid gap-8 py-10 lg:grid-cols-[1fr_1fr_22rem]">
        {menu.columns.map((col, i) => (
          <ul key={i} className="space-y-2">
            {col.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-2xl p-4 text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-line-soft"
                >
                  <span className="block text-lg font-light tracking-tight">{item.label}</span>
                  <span className="mt-1 block text-sm text-muted">{item.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
        <a href={siteConfig.demoUrl} className="group hidden text-foreground lg:block">
          <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl">
            <Image src={menu.feature.image.src} alt={menu.feature.image.alt} fill sizes="22rem" className="object-cover" />
          </span>
          <span className="mt-4 block text-lg font-light tracking-tight">{menu.feature.title}</span>
          <span className="mt-1 block text-sm underline underline-offset-4">{menu.feature.cta}</span>
        </a>
      </div>
    )}
  </NavDropdown>
);

export const PlatformMenu = ({ linkClass }: { linkClass: string }) => (
  <MegaMenu label="Platform" id="platform-menu" menu={PLATFORM_MENU} linkClass={linkClass} />
);

/** "How we work" menu: AI transformation, bootcamp, deployment, use cases. */
export const HowMenu = ({ linkClass }: { linkClass: string }) => (
  <MegaMenu label="How we work" id="how-menu" menu={HOW_MENU} linkClass={linkClass} />
);
