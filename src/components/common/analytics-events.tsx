"use client";
// 📖 Docs: obsidian/frontend/components/common.md

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { classifyLink, trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

/**
 * Site-wide GA4 interaction tracking. One delegated click listener classifies
 * links by destination, so new CTAs are tracked without per-link wiring.
 * `location` is the nearest section id, or header/footer. Renders nothing.
 */
export const AnalyticsEvents = (): null => {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const match = classifyLink(new URL(link.href), siteConfig.demoUrl);
      if (!match) return;

      const area = link.closest("section[id], header, footer");
      trackEvent(match.event, {
        ...(match.cta ? { cta: match.cta } : {}),
        location: area?.id || area?.tagName.toLowerCase() || "page",
        page: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (pathname.replace(/\/$/, "") === "/pricing") trackEvent("pricing_view");
  }, [pathname]);

  return null;
};
