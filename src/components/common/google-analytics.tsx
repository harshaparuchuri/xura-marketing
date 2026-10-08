// 📖 Docs: obsidian/frontend/components/common.md
import { publicEnv } from "@/env";

/**
 * Google Analytics 4 (gtag.js). Rendered inside `<head>` by the root layout so
 * the standard Google tag ships in the static HTML `<head>` of every page.
 * Plain `<script>` tags (not `next/script`, which defers injection into the
 * body) so GA's tag checker and Search Console see it. Renders nothing when
 * `NEXT_PUBLIC_GA_ID` is unset (e.g. local dev).
 */
export function GoogleAnalytics() {
  const gaId = publicEnv.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
        }}
      />
    </>
  );
}
