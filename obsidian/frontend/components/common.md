---
tags: [frontend, stable]
updated: 2026-10-18
---

# Catalog — Common Components

Files in `src/components/common/` — shared infrastructure that may depend on
providers. Conventions: [[component-conventions]].

## Cookie consent — EU/UK only (`cookie-banner.tsx` + `google-analytics.tsx`)

**2026-11-04.** Replaces the old `Cookie/` system (no longer in the repo). No
third-party library. Region comes from the browser timezone (static site, no
server geolocation): `CONSENT_REGION_TZ` = every `Europe/*` zone plus
EU/EEA Atlantic islands. Deliberately broad, but VPNs and travel can fool it.

| Export | Role |
|------|------|
| `GoogleAnalytics` (`google-analytics.tsx`) | Inline `<head>` script defining `window.xuraLoadAnalytics()` (injects gtag.js once). Loads GA when the stored choice is `"granted"`, or when there's no choice and the timezone is outside `CONSENT_REGION_TZ`. Never loads on `"denied"`. Renders nothing without `NEXT_PUBLIC_GA_ID`. |
| `CONSENT_KEY` | localStorage `"xura-analytics-consent"` — `"granted"` \| `"denied"`; absent = undecided. |
| `CONSENT_REGION_TZ` | Timezone regex for the consent region. |
| `CookieBanner` (client) | Auto-opens only for undecided EU/UK-timezone visitors. "Cookie settings" / "We use cookies to analyze site traffic. Learn more" (→ `/privacy#cookies`). "Allow all" → `granted` + load GA; "Allow necessary" → `denied`, reload if GA was running. Spring slide-up. Mounted in `app/layout.tsx`. |
| `CookieSettingsButton` | Footer "Cookie settings" (Company column) — reopens the banner for anyone, so non-EU visitors can opt out too. |

Verified on the static export (2026-11-04): Europe/Berlin and Europe/London
show the banner and load no GA until "Allow all"; Asia/Kolkata and
America/New_York load GA with no banner, and opting out via the footer stops
it after reload. See ADR-0031.

## Grid — adaptive scaling (`grid/`)

The **adaptive scaling grid** keeps a rem-based layout proportional across every
viewport by scaling the root (`<html>`) font-size. Design in `rem` once, and the
whole UI scales as one unit. Lives in `src/components/common/grid/`.

| File | Role |
|------|------|
| `grid.config.ts` | Breakpoints + `FONT_BASE` — the single source of truth for the grid |
| `adaptive-grid.tsx` | `<AdaptiveGrid>` client component — drives the scale-up, renders `null` |
| `index.ts` | Barrel exports — `AdaptiveGrid`, `GRID_BREAKPOINTS`, … |

**How it works** — two halves cover the whole viewport range:

- **Scale down** (viewport ≤ 1440px) — `vw`-based `html { font-size }` media
  queries in `globals.css`. At each breakpoint's design base width the root
  font-size resolves to 16px; between breakpoints it tracks the viewport.
- **Scale up** (viewport > 1440px) — the `<AdaptiveGrid>` component sets an
  inline `html` font-size at runtime via [[hooks|`useAdaptiveGrid`]], so the
  design keeps growing on large displays. Root layout mounts it with `coef={1}`
  for fully proportional scale-up, so 1440–1920px laptops (previously in a
  shrink-valley) and 4K desktops both grow from a 16px root.

The `globals.css` media queries and `grid.config.ts` describe the same
breakpoints — **keep them in sync** (formula: `font-size = 16 * 100 / baseWidth vw`).

**Mounting** — the root layout renders `<AdaptiveGrid />` inside `ScrollLayout`:
```tsx
import { AdaptiveGrid } from "@/components/common/grid";
```
Mount it once. Props: `baseWidth` (defaults to the largest breakpoint) and
`coef` (0–1 scale-up damping, default `0.6666`; root layout overrides to `1`).

> [!note]
> This replaced a `styled-components`-based scaling system that was dropped into
> `common/` — see [[decisions-log]] ADR-0008. `styled-components` is **not** a
> project dependency; the scale-down CSS lives in `globals.css` per [[design-system]].

## ShotCrop — `shot-crop.tsx`

