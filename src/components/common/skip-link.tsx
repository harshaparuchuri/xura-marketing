"use client";

/**
 * SkipLink — the first focusable element on every page. Hidden until focused
 * (keyboard Tab), then a pill top-left. Jumps to the page's `<h1>`, not
 * `<main>`: the site nav sits inside each hero, inside `<main>`, so a `#main`
 * target would not skip it. Focuses the heading (tabindex -1) so the next Tab
 * continues from the page content (focus scrolls it into view).
 */
export const SkipLink = () => (
  <a
    href="#main-heading"
    onClick={(e) => {
      const h1 = document.querySelector<HTMLElement>("main h1");
      if (!h1) return;
      e.preventDefault();
      h1.tabIndex = -1;
      h1.focus();
    }}
    className="pill pill-inverse sr-only z-60 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-2 focus:outline-offset-2 focus:outline-foreground"
  >
    Skip to content
  </a>
);
