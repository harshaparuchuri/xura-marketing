"use client";

import Image from "next/image";
import Link from "next/link";

import { NavDropdown } from "@/components/sections/nav-dropdown";
import { PulseCrowd } from "@/components/graphics/pulse-preview";
import { BOOTCAMP_FEATURE, HOW_MENU, PLATFORM_MENU } from "@/data/platform";

type Item = { label: string; href: string; body: string };
type Menu = { columns: readonly (readonly Item[])[]; feature: typeof PLATFORM_MENU.feature | typeof BOOTCAMP_FEATURE };

/**
 * Mega-menu (Platform, How we work): two columns of links + a feature card
 * on the right — Xura Pulse (a coded crowd on ink) for Platform, the
 * bootcamp photo for How we work. (A hover-driven image per item was tried 2026-11-16 and
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
        {menu.feature.kind === "pulse" ? (
          <Link
            href={menu.feature.href}
            onClick={close}
            className="group hidden flex-col rounded-3xl bg-foreground p-6 text-background ring-1 ring-transparent transition-shadow duration-[var(--duration-fast)] ease-entrance hover:ring-pulse-yes lg:flex"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg font-light tracking-tight">{menu.feature.title}</span>
              <span className="rounded-full bg-background px-2 py-0.5 text-[0.625rem] font-semibold text-foreground">{menu.feature.tag}</span>
            </span>
            <span className="mt-1 block text-sm text-background/70">{menu.feature.body}</span>
            {/* A small live-run panel: count, crowd, tally. */}
            <span className="mt-5 block rounded-2xl bg-background/5 p-4 ring-1 ring-background/10">
              <span className="flex items-baseline justify-between text-xs">
                <span className="flex items-center gap-1.5 text-background/70">
                  <span className="size-1.5 rounded-full bg-pulse-yes" /> Live
                </span>
                <span>
                  <span className="text-base font-light">84</span> <span className="text-background/60">of 100 reacted</span>
                </span>
              </span>
              <PulseCrowd count={60} cols={15} className="mt-3" />
              <span className="mt-3 flex gap-3 text-[0.625rem] text-background/60">
                <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-pulse-yes" />49 keen</span>
                <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-pulse-maybe" />22 maybe</span>
                <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-pulse-no" />13 no</span>
              </span>
            </span>
            <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground">
              {menu.feature.cta}
              <span aria-hidden className="transition-transform duration-[var(--duration-fast)] ease-entrance group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ) : (
          <Link href={menu.feature.href} onClick={close} className="group hidden text-foreground lg:block">
            <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src={menu.feature.image.src} alt={menu.feature.image.alt} fill sizes="22rem" className="object-cover" />
            </span>
            <span className="mt-4 block text-lg font-light tracking-tight">{menu.feature.title}</span>
            <span className="mt-1 block text-sm underline underline-offset-4">{menu.feature.cta}</span>
          </Link>
        )}
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
