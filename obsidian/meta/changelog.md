---
tags: [meta, changelog]
updated: 2026-08-12
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

## 2026-08-12
- **Added GitHub Actions deploy workflow** — `.github/workflows/deploy.yml`
  builds `yarn build` and publishes `out/` to GitHub Pages on push to
  `main`. Custom domain `xuralabs.com` served via `public/CNAME`; no
  `basePath` needed. Requires **Settings → Pages → Source: GitHub Actions**
  in the `xura-marketing` repo (previously deployed from a branch).
- **Fork created: `Xura-Web-v2-static`** — sibling directory configured
  for GitHub Pages via `output: "export"`. Deleted `app/api/contact`,
  added `force-static` to icon/robots/sitemap, disabled image
  optimisation, added `public/CNAME` + `public/.nojekyll`. See
  ADR-0022. Upstream `Xura-Web-v2` remains full SSR.
- **Domain corrected to `xuralabs.com`** (was `xura.co`) after pulling
  the real CNAME from the current `xura-marketing` repo. Added
  `.env.production` with `NEXT_PUBLIC_SITE_URL=https://xuralabs.com`
  so sitemap, canonicals, robots, and JSON-LD all render the real
  origin.
- **Legacy assets carried over** to `public/legacy/logos/` and
  `public/legacy/industries/images/` from the old static site
  (later removed in the cleanup pass below).
- **Fork cleanup pass** — removed cruft, working tree from ~500 MB
  to 3.7 MB:
  - Deleted regenerable: `node_modules/`, `.next/`, `out/`,
    `tsconfig.tsbuildinfo`
  - Deleted the accidentally-copied `xura-marketing-main/` subtree
  - Removed `package-lock.json` (project standardises on `yarn.lock`)
  - Removed unused public assets: superseded `-v2` industry images,
    `case-study-pharma.jpg`, `whatsapp-mockup.png`,
    `public/legacy/*`, and all `.DS_Store`
  - Second pass on `public/`: dropped unused
    `assets/xura-mark.svg`, `illustrations/peep-sitting.svg`,
    `industries-supporting.jpg`, `favicon.ico`,
    `favicon-{16,32}x{16,32}.png` (superseded by the runtime
    `app/icon.tsx`), and `browserconfig.xml` (legacy IE pinned-site
    support). `public/` down to 2.5 MB.
  - Attempted `public/industries/*.html` redirect shims for the
    old `.html` URLs; Next static export overwrites them because
    `[slug]` renders to the same path. Reintroduce by switching
    `trailingSlash: true` if the old URL redirects are worth
    keeping.

- **Removed the cookie consent banner + Cookie module**
  (`components/common/Cookie/*`, `app/layout.tsx`). The site sets no
  analytics/tracking cookies; the only thing the banner ever stored
  was its own consent flag in localStorage, so the banner was
  ceremonial. GDPR strictly-necessary-only sites do not need a
  consent surface.
- **Hidden the Next.js dev "N" indicator** via
  `devIndicators: false` in `next.config.ts`. Dev-only overlay
  regardless; badge no longer floats over the preview.




- **Hero headline set to** (`sections/hero.tsx`)
  "The intelligence layer for leaders, *one chat away.*" — second
  clause in italic-semibold.
- **Hero subtext trimmed** to: "Ask any business question on WhatsApp.
  Xura returns live answers, dashboards, and workflows you can run on
  the spot." (`sections/hero.tsx`). Also bumped its type scale from
  `text-sm` to `text-base` / `md:text-lg` and set `max-w` to `54ch`
  for a slightly heavier subhead block (revised down from an earlier
  `text-lg`/`text-xl` pass).
- **Hero CTA reduced to single "Start free trial" pill** with microcopy
  "1 Million tokens · No credit card required" stacked underneath;
  removed "Start on WhatsApp" and "See how it works" pills
  (`sections/hero.tsx`).
- **WhatsApp section — dropped the "Start on WhatsApp" pill**; only
  "Try the web app" remains (`sections/whatsapp.tsx`).
- **Nav "Why Xura" now anchors to the XuraVs section** (`#why-xura`)
  instead of the removed `#values` id (`sections/site-nav.tsx`).
- **Features section — dropped the "Try it on WhatsApp" pill**
  (`sections/features.tsx`); the trailing `Inview`+`Link` block and the
  now-unused `next/link` import are gone.
- **XuraVs comparison table** — Xura column header (and its mobile
  row label) relabelled to "Xura AI" (`sections/xura-vs.tsx`).
- **Closing CTA now routes to `/trial`** instead of the
  `mailto:hello@xuralabs.com` link (`sections/closing-cta.tsx`).
- **`HeroBackdrop` added to sector/industry hero sections**
  (`views/industries-index.tsx`, `views/industry.tsx`) — same
  wireframe animation used on the home hero, at
  `opacity-15` / `color="#059669"` / `scale=0.65`.
- **Local font renamed `grotesk` → `figtree`** (`app/layout.tsx`,
  `app/globals.css`) so the family surfaces as "Figtree" in devtools
  instead of the misleading auto-derived "grotesk" name — same
  underlying `Figtree-variable.woff2` file.
- **KnowledgeGraph mobile hub now renders the real animated `AiOrb`**
  (with eyes and emotion cycling) embedded via `<foreignObject>`,
  replacing the earlier static "X" fallback (`graphics/knowledge-graph.tsx`).
  Same avatar as the desktop docked orb; only shown on `<sm` where the
  flying dock is unreliable. The `<foreignObject>` is sized 2× the hub
  so the AiOrb's blurred halo isn't clipped to a hard square edge; a
  flex wrapper re-centres the orb inside. Orb mounts post-hydration
  (`mounted` state flipped in `useEffect`) so the SSR/CSR foreignObject
  trees match and Next stops flagging a hydration mismatch.
- **"Blog" link removed from top nav** (`sections/site-nav.tsx`) —
  external `blog.xuralabs.com` no longer surfaced.
- **"Start on WhatsApp" pill relabelled to "Start free trial"** in
  the closing CTA and the industry-page bottom CTA
  (`sections/closing-cta.tsx`, `views/industry.tsx`); both already
  point at `/trial`.

## 2026-08-11