Server component. Shows one region of a product screenshot: `crop={{x,y,w,h}}`
in fractions (0–1) of the source image (default 2880×1800, the captures in
`public/assets/product/`). The wrapper takes the crop's aspect ratio; the `next/image`
is scaled and offset inside it with inline `%` styles (computed, not tokens).
No chrome, no motion — callers add rings/shadows and wrap it in `Inview` /
`SpringTrigger`. Used by the product "stages" in `HowItWorks`, `Agents`,
`Outputs`. (Replaced the short-lived `ProductShot` browser-frame component,
removed 2026-10-04 — plain framed screenshots were rejected as too flat.)

## ReducedMotion — `reduced-motion.tsx`

`<ReducedMotion>` — a client leaf that calls react-spring's `useReducedMotion()`.
It watches the `prefers-reduced-motion` media query and toggles react-spring's
global `skipAnimation`, so every spring — and `spring-text-engine` — jumps to its
end state instead of animating. Renders `null`; mounted once in the root layout.
See [[animation-system]] and [[seo-metadata]].

## GoogleAnalytics — `google-analytics.tsx`

Server component rendered inside `<head>` in `app/layout.tsx`, so GA4
(gtag.js) ships in the static `<head>` of every page as plain `<script>` tags
— not `next/script`, which defers injection into the body. Reads
`NEXT_PUBLIC_GA_ID` from `publicEnv` (validated as `G-…`); renders nothing when
unset, so dev/preview builds don't track.

## AnalyticsEvents — `analytics-events.tsx`

Client leaf in `app/layout.tsx` (renders nothing) that sends GA4 events through
`trackEvent` in `src/lib/analytics.ts`. That helper is a no-op until gtag has
loaded, so consent rules carry over. Never send personal data in event params.

| Event | Fires when | Params |
|---|---|---|
| `generate_lead` | Demo form details submitted (`trial-form.tsx`) | `form` |
| `demo_booked` | Calendly booking confirmed (`trial-form.tsx`) | none |
| `cta_click` | Click to `siteConfig.demoUrl` or the app signup URL | `cta` (`demo`/`signup`), `location`, `page` |
| `sign_in_click` | Click to `app.xuralabs.com` without `tab=signup` | `location`, `page` |
| `whatsapp_click` | Click to `wa.me` / `whatsapp.com` | `location`, `page` |
| `pricing_view` | `/pricing` opened, including client-side navigation | none |

Links are classified by destination in one delegated listener, so new CTAs need
no wiring. Sign-ups complete on the app domain, so `cta_click` with
`cta=signup` measures intent, not completed sign-ups.

## Skeleton loaders

Three skeleton components for `loading` states of async-data components — every
async component must mirror its final layout with one of these
(see [[component-conventions]]).

| Component | File | For |
|-----------|------|-----|
| `<SkeletonImage>` | `skeleton-image.tsx` | image placeholders |
| `<SkeletonLoader>` | `skeleton-loader.tsx` | generic block placeholders |
| `<SkeletonVideo>` | `skeleton-video.tsx` | video placeholders |

## Breadcrumbs — `breadcrumbs.tsx`

Server component. `<Breadcrumbs crumbs={[{ name, path }]} />` renders a
visible `nav[aria-label="Breadcrumb"]` trail (the last crumb has
`aria-current="page"`) and the matching `BreadcrumbList` JSON-LD. Used on
pricing, the industries index and the industry pages. Links have a ≥40px
tap area (`min-h-10`, negative `-my-2` to keep the row compact). See [[seo-checklist]].

## VideoTour — `video-tour.tsx`

Click-to-load YouTube embed (client leaf). Shows the video's YouTube thumbnail
(`next/image`, unoptimised under static export) with a play button; the
`youtube-nocookie.com` iframe mounts only on click, so the YouTube player never
loads with the page. Emits its own `VideoObject` JSON-LD. Props: `videoId`,
`title`, `description`, `uploadDate`, `duration` (ISO 8601), `className`.
Used in `sections/ai-employees.tsx` as `#tour` ("Meet your AI team", 1:38);
the hero's "Watch the tour" pill links to `/#tour`.

> [!note]
> `components/ui/` (design-system primitives) does not exist yet — create it when
> the first primitive is added. See [[folder-structure]].

## Related

[[component-conventions]] · [[components/animation-springs]]
