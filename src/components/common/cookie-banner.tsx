"use client";
// 📖 Docs: obsidian/frontend/components/common.md

import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CONSENT_KEY, CONSENT_REGION_TZ } from "@/components/common/google-analytics";

/** Window event that reopens the banner (fired by the footer "Cookie settings"). */
export const OPEN_COOKIE_SETTINGS = "xura:cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    xuraLoadAnalytics?: () => void;
  }
}

const readChoice = (): Choice | null => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

const inConsentRegion = () => {
  try {
    return CONSENT_REGION_TZ.test(Intl.DateTimeFormat().resolvedOptions().timeZone ?? "");
  } catch {
    return false;
  }
};

/**
 * Cookie consent banner, shown automatically only to undecided visitors in
 * an EU/UK timezone (everyone else is tracked by default, see
 * `GoogleAnalytics`). Anyone can reopen it from the footer "Cookie settings".
 * "Allow all" loads GA4; "Allow necessary" stores the refusal and, if GA was
 * already running, reloads the page so it stops. Slides up with a spring.
 */
export const CookieBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readChoice() === null && inConsentRegion()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const style = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 0 : 24,
    config: { tension: 220, friction: 26 },
  });

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Storage blocked: the choice applies to this page view only.
    }
    setOpen(false);
    if (choice === "granted") window.xuraLoadAnalytics?.();
    // GA can't be unloaded from a running page; a reload drops it.
    else if ((window as Window & { __xuraGa?: number }).__xuraGa) window.location.reload();
  };

  return (
    <animated.section
      role="region"
      aria-label="Cookie consent"
      aria-hidden={!open}
      style={{
        ...style,
        pointerEvents: open ? "auto" : "none",
        visibility: style.opacity.to((o) => (o === 0 ? "hidden" : "visible")),
      }}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[46ch] rounded-2xl border border-line bg-background p-5 shadow-product sm:left-6 sm:right-auto"
    >
      <p className="text-sm font-semibold">Cookie settings</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        We use cookies to analyze site traffic.{" "}
        <Link href="/privacy#cookies" className="underline underline-offset-4">
          Learn more
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-85"
        >
          Allow all
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="rounded-full border border-foreground px-4 py-2 text-sm font-semibold transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-70"
        >
          Allow necessary
        </button>
      </div>
    </animated.section>
  );
};

/** Footer link that reopens the banner so visitors can change their choice. */
export const CookieSettingsButton = ({ className }: { className?: string }) => (
  <button
    type="button"
    onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
    className={className}
  >
    Cookie settings
  </button>
);
