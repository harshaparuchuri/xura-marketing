---
tags: [frontend, stable]
updated: 2026-08-09
---

# Catalog — Sections

Files in `src/components/sections/` — full-width page bands composed into views
under `src/views/`. Home order: `Hero → DomainsStrip → Features → WhatsApp →
XuraVs → CaseStudy → Journal → Testimonial → EnterpriseReady → ClosingCta →
SiteFooter`. (`Values` was dropped 2026-08-10 — its three cards duplicated
`WhatsApp` and `XuraVs` pitches; the file remains for possible reuse.)

Conventions: [[component-conventions]]. Copy tone: WhatsApp / mobility first
(see [[changelog]] 2026-08-09).

| File | Role |
|------|------|
| `site-nav.tsx` | Top nav, transparent over hero gradient. Primary CTA `Start on WhatsApp`. |
| `hero.tsx` | Serif+sans mixed H1 over sky→sand gradient, animated canvas backdrop behind (`HeroBackdrop`). Screenshot slot `data-slot="hero-device"`. |
| `domains-strip.tsx` | Dark band, "One layer across every team you onboard" eyebrow, single-line infinite marquee of 8 domain labels (react-spring `useSpring` loop on a doubled track; 60 px/s). Edges softened with a horizontal `mask-image` fade so labels dissolve at both ends. |
| `features.tsx` | **Rewritten 2026-08-10** — reframed around one-time setup + knowledge graph: Connect once over MCP → Understand every shape of data → One live knowledge graph → Sync seamlessly. Numbers removed from the list. Visual slot renders the animated light-theme `KnowledgeGraph` (data sources → Xura hub → dashboards & actions, spring-driven flowing dashes + orb pulse). |
| `whatsapp.tsx` | **New (2026-08-09)** — dedicated WhatsApp/mobility band on `#whatsapp`. Slot `whatsapp-thread`. |
| `xura-vs.tsx` | **New (2026-08-10)** — dark comparison band on `#why-xura`. 6-row table (Data access, Business context, Output, Actions, Memory, Security) contrasting ChatGPT/Claude vs Xura. Responsive stacked pairs on mobile, 3-col grid on md+. |
| `values.tsx` | Textured sand band; three values re-cast as "meet teams where they are". |
| `case-study.tsx` | **Reframed 2026-08-10** — pharma/life-sciences narrative ("How Xura AI is transforming pharma and life sciences"). Now uses a duotone-treated photograph (`/public/case-study-pharma-v2.jpg` — the Pexels QC-vials shot, deliberately distinct from the microscope hero used in the Industries carousel to avoid the "same photo twice on the same page" feel) via `next/image` with `mix-blend-luminosity` + a `from-duo-soft/40 to-duo/60 mix-blend-color` overlay. CTA links to `/industries/pharma`. **Home order 2026-08-11:** moved from directly after Industries to below EnterpriseReady (`… Industries → EnterpriseReady → CaseStudy → ClosingCta`); section padding restored to the standard `py-16 md:py-20` since it no longer needs to hug the band above it. Still placeholder narrative — replace with a permissioned customer reference before launch. |
| `trial-form.tsx` | **Rewritten 2026-08-11 (client-direct, hard-coded endpoint).** Client component (`"use client"`). Free-trial form with the same field shape xuralabs.com uses (`firstName`, `lastName`, `email`, `jobTitle`, `company`, `teamSize`, `useCase`, `dataStack`) plus `source: "trial-page"` and ISO `ts` stamped at submit. Consumer email domains blocked inline. Blur validation on required fields; on-input re-validation once a field has erred. Submits directly to the Google Apps Script Web App URL **hard-coded** as `SHEETS_URL` in the component (same public URL xuralabs.com submits to) using the exact xuralabs double-submit: `new Image().src = URL + "?" + params` (GET beacon) *and* `fetch(URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) })`. Success renders the "You're in" state with a **Setup now →** pill linking to `https://app.xuralabs.com/`. No env vars — the project ships as a static-friendly GitHub-hosted site with no environment layer; to redirect submissions to a different sheet, deploy your own Apps Script and edit the one `SHEETS_URL` constant. Rationale for bypassing `app/api/**`: see [[meta/decisions-log|ADR-0020]]. |
| `whatsapp.tsx` | **2026-08-11 — rebranded to mobile-first, not WhatsApp-only.** Eyebrow, headline, supporting paragraph, benefit list and CTAs now emphasise both surfaces (mobile web app + WhatsApp), not just WhatsApp. Placeholder `Duotone variant="portrait"` swapped for a real `next/image` at `/public/whatsapp-mockup.png` (three-phone composite: WhatsApp thread, mobile web sign-in, dark analytics dashboard). Container widened to `max-w-lg` to fit the composite. Rendered with `next/image` in `unoptimized` mode (the original PNG bytes are served — Next's WebP/AVIF pass was flattening the mockup) at the source's native 1685×1342 dimensions, `priority`, and a soft `drop-shadow-[0_18px_36px_rgba(15,23,42,0.18)]` for depth against the mist band. File is `/public/whatsapp-mockup-v2.png` (renamed from `whatsapp-mockup.png` to bust the CDN/browser image cache). |
| `industries.tsx` | **2026-08-10 — now client (`"use client"`) with auto-rotate.** Same two-column layout: left rail carries eyebrow + display headline + duotone-treated hero photograph (supporting paragraph dropped to keep the rail height aligned with the right-rail list); right rail is a divider-row list of every entry in `src/data/industries.ts`. Every `CYCLE_MS` (5s) an interval advances `active`, which (a) fades between per-industry `heroImage`s in the left rail (5 stacked `next/image` fills, opacity crossfade), (b) highlights the matching row in the right rail with a `bg-duo-wash/60` wash, and (c) runs a `@react-spring/web useSpring` duration-tween (0→1 over `CYCLE_MS`) that fills a thin progress bar along the image's bottom edge. The whole row is now a single `next/link` into `/industries/{slug}` — clicking anywhere on the row navigates; the timer jumps to that industry on `onMouseEnter`/`onFocus` instead of on click, so hovering previews the image without stealing the click. A carousel variant was tried and reverted the same day — the flat list reads better as a scan. |
| `journal.tsx` | Placeholder posts — replace or drop before launch. |
| `testimonial.tsx` | Placeholder quote — replace with permissioned customer. |
| `enterprise-ready.tsx` | **New (2026-08-10)** — dark trust band on `#enterprise-ready`. Trust-surface only (data privacy, zero raw data, RBAC, HITL, explainability, revocability). Feature parity vs LLMs lives in [[XuraVs]]; integration breadth lives in [[Features]] — do NOT restate them here. |
| `values.tsx` | **Retired from home 2026-08-10** — file kept for possible reuse; three cards duplicated `WhatsApp` + `XuraVs` pitches. |
| `closing-cta.tsx` | Mist band; single centred question + `Start on WhatsApp` pill. |
| `site-footer.tsx` | Accent band, oversized wordmark clipped at page edge; industries row. |

## Industry pages

`src/views/industry.tsx` + `src/views/industries-index.tsx` compose the
`/industries/[slug]` and `/industries` routes. All copy comes from
[`src/data/industries.ts`](../../../src/data/industries.ts). Adding a new
industry: add a record with `slug`, `label`, `headline`, `problem`,
`useCases`, `scenario`, `cta` — the route and nav pick it up automatically.
Each record also carries a `heroImage` (path under `/public/industries/`)
and `heroImageAlt` — the solution band on `industry.tsx` renders this as a
duotone-treated `next/image` (2026-08-10; replaces the previous `Duotone`
placeholder). The same image is used by the home carousel
([[#Sections and bands|`industries-carousel.tsx`]]).
Screenshot slot: `data-slot="industry-<slug>-solution"` (now wrapped around
the real photograph).

## Screenshot slots

Real assets drop against `data-slot` attributes. Current keys: `hero-device`,
`features-visual`, `whatsapp-thread`.