- **Footer recoloured to brand green with yellow text.** `site-footer.tsx`
  now uses `bg-brand-ink text-accent` instead of `bg-accent`. Added
  `--raw-color-green-950: #00281b` (sampled from the Xura logo plate) and
  a Tier-2 `--brand-ink` role bound to `--color-brand-ink` in `@theme`.
  Text switched to `text-white` for readability on the deep-green plate.

- **Mobile pass round two — hero card + knowledge-graph hub.**
  1. `sections/hero.tsx` — replaced the earlier `hidden sm:block` on the
     `PromptGenerationCard` with a CSS `zoom` scaler: the whole
     desktop-styled device now renders on mobile at `zoom: 0.42`
     (revealing the real dashboard preview + charts) and snaps back to
     `zoom: 1` at `sm`. Layout scales as one piece so no interior
     overlap.
  2. `graphics/knowledge-graph.tsx` — added a static hub avatar (dark
     circle + accent-yellow "X" mark) inside the SVG at `HUB.cx/cy`,
     visibility-gated with `sm:hidden`. Fixes the empty centre on
     mobile where the docking AiOrb doesn't reliably land; on desktop
     the flying orb still springs in on top.
- **Mobile pass — audit at 320px and 375px, four fixes.**
  1. `views/trial.tsx` re-gridded to `grid-cols-[1fr_1fr] grid-rows-[auto_1fr]`
     with explicit `lg:col-start`/`lg:row-start` on each child so the form
     sits directly below the headline on mobile (previously users had to
     scroll past 4 trust cards to reach it). Also gave the trial `h1` a
     responsive `text-3xl sm:text-4xl md:text-5xl` in addition to the
     display-serif `clamp`.
  2. `sections/site-nav.tsx` — "Sign in" is now `hidden sm:inline-flex`
     so it disappears below the 640px breakpoint; only the primary
     "Start Free Trial" pill remains on narrow phones.
  3. `sections/whatsapp.tsx` — the "wherever you are" h2 now uses
     `max-w-[16ch] sm:max-w-2xl lg:max-w-none` instead of the flat
     `max-w-none`; wraps to balanced lines on mobile, spreads full-width
     on desktop as intended.
  4. `sections/hero.tsx` — the `PromptGenerationCard` hero visual is
     `hidden sm:block`; its absolute-positioned layers overlapped on
     320-375px viewports, so it is dropped from the mobile hero.
