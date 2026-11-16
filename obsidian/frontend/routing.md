---
tags: [frontend, stable]
updated: 2026-05-21
---

# Routing

Next.js 16 App Router. The defining convention: **routes delegate to views**.

> [!warning]
> Per `AGENTS.md`, this version of Next.js may differ from older knowledge. Heed
> deprecation notices before writing routing code.

## Route → View delegation

`app/**/page.tsx` files contain **no UI logic**. They import a component from
`src/views/` and render it. ADR: [[decisions-log]] ADR-0003.

```tsx
// src/app/page.tsx
import { HomeView } from "@/views/home";

export default function Home() {
  return <HomeView />;
}
```

All layout and UI logic lives in `src/views/home.tsx` (`HomeView`). The view is
a **Server Component**; isolate any client-only animation in a leaf component —
see [[component-conventions]] hard rule #6. `HomeView` currently ships **empty**:
if the project is empty and no other instructions are provided, start developing
here on route `/` (see [[ai-agent-guide]] / [[new-page]]).

## Current routes

| Route | File | View |
|-------|------|------|
| `/` | `src/app/page.tsx` | `views/home.tsx` → `HomeView` |
| `/industries` | `src/app/industries/page.tsx` | `views/industries-index.tsx` → `IndustriesIndexView`. **Restyled 2026-11-15:** short dark `FlowField` hero with `SiteNav overDark` + dark `Breadcrumbs`; 4:5 `PhotoFill` cards per industry (first workflow, label, focus); a "Don't see your industry?" card with the bootcamp CTA; dark closing. Kept as the breadcrumb parent and broad-search hub; also reached from the nav `IndustriesMenu`. |
| `/platform` | `src/app/platform/page.tsx` | `views/platform.tsx` → `PlatformView` (ADR-0037): hero → Connect → Ask and act → Outputs rail → Apps (`#apps`) → Flows (`#flows`) → Where it works → Built for trust (`#trust`) → closing. Sections in `components/sections/platform/`, copy in `src/data/platform.ts`. Linked from the nav `PlatformMenu` dropdown, mobile menu and footer. |
| `/apps` | `src/app/apps/page.tsx` | `views/apps.tsx` → `AppsView` (ADR-0040): `PageHero` + `HiringAppPreview` → `AppsSteps` → `AppsAnatomy` → `AppsExamples` → `AppsCompare` (`sections/apps/apps-sections.tsx`) → `FaqSection` → `CtaBand`. Copy in `src/data/apps.ts`. |
| `/deployment` | `src/app/deployment/page.tsx` | `views/deployment.tsx` → `DeploymentView` (ADR-0040): `PageHero` → `DeploySteps` → `DeployLead` → `DeployBootcamp` (`#bootcamp`) → `DeployHosting` (`#hosting`: Xura cloud / your VPC / on premises) → `DeployWhy` (`sections/deployment/deployment-sections.tsx`) → `FaqSection` → `CtaBand`. Copy in `src/data/deployment.ts`. |
| `/ai-employees`, `/workflows`, `/integrations`, `/security`, `/ai-transformation`, `/bootcamp` | `src/app/{slug}/page.tsx` | `views/subpages.tsx` (ADR-0041): `PageHero` → shared `feature-sections` (Steps/Grid/Cards/Compare) → `FaqSection` → `CtaBand`. Copy + meta in `src/data/subpages.ts`. |
| `/industries/[slug]` | `src/app/industries/[slug]/page.tsx` | `views/industry.tsx` → `IndustryView` (SSG via `generateStaticParams`; data in `src/data/industries.ts`). **Redesigned 2026-11-15 (ADR-0036)** to the home system: full-bleed `PhotoFill` hero from `industry.photo` with `SiteNav overDark` and `Breadcrumbs tone="dark"`; problem as a hairline 2-column list; solution on a dark `FlowField` band; `useCases` as a scroll rail ("What we'd build first", `RailNav`); scenario stats as large numbers on a grey band; dark closing. Title "AI Transformation for {label}". No employee orbs/colours (`employees` and `EMPLOYEE_ACCENT` are no longer rendered here; `routine-timeline.tsx` is now unused). |
| ~~`/pricing`~~ | *(hidden 2026-11-14, ADR-0034 — route file removed)* | `views/pricing.tsx` → `PricingView` kept unrouted: engagement steps (`ENGAGEMENT_STEPS`) + Starter/Growth/Custom platform plans + FAQ. Data in `src/data/pricing.ts`. Restore by re-adding `src/app/pricing/page.tsx` plus the sitemap, nav and footer entries. |
| `/privacy` | `src/app/privacy/page.tsx` | `views/privacy.tsx` → `PrivacyView` — privacy policy, content in `data/privacy.ts`. Plain static legal layout (H1, last-updated, contents nav, one `<section>` per heading); footer Company column + sitemap link here. Policy statements are commitments: keep them true as the product changes (ADR-0030). |
| `/trial` | `src/app/trial/page.tsx` | `views/trial.tsx` → `TrialView` — the **Book a 2-day bootcamp** page (`siteConfig.demoUrl`; reworded from "Book a demo" 2026-11-14, ADR-0033), modelled on viktor.com/contact-sales: no nav/footer (logo home link only), dark proof panel left (Nora, 3-step agenda, verified claims), form right. `TrialForm` is two steps (three when `siteConfig.calendlyUrl` is set: + inline Calendly "Pick a time"): work email → details; step 1 sends a partial lead (`stage: "email"`), step 2 the full lead (`stage: "details"`), both to the Google Apps Script URL. Success links to `/#how-we-deploy`; the page footer links existing customers to `siteConfig.signinUrl` |

