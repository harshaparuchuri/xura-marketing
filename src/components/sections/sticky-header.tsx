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
 * `--nav-paper`. The tone comes from an IntersectionObserver band under the
 * header (no per-frame layout reads). Discrete state → CSS colour transition, token-timed.
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
    // Scrolled flag: cheap scrollY read, rAF-throttled, state set only on change.
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Dark-section detection: an IntersectionObserver on a thin band just
    // under the header (4.5rem) — no per-frame elementsFromPoint/style reads.
    // rootMargin only takes px/% — build a 2px band at the header's bottom
    // edge (4.5rem), rebuilt on resize.
    const dark = new Set<Element>();
    let io: IntersectionObserver | null = null;
    const observe = () => {
      io?.disconnect();
      dark.clear();
      const top = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.5;
      const bottom = Math.max(0, window.innerHeight - top - 2);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) dark.add(e.target);
            else dark.delete(e.target);
          }
          setDarkBelow(dark.size > 0);
        },
        { rootMargin: `-${top}px 0px -${bottom}px 0px` },
      );
      document.querySelectorAll("section.text-background").forEach((el) => io?.observe(el));
    };
    observe();
    window.addEventListener("resize", observe);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", observe);
      io?.disconnect();
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
              ? "border-background/10 bg-foreground/35 backdrop-blur-md backdrop-saturate-150"
              : "border-foreground/5 bg-background/55 backdrop-blur-md backdrop-saturate-150"
        }`}
      >
        {children}
      </header>
    </>
  );
};