- **Trial form rewired to xuralabs's exact plumbing.** `TrialForm` now
  submits **client-direct** to the Google Apps Script Web App URL,
  **hard-coded** as `SHEETS_URL` in the component, using the same
  double-submit xuralabs.com uses today (an `Image().src` GET beacon
  and a `fetch(..., { mode: "no-cors" })` JSON POST). Consumer email
  domains blocked inline; `source: "trial-page"` and ISO `ts` stamped
  at submit; success renders the "You're in" panel with a **Setup now →**
  link to `https://app.xuralabs.com/`.
  `src/app/api/trial/route.ts` deleted; `TRIAL_ENDPOINT` removed from
  `src/env.ts` and `.env.example` — the project ships as a
  static-friendly GitHub-hosted site with no environment layer, and the
  URL is public by design. To redirect submissions, deploy a new Apps
  Script and edit the one constant. This intentionally waives
  [[architecture|AGENTS.md rule #9]] for this one form, see
  [[meta/decisions-log|ADR-0020]].

## 2026-08-10

- **Free-trial flow shipped.** New `/trial` page + `TrialView` +
  `TrialForm` client component + `app/api/trial/route.ts`. Field shape
  matches xuralabs.com's current form (`firstName`, `lastName`, `email`,
  `jobTitle`, `company`, `teamSize`, `useCase`, `dataStack`); zod
  validation server-side + email regex client-side; success state
  renders in-place. Server route forwards to a Google Apps Script Web
  App URL held in the new server env var `TRIAL_ENDPOINT` (same storage
  approach xuralabs.com uses today). `.env.example` and `src/env.ts`
  updated. Site nav, whatsapp band, industry hero, and footer CTAs now
  point at `/trial` instead of `/#cta`.
- **No em dashes swept across the site.** 27 lines cleaned across
  `src/data/industries.ts`, `src/components/sections/**`, `src/views/**`
  and `src/app/**` — comments left alone (a small Python pass skipped
  block/line comments and JSDoc). Rule persists in memory as
  `feedback_no_em_dashes.md`.
- **House style: no em dashes in site copy.** Stripped em dashes from
  the whatsapp band (headline, benefit title, benefit body, supporting
  paragraph) and case-study body added this session. Applies going
  forward to any user-facing string in `src/components/**`,
  `src/views/**`, `src/data/**` and page metadata; use commas, colons,
  or split into two sentences instead.
- **WhatsApp band reframed as mobile-first (web + WhatsApp).**
  `sections/whatsapp.tsx` no longer sells WhatsApp exclusively — eyebrow
  ("Mobile web · WhatsApp · On the go"), headline ("… wherever you
  are"), supporting paragraph, the "Mobile web or WhatsApp — your call"
  benefit, and the two pill CTAs (Try the web app + Start on WhatsApp)
  all cover both surfaces. Placeholder `Duotone variant="portrait"` is
  replaced by a real `next/image` at `/public/whatsapp-mockup.png` (the
  three-phone composite: WhatsApp thread + mobile web sign-in + dark
  analytics dashboard). The mockup file needs to be dropped into
  `/public/` before the section will render the image; until then Next
  falls back to broken-image.
- **Industry hero files renamed to bust the image cache.** Files under
  `/public/industries/` are now `{slug}-v2.jpg`; the `heroImage` paths
  in `src/data/industries.ts` follow. Needed because the earlier
  overwrite kept identical URLs, so browsers and Next's image optimizer
  kept serving the previous (off-topic) xuralabs.com content.
- **Industry hero images swapped to the Pexels set from xuralabs's own repo.**
  The Unsplash ID lookup I used yielded an off-topic image for pharma (car
  showroom). Replaced all five with the Pexels images xuralabs.com already
  ships (per its `CREDITS.txt`) — scientist + microscope for pharma, laptop
  team for saas, trading dashboard for fintech, doctor for healthcare,
  factory line for manufacturing. Files bumped to `{slug}-v3.jpg` to bust
  the browser/CDN image cache; `heroImage` paths in `src/data/industries.ts`
  updated to match.
- **Sector-appropriate hero images + visible timer.** The five
  `/public/industries/{slug}.jpg` files were re-sourced from Unsplash so
  each one clearly reads as its vertical (microscope for pharma, laptop
  code for saas, trading charts for fintech, doctor+stethoscope for
  healthcare, factory line for manufacturing) — the xuralabs.com set
  drifted off-topic (fintech was a robotics scene). The Industries
  progress bar now fills with `bg-accent` (yellow-400) over a
  `bg-black/25` track so it reads clearly against the light duotone
  photograph, replacing the earlier `bg-background` white-on-light.
- **Industries section becomes auto-rotating.** Same two-column layout,
  now client (`"use client"`). A `setInterval` advances an `active`
  index every 5s; the left rail crossfades between per-industry
  `heroImage`s (five stacked `next/image` fills, opacity-only) and a
  `@react-spring/web useSpring` duration-tween fills a thin progress bar
  along the image's bottom edge. The active row in the right rail
  highlights (`bg-duo-wash/60`); clicking any row jumps `active`; the
  `→` beside each label is still a `next/link` into the deep-dive page
  (click stops propagation).
- **Industries carousel tried and reverted, same day.** A spring-driven
  carousel (`sections/industries-carousel.tsx`) was built and shipped
  briefly, then reverted to the flat two-column list layout. Carousel
  file removed. The list now links each row's label into
  `/industries/{slug}`.
- **Industry data gains per-vertical hero imagery.** `Industry` type in
  `src/data/industries.ts` grows `heroImage` + `heroImageAlt`; every
  entry now points at a photograph under `/public/industries/{slug}.jpg`
  (Pharma, SaaS, Fintech, Healthcare, Manufacturing — all sourced from
  xuralabs.com). `views/industry.tsx` swaps the `Duotone` placeholder in
  the solution band for a `next/image` of the same hero photograph, kept
  on-brand with `mix-blend-luminosity` + a
  `from-duo-soft/40 to-duo/60 mix-blend-color` overlay.
- **Home reshuffled: Journal + Testimonial retired, Industries added.**
  New `sections/industries.tsx` slots into the home view between
  `CaseStudy` and `EnterpriseReady`. Two-column band: left rail with
  eyebrow + display headline + supporting copy + a duotone-treated
  supporting photograph (`/public/industries-supporting.jpg`); right
  rail is a divider-row list of every entry in `src/data/industries.ts`
  (`label · intro · headline stat`). No click-through — the per-vertical
  pages under `app/industries/[slug]` remain the deep dive.
- **Case study now uses a real duotone photograph.** `case-study.tsx`
  swaps the SVG `Duotone` for `next/image` pointing at
  `/public/case-study-pharma.jpg` (sourced from xuralabs.com), wrapped
  in a `bg-duo` container with `mix-blend-luminosity` on the image and a
  `from-duo-soft/40 to-duo/60 mix-blend-color` overlay so it reads as
  the same blue duotone treatment. CTA now links to
  `/industries/pharma`. Narrative reframed earlier the same day to
  pharma / life sciences.
- **Case study reframed to pharma / life sciences (earlier same day).**
  `Duotone` gains a `"molecule"` variant (bonded-atom cluster in the
  standard duotone treatment); no longer used by `case-study.tsx` but
  kept for reuse.
- **Docking orb: `AiHelpAgent` flies into `KnowledgeGraph` on scroll.**
  New `useOrbDock` Zustand store (`src/hooks/use-orb-dock.ts`) carries a
  viewport-space target rect. `KnowledgeGraph` publishes its centre slot
  when the section is >35% in view (IntersectionObserver + scroll/resize
  listeners), and clears it when out of view. `AiHelpAgent` is now a
  client component: measures its resting rect and drives a `useSpring`
  translate+scale from bottom-right to the docked slot. The graph SVG
  no longer draws its own centre orb; it renders a soft glow ring plus
  an invisible slot rect. Also: real brand marks now render inside the
  DATA SOURCES tiles (Salesforce, HubSpot, Snowflake, Slack, Postgres,
  Notion) via `foreignObject`, and layout constants moved to a `VB`
  table so tiles no longer overflow the viewBox.
- **`KnowledgeGraph` reworked as a light-theme animation.** Now a
  three-tier pipeline (Data Sources ▸ Xura hub ▸ Dashboards & Actions)
  mirroring xuralabs.com's motion. Uses two `useSpring` loops:
  strokeDashoffset flow on connector lines + opacity/scale pulse on the
  orb glow. No CSS keyframes (per animation rules). `Features` drops
  the `Duotone` frame in favour of a `bg-band-mist/50` panel.
- **Copy polish across new sections.** Numbers dropped from `Features`
  list; em dashes purged from Features, XuraVs, and EnterpriseReady
  copy (replaced with commas or semicolons per project style).
- **`Features` reframed around one-time setup + knowledge graph.**
  Title now "One-time setup. A living knowledge graph across every source."
  Copy emphasises MCP + 50+ native integrations, structured/semi/unstructured
  data (Excel → Snowflake → SAP), a single live graph with prioritised
  entities, and continuous sync post-setup. Visual slot replaced with a new
  `KnowledgeGraph` SVG component
  (`src/components/graphics/knowledge-graph.tsx`) — 4 source nodes → Xura hub →
  4 business entities, with P0 / P1 priority pills on the ranked entities.
- **Home dedup pass.** `EnterpriseReady` slimmed 9 → 6 items (dropped
  "One-time setup" and "50+ integrations" — those live in `XuraVs` /
  `Features`); chips trimmed 9 → 7. `Values` section removed from the
  home view (its three cards duplicated `WhatsApp` + `XuraVs`
  pitches); file retained for possible reuse.
- **New `EnterpriseReady` section — dark trust band.** Placed between
  `Testimonial` and `ClosingCta` on the home view. Two columns: a
  pitch + credibility-chip cluster (SSO/SAML, RBAC, SOC 2, GDPR, VPC
  deploy, data residency, zero training, approval gates, audit logs)
  on the left; 9 assurance items on the right — covering data privacy
  at source, one-time setup, 50+ native integrations, RBAC honoured
  everywhere, explainability, zero raw data stored, revocability, and
  human-in-the-loop. Lives at `src/components/sections/enterprise-ready.tsx`.
- **New `XuraVs` section — Xura vs generic LLMs comparison.** Dark band
  between `WhatsApp` and `Values` on the home view. 6-row comparison
  (Data access, Business context, Output, Actions, Memory, Security)
  contrasting ChatGPT/Claude with Xura. Responsive: stacked pairs on
  mobile, 3-column grid on md+. Entrance motion via `Inview` springs;
  Xura column soft-tinted with `--accent`. Rendered in
  `src/components/sections/xura-vs.tsx` and wired into
  `src/views/home.tsx`.
- **`PromptGenerationCard` — left app rail + integrations panel + light workflow.**
  Card now shows a persistent left navigation rail (`AppRail`) mirroring the
  real Xura product (Home / Projects / Team / Risks / Analytics / Docs +
  Sparks / Compose at the bottom); traffic-light dots removed. Workflow
  scene rebuilt light-themed with a single `N` node-geometry table so SVG
  arrow endpoints anchor exactly to node edges, plus a right-side
  `IntegrationsPanel` listing 9 real brand marks (Gmail, WhatsApp, Slack,
  Salesforce, HubSpot, Notion, Google Sheets, Jira, GitHub) — new
  `SlackMark`, `HubSpotMark`, `NotionMark`, `GSheetsMark`, `JiraMark`,
  `GithubMark` added inline. Dashboard scene rebuilt with a title/subtitle
  header, AI insight banner, 4-KPI strip, and a bar + donut chart row
  (chart types inspired by an external reference; colours stay on
  `--duo` / `--accent` / `--foreground` / `--band-mist` tokens).
  Research scene fills the full canvas width and gains a two-column body
  with an inline "renewal odds by onboarding depth" chart. Hero device
  width tuned twice: 63rem → 57rem (net +15%, −10% today).
- **Workflow arrows + integrations refinements.** Node geometry retuned
  so the flow lives within viewBox x ≤ 528 (no overlap with the panel);
  arrow endpoints, sub-tool dashed lines, and branch labels
  (high / med / exec) all re-anchored to correct box edges. Integrations
  panel narrowed to `w-[28%]`, gained a search field, 2-line entries
  (name + hint), 2 extra apps (Postgres, Anthropic) and a "View all →"
  footer so it fills top-to-bottom.
- **Favicon = Xura logo, rounded.** New `src/app/icon.tsx` renders the
  logo asset via `next/og`'s `ImageResponse` with `borderRadius: 14`,
  so the browser-tab icon matches the in-app rail mark. Old
  `src/app/favicon.ico` deleted AND the `icons` block removed from
  `generate-page-metadata.ts` (it was still pointing at the legacy
  `public/favicon-*.png` figure logos, overriding the new route).
- **Hero gradient extended, AI orb shrunk.** Both `Hero`'s top gradient
  wrapper and the `HeroBackdrop` canvas switched to `absolute inset-0`
  (were fixed 46rem / 60rem heights) so they fill the entire section
  down to the next dark band, with gradient stops re-tuned
  (`duo-wash 20%`, `background 50%`, `band-sand-soft 70%`, `band-sand 100%`) so
  the tinted wash covers the copy, backdrop, and device card down to
  where it meets the next section's dark band with a full sand ribbon.
  `AiHelpAgent`'s `AiOrb` dropped from `size={72}` → `61` (−15%).
- **`PromptGenerationCard` scene-transition flash eliminated.**
  Hold-timer now batches `setSceneIdx + setPhase("typing") + setTyped("")`
  in one tick (React 18 auto-batches) so the useTransition key falls to
  `null` in the same render the scene index advances — the leaving scene
  no longer briefly overlays the incoming one during the crossfade. KPI
  strip in `DashboardScene` gained `shrink-0` so the tiles keep their
  full padding without the sankey squeezing them.
- **Real Xura mark in the rail; sankey un-stretched; arrows fixed.**
  `AppRail` now renders `<XuraLogo markOnly>` instead of the placeholder
  "X" glyph. `SankeyMini`'s `preserveAspectRatio` switched from `none`
  → `xMidYMid meet` (nodes and labels no longer distort). Workflow
  `nodeStyle` now emits explicit `height: pct(N.h,"y")` so HTML box
  centres line up with SVG arrow endpoints — resolves the broken
  router → VP / exec connectors. The "12 runs · 0 failures" pill moved
  from the top-right (where it overlapped the integrations panel) to a
  bordered chip at `bottom-3 left-3` on the dot grid.
- **Dashboard gets a Sankey.** Charts row switched to `h-[9.5rem]
  shrink-0`; a new `SankeyMini` (Priority → Status → Owner ribbon flow,
  tokens only) is appended below and deliberately overflows the 16:9
  canvas to hint at further scroll content.



- **`PromptGenerationCard` scenes redesigned** — hero device widened +15%
  (`max-w-3xl` → `max-w-[55rem]`) and canvas aspect switched 16:10 → 16:9. Slides scene is now
  a real editor: numbered thumbnail rail + 16:9 canvas with client-branded
  KPIs and a live bar chart + inspector. Research scene rebuilt as a
  Word-document layout (customer logo header, serif title, KPI strip, key
  insights, ghost body lines, page footer). Workflow scene rebuilt as an
  n8n-style agentic flow diagram on a dark dot-grid canvas: Monday trigger
  → Sales Digest Agent (Anthropic / Postgres / Salesforce sub-nodes) →
  risk router → Gmail / Gmail / WhatsApp outputs, with real brand marks
  inlined as SVG and SVG bezier connectors. All motion still spring-based;
  no new deps.
- **`.claude/launch.json`** — switched dev-server runtime from `yarn` to
  `npm run dev` (yarn isn't installed on this machine). Tooling-only.

## 2026-08-09

- **Animated wireframe hero backdrop** ported from the Xura app's post-login
  home. `HeroBackdrop` (`src/components/graphics/hero-backdrop.tsx`) is a
  client component — pure canvas + rAF, no deps, honours
  `prefers-reduced-motion`. Rendered inside `Hero` at `opacity-35` behind the
  copy. Pre-baked forms: `torusKnot` (default), `coinStack`, `helix`.
  ADR-worthy exception to the "all motion is spring-based" rule: this is a
  low-level canvas animation with no DOM-visible transform to spring; the
  existing rule targets React/DOM motion, not `<canvas>` rendering.
- **Hero device swapped to `PromptGenerationCard`** — reuses the light
  ProductCard styling, adds a top prompt-bar that types a user question,
  then cross-fades to one of four generated outputs (dashboard / slides /
  research / workflow) beneath it. Output stage is a FIXED-height container
  (22rem, 24rem md+) so the surrounding layout never shifts. Cycles through
  all four scenes automatically. All motion is spring-based (`useTransition`
  cross-fade; typing is a state-driven interval). Previous dark
  `WorkflowCard` retained in `src/components/graphics/workflow-card.tsx`
  for potential reuse. `ProductCard` also retained.
- **Site nav CTAs aligned with xuralabs.com** — links now Product /
  Industries / Why Xura / Blog; right side pairs a bordered "Sign in"
  (→ `https://app.xuralabs.com`) with a filled "Start Free Trial"
  (→ `/#cta`). Removes the old text-arrow CTA.
- **`DomainsStrip` upgraded to a single-line marquee** — infinite side-scroll
  driven by `react-spring`'s `useSpring({ loop: true })` on a doubled label
  track, so labels wrap seamlessly. Speed is 60 px/s (constant velocity via
  `config.duration` derived from the measured track width; `ResizeObserver`
  re-derives on viewport change). No CSS keyframes were needed — stays
  within ADR-0002. Same behaviour on mobile and desktop.
- **`DomainsStrip` section** added between `<Hero />` and `<Features />` —
  dark band with "One layer across every team you onboard" eyebrow + row of
  8 domain labels (Marketing / Product / Finance / Operations / People /
  Revenue / Success / Sales). Mirrors the same section on xuralabs.com.
- **AiOrb promoted to site-wide "AI help agent"** — new wrapper
  `src/components/graphics/ai-help-agent.tsx` renders the orb as a floating
  bottom-right widget (`fixed`, `md+` only) and is mounted once in
  `src/app/layout.tsx`. Removed from the hero.
- **AiOrb (expressive face)** ported from the Xura app's mobile shell into
  `src/components/graphics/ai-orb.tsx` + `ai-orb.css`. Auto-cycles through
  10 emotions (calm/happy/curious/excited/surprised/focused/wink/alert/chill/
  eureka) at large sizes, with 3D spin, blink, halo pulse and per-emotion
  body/eye shape morphs. Placed in the hero at 112px, top-right. Pure CSS —
  no canvas. See ADR-0019.
- **Peep sitting illustration** replaced by AiOrb (kept the SVG in
  `public/illustrations/peep-sitting.svg` for future use).
- **Typefaces switched to Bitter + Figtree.** `Newsreader` → **Bitter**
  (`next/font/google`) for the display serif; `Inter` → **Figtree** variable,
  self-hosted from `src/fonts/Figtree-variable.woff2` via `next/font/local`,
  for sans / UI. CSS variables `--font-serif-display` and `--font-grotesk`
  unchanged, so no downstream style edits.
- **Wordmark renamed to "Xura AI"** in `XuraLogo` (nav) and the oversized
  footer wordmark. Image mark unchanged.
- **Industry pages added** (`/industries` index + `/industries/[slug]` for
  `pharma`, `saas`, `fintech`, `healthcare`, `manufacturing`). Content sourced
  from xuralabs.com/industries/*.html and re-cast in the WhatsApp/mobility
  voice. Structure: `IndustryView` (`src/views/industry.tsx`) is data-driven
  from `src/data/industries.ts`; the dynamic route uses
  `generateStaticParams` so all five pre-render at build. Index page uses
  `IndustriesIndexView`. Nav gained an `Industries` link, footer gained a
  per-industry row. Site-nav hash links rewritten to `/#anchor` so they work
  from any route.
- **Home copy refreshed from xuralabs.com; WhatsApp/mobility promoted to
  primary tone.** Hero, features, values, case-study, testimonial, closing
  CTA, nav and footer rewritten to lean on "ask on WhatsApp, get the answer,
  on the move." Feature steps re-mapped to xuralabs' Connect → Ask → Deliver
  → Learn. New `<WhatsApp />` section added between `<Features />` and
  `<Values />` and inserted into `src/views/home.tsx`. Screenshot slots are
  marked with `data-slot="…"` (`hero-device`, `features-visual`,
  `whatsapp-thread`) so real assets can drop in later.

## 2026-07-25

- **Released into the public domain (Unlicense)** — the starter now ships a root
  `LICENSE.md` carrying the [Unlicense](https://unlicense.org) and declares
  `"license": "Unlicense"` in `package.json`. Anyone may copy, modify, sell, or
  redistribute it with **no attribution requirement and no copyright retained** —
  the intent being that projects built from this starter can absorb it wholesale
  without carrying a notice. Briefly authored as MIT in the same session and
  changed before any release; the MIT attribution clause was the specific thing
  being dropped, so a recognized no-attribution licence was chosen over an
  edited MIT text. `"private": true` is unchanged, so npm publishing stays
  blocked regardless — the licence governs redistribution of the source, not
  registry availability.

## 2026-07-24

- **`optimize-3d-scene` hardened from its first field run** — the skill was run
  on a real raw-WebGL scene (no three.js, no scroll) and eight gaps came back,
  ranked by the time each cost. Fixed in `SKILL.md` and `references/patterns.md`:
  **§0** now ships a `getContext` hook so a non-three.js scene has counted
  equivalents of `renderer.info` (`draws` / `verts` / `links[]` timestamps /
  captured `attrs`) — previously §0 was unexecutable there — plus the
  *measurement environment* rules that invalidate everything if missed
  (production build only: dev's eager chunks fake a §1 failure and Strict Mode's
  double-mount fakes 2 listeners and a halved fps; kill the stale server;
  `waitUntil: "load"`, since `networkidle0` never fires against `next start`;
  SwiftShader is not a GPU, so only counted quantities transfer). **§3** now
  states that **§1 breaks it** — `dynamic(ssr: false)` pushes compilation past
  hydration, measured at 5.0 s against a loader lifting at 2.36 s — and gains a
  fifth stall cause (CPU decode/parse → **Worker**, 3.9 s measured) and the
  `as="fetch"` preload credentials trap (only `use-credentials` + `include`
  dedupes; the others silently download twice). **§5** admits `1000/30` measures
  ~26 fps given the ticker's `<=` throttle. **§7** requires a decile ordering
  check before truncating a baked point buffer (one was spatially sorted —
  truncating would have deleted half the subject). **§13** splits canvas `lvh`
  from content `dvh`. **§1**'s poster is rejustified — crawler screenshots and
  the no-WebGL fallback, not layout stability — with two crops and the
  `headers()` → static-prerender (`○`→`ƒ`) trade-off named. Unchanged on
  purpose: the cheapest-first order, the canonical-file table, and "port, don't
  invent". ADR: [[decisions-log]] ADR-0017.
- **`optimize-3d-scene` skill registered in the vault** — the new skill at
  `.claude/skills/optimize-3d-scene/` is now a first-class part of the workflow
  set, documented in [[optimize-3d-scene]] and linked from the
  [[README|Map of Content]] and [[ai-agent-guide]].
  **Routing rule (AGENTS.md hard rule #11):**
  a performance / jank / pre-ship request on a project that renders a three.js
  or WebGL scene must invoke the skill and follow its fourteen-step order — no
  improvised fix list. The vault note also maps the skill's canonical patterns
  onto primitives the starter *already* ships, so nothing gets duplicated:
  `subscribeToTicker` (`src/lib/animation/ticker.ts`, ADR-0009) is the one
  app-wide rAF loop the skill's §4/§5 ask for, `isBot()` (`src/utils/is-bot.ts`,
  ADR-0010) is the §1 bot path, the Lenis scroll store is the §9/§10 scroll
  source, `useDynamicInView` is the §4 visibility gate, and `lvh.ts` covers §13
  sizing. Only device tiering (§2) has no local equivalent. The starter itself
  carries **no `three` dependency** ([[tech-stack]] unchanged) — this applies to
  projects built from it. ADR: [[decisions-log]] ADR-0016.
- **Fixed a broken path inside the skill** — its closing "write it down" step
  pointed at `obsidian/Meta/changelog.md` / `decisions-log.md` (capital `M`, and
  an `open-questions.md` that does not exist here), so an agent following it
  would have written to a non-existent folder. Rewritten against this vault's
  actual `obsidian/meta/` layout.
- **`ai-agent-guide` gained a Skills section** — how skills are registered
  (drop in `.claude/skills/<name>/`, add a `workflows/` note, link from the MoC
  and the skills table, log in the changelog), so the next skill follows the
  same path.

## 2026-07-17

- **README — one-prompt quick start** — added a copy-paste **⚡ Start in one
  prompt** block at the top of the README: a single prompt that has Claude Code
  (or Cursor) clone the starter, detach it from this repo's git history, read the
  vault first, and run the default install. The manual [Getting started](../../README.md#getting-started)
  path stays below for anyone who prefers it.
- **Fixed: `cp .env.example .env` broke `/api/contact`** — surfaced by writing
  that step into the quick-start prompt. Copying the example leaves
  `CONTACT_ENDPOINT=` (blank), which reaches zod as `""`, and `""` is not
  `undefined` — so `z.url().optional()` rejected it. The route returned **HTTP
  400 `{"path":"CONTACT_ENDPOINT","message":"Invalid URL"}`**, misreporting a
  *server misconfiguration* as the caller's bad input. `src/env.ts` now routes
  optional URLs through an `optionalUrl()` helper that preprocesses `""` →
  `undefined`. Verified end-to-end: a valid POST now returns 200, and genuinely
  invalid payloads still return 400. Any new **optional** variable must use the
  same helper — see [[environment-variables]].
- **README — corrected clone URL & Node requirement** — step 1 pointed at
  `github.com/textura/next16-claude-starter` (wrong org — the repo is
  `textura-agency/…`), so the documented clone would 404. Also added the Node
  floor (**22.13+**; 20.19+ works, 24 LTS recommended) — below it `yarn install`
  fails outright on `eslint-visitor-keys` — and the missing
  `cp .env.example .env` step.
- **TextEngine alignment & clipping rules documented** — two failure modes that
  bite every TextEngine block, now written into [[text-engine]] (new *Alignment &
  line-height* section), [[text-engine-reference]], and AGENTS.md hard rule #3.
  **(1)** The container renders `display: flex; flex-wrap: wrap`, so words are
  flex items and `text-align` cannot position them — a lone `text-center`
  silently does nothing. Always pair `text-*` with `justify-*` on the tag
  (`justify-between` is a trap: it spreads *words*, not lines). **(2)** `overflow`
  sets `overflow: hidden` on `inline-block` wrap layers whose height comes from
  `line-height`, so tight leading shaves descenders and accented caps — keep
  leading ≥ 1.1 via the new `leading-display` token, never `leading-none` with
  `overflow`, and watch for `text-5xl`+ which ship `line-height: 1`. Both fixes
  are **classes on the `TextEngine` tag** — no wrapper component, no helper to
  import. Verified against the `spring-text-engine@0.1.5` dist source.
- **Strict three-tier token naming convention** — tokens now follow a fixed,
  portable grammar so names are predictable across every project built from this
  starter: `--raw-<category>-<name>` primitives → `--<role>` semantic →
  `--<tw-namespace>-<role>: var(--<role>)` bindings in `@theme inline`. Only
  Tier 1 holds literals; Tier 2 names purpose and is the themeable layer.
  `globals.css` restructured accordingly — **no brand palette invented**, the
  convention is the deliverable. Two deviations from the reference article,
  verified by compiling a probe against `tailwindcss` v4.3.3: primitives are
  `--raw-*` and stay out of `@theme` (a `--color-*` entry would generate
  utilities and let markup skip the semantic tier), and **`--duration-*` is not a
  Tailwind v4 namespace** — `duration-fast` compiles to nothing, so durations
  stay Tier 2 and are used as `duration-[var(--duration-fast)]`. See
  [[decisions-log]] ADR-0015 and [[design-system]].
- **Narrow CSS-transition exception** — hard rule #1 no longer bans CSS
  transitions outright. CSS `transition-*` is allowed for simple discrete state
  changes only (hover/focus colour, opacity, border, small nudges), requiring
  token-backed timing (`duration-[var(--duration-fast)] ease-entrance`),
  `transition-*` only (`@keyframes` still banned), and utilities only. Everything
  scroll-driven, revealing, staggered, or layout-affecting stays spring-based.
  A hover colour fade no longer needs a client component wrapping `<Hover>`. See
  [[decisions-log]] ADR-0014, [[animation-system]], [[design-system]].
- **New tokens** — `--raw-color-white` / `--raw-color-neutral-100/900/950`,
  `--raw-duration-fast/normal`, `--duration-fast/normal`, `--leading-display`
  (1.1 — the TextEngine clip floor), `--ease-entrance`.
- **Build & lint verified clean** — `yarn lint` and `yarn build` both pass with 0
  errors and 0 warnings; no lint fixes were needed. Note: `yarn install` **fails
  on Node 20.17** (`eslint-visitor-keys` requires `^20.19 || ^22.13 || >=24`) —
  use Node ≥ 20.19; this repo was verified on 24.16.

## 2026-06-07

- **Fixed `<Inview>` standalone reveal + spring resize gating** — `<Inview>`
  never animated unless an external `trigger` ref was passed. The JSX `ref`
  callback wrote `inViewRef.current = node`, but that tuple slot is a *callback
  ref* (`setNode`), so the element was never observed and the `node` stayed
  `null`. Now calls `setInViewNode(node)`. This was also a build-breaking type
  error. Additionally, `<Inview>`, `<Spring>`, and `<Hover>` tracked `width` as a
  hook dependency but never passed it to `isMobileDisabled` — fixed by passing the
  tracked `width`, restoring resize re-evaluation and clearing the
  `react-hooks/exhaustive-deps` warnings. `yarn build` and `yarn lint` are now
  clean. See [[decisions-log]] ADR-0013 and [[components/animation-springs]].

## 2026-06-05

- **Home view emptied** — removed the animation showcase (`src/views/home-showcase.tsx`
  deleted) and reduced `HomeView` to an empty `<main>`. The home view is now the
  blank starting point for new work. Documented the convention — *if the project
  is empty and no other instructions are provided, start developing in the home
  view on route `/`* — in [[ai-agent-guide]] and [[new-page]].

## 2026-05-23

- **README — setup + Vercel deploy steps added** — *Getting started* expanded
  into a four-step flow (clone the template → delete bundled `.git` →
  initialise your own GitHub repo → install & run), with a macOS hint for
  revealing the hidden `.git` folder (`⇧ + ⌘ + .`). Added a *🚀 Deploy to
  Vercel* section covering the CLI flow (`vercel` / `vercel --prod`) and the
  dashboard import path, plus an `env pull` pointer to
  [[environment-variables]].
- **README rewritten to lead with the AI workflow** — root `README.md`
  reorganised so the AI usage guide is the first section: how the three
  `.claude/settings.json` hooks (`SessionStart`, `UserPromptSubmit`, `Stop`)
  enforce the vault workflow automatically, how to write a good request
  against this convention layer, and a cost-expectations note recommending
  **Claude Max (5×)** as the minimum plan (the vault-fan-out + hook
  re-injection on every turn is token-intensive by design). Technical
  *Getting started* and the existing AI-agents entry-point pointer stay
  below.

## 2026-05-22

- **Styling-placement convention added** — to stop `globals.css` accumulating
  hundreds of component-specific classes, styling now follows a strict
  placement order: one-offs are Tailwind utilities, repeated patterns become
  **React components** (not `@layer components` classes), and `@layer
  components` is reserved strictly for pseudo-elements and third-party
  overrides. `globals.css` stays bounded — `@import`, tokens, base resets only.
  No CSS Modules. Codified in [[decisions-log]] ADR-0012; [[design-system]]
  (new *Where a style goes* section) and [[component-conventions]] updated.
- **Semantic-HTML / SEO-markup convention added** — new [[html-semantics]]
  rulebook: landmarks, one `<h1>` + heading outline, native elements over
  `div`s, forms/images/ARIA, JSON-LD over microdata, a `data-*` convention, and
  passing a semantic `tag` to animation components. Codified as AGENTS.md hard
  rule #10; cross-linked from [[component-conventions]] and [[new-page]]. Fixed
  the demo (`home-showcase.tsx`) to a single `<h1>` to follow it.
- **API layer added** — a convention for reaching external services.
  `app/api/<resource>/route.ts` Route Handlers own their logic and read secret
  env vars directly (safe — route files never reach the browser). New: `zod`
  dependency; `src/env.ts` (validated env, public/server split); `src/lib/api/`
  (`handle` wrapper + `ApiError` + `{ data }`/`{ error }` envelope);
  `src/lib/api-client.ts` (typed same-origin fetch); example
  `app/api/contact/route.ts`. Codified as AGENTS.md hard rule #9. See
  [[decisions-log]] ADR-0011 and [[api-architecture]].

## 2026-05-21

- **Asset convention added** — site content assets (images, videos) now live
  under `public/assets/<section>/`, one folder per section; meta/PWA/SEO assets
  stay at the `public/` root. Documented in [[folder-structure]],
  [[component-conventions]], and the [[new-page]] playbook; `public/assets/`
  created with a `.gitkeep`.
- **SEO & performance hardening** — a broad pass on the starter. **SEO:** new
  `src/lib/site.ts` config (single source of truth, fed by `NEXT_PUBLIC_SITE_URL`);
  `metadataBase` is now always set (relative OG/canonical URLs resolve);
  `themeColor` moved to a `viewport` export; added `app/robots.ts`,
  `app/sitemap.ts`, and an `Organization`+`WebSite` JSON-LD helper; OG image
  dimensions corrected to match the asset; dead `keywords`/`other` tags dropped.
  **Performance:** populated `next.config.ts` (`removeConsole` in prod,
  AVIF/WebP, `next/image` breakpoints aligned to the grid, `poweredByHeader:
  false`); fixed a `requestAnimationFrame` leak in `ScrollLayout` (Lenis loop
  never cancelled on unmount); `HomeView` is now a Server Component with the
  animation demo split into the `HomeShowcase` client leaf; added
  `<ReducedMotion>` (honours `prefers-reduced-motion` via react-spring's global
  `skipAnimation`); removed a per-frame `console.log` from the demo; added
  `app/loading.tsx` / `error.tsx` / `not-found.tsx`. See [[decisions-log]]
  ADR-0010, [[seo-metadata]], and [[environment-variables]].
- **Animation engine — lint pass** — cleared all 13 pre-existing ESLint problems
  in the engine (2 errors + 11 warnings), an authorized engine edit (ADR-0009).
  `isMobileDisabled` now takes an optional `viewportWidth` argument, so the
  `active` memos in `<Spring>` / `<Hover>` / `<Inview>` / the trigger hooks
  depend on it genuinely. Added missing `disableOnMobile` effect deps; fixed a
  `trigger.current`-in-cleanup hazard in `<Hover>`; ref-stabilised `<Handle>`'s
  transition effects. **API change:** `useProgressTrigger` now returns `progress`
  as a `RefObject<number>` (read `.current`) instead of a render-time ref read —
  no consumer was affected (`<ProgressTrigger>` discards the return).
- **Animation engine — performance refactor** — fixed load issues that scaled
  with the number of animated components. Added `src/lib/animation/ticker.ts`, a
  single reference-counted `requestAnimationFrame` loop; `useLoop` (and all loop
  hooks) now subscribe to it instead of each starting its own rAF. `useWindowWidth`
  / `Height` / `Size` now share one debounced `resize` listener via a
  `useSyncExternalStore` store (the `debounceDelay` param was dropped — unused).
  `useDynamicInView` rewritten without the per-render `Proxy`/observer churn.
  Fixed a stale-closure bug in `useLoop`. `mode="forward"` scroll listeners made
  `passive`. This was an **authorized edit to `#do-not-modify` engine files** —
  hard rule #2 amended. See [[decisions-log]] ADR-0009 and [[animation-system]].
- **`spring-text-engine` updated** — bumped `^0.1.3` → `^0.1.5` (latest). The
  public API, types, and dependencies are unchanged between these versions
  (verified) — an internal-only patch bump, no code changes required.
- **Adaptive scaling grid added** — a root-font-size scaling system landed in
  `src/components/common/grid/` (`<AdaptiveGrid>` + `useAdaptiveGrid` hook +
  `grid.config.ts`), with `vw` media queries in `globals.css` for scale-down.
  It was dropped into `common/` as a `styled-components` system; ported to the
  project stack — config-driven TS + CSS-only Tailwind, no `styled-components`.
  The unused dropped files (`colors.ts`, `fonts.ts`, `utils.ts`, `index.ts`,
  the `styled-components` `grid.tsx`) were removed. Mounted via `<AdaptiveGrid>`
  in the root layout. See [[components/common]] and [[decisions-log]] ADR-0008.
- **Vault created** — `obsidian/` Obsidian vault initialised as the project's
  second brain. Architecture, frontend, and workflow docs populated. See [[decisions-log]] ADR-0001.
- **Root README rewritten** — replaced `create-next-app` boilerplate with a real
  project README that points into this vault.
- **`generic-layout-prompt.md` moved** — relocated from repo root to
  `obsidian/workflows/` as [[generic-layout-prompt]].
- **Navigation convention resolved** — standard `next/link` confirmed; the unbuilt
  `<AnimLink>` / `useAnimRouter()` convention dropped. See [[decisions-log]] ADR-0005.
- **Docs consolidated into the vault** — `project-specs.md` deleted (decomposed into
  vault notes + new [[environment-variables]]); `text-engine-docs.md` moved in as
  [[text-engine-reference]]. `AGENTS.md` rewritten as a thin shim; `.cursorrules`
  repointed to `@AGENTS.md`. The vault is now the single source of truth.
  See [[decisions-log]] ADR-0006.
- **Vault renamed & restructured** — vault folder `getlayers.io/` → `obsidian/`;
  number prefixes dropped from section folders (`00-meta` → `meta`, etc.). Project
  name standardised to **`next16-claude-starter`** across docs and `package.json`.
- **Components linked to docs** — every file in `src/components/` now carries a
  `// 📖 Docs:` pointer comment to its catalog note, so agents can jump from code
  to docs and back.
- **Vault workflow automated** — added `.claude/settings.json` with `SessionStart`,
  `UserPromptSubmit`, and `Stop` hooks that make agents read the vault first,
  follow the relevant guide, and update docs after every change — with no manual
  reminder. See [[decisions-log]] ADR-0007 and [[ai-agent-guide]].
- **Cookie component replaced** — the `react-cookie-consent`-based `cookie.tsx`
  was replaced by an in-house `Cookie/` component (banner + category preferences
  modal + Zustand store). `react-cookie-consent` removed from dependencies. The
  component shipped using `styled-components` + an external design system; it was
  ported to the project stack — Tailwind v4 tokens and `@react-spring/web` motion.
  Mounted via `<LazyCookie>`. See [[components/common]].
- **Fixed TextEngine spring type mismatch** — the `mode="once"` heading in
  `views/home.tsx` mixed `lineIn={{ y: 0 }}` (number) with `lineOut={{ y: "100%" }}`
  (string), throwing *"Cannot animate between _AnimatedString and _AnimatedValue"*.
  Changed to `y: "0%"`. The buggy pattern in [[text-engine]] / [[text-engine-reference]]
  examples was corrected and a type-matching gotcha note added.

## Project baseline (git history)

| Commit | Description |
|--------|-------------|
| `94b0870` | feat: update starter |
| `5280ef2` | fix: linter errors & build |
| `b2b84e6` | initial — `next16-claude-starter` scaffold |

> [!note]
> The starter shipped with: Next.js 16.2, React 19.2, Tailwind v4, `@react-spring/web`,
> `spring-text-engine`, Lenis, and Zustand. See [[tech-stack]] for the current state.
