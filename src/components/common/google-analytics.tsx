// 📖 Docs: obsidian/frontend/components/common.md
import { publicEnv } from "@/env";

/** localStorage key holding the visitor's analytics choice ("granted" | "denied"). */
export const CONSENT_KEY = "xura-analytics-consent";

/**
 * Timezones treated as EU/UK (consent required before analytics): every
 * `Europe/*` zone plus EU/EEA Atlantic islands. Deliberately broad; a static
 * site has no server-side geolocation, so the browser timezone is the signal.
 */
export const CONSENT_REGION_TZ = /^(Europe\/|Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe))/;

/**
 * Google Analytics 4 (gtag.js) with region-aware consent. An inline `<head>`
 * script defines `window.xuraLoadAnalytics()` (injects gtag.js once) and
 * decides at first paint:
 *
 * - stored choice "granted" → load; "denied" → don't (any region);
 * - no choice + EU/UK timezone (`CONSENT_REGION_TZ`) → don't load; the
 *   `CookieBanner` asks first;
 * - no choice elsewhere → load as usual (no banner).
 *
 * Renders nothing when `NEXT_PUBLIC_GA_ID` is unset (e.g. local dev).
 */
export function GoogleAnalytics() {
  const gaId = publicEnv.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <script
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `(function(){
window.xuraLoadAnalytics=function(){
if(window.__xuraGa)return;window.__xuraGa=1;
var s=document.createElement('script');s.async=1;
s.src='https://www.googletagmanager.com/gtag/js?id=${gaId}';
document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];
window.gtag=function(){dataLayer.push(arguments);};
gtag('js',new Date());gtag('config','${gaId}');
};
var c=null,tz='';
try{c=localStorage.getItem('${CONSENT_KEY}');}catch(e){}
try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
if(c==='granted'||(c===null&&!${CONSENT_REGION_TZ.toString()}.test(tz)))window.xuraLoadAnalytics();
})();`,
      }}
    />
  );
}
