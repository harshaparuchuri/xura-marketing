"use client";

import { useEffect, useRef } from "react";

/**
 * CalendlyStep — step 3 of the demo form: Calendly's inline scheduler,
 * prefilled with the visitor's name and email. The widget script loads only
 * when this step mounts (same click-to-load idea as ADR-0024), so the page
 * pays nothing for Calendly until someone reaches it. Calls `onBooked` with
 * the scheduled event's URI when Calendly posts `calendly.event_scheduled`.
 */
type CalendlyApi = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: { name?: string; email?: string };
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyMessage = {
  event?: string;
  payload?: { event?: { uri?: string } };
};

const loadScript = () =>
  new Promise<void>((resolve, reject) => {
    if (window.Calendly) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Calendly failed to load")), { once: true });
    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });

export const CalendlyStep = ({
  url,
  name,
  email,
  onBooked,
}: {
  url: string;
  name: string;
  email: string;
  onBooked: (eventUri: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    // Prefill via query params (Calendly reads `name` and `email`) as well as
    // the widget's `prefill` option, so the details always carry over.
    const params = new URLSearchParams({
      hide_gdpr_banner: "1",
      // Hides the event header card (host, title, duration) — the page
      // around the embed already says what this is.
      hide_event_type_details: "1",
      name,
      email,
    });
    const widgetUrl = `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return;
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: widgetUrl,
          parentElement: containerRef.current,
          prefill: { name, email },
        });
      })
      .catch(() => {
        // Leave the fallback link below visible if the script can't load.
      });
    return () => {
      cancelled = true;
    };
  }, [url, name, email]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<CalendlyMessage>) => {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event === "calendly.event_scheduled") {
        onBooked(event.data.payload?.event?.uri ?? "");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onBooked]);

  return (
    <div>
      <div
        ref={containerRef}
        className="h-[40rem] min-w-[18rem] overflow-hidden rounded-xl border border-line bg-band-mist"
      >
        <p className="p-6 text-sm text-muted">
          Loading available times…{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Open the calendar in a new tab
          </a>
        </p>
      </div>
    </div>
  );
};
