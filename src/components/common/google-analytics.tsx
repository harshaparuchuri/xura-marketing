// 📖 Docs: obsidian/frontend/components/common.md
import Script from "next/script";

import { publicEnv } from "@/env";

/**
 * Google Analytics 4 (gtag.js). Rendered inside `<head>` by the root layout so
 * it ships on every page. Renders nothing when `NEXT_PUBLIC_GA_ID` is unset
 * (e.g. local dev), so no tracking happens without an explicit ID.
 */
export function GoogleAnalytics() {
  const gaId = publicEnv.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
