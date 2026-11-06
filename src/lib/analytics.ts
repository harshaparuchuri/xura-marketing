// 📖 Docs: obsidian/frontend/components/common.md

type EventParams = Record<string, string>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: EventParams) => void;
  }
}

/**
 * Send a GA4 event. A no-op when gtag isn't loaded (no `NEXT_PUBLIC_GA_ID`, or
 * the visitor hasn't consented), so consent is respected by construction.
 * Never pass personal data (names, emails, phone numbers) in `params`.
 */
export const trackEvent = (name: string, params?: EventParams) => {
  window.gtag?.("event", name, params);
};

/** Maps a link to the event it should fire; `null` means it isn't tracked. */
export const classifyLink = (
  url: URL,
  demoPath: string,
): { event: string; cta?: string } | null => {
  if (/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname)) return { event: "whatsapp_click" };
  if (url.hostname === "app.xuralabs.com") {
    return url.searchParams.get("tab") === "signup"
      ? { event: "cta_click", cta: "signup" }
      : { event: "sign_in_click" };
  }
  if (url.origin === window.location.origin && url.pathname === demoPath) {
    return { event: "cta_click", cta: "demo" };
  }
  return null;
};