## Special files

`src/app/` carries the App Router special files:

| File | Role |
|------|------|
| `layout.tsx` | Root layout — provider tree, font, `metadata` + `viewport`, JSON-LD |
| `loading.tsx` | Suspense fallback — its presence enables streaming |
| `error.tsx` | Route-segment error boundary (Client Component) |
| `not-found.tsx` | 404 page — served with a 404 status. Own metadata (`Page not found`, `noindex`), nav + footer, a curious `AiOrb`, and links to Home / Pricing / Industries / Start free pilot |
| `robots.ts` / `sitemap.ts` | Generate `/robots.txt` and `/sitemap.xml` — see [[seo-metadata]] |
| `api/<resource>/route.ts` | API endpoints (Route Handlers) — see [[api-architecture]] |

## Adding a route

1. Create `src/app/<route>/page.tsx` — keep it ~3 lines, delegate to a view.
2. Create `src/views/<route>.tsx` — the actual page component.
3. Use route groups `app/(feature)/` to scope feature pages without affecting the URL.
4. Follow the [[new-page]] playbook.

## Layouts

- `src/app/layout.tsx` — the **root layout**. Holds the provider tree
  (`ScrollLayout` → `AdaptiveGrid` / `ReducedMotion` / `Cookie` → children),
  loads the Onest font and `globals.css`, exports `metadata` + `viewport`, and
  renders the JSON-LD script. See [[data-flow]].
- Reusable layout *wrappers* (not route layouts) live in `src/layouts/` —
  e.g. [[smooth-scroll|ScrollLayout]].

## Navigation

Use **standard Next.js navigation** — `<Link>` from `next/link` and `useRouter`
from `next/navigation`. ADR: [[decisions-log]] ADR-0005.

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
```

> [!note]
> Earlier drafts of `generic-layout-prompt.md` referenced `<AnimLink>` /
> `useAnimRouter()`. Those were never built and the convention is dropped — use
> `next/link` directly.

## SEO per route

Each route exports `metadata` via the shared generator — see [[seo-metadata]].

## Related

[[system-overview]] · [[component-conventions]] · [[new-page]]

| `/use-cases`, `/use-cases/[slug]`, `/compare/[slug]` | `src/app/use-cases/…`, `src/app/compare/[slug]/page.tsx` | `views/content-pages.tsx` (ADR-0046): `UseCasesIndexView`, `UseCaseView`, `CompareView`. Copy in `data/use-cases.ts` and `data/compare.ts`; static params from those arrays; all in the sitemap. |
