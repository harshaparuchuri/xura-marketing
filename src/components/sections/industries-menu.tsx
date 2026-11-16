"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { NavDropdown } from "@/components/sections/nav-dropdown";
import { INDUSTRIES, industryFocus } from "@/data/industries";

/**
 * "Industries" mega-menu: the industries with their focus line on the left,
 * a photo on the right that follows the hovered/focused item (opacity
 * crossfade), and "All industries" to the /industries hub.
 */
export const IndustriesMenu = ({ linkClass }: { linkClass: string }) => {
  const [active, setActive] = useState(0);

  return (
    <NavDropdown label="Industries" id="industries-menu" linkClass={linkClass}>
      {(close) => (
        <div className="shell grid gap-8 py-10 lg:grid-cols-[1fr_26rem]">
          <div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    onClick={close}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`block rounded-2xl p-4 text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-line-soft ${i === active ? "bg-line-soft" : ""}`}
                  >
                    <span className="block text-lg font-light tracking-tight">{ind.label}</span>
                    <span className="mt-1 block text-sm text-muted">{industryFocus(ind)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/industries" onClick={close} className="mt-4 inline-block px-4 text-sm text-foreground underline underline-offset-4">
              All industries →
            </Link>
          </div>
          <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-foreground lg:block">
            {INDUSTRIES.map((ind, i) => (
              <Image
                key={ind.slug}
                src={ind.photo.src}
                alt=""
                fill
                sizes="26rem"
                className={`object-cover transition-opacity duration-[var(--duration-normal)] ease-entrance ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      )}
    </NavDropdown>
  );
};
