"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

/**
 * StickyHeader — keeps the site nav pinned to the top of the viewport.
 *
 * The nav is rendered inside each page's hero section, which clips its
 * overflow, so `position: sticky` can't escape the hero. Instead the header
 * is `fixed`, and a same-height spacer keeps the hero layout unchanged.
 *
 * Adaptive glass (owner, 2026-11-16: a solid white bar read as loud): at the
 * top it's transparent; once scrolled it's a light frosted glass over light
 * sections and a dark frosted glass over dark ones (any `<section>` with
 * `text-background`), with the nav ink flipping via `--nav-ink` /
 * `--nav-paper`. The tone is read from the section under the header on
 * scroll. Discrete state → CSS colour transition, token-timed.
 */
export const StickyHeader = ({
  children,
  overDark = false,
}: {
  children: ReactNode;
  /** Hero behind the nav is dark: nav ink is white until scrolled. */
  overDark?: boolean;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [darkBelow, setDarkBelow] = useState(overDark);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      // What sits just under the header? (Header is 4.5rem tall.)
      const y = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.5 + 2;
      const below = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !el.closest("header"));
      setDarkBelow(!!below?.closest("section")?.classList.contains("text-background"));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const dark = scrolled ? darkBelow : overDark;

  return (
    <>
      <div aria-hidden className="h-[4.5rem]" />
      <header
        style={dark ? ({ "--nav-ink": "var(--background)", "--nav-paper": "var(--foreground)" } as CSSProperties) : undefined}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-[var(--duration-normal)] ease-entrance ${
          !scrolled
            ? "border-transparent bg-transparent"
            : dark
              ? "border-background/10 bg-foreground/35 backdrop-blur-xl backdrop-saturate-150"
              : "border-foreground/5 bg-background/55 backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        {children}
      </header>
    </>
  );
};
