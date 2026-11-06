"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is on (or within `rootMargin` of) the screen. An
 * element hidden with `display: none` never intersects, so looping work gated
 * on this also stops in the unused breakpoint variant of a component.
 */
export const useInViewport = (
  ref: RefObject<Element | null>,
  rootMargin = "100px",
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
};
