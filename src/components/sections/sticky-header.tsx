"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * StickyHeader — keeps the site nav pinned to the top of the viewport.
 *
 * The nav is rendered inside each page's hero section, which clips its
 * overflow, so `position: sticky` can't escape the hero. Instead the header
 * is `fixed`, and a same-height spacer keeps the hero layout unchanged.
 * Transparent over the hero; once the page scrolls it gets a frosted
 * background and a hairline border (simple discrete state → CSS transition,
 * token-timed, per the motion rules).
 */
export const StickyHeader = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div aria-hidden className="h-[4.5rem]" />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-[var(--duration-normal)] ease-entrance ${
          scrolled
            ? "border-line bg-background/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        {children}
      </header>
    </>
  );
};
