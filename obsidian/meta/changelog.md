---
tags: [meta, changelog]
updated: 2026-11-18
---

# Changelog

Chronological log of notable changes to the project. Newest first.
This is a human-curated log — not a mirror of `git log`.

> Note: entries for 2026-11-16 were appended at the end of this file during that session.

## 2026-11-19 — Xura Pulse page
- New `/pulse` page (`views/pulse.tsx`, `data/pulse.ts`): audience testing on simulated people. Use cases from the owner: doctor messaging, sales decks with decision makers, marketing campaigns (A/B videos, LinkedIn, Instagram), distributor pricing; up to 200 personas live in one run (product `MAX_POOL_SIZE`); interview any persona one to one.
- Video frames were replaced the same day by coded screens (`graphics/pulse-preview.tsx`): live run with a 200-seat crowd, A/B report, one-to-one interview. Frame assets deleted. Copy made domain-agnostic (owner): messages, sales/pitch decks, campaigns/creatives, pricing/offers.
- Added survey results and A/B setup (owner): use-case cards "Surveys" and "A/B tests", sections `PULSE_AB` and `PULSE_SURVEY` with coded `PulseSetupPreview` / `PulseSurveyPreview`; hero slide redrawn as a real 16:9 deck slide.
- Platform menu Pulse card redesigned to read as clickable: mini live panel (60 seats, count, tally) and a white "See Xura Pulse →" pill with hover ring.
- Home: new `PulseBand` (Xura Pulse), placed just above the bootcamp section.
- Outputs rail reordered (owner): Answers, Apps, Dashboards, Research reports, Audience tests, Pulse reports, Decks, Social posts, Briefs, Infographics, Simulated personas.
- Outputs rail (home + /platform): added "Pulse reports" and "Simulated personas" cards after "Audience tests" (`preview: "pulse-report" | "persona"`).
- New "Rooted in context" section (`PULSE_CONTEXT`, `PulseContextRing`): the audience in a circle around the company context graph — reactions grounded in company and persona context.
- A/B screen now animates through Goal → Audience → Run (`PulseAbDemo`, client leaf, springs); social-post mocks with real creative tiles; hero crowd halved to 100 seats; hero slide gains before/after bars.
- Platform mega-menu: bootcamp card replaced by a dark Xura Pulse feature card with a coded crowd; How we work keeps the bootcamp card. New tokens `--pulse-yes/maybe/no` (+ `@theme`).
- Linked from the Platform menu (`PLATFORM_MENU`), the shared outputs rail ("Audience tests"), the sitemap (0.9) and llms.txt. No accuracy figures until the owner supplies them.

## 2026-11-18 — "What they produce" rail
- The rail now shows one card per output type (`HOME_OUTPUTS`): Apps (coded `HiringAppPreview`), Dashboards, Decks, Social posts, Research reports, Briefs, Infographics — instead of one card per AI employee.
- New asset `public/assets/product/out-brief-overview{,-640,-1080}.webp` (page 1 of the owner's Business Operations Overview PDF) replaces the old brief capture on the Briefs card, whose figures overlapped.
- New asset `public/assets/product/out-social{,-640,-1080}.webp`: a real LinkedIn post from the product (owner-supplied).
- /platform's Outputs rail now shows the same cards: both use the new shared `sections/shared/outputs-list.tsx` (`OutputsList` + `OutputShot`); `PLATFORM_OUTPUTS.items` removed.
- Output images fill each card's lower area (`OutputShot`), bleeding off the right and bottom edges.
- New first card "Answers" with the coded `AskXuraPreview` (`graphics/ask-xura-preview.tsx`), figures matching `HiringAppPreview`.

## 2026-11-18 — /ai-transformation vs /deployment split
- The two pages no longer repeat the same story (ADR below). /ai-transformation = why and what for leaders: new sections “What makes a good first job”, “From one job to the whole business”, “What changes for your people”, “The decisions that stay with you”; the 90-day timeline (`TR_TIMELINE`) is removed and the FAQ links to /deployment for the how.
- /deployment = the how, in depth: six-phase `WalkthroughSection` (reads / produces / approval), who's involved, ownership over time, what we need from you, after go-live, longer operational FAQ. `DeploySteps` component removed; new data `DEPLOY_PEOPLE`, `DEPLOY_OWNERSHIP`, `DEPLOY_NEEDS`, `DEPLOY_SUPPORT`.
- llms.txt descriptions updated for both pages. References: Wonderful (/deployment, /ai-transformation) and AuxoAI.

## 2026-11-16 — Content depth (ADR-0046)
- New pages: `/use-cases` + 6 use-case pages, 3 `/compare/*` pages (`views/content-pages.tsx`, `data/use-cases.ts`, `data/compare.ts`).
- New `sections/shared/content-blocks.tsx`: `AnswerBlock`, `EssaySection`, `RelatedLinks`, `ComparisonTable`. Answer blocks + related links on AI employees, workflows, integrations, security, AI transformation, bootcamp; POV essays on AI transformation and bootcamp (`data/pov.ts`). Duplicate "What is…" FAQs removed where an answer block now covers them.
- Pharma and manufacturing pages: answer, compliance, systems, FAQ, use-case links (optional `Industry` fields).
- Removed implied-result stats from all industry "What changes" sections (no real numbers yet).
- Nav: "Use cases" under How we work (desktop + phone); footer lists use cases and comparisons; sitemap includes all new routes.

## 2026-11-15
- **Home rebuilt to wonderful.ai's 7-section structure** — the 12-section
  page had drifted into a busy SaaS template (small-card grids, numbered
  flows, UI mockups, yellow highlights). New order: full-viewport dark hero
  with white floating nav → scroll-filled statement (TextEngine progress) →
  platform + team (two big cards) → AI-employee output rail → industries
  tabs with one big panel → bootcamp card + trust line → FAQ → closing.
  Monochrome; no yellow, no green. Stock photos rejected by the owner, so
  abstract `BlurField` backdrops stand in (marked `PHOTO SLOT`). New:
  `BlurField`, `PlatformTeam`, `EmployeesRail`, `IndustriesTabs`,
  `.scrollbar-none`, `SiteNav overDark` (`--nav-ink` / `--nav-paper`).
  Deleted: `Problem`, `DeployBand`, `WhyXura`, `Employees`, `ChannelsBand`,
  `IndustriesGrid`, `Trust`. ADR-0035.
- **Generated photos in** — owner supplied generated images made from the
  photo brief (two contact sheets + a full-size hero). Cropped, 2× Lanczos
  upscaled, unsharp-masked, +6% contrast and −15% saturation into
  `public/assets/photos/` (10 files, plus `-640`/`-1080` variants; the
  folder is now in `scripts/resize-images.mjs` and the image loader). Used
  in the hero, the deployment-team card, the industries tabs (cross-fading
  per tab), the bootcamp card's right half, and the closing texture.
  `BlurField` remains on the platform section background and bootcamp left.
- **Background contrast fix** — the middle-band textures put pale
  highlights behind headlines (~3:1 for white text). The generator now caps
  every dark tone at relative luminance 0.15 (`cap()`, `MAX_DARK_L`) and
  drops the pale highlight (it read as a grey seam once capped). White text
  now measures ≥ 5.2:1 at the 99th-percentile pixel on every palette and
  variant; the script prints the contrast per palette when it runs.
- **Light haze + colour palettes by page type** (2026-11-16) — light grey
  bands (home Bootcamp, platform Flows, Apps anatomy, deployment Bootcamp,
  industry example stats) now use `HazeField` (new
  `components/graphics/haze-field.tsx`): a pale haze fading to warm white
  with fine grain. Dark and light textures now come in five palettes, one per
  page type — home **blue**, platform **violet**, apps **teal**, deployment
  **amber**, industries **green** — generated by
  `scripts/generate-gradient-textures.py` into
  `/assets/textures/field-{palette}-{n}.webp` and
  `field-light-{palette}-{n}.webp` (30 files, ~2.2 MB total; a page loads
  only its own ~6). `globals.css` defines `--field-0..2` /
  `--field-light-0..2` on `:root` (blue) and `.palette-{name}` classes;
  views wrap their content in `<div className="palette-…">`, and
  `FlowField`, `HazeField` and the footer read the variables.
- **Gradient + grain backgrounds, colour app preview, "live in 2 weeks"**
  (2026-11-16) —
  - Dark sections now sit on a blue-to-ink gradient with film grain instead
    of flat ink: three generated textures
    (`public/assets/textures/field-{0,1,2}.webp`, 2400×1200, ~140 KB each;
    `scripts/generate-gradient-textures.py`) applied inside `FlowField`
    (variant 0 light from top, 1 from bottom, 2 band across the middle), with
    the flow-diagram pattern kept faint on top (cards now translucent). The
    footer uses `field-1` too (old `.texture` removed there).
  - `HiringAppPreview` shows the full Overview page in the product's colours
    (new `app-*` tokens: brand blue from the existing blue ramp, green/red
    status) — adds "Who is applying" (candidates by role, applications per
    week) and the search row; no longer cropped in the /apps hero
    (`PageHero` always pads the bottom).
  - Timing: everything now says "see it live in 2 weeks" (owner: not ~4
    weeks, and no "first workflow/app/AI employee" framing) — hero sub, steps,
    FAQs, closings, metadata, JSON-LD, `llms.txt`; deployment timeline is now
    Days 1–2 bootcamp → Week 1 → Week 2 build and go live → every quarter;
    industry cards say "Example:" instead of "First job/workflow:". Live repo
    hero branch meta updated too (commit e4187d8).
- **/apps and /deployment pages** — two new routes (ADR-0040).
  `/apps` (`views/apps.tsx`, `data/apps.ts`): hero with `HiringAppPreview`,
  how it's built (4 steps), what's in every app (3×2), six example apps,
  apps vs flows vs AI employees, FAQ, closing. `/deployment`
  (`views/deployment.tsx`, `data/deployment.ts`): engagement timeline
  (bootcamp → week 1 → weeks 2–3 → week 4 → every quarter), deployment lead
  with the workshop photo, 2-day bootcamp (day 1 / day 2), **where Xura
  runs** (Xura cloud, your cloud/VPC, on your premises — owner-confirmed
  options), MIT stat, FAQ, closing. Shared pieces in
  `components/sections/shared/`: `PageHero`, `FaqSection`, `CtaBand`.
  Platform menu Apps → `/apps`, Deployment → `/deployment`; footer, sitemap,
  `llms.txt` updated; platform Apps section links to `/apps`; home team card
  links to `/deployment`. **Fix:** the product catalog marks Renewals desk,
  Billing exceptions, Churn rescue and Expansion pipeline as `planned`, so
  they're now "Apps teams build" examples, not "ready-made apps".
- **Social posts card** — the product's Social posts mode (posts and
  infographics for LinkedIn, Instagram and X) is shown only as a fifth card,
  "Social posts · by Ezra", in the home "What they produce" carousel (new
  `HOME_OUTPUTS_EXTRA`; the rail now maps roster jobs + extras to
  `{ title, by, shot }`). It reuses the infographic capture (different crop)
  until a dedicated social-post screenshot exists. Roster and platform copy
  unchanged.
- **Employee roster in the live site's layout** — the four employees now
  follow the live site's open roster (no card boxes): 72 px expressive
  monochrome `AiOrb`, name in light 3xl type, role in mono (new `role` field
  on `HOME_EMPLOYEES.jobs`: Chief of Staff, QA Investigation, Marketing
  Associate, Recruiting Coordinator), then "**Job.** what they do". The
  outputs carousel stays below.
- **Employee cards + carousel together; flow builder showcase** — the
  owner wanted both, not one replacing the other: `EmployeesGrid` now shows
  the four employee cards (monochrome orb, job, name, one line) and below
  them "What they produce", the output rail with `RailNav`. On `/platform`,
  the Flows section swaps the flow-library screenshot for
  `FlowBuilderPreview`: a coded builder canvas (step palette; nodes Trigger,
  Data, AI step, Condition, Approval, Action — matching the product's flow
  graph) running "Deviation to CAPA": deviation → batch record (MES + LIMS)
  → AI investigation → critical? → QA approval gate → CAPA in QMS, or
  WhatsApp alert to the shift lead. Flows lead copy names the node types.
- **AI employee cards back (grid)** — at the owner's request the home
  "What we build" section returns to the 2026-11-14 four-card grid
  (`sections/home/employees-grid.tsx`, `EmployeesGrid`): real output crop on
  top, monochrome `AiOrb` (`accent="var(--muted)"`), job + name, one line.
  Replaces `EmployeesRail` (deleted). Kira's card now points at the Hiring
  pipeline app.
- **Xura Apps on the site** — from the product code (`Xura-main
  src/server/custom-apps`, `apps/catalog.js`): apps are built by describing
  them in chat, with records, detail view, pages (overview numbers, charts,
  pipeline board, calendar), Ask Xura inside, brand kit and access; ready-made
  apps include Renewals desk, Billing exceptions, Churn rescue, Expansion
  pipeline. New `/platform#apps` section (`sections/platform/apps.tsx`,
  `PLATFORM_APPS`) with a coded `HiringAppPreview` (replica of the Hiring
  pipeline app: Ask Xura bar, menu, numbers band, drop-off funnel); the old
  "Apps and flows" section is now "Flows" (`#flows`). Platform menu: "Apps"
  and "Flows" items. Copy: home platform card, "What does Xura custom-build?"
  FAQ, a Hiring-app item in `HOME_FEED`, `llms.txt`.
- **Own visual language: FlowField + approval feed** — the owner said the
  silk band looked like a copy of wonderful.ai and that every section had
  the same dark gradient. Statement band rebuilt: short statement ("The
  platform and the team that make AI work for your business") + kicker, and
  a live `ApprovalFeed` (work drafted from SAP, QMS, CRM, LIMS, ERP, waiting
  on a person) — Xura's approval-gated work as the visual. `BlurField`
  replaced site-wide by `FlowField` (faint flow-diagram pattern on flat ink;
  `.mask-edges` utility), including the home closing (old motion texture
  deleted). Removed: silk texture + generator script, `DotGrid`,
  `TypingChip`, `HOME_STATEMENT_CHIPS`, `HOME_STATEMENT_NOTE`. Fixed a phone
  overflow in the statement grid (`[&>*]:min-w-0`).
- **Hero sub reworded (owner's copy)** — "For operations, sales, quality and
  IT teams in pharma and manufacturing. Our team finds the work AI should be
  doing, then custom‑builds the apps and flows that do it within weeks."
  (adds IT teams and the speed promise; drops "and more" and the region).
  Same text on the live repo's hero branch.
- **Hero overlay lightened** — gradient `/55 → /40 → /75` → `/40 → /20 →
  /60`; the radial centre shade drops to 50% opacity and now applies on all
  screen sizes (keeps the headline readable as the footage shows through).
- **Hero video: cinematic grade + grain** — re-rendered from the masters
  (no generational loss) with a baked grade: saturation 0.80, contrast
  1.10, cool shadows / warm highlights (`colorbalance`), lifted blacks and
  soft highlight roll-off (`curves`), light `vignette`, moving film grain
  (`noise=alls=7:allf=t+u`). Reproducible via new
  `scripts/render-hero-video.sh <masters-dir>` (also writes the poster).
  First render was ~36 MB (grain compresses poorly); lightened to grain
  `alls=5` + CRF 23 → **~15 MB**, no visible blocking at 1:1. The CSS
  `.grain-photo` on the hero `BackgroundVideo` was removed so grain isn't
  doubled.
- **Hero video: fourth clip** — "Brainstorming at Work" (Pexels 6804128,
  2732×1440 master, scaled to 1080 high and centre-cropped to 1920) appended
  after the industrial-zone clip with the same 1 s crossfade. Sequence now
  factory → lab → industrial zone → team at work, 29 s, ~24 MB, CRF 20.
- **Industries dropdown + /industries hub restyle** — new `NavDropdown`
  shell (`sections/nav-dropdown.tsx`) shared by `PlatformMenu` (refactored
  onto it) and a new `IndustriesMenu`: industries with their focus line, a
  photo that crossfades to the hovered/focused item, "All industries →". Nav
  "Industries" link replaced by the dropdown (mobile menu keeps a link).
  `/industries` rebuilt in the new system: short dark hero ("AI
  transformation for your industry"), 4:5 `PhotoFill` cards (first workflow,
  label, focus), a "Don't see your industry?" card with the bootcamp CTA,
  dark closing. New `industryFocus()` helper in `data/industries.ts`.
- **Hero background video** — the hero photo is replaced by one full-bleed
  video that plays three Pexels clips in sequence (aerial factory → pharma
  lab → industrial zone), crossfaded 1 s, looping:
  `public/assets/video/hero-sequence.mp4` (1920×1080, 30 fps, H.264 CRF 20,
  22 s, ~21 MB, faststart) + `hero-sequence-poster.webp`, made with ffmpeg
  from the 2560×1440 masters (Lanczos downscale, `xfade`). New
  `components/common/background-video.tsx` (`BackgroundVideo`): poster
  always; the `<video>` mounts only on md+ without reduced motion and pauses
  off screen, so phones never download it. Grain moved onto the media layer
  (on the overlay span it blended with nothing and turned into a grey wash);
  overlay lightened to `/55 → /40 → /75` plus a desktop-only radial centre
  shade. An interim side-by-side 3-strip collage was replaced the same day.
- **Hero audience names sectors** — sub now opens "For operations, sales and
  quality teams in pharma, manufacturing and more, across India and Southeast
  Asia." ("and more" keeps it industry-agnostic.) Same change on the live
  repo's hero branch.
- **Hero H1 broadened** — "AI transformation, built one workflow at a time."
  → "AI transformation, built for your business." ("workflow" read as
  automation-tool scope); `Service` JSON-LD name to match. "Workflow" stays
  further down (steps, closing, industry pages).
- **Hero audience line** — the "Paid bootcamp…" note under the hero buttons
  is replaced by who it's for (`HOME_HERO.audience`): "For operations, sales
  and quality teams at companies across India and Southeast Asia, in pharma,
  manufacturing, fintech, healthcare and SaaS." Defined by role, region and
  sector, never company size.
  Then moved into the sub itself (the small line was too faint): "For
  operations, sales and quality teams across India and Southeast Asia. Our
  team finds the work AI should be doing, then custom‑builds the apps and
  flows to do it." at `text-background/85`; `HOME_HERO.audience` removed.
- **Platform page + nav dropdown** — new `/platform` route
  (`app/platform/page.tsx` → `views/platform.tsx`, copy in `data/platform.ts`)
  bringing back the old home's feature depth in the new system: hero (dark
  `BlurField`, app screenshot), Connect (`KnowledgeGraph` + four points),
  Ask and act (three steps), Outputs rail (five real outputs, `RailNav`),
  Apps and flows (grey band, Flows screen, three points, `#apps-and-flows`),
  Where it works (`ChannelScene`), Built for trust (3×2 grid, `#trust`),
  closing. Sections in `components/sections/platform/`. Nav gets a
  `PlatformMenu` dropdown (two link columns + bootcamp feature card, data
  `PLATFORM_MENU`); mobile menu and footer get a "Platform" link. Sitemap and
  `llms.txt` list `/platform`. ADR-0037.
- **Design review fixes (P1 + P2)** —
  - Copy: closing "Your first workflow, live in weeks."; nav/footer link
    "AI employees" → "What we build"; silk band line "Xura Platform + team";
    employees section label "What we build"; industry headlines
    "AI transformation for {industry}:"; industry and index page titles and
    the index description moved off "AI employees".
  - Help orb monochrome: `AiHelpAgent` defaults its accent to `var(--muted)`.
  - Rhythm: bootcamp is now a full-width `bg-line-soft` band (card left on
    white); footer gets a hairline top border so it doesn't merge with the
    dark closing.
  - Alignment: AI-employees heading/lead and FAQ centred (FAQ single column).
  - Statement: U+2011 hyphens in "custom‑builds" and "two‑day".
  - Steps: one bordered row of five (mono step numbers), stacked on mobile.
  - Rails: new `RailNav` ‹ › buttons + right-edge fade on the AI-employees
    rail (and the industry use-case rail).
  - Industry pages rebuilt to the home design (ADR-0036); `Industry.photo`
    added (tabs now read it instead of a local map); `Breadcrumbs tone`.
  - Industry scenarios are illustrative: no callout (owner's call); headings
    reworded from customer stories to reader outcomes, label "What changes".
- **Hero repositioned to AI transformation** — "AI employees" is no longer
  sold in the hero. H1 "AI transformation, built one workflow at a time.";
  sub leads with our team finding the work and custom-building agentic apps
  and flows; the small tagline line above the H1 was removed
  (`HOME_HERO.tagline` deleted). Home title "AI Transformation for Mid-Size
  Companies | Xura AI", meta description and `Service` JSON-LD name to match.
  AI employees stay further down as one thing we build.
  Hero sub then shortened to one line: "Our team finds the work AI should be
  doing, then custom-builds the apps and flows to do it. Live in weeks." (ERP/
  CRM/approval specifics live in the sections below.)
- **H1 + title broadened** — H1 "AI employees, apps and flows, custom‑built
  by our team" (U+2011 non-breaking hyphen so "custom‑built" never splits),
  home title "AI Employees, Apps & Flows Built by Our Team | Xura AI",
  `Service` JSON-LD name to match. (Superseded the same day by the
  AI-transformation hero.)
- **Copy: custom apps and agentic flows (apps infra)** — positioning now
  says our team finds the work that needs attention, decides where an AI
  agent can improve it, and custom-builds AI employees, apps and agentic
  flows on the platform. Updated: hero sub, statement, How we deliver lead,
  platform and team cards, steps ("Find what needs attention", "Custom-build
  apps and flows", "Next flow every quarter"), AI-employees lead, bootcamp
  body, FAQ ("What is Xura?" + new "What does Xura custom-build?"), home meta
  description, `Service` JSON-LD, `llms.txt`, `siteConfig.tagline` /
  `description`, and the footer blurb (was the old "answer, explain and act").
  H1 unchanged (SEO).
- **Statement band, second pass** — the first band looked worse: the old
  1117×263 `texture-motion` was stretched blocky, the sentence started at 35%
  opacity, and it was too dark. Now: a generated full-res silk texture
  (`public/assets/photos/texture-silk.webp`, 2400×1064, from
  `scripts/generate-silk-texture.py` — Pillow, drawn small, enlarged, blurred,
  grain added), a "Xura AI employees" wordmark line, the sentence in solid
  white (scroll word-fill dropped here), a white "See how we deploy" pill, and
  monochrome `DotGrid` (white/grey, no yellow). `Statement` is a server
  component again.
- **Statement band** — the white statement section read as bland. Rebuilt
  after wonderful.ai's "AI OS" band: grey motion texture (`texture-motion`
  over `bg-muted`) with `.grain-photo`, a `DotGrid` ring of small squares
  (yellow `bg-accent` accents), two `TypingChip`s typing what we connect
  (`ERP`, `CRM`, `Tally`…) and what happens (`Draft ready`, `Approve`…) from
  `HOME_STATEMENT_CHIPS`, and the sentence in white with the scroll word-fill.
- **Lens-style blur instead of uniform blur** — the uniform 2 px blur looked
  fake. `PhotoFill` now stacks a sharp image under a blurred copy
  (`--raw-blur-photo` 10 px) masked by `.mask-lens` (radial gradient), so the
  subject stays sharp and blur builds toward the edges. New `focus` prop
  (`--lens-x` / `--lens-y`) moves the sharp zone; set for the pharma and
  manufacturing photos.
- **Photo treatment: blur + grain** — new `components/common/photo-fill.tsx`
  (`PhotoFill`): `next/image` fill with a 2 px gaussian blur (`blur-photo`,
  token chain `--raw-blur-photo` → `--photo-blur` → `@theme --blur-photo`),
  `scale-[1.04]` to hide blurred edges, and heavy overlay film grain
  (`.grain-photo`, opacity token `--photo-grain-opacity` 0.35). Applied to
  every photo on the home (hero, team card, industry tabs, bootcamp). Product
  screenshots stay sharp.
- **Photos AI-upscaled** — the first pass (Lanczos 2× of ~410 px tiles) looked
  very soft. Re-cut clean crops and upscaled all nine sheet tiles plus the
  hero 4× with Real-ESRGAN (`realesrgan-x4plus`, ncnn-vulkan v0.2.5.0, run
  offline from a scratch folder, not a project dependency), then capped at
  2400 px, −10% saturation, WebP q86, and regenerated the `-640`/`-1080`
  variants. Tiles are now ~1620 px wide, hero 2400 px.
- **Photo brief** — `workflows/photo-brief.md`: shot list, style suffix and
  generation prompts for Indian industry/people imagery to fill each
  `PHOTO SLOT`.

## 2026-11-14
- **Home redesign (platform + deployment team)** — new home from
  `components/sections/home/*` and `data/home.ts`: keyword H1, definitional
  sub, dark "How we deliver" band, Why Xura, job-first AI employees, industry
  photo cards, trust, paid bootcamp, FAQ (+ FAQPage), closing CTA. Home title
  "AI Employees, Deployed by Our Team | Xura AI". `Service` JSON-LD, Hyderabad
  address and areaServed on Organization, `/llms.txt`. Nav primary CTA is now
  "Book a bootcamp". New `.display-light`, `.display-light-md`,
  `.pill-inverse`, `.pill-lg` utilities. ADR-0033.
- **Rest of the site moved to the bootcamp model (first cut)** — free pilot
  retired. Pricing: new "How a Xura engagement is priced" section
  (`ENGAGEMENT_STEPS`: bootcamp → deployment → platform plan), Pilot plan
  removed, plans under a "Platform plans" h2 (cards are h3), CTAs "Book a 2-day
  bootcamp" / "Talk to us", FAQ pilot question replaced. Nav and footer: "Start
  free" → "Sign in" (`siteConfig.signinUrl`), "Book a demo" → "Book a
  bootcamp". `/trial` reworded as a bootcamp request (view, form success
  state, metadata). Industry pages: bootcamp CTAs and copy. Pricing, industry,
  industries index, trial, privacy and 404 switched to the light display
  type (`display-light*`) and a neutral hero wash.
- **Pricing page hidden** — `src/app/pricing/` route removed (no `/pricing` in
  the build or sitemap); nav, footer, 404 and `llms.txt` links removed. The
  view (`views/pricing.tsx`) and data (`data/pricing.ts`) are kept for later.
  ADR-0034.
- **Home imagery pass** — the first cut read as bland (wonderful.ai's
  restraint without its photography). Added: sand-tinted hero with a
  brand-ink product stage (`ArcField` + yellow `HeroBackdrop` wireframe,
  app screenshot, two scroll-drifting status chips via `SpringTrigger`);
  real output crops (`ShotCrop`) on each AI-employee card; `KnowledgeGraph`
  in the brand-ink "How we deliver" band; new `ChannelsBand` section with
  the coded `ChannelScene` mockup; photo-led industry cards (first spans two
  columns, yellow "First job" chips); yellow highlight on the statement's
  key words; sand textured trust band; yellow bootcamp panel; brand-ink
  closing with a helix backdrop and the new `.pill-accent`.
- **No green surfaces** — owner rejected the brand-ink green look. Every
  large dark surface on the new pages is now neutral ink (`bg-foreground`):
  hero stage, How we deliver, the Why Xura card, closing CTA,
  `ChannelScene` wrapper, site footer and the `/trial` proof panel. Hero
  sand tint removed (plain white). Small in-mockup chips keep brand-ink.

## 2026-11-07
- **Mobile performance** — looping work now pauses off-screen via
  `useInViewport` (hero prompt cards, domains marquee, Industries rotation,
  knowledge graph), including the hidden breakpoint variant of the hero card.
  `HeroBackdrop` draws one static frame on phones and with reduced motion.
  Responsive images ship through a custom loader (ADR-0032). New `--duo-ink` token
  fixes the Industries contrast failure.
- **GA4 interaction events** — added `generate_lead`, `demo_booked`, `cta_click`,
  `sign_in_click`, `whatsapp_click` and `pricing_view` via `AnalyticsEvents` and
  `src/lib/analytics.ts`. They only send once GA has loaded, so EU/UK consent
  still applies. See [[components/common]].

## 2026-11-04
- **Removed unsupported compliance labels** — the "SOC 2 Type II" and
  "GDPR-ready" chips are gone from the homepage Enterprise-ready section; Xura
  holds neither certification.
- **Privacy policy page** — new `/privacy` route (`app/privacy/page.tsx` →
  `views/privacy.tsx`, content in `data/privacy.ts`), linked from the footer
  Company column and listed in the sitemap. "Privacy at a glance" cards,
  Customer Data vs other information, tables for what we collect / why / how
  long and who we share with, AI and messaging-channel sections, rights for
  India (DPDP), EEA/UK and US, Grievance Officer. Static, no reveal animation.
  See [[decisions-log]] ADR-0030.
- **Cookie consent for EU/UK visitors** — visitors in a European timezone
  see a banner ("Allow all" / "Allow necessary") and Google Analytics waits
  for "Allow all"; everyone else is tracked as before. "Cookie settings" in
  the footer lets anyone change their choice. Privacy policy cookie section
  updated. ADR-0031.
- **Contact email** — `siteConfig.email` is now admin@xuralabs.com (was
  hello@): footer "Contact us" and every privacy-policy contact.

## 2026-11-03
- **No more "1 week" pilot framing** — the free pilot is now pitched as
  "explore with 100 free credits while we map and automate your core flows".
  Hero chip "Hire your first AI employee: 100 credits on us"; hero subline
  "Start with 100 free credits. While you explore, we map your core business
  flows and automate them, so your team runs on AI in weeks, not quarters.";
  pilot band facts (100 credits · $0 · Flows built for you · 24x7) and
  paragraph; pricing H1 "…Start with 100 free credits.", Nora quote, Pilot
  card unit "100 credits to explore", pilot FAQ answer.
- **Custom flows ~~$100~~ $25** one-time setup per flow, limited slots;
  description reworded ("We build a custom flow around your business
  processes…").
- **Pricing: custom flows on every plan** — "$100 one-time setup per flow ·
  Limited slots" moved from the Custom card to a full-width strip under all
  plan cards; FAQ updated (ADR-0028 update).
- **Pilot card** — dropped "Goal: automate one crucial business flow" (and
  the same line from the "Is the pilot really free?" FAQ answer).
- **Pricing: early-customer offer** — Starter ~~$50~~ $20 and Growth
  ~~$100~~ $50 per user / month for the first 6 months ("Early-customer
  price · limited spots"); Custom shows "Custom Flows $100 one-time setup per
  flow"; the Pilot card lists what 100 credits gets you (~16 social posts,
  ~5 dashboards, ~2 decks, ~1 research report). Two FAQ entries added.
  See [[decisions-log]] ADR-0028.
- **Sign-up CTA renamed** — "Get started for free" is now "Start free"
  everywhere (nav, hero, pilot offer, closing CTA, footer, pricing cards,
  industry pages, demo-form success, 404). Same link (`siteConfig.signupUrl`).

## 2026-10-22
- **Animated hero on phones** — new `MobilePromptCard` cycles the four use
  cases (dashboard, deck, research, flow) with readable crops of real
  captures, instead of one static dashboard. Fixed-height stage, so no layout
  shift while it cycles; no text cut at the edges.
- **Outputs section on phones** — the overlapping fan (cards clipped at the
  stage edge, truncated prompt) is replaced below `sm` by a clean grid with
  the full prompt. Desktop is unchanged.
- **Shorter demo form** — `TrialForm` step 2 merges first/last name into one
  Full name field, drops Team size and Current data stack, and adds an
  optional mobile number with a country-code picker (`src/lib/dial-codes.ts`).
  Sheet payload keys are now `name`, `email`, `jobTitle`, `company`, `phone`,
  `useCase` — the Google Apps Script must be updated to write them.
- **Form: no unhandled rejection** — the no-cors POST in `TrialForm` now
  catches its own failure (offline, ad blocker), which showed as a Next dev
  overlay issue; the GET beacon still tries.
- **Form: shorter use-case placeholder** — "Primary use case (optional)"
  (the example list was cut off on phones).

## 2026-10-18
- **Mobile polish** (full-site review at 375px: no horizontal overflow on any
  page) — hero shows a phone-only card (prompt, readable dashboard capture,
  Nora) instead of the desktop card zoomed to 42% (7–9px text); comparison
  table header row hidden below `md` (cells carry their own labels); footer
  is two columns on phones, the mobile wordmark no longer overlaps the
  copyright (now 12px, was 10px); footer logo and breadcrumb links get ≥40px
  tap areas.
- **Sticky header** — the nav is pinned to the top (new
  `sections/sticky-header.tsx`): `fixed` + a 4.5rem spacer (the hero clips
  overflow, so `sticky` can't work), transparent over the hero and frosted
  (`bg-background/80 backdrop-blur-md` + hairline border) once scrolled.
  Nav-hosting hero sections get `z-20` so the header stays above later
  sections; `html { scroll-padding-top: 5rem }` keeps `/#…` anchors clear of
  it. Logo link is now `flex items-center` (it sat 2.5px high).
- **Nav links left-aligned** next to the logo (`auto · 1fr · auto` grid at `md+`); replaces the earlier page-centred layout.
- **Nav links more prominent** — 15px medium weight in near-black (`text-foreground/80`, was small muted grey), wider gap.
- **24x7 support on every plan** — added to each plan's features in
  `data/pricing.ts` (pricing cards), a new FAQ entry, and a fourth PilotOffer
  fact tile.
- **Homepage pricing merged into PilotOffer** — instead of a separate pricing
  section, the free-pilot band ends with one line of the paid plans (from
  `PRICING_PLANS`), "Every plan includes 24x7 support" and "See all plans".
- **Floating orb hosts single-mascot spots** — the bottom-right AiOrb
  (AiHelpAgent) now docks into, recolours to and becomes the mascot in:
  Meera's roster slot, Nora's run card, the PilotOffer card, the pricing-page hero,
  the demo page, each industry page's lead "Meet …" card and the 404, as well
  as the KnowledgeGraph (new `graphics/orb-dock-slot.tsx`). It scales up or down
  to the slot, faces forward (no spin) while docked, and links to `/trial`
  ("Book a demo"). `useOrbDock` gained owners (`setTarget(t, owner)`,
  `clearTarget(owner)`) and an `accent`; a slot only claims a free orb and
  re-claims when another releases it.
- **"Book a demo" is now the primary CTA** — filled and first, with "Get
  started for free" outlined and second, in the nav (demo always shown;
  free sign-up at `lg+` and in the mobile menu), hero, closing CTA, channels
  section, industry pages (hero + bottom; "See the use cases" dropped) and the
  footer Product column. The homepage PilotOffer band keeps "Get started for
  free" primary, since that band is the free offer.
- **SEO and speed fixes** (ADR-0027) — self-referencing canonical on every page
  (`pageMetadata` helper); sitemap now covers all 9 pages; keyword titles and
  70–160-char descriptions (`Industry.seoDescription`); visible breadcrumbs
  plus `BreadcrumbList` (`components/common/breadcrumbs.tsx`); pricing
  `SoftwareApplication` offers; Organization `sameAs` (G2, Product Hunt,
  YouTube). LCP: hero/H1 text no longer fades in, root `loading.tsx`
  removed, hero canvas deferred and throttled, screenshots and industry photos
  converted to WebP (product shots 5.8 MB → 0.5 MB). New
  `scripts/seo-check.mjs` (`yarn seo`) runs in CI. Checklist:
  [[seo-checklist]].
- **Lead sheet dates readable** — Apps Script v4 stores real dates shown as "18 Oct 2026, 4:52 PM IST"; existing rows converted (script v5).
- **Lead sheet script v3** — the Apps Script now keeps one row per email and updates it through the demo steps (Stage email → details → booked); step-1 drop-offs land in the sheet. Same deployment URL; see ADR-0025 update.
- **"Skip, just email me" removed** from the Calendly step — step 3 is the calendar only; the lead is already in the sheet from step 2.
- **Calendly embed header hidden** — `hide_event_type_details=1` (replaces the ineffective `hide_landing_page_details`); the embed opens straight on "Select a Day". The "Powered by Calendly" ribbon needs a paid Calendly plan to remove.
- **Calendly step switched on** — `siteConfig.calendlyUrl` = `https://calendly.com/admin-xuralabs/30min`; the demo form is now three steps (email → details → pick a time).
- **Demo form step 3: Calendly scheduler** (`sections/calendly-step.tsx`) —
  inline Calendly widget, script loaded only when step 3 mounts, prefilled
  with name + email (URL params and `prefill`). Off until
  `siteConfig.calendlyUrl` is set; when on, the progress bar has 3 segments,
  the details button reads "Pick a time", a `calendly.event_scheduled`
  message sends `stage: "booked"` (+ `calendlyEvent` URI) to the sheet.
- **Two-step demo flow** (Viktor-style) — `/trial` is now a focused split
  page (no nav/footer) with a dark proof panel and a two-step `TrialForm`:
  work email + Continue (progress bar), then details + "Book my demo", with a
  "Change" link back. Step 1 sends a partial lead so drop-offs are captured
  (sheet rows now carry `stage` = `email` | `details` and `source` =
  `demo-page`). Unverified trust tiles ("row-level permissions", "nothing
  trains a public model") removed from this page.
- **Comparison table made accurate** (`xura-vs.tsx`) — every Xura claim now
  matches the app: ~10 native connectors + MCP + uploads (not "50+"),
  glossary/semantic layer, monitors/routines, approval gates, per-employee
  learning, document ACLs, audit log. Dropped SSO, "zero raw data stored" and
  "queries run at source" (the app indexes document chunks and stores
  uploads). Competitor column no longer understates ChatGPT/Claude.
- **"Board deck(s)" → "Slide deck(s)"** in the pricing credit examples and the homepage pilot card — decks aren't only for boards. The deck example prompt is now a team review deck.
- **Nav links truly centred** — `site-nav.tsx` uses a `1fr · auto · 1fr` grid (`md+`) so the link group sits on the page centre regardless of logo vs CTA widths (it was centred between them before).
- **"Sign in" removed** from the nav (desktop + mobile menu) and footer; "Get started for free" opens the app's auth page, which has a Sign in tab.
- **CTA destinations** — "Book a demo" → `/trial` (`siteConfig.demoUrl`);
  "Get started for free" → `https://app.xuralabs.com/?tab=signup`
  (`siteConfig.signupUrl`). The app does not read `?tab=signup` yet (it opens
  on Sign in); the param is kept so it works once the app supports it — the
  app is out of scope for this repo. `/trial` is now the demo request page:
  title "Book a demo", H1 "See your AI employees *at work.*", form "Request
  your demo" → "Request demo", success state "Demo requested" with a link to
  sign up.
- **CTA pair "Get started for free" + "Book a demo"** (Viktor-style) across
  nav (demo outlined at `lg+`, also in the mobile menu), hero (video moved to a
  "▶ Meet your AI team" text link in the microcopy), PilotOffer, closing CTA,
  pricing cards (Custom → Book a demo), industry pages, 404 and footer.
  `siteConfig.demoUrl` drives every demo link.
- **Header and footer reworked** — nav adds "AI employees", a Docs ↗ marker,
  a filled "Start free pilot" primary, a text "Sign in", and a mobile
  `<details>` menu (links were hidden on mobile before). Footer becomes link
  columns with Contact, Product Hunt and YouTube (G2 → g2.com/products/xura-ai/reviews). `siteConfig` gains `email`, `legalName`, `profiles`.
- **Dev tip:** Turbopack `next dev` repeatedly missed file edits in this checkout (stale pages until restart). Run `npx next dev --webpack --port 3007` locally — same bundler as CI (ADR-0023).
- **Growth plan price $75 → $100** per user / month (credits unchanged at 1,000).
- **Hero video button** reworded "Watch the tour · 1:38" → "Meet your AI team" (no running time), matching the video's title.
- **Pricing "what credits buy" cards show real output snaps** — each card is
  now a cropped product capture (infographic, dashboard, deck, research from
  `public/assets/product/`) with the prompt overlaid, an accent "~N credits"
  badge, and Nora's result line. `CreditExample.credits` is now a number and
  gains `shot` (src, alt, crop); prompts reworded to match the captures.
- **Free pilot made prominent** — new homepage `PilotOffer` band after the AI
  employees; hero gets an offer chip and bigger CTAs ("Start free · 100
  credits on us"); pricing cards restyled (Pilot "Start here", dark Growth
  card, large credit numbers). `PricingPlan` gains `badge` and `entry`.
- **Industry routines shown as a timeline** — new
  `sections/routine-timeline.tsx` replaces the 3-up card grid on industry
  pages: grouped Every month → week → day → hour, time on the rail, employee-
  coloured nodes, approval pill per card. See [[sections]].
- **Industry use cases rewritten as real routines** — the 30 generic
  "score · flag · save" cards became 27 routines from the app's employee seeds
  (Nora, Ezra, Kira, Meera), each showing who runs it, when, what you get and
  what waits for approval. Section heading: "What your AI employees run, and
  when". Pharma leads with Nora's monthly brand and market review (the
  research report's wedge), then Meera's QA routines. Fintech and healthcare
  stay live, built on Nora's general routines plus Ezra/Kira. `Industry.employee`
  → `employees[]`; new `Routine`, `Employee`, `EMPLOYEE_ACCENT` in
  `data/industries.ts`.
- **Pricing page rebuilt** (inspired by viktor.com/pricing) — headline "Hire
  your first AI employee. *Free for a week.*" with a Nora quote; four cards
  (Pilot free · Starter $50 / 500 credits · Growth $75 / 1,000 credits ·
  Custom); "what credits buy" strip (social post ~6, dashboard ~20, deck ~40,
  research ~60); seven-question FAQ with `FAQPage` JSON-LD. **Credit policy:**
  per seat, no rollover, top-ups any time. `PricingPlan` gains `credits` and
  `featuresLead`; `data/pricing.ts` exports `CREDIT_EXAMPLES`, `CREDITS_NOTE`.
- **"Free trial" → "free pilot" site-wide** (nav, hero, footer, closing CTA,
  industry pages, trial page, pricing metadata) to match the 1-week / 1-user /
  100-credit pilot.
- **404 redesigned** — metadata + `noindex`, nav/footer, curious `AiOrb`, links
  to key pages.
- **Industry pages** — "Your data team for…" → "Your AI employees for…";
  "Join the waitlist" CTAs → "Start free pilot"; each page features an AI
  employee (Meera for pharma/manufacturing, Nora for SaaS/fintech/healthcare).
- **Trial page** — pilot framing in eyebrow/H1/subline; "Live in a day / 50+
  connectors" → "Connected in minutes / native connectors plus any MCP tool";
  stale `/api/trial` comment corrected (form posts to the Apps Script URL).
- **Product tour video** — new `common/video-tour.tsx` (click-to-load
  YouTube, `VideoObject` JSON-LD). "Meet your AI team" (1:38) embedded in the
  AI employees section as `#tour`; hero gets a "Watch the tour" pill.
- **Hero card (`PromptGenerationCard`) reworked** — no empty canvas, AI
  employee status pill with sources, send button, brand-ink Save, app-accurate
  rail. See [[sections]].
- **Homepage repositioned around AI employees** (follows the Oct 2026 sales
  deck). Hero: "AI employees that *answer, explain and act.*"; closing CTA:
  "Your newest hire. *Ready on day one.*"; `siteConfig.tagline` and
  `description` updated to match.
- **`sections/agents.tsx` → `sections/ai-employees.tsx`** — named roster
  (Nora, Ezra, Kira, Meera) plus Nora's approval-gated run card. See
  [[sections]].
- **"Agents" retired from customer-facing copy** — now "AI employees" in
  hero, EnterpriseReady, XuraVs, the hero `PromptGenerationCard` flow node and
  `data/pricing.ts`. "Flows" stays the name for automations.
- **`AiOrb` gains `accent` and `spin` props** (ported from the app's
  `AiOrb`): `accent` sets `--orb-accent` and adds `.m-orb--tinted`, which
  recolours the antenna arc and halo (`ai-orb.css`).
- **New tokens:** `--raw-color-violet-500 / orange-600 / amber-500 / teal-600`
  → `--employee-chief-of-staff / marketing / recruiting / quality` (mirrors the
  app's `DOMAIN_COLOR`). See [[design-system]].
- **WhatsApp mockup made realistic** (`graphics/channel-scene.tsx`) — real
  WhatsApp Business chrome (status bar, verified header, wallpaper, green
  outgoing bubbles with read ticks, reply buttons, composer). New tokens
  `--raw-color-wa-*` → `--whatsapp-wallpaper / bubble-out / action / read /
  meta`.
- **Gotcha:** Tailwind scans `obsidian/` notes; a wildcard class-shaped
  placeholder in `design-system.md` broke the CSS build. Reworded, and a
  warning added to [[design-system]].

## 2026-10-10
- **Pricing page (`/pricing`)** — new `PricingView` with hero, three plan cards
  (Starter / Growth / Enterprise, Growth featured) and a native `<details>`
  FAQ. Content in `src/data/pricing.ts` is **placeholder** — replace with real
  plans before launch. Added "Pricing" to nav, footer and `sitemap.ts`.
  See [[routing]].
- **Nav: removed the "Channels", "Product" and "Why Xura" anchors** from `site-nav.tsx`
  (footer links kept).

## 2026-10-09
- **GA tag moved into the static `<head>`** — `GoogleAnalytics` now renders
  plain `<script>` tags instead of `next/script` (which only left a preload in
  the head and injected the tag from the body).

## 2026-10-08
- **Google Analytics 4** — new `GoogleAnalytics` component
  (`src/components/common/google-analytics.tsx`) in the root layout's `<head>`,
  loading gtag.js on every page. Driven by the new optional
  `NEXT_PUBLIC_GA_ID` env var (`src/env.ts`, `.env.example`); no ID → no tag. Production ID `G-7003QHMXL2` set in
  `.env.production`.
  See [[components/common]].
- **Repo cleanup before first push** — removed build output/caches, stray
  `package-lock.json` (CI uses `yarn.lock`), `.DS_Store` files, and unused
  assets `public/whatsapp-mockup-v2.png` (superseded by `ChannelScene`) and
  `public/apple-icon-180x180.png` (icons come from `src/app/icon.tsx`).
  Repository initialised with `git init`.

## 2026-10-04
- **Channels: Slack and Teams alongside WhatsApp** — `whatsapp.tsx` renamed to
  `channels.tsx` (`Channels`, `#channels`). New "Works where your team already
  works" band with a WhatsApp / Slack / Teams / Web channel row; marks live in
  the new `src/components/graphics/channel-marks.tsx`. Hero subline, footer
  link ("Channels" → `/#channels`), site meta description, trial page benefit
  and trial metadata updated to name all three channels. Aligns the site with
  the product's login pillars ("Works in Slack, Teams and WhatsApp").
- **Quick wins from the product-alignment review** — Features gets a
  `Grounded in your data` eyebrow; XuraVs gains a *Proactivity* row (monitors,
  signals, recommendations) and its Output/Actions rows now name briefs,
  research, decks, infographics and approve-then-run agents; EnterpriseReady
  leads with an expanded "Agents act with your approval" item (replaces the
  one-line Human-in-the-loop entry).
- **Real logos and profile photos in scenes** — `channel-marks.tsx` now
  renders the official WhatsApp / Slack / Teams SVGs (`public/assets/brands/`)
  instead of hand-drawn approximations, so the channel row, ChannelScene and
  HowItWorks sources card all update. New `graphics/avatar.tsx`: Priya's
  Slack avatar, a Daniel/Wei/Sarah shared-with stack on the Teams brief, a
  Wei/Sarah "notifies" row on the Recommendation card, and the real Xura logo
  as Xura's avatar in Slack and WhatsApp. Photos are free Unsplash portraits
  (`public/assets/people/`, credits in [[folder-structure]]).
- **Share image v3** — `open-graph-v3.png` re-rendered with the official
  channel logos and Xura avatar; `siteConfig.ogImage` updated (v2 retired).
- **Favicon is actually rounded now** — `app/icon.tsx` had `borderRadius` +
  `overflow: hidden` on the wrapper, which Satori (`next/og`) ignores when
  clipping an `<img>`, so the tab icon shipped square. The radius (16 of 64)
  now sits on the `<img>`; corners are transparent.
- **New share image** — `public/open-graph-v2.png` (1200×630) replaces
  `open-graph.png`; `siteConfig.ogImage` updated. Dark product-stage design
  with headline, channel chips, deck crop, recommendation card and WhatsApp
  reply. Uses no real workspace data.
- **Screenshots moved to `public/assets/product/`** (asset convention:
  content assets under `public/assets/<section>/`); unused `files.png`
  removed. Note: moving folders / `sed -i` edits left the Turbopack dev
  server serving stale output twice — restart `yarn dev` after bulk moves.
- **Hero CTA restored** — Product Hunt badge replaced by "Start free trial"
  (→ `/trial`) + "One-time setup · No credit card"; reverses the 2026-08-15
  badge swap. No third-party image request on first paint any more.
- **Lint is clean (`yarn lint` → 0 problems)** — escaped apostrophes in
  `testimonial.tsx` and `trial-form.tsx`; removed an unused
  `eslint-disable` in `app/icon.tsx`; `graphics/ai-orb.tsx` no longer reads a
  ref during render (emotion deck + cursor moved from `useRef` to state; the
  first interval tick swaps in a shuffled deck, so SSR/hydration still agree).
- **Polish pass** — closing CTA rewritten channel-neutral with a second
  "See how it works" ghost pill; trial page intro names all four surfaces;
  top padding trimmed on Features and Recommendations (three white sections
  in a row read as double gaps); nav "Product" → `#how-it-works` plus a new
  "Channels" link. Mobile pass on Agents, Outputs, Channels and CTA: no
  horizontal overflow; Outputs fan is legible but small on phones.
- **Features scene** — knowledge graph moved onto a dark stage with coded
  Entity Manager cards (`graphics/entity-cards.tsx`: merged entity,
  relationship found). Orb docking into the graph unchanged.
- **Channels scene** — `graphics/channel-scene.tsx` replaces the WhatsApp
  phone-mockup PNG: Slack thread with a chart reply, Teams Monday brief and a
  WhatsApp chat, coded on a dark stage with staggered entry and parallax.
- **Outputs shows all five outputs** — infographic (`out-infographic.png`) and
  executive brief (`out-brief.png`) captured and added to the fan and the
  captions alongside dashboard, deck and research.
- **New Recommendations section** (`recommendations.tsx`) — "Recommendations,
  not just reports": monitor → signal → recommendation told on a dark stage
  with coded cards, placed between Features and Agents. Covers the product's
  Monitors / Signals / Recommendations surfaces, which were empty in the
  workspace used for screenshots.
- **Product stages replace plain screenshots** — HowItWorks, Agents and
  Outputs now use composed dark-green stages (`.grain` + `ArcField`) with
  tight `ShotCrop` crops and coded floating cards (sources connecting,
  workspace ready, an agent run that stops at an approval gate, a prompt
  fanning into dashboard/deck/research) animated with `Inview` and
  `SpringTrigger` scrub. `ProductShot` removed; `ShotCrop` and `ArcField` added.
- **New home sections: HowItWorks, Agents, Outputs** — built on real product
  screenshots in `public/product/` (2880×1800, 2×: `home`, `workflows`,
  `dashboard`, `out-deck`, `out-research`, plus unused `files`). New shared
  `ProductShot` frame (`components/common/product-shot.tsx`) and a
  `shadow-product` elevation token. Home order now: Hero → Domains →
  HowItWorks → Features → Agents → Outputs → Channels → XuraVs → …
  **Before launch:** screenshots still show real workspace data (user name on
  home, company names, HR/CTC figures on the dashboard) — owner accepted this
  for now; recapture from a demo workspace before shipping.

## 2026-08-15
- **Nav: Sign in is now the primary CTA** —
  `src/components/sections/site-nav.tsx` swaps the two header buttons:
  "Sign in" (→ `app.xuralabs.com`) is now the filled primary on the right;
  "Start Free Trial" (→ `/trial`) is the outlined secondary on the left.
  Reflects shift toward existing-user re-entry as the header's primary
  action.

- **Hero: Product Hunt badge replaces trial CTA** —
  `src/components/sections/hero.tsx` swaps the "Start free trial" pill and
  the "One-time setup · No credit card" caption for the Product Hunt
  featured embed badge (external `<img>` hitting `api.producthunt.com`).
  Removes the primary hero conversion CTA — trial signup remains reachable
  via `/trial` and the footer nav.

## 2026-08-15
- **Footer: layout tightened** — nav row (logo + inline links) sits tight
  above the industries row (`pt-5` + `mt-2` gap). Copyright line moved to
  the very bottom of the footer, below the pixel wordmark, as a small
  uppercase caption at 40% opacity. Pixel-wordmark band shortened to
  `clamp(10rem, 22vw, 22rem)` so the footer no longer eats a full viewport
  of green space. See [[pixel-wordmark]].
- **Footer: pixel-wordmark with cursor field** —
  new `src/components/graphics/pixel-wordmark.tsx` replaces the static
  giant "Xura AI" text at the bottom of `site-footer.tsx`. Rasterised
  into a 20 px canvas grid; gaussian cursor field (σ ≈ radius × 0.55,
  radius 20 px) shrinks cells inward and brightens them under the
  pointer (8090.ai-style inward pop), with always-on rAF for
  frame-locked smoothness. Container height clamps to
  `clamp(12rem, 34vw, 36rem)` and the text is refit to 92% of width.
  Full-bleed, dark-on-dark, gated by `IntersectionObserver`, disabled
  for reduced-motion / coarse pointers. See [[pixel-wordmark]] and
  ADR-0024.

## 2026-08-14
- **Copy: hero subtext rewritten to name the data + agents** —
  `src/components/sections/hero.tsx` sub-paragraph now reads: "Plug in
  your data and MCP tools. Xura's agents watch for the signals your
  team would overlook and answer every WhatsApp question with a live
  dashboard, deck, or workflow, so you're always ready to decide."
  Prior copy ("Ask any business question on WhatsApp...") read like a
  generic Q&A tool and did not convey that answers come from the
  user's own systems or that agents surface patterns proactively.
- **Branding: PWA + Apple icons regenerated from Xura logo** —
  `public/android-icon-{36,48,72,96,144,192}.png` and
  `public/apple-icon-180x180.png` were still the old statue asset.
  Regenerated from `public/assets/xura-logo.png` via `sips -Z`.
  Affects the PWA `manifest.json` icon set, iOS home-screen icon, and
  the `Organization.logo` JSON-LD in
  `src/utils/seo/structured-data.ts` (points at the 192px file).
- **SEO: OG image dimensions corrected to 1200×630** —
  `src/utils/seo/generate-page-metadata.ts` now declares the standard
  1.91:1 social-card size (was 900×600). Pair with a matching
  `public/open-graph.png` asset at 1200×630 to avoid WhatsApp/Twitter
  cropping or scaling the preview oddly.

## 2026-08-12
- **CI: build with webpack, not Turbopack** —
  `.github/workflows/deploy.yml` now runs `yarn next build --webpack`.
  Turbopack's static-export path fails to resolve
  `next/font/google`'s internal virtual module on a clean CI cache
  (works locally because `.next/cache` is warm), which was breaking
  every Pages deploy. See ADR-0023. Local `yarn build` unchanged.
- **Fix: mobile mascot misplaced in KnowledgeGraph** —
  `src/components/graphics/knowledge-graph.tsx` no longer embeds the
  mobile static `AiOrb` inside `<foreignObject>`. iOS Safari resolves
  `%` sizes on foreignObject HTML descendants against the outer SVG
  viewport (not the foreignObject box), which stretched the wrapper
  and dropped the flex-centered orb at the bottom-right of the graph.
  Orb is now a sibling absolute-positioned overlay on the wrapping
  `relative` div, positioned to the HUB's viewBox coordinates via
  `top: HUB.cy / VB.h`. Same `sm:hidden` gate, same size, correct
  place on mobile Safari.
- **Scroll: reset to top on route change** — `ScrollController` in
  `src/layouts/scroll-layout.tsx` now calls `lenis.scrollTo(0, {
  immediate: true })` whenever `pathname` changes without a hash.
  Previously only the initial mount reset scroll, so client-side
  navigation (e.g. Home → `/industries/manufacturing`) left the reader
  on the previous page's scroll position — visible on desktop and
  worse on mobile. First-mount case is skipped to avoid double-work
  with Lenis init.
- **SEO: sub-page title template + cleanup** — root layout now sets
  `title: { default, template: "%s · Xura" }` in `src/app/layout.tsx`.
  Sub-page titles updated to bare labels (Next appends ` · Xura`):
  `Industries, Xura` → `Industries`;
  `Start your Xura free trial` → `Free trial`;
  `Xura for <label>` → `<label> intelligence`.
  `generateMetadata`'s `title` prop now accepts `Metadata["title"]`
  (string or `{default,template,absolute}` object).
- **SEO: root tab title + site description** — added
  `siteConfig.tagline = "agentic intelligence platform"` in
  `src/lib/site.ts`; root layout renders `<title>Xura agentic
  intelligence platform</title>`. Site description tightened to
  `"WhatsApp-native AI over your business data."` (drives the meta
  description, OG, Twitter). Sub-page metadata still overrides
  per-page; a title-template pass is queued but not applied yet.
- **Nav "Sign in" restyled** — was a light-border outline pill; now a
  dark-outline pill (`border-foreground` / `text-foreground`) that fills
  to `bg-foreground` / `text-background` on hover. Kept the outline
  affordance so it stays visually secondary to the filled "Start Free
  Trial" CTA. `src/components/sections/site-nav.tsx`.
- **Adaptive scaling grid: threshold lowered to 1440px** —
  `GRID_BREAKPOINTS` (in `src/components/common/grid/grid.config.ts`) drops
  the `{1920, 1920}` entry; the matching `@media (max-width: 1920px)` block
  in `src/app/globals.css` is removed; root layout mounts
  `<AdaptiveGrid coef={1} />` for fully proportional scale-up. Fixes the
  1441–1920px shrink-valley (font-size was 12–15px on common laptop
  displays) and grows the layout 1:1 on 4K desktops. Devices ≤ 1440px are
  unaffected — the 1440/1024/640 vw media queries are unchanged.
  See ADR-0021 in [[decisions-log]].
- **Hero microcopy** — replaced `1 Million tokens · No credit card required`
  with `One-time setup · No credit card` under the "Start free trial" CTA
  in `src/components/sections/hero.tsx`.
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

### Light haze on white sections (2026-11-16)
- Stronger light-haze palettes (`scripts/generate-gradient-textures.py`), textures regenerated.
- `HazeField` now sits behind every white content section (home, platform, apps, deployment, industries), variants alternating 0/1/2; FAQs stay plain white.
- Seams: `HazeField` gets `.mask-band` (fades 7rem at top/bottom to the page base), so neighbouring haze sections blend instead of meeting at a hard edge.
- Home roster: Kira's orb is now an `OrbDockSlot` (`roster-kira`) — on desktop the floating site orb flies into Kira's spot and springs back to the corner when the roster scrolls away.
- Light haze toned down 50% (tints halved toward paper in `generate-gradient-textures.py`) — owner found it loud.

### Nav restructure + 6 new pages (2026-11-16, ADR-0041)
- New pages: /ai-employees, /workflows, /integrations, /security, /ai-transformation, /bootcamp (`views/subpages.tsx`, `data/subpages.ts`, `sections/shared/feature-sections.tsx`).
- Nav: Platform menu relabelled and pointed at real pages; new "How we work" menu; footer links and sitemap updated. SEO check: 18 pages, no errors.
- /platform sections now link to their pages: Connect → /integrations, Outputs → /ai-employees, Flows → /workflows, Trust → /security (Apps already linked). Platform title/H1/section label say "workflows" instead of "flows".
- Cards on haze sections: `rounded-3xl bg-line-soft` → `border border-line bg-background` everywhere (grey cards looked muddy on tinted haze). Home industries tablist: white track, active tab ink.

### Deeper sub-pages + output cards (2026-11-16, ADR-0042)
- Six sub-pages rebuilt with topic-specific sections (walkthroughs, profiles, diagrams, checklists) from new `depth-sections.tsx`; copy in `data/subpages.ts`.
- "What they produce" (home) and Outputs rail (platform): dark `--field-1` cards, screenshot area fixed at `h-60` so cards no longer stretch with an empty gap.

### Free bootcamp, animated menus, real logos (2026-11-16, ADR-0043)
- Bootcamp is **free for the first 50 companies** everywhere (home, deployment, bootcamp, trial, pricing, JSON-LD, menu card). FAQ: free for the first 50, then paid with the fee credited.
- `NavDropdown`: spring open/close (clip-path unroll + fade, content drops in); fixed hover-then-click closing the menu (mouse click now keeps it open; touch/keyboard toggle).
- New `LogoMarquee` (`graphics/logo-marquee.tsx`) with real brand marks from Simple Icons (`data/brand-logos.ts`, CC0) on /integrations and /platform Connect. New `.mask-x` utility.
- Home "How we deliver": platform card shows the Hiring pipeline app (`HiringAppPreview`) instead of the old Flows screenshot, plus a "Platform overview" button; copy says workflows.
- Removed "mid-size companies" positioning: home title is now "AI Transformation, Built for Your Business"; meta description, Organization/Service JSON-LD audience and "What is Xura" FAQ now say pharma and manufacturing teams.
- Home platform card: Hiring app preview scaled to 62% (`origin-top-left scale-[0.62]`) with a deeper bottom gradient, so it matches the team card; lead copy says workflows.
- Home team card: photo now inset and framed like the app preview (absolute, rounded-2xl, 4:3, same offset, same card fill and gradient) instead of full-bleed.
- `ApprovalFeed`: rebuilt on one `useTransition` (absolute slots, 5.25rem apart): new card drops in from above, others glide down a slot and fade (1 → 0.7 → 0.4), oldest slides out and fades. Replaces per-tick remounts that made older cards jump.

### Review fixes, priority items 1–4 (2026-11-16)
- **Phone menu** (`site-nav.tsx`): grouped Platform / How we work / Industries lists with every page (from `PLATFORM_MENU`, `HOW_MENU`, `INDUSTRIES`), scrollable, 44px rows. Previously 9 pages were footer-only on phones.
- **Copy:** remaining "flows" → "workflows" (home hero sub, roster lead, home FAQ, deployment, platform Trust/Flows copy, apps compare, industries meta, footer blurb).
- **Industries order:** Pharma, Manufacturing, Healthcare, SaaS, Fintech (home tabs, menus, phone menu).
- **Free bootcamp surfaced:** `siteConfig.bootcampOffer` ("Free for the first 50 companies") under every bootcamp CTA (home hero, PageHero, PlatformHero, CtaBand, home closing) and as a badge on the home bootcamp section.

### Review fixes, items 5–11 (2026-11-16)
- `ApprovalFeed`: source chip hidden below `sm`, so task and status no longer truncate on phones.
- Home roster: 2×2 grid on phones (was one long column).
- `FlowBuilderPreview`: below `md` the canvas is replaced by a vertical step list (with "If critical / If minor" branch labels); canvas from `md` up.
- Home hero: wider, darker radial shade behind the copy on phones (opacity 0.7), unchanged feel on desktop.
- Tap targets ≥44px: FAQ summaries (padding moved from `<details>` to `<summary>`, home + shared FAQ), logo, phone-menu Docs / Sign in (`NavLink` takes `className`), footer Cookie settings.
- /ai-employees hero: four orb cards (name + job) as the hero visual.
- Pricing view copy: "flows" → "workflows".
- Still open: SAP / Salesforce / BigQuery logos await owner confirmation (ADR-0043).
- Integration logos expanded (owner: keep SAP / Salesforce / BigQuery and add more): `LogoMarquee` is now two rows drifting in opposite directions — systems of record (SAP, Oracle, Salesforce, HubSpot, Zoho, Odoo, Snowflake, BigQuery, Databricks, Redshift, Postgres, MySQL, MongoDB, AWS, Google Cloud) and where work happens (Notion, Confluence, Google Drive, Google Sheets, Dropbox, Airtable, Slack, WhatsApp, Gmail, Google Calendar, Jira, Asana, Zendesk, Tableau, Looker, Stripe, Razorpay, QuickBooks). `data/brand-logos.ts` exports `SYSTEMS_LOGOS`, `WORK_LOGOS`, `BRAND_LOGOS`. /integrations group lists match.
- Removed the "Free for the first 50 companies" tagline under bootcamp CTAs, the home bootcamp badge, the /bootcamp hero/closing taglines and the menu card title (owner: not wanted). `siteConfig.bootcampOffer` deleted. The offer remains in FAQ answers, body copy, meta descriptions and JSON-LD.
- Free-bootcamp offer removed site-wide (owner): FAQ is now "What does the bootcamp cost?" (quoted per company, fee credited to the deployment); body copy, /trial, pricing view, meta description and JSON-LD no longer mention "first 50 companies".
- Home hero video now plays on phones (like wonderful.ai): `public/assets/video/hero-sequence-mobile.mp4` — centre-cropped 9:16, 540×960, ~1.5 MB (vs 15 MB desktop), plus a 34 KB phone poster. `BackgroundVideo` takes `mobileSrc` / `mobilePoster`, mounts the video only after `window.load`, and skips it for reduced motion, Data Saver and 2G connections (they keep the poster). Swaps source when the viewport crosses `md`.
- **Photos replaced with real Pexels photography** (owner: generated stand-ins looked smudged): team-workshop, bootcamp-room and the five industry photos, same filenames at 2000 / 1080 / 640 px (`public/assets/photos/CREDITS.txt`). `PhotoFill` lost its lens-blur copy, and photo grain dropped from 0.35 to 0.12 (`--raw-opacity-photo-grain`), so photos are sharp edge to edge.
- `FlowField` dark tone toned down ~50% (owner: lines too prominent): connectors 0.1→0.05, card outlines 0.22→0.1 (hot 0.6→0.3), card fill 0.04→0.02, nodes 0.28→0.14 (hot 0.75→0.4). Light tone unchanged.
- Product tour video (from the live site) embedded on /platform and /ai-employees (`VideoSection`, VideoObject JSON-LD, click-to-load). /ai-employees also shows a coded replica of Nora's product profile page (`EmployeeProfilePreview`) in a new "Inside the product" section.
- /ai-employees: closing CTA "Meet your first AI employee now." (was "in 2 weeks"); product video narrowed to 46rem; "Inside the product" is now a full-width section (points in a 4-up row, profile below at 68rem) and `EmployeeProfilePreview` lays out day strip + routines side by side (`lg:[1fr_2fr]`, routines 2×2) — desktop card 1088×819 instead of 520×1403.
- `EmployeeProfilePreview` rebuilt to match the product page layout (owner): large orb, full-width "A day with Nora" strip on a 24-hour grid with icon markers and a two-column legend (5 routines incl. learning retro and hourly meeting prep), routine rows with line icons, schedule, Run now and switch (3 shown). Compact type; card max 52rem (was 68rem).
- `StickyHeader` scrolled state: `bg-background/80 backdrop-blur-md` → `bg-background/95 backdrop-blur-xl backdrop-saturate-150` (80% white over dark heroes read as a loud grey band).
- `StickyHeader` adaptive glass (owner: solid white too loud): transparent at top; once scrolled, dark frosted glass (`bg-foreground/35`, white ink) over dark sections and light glass (`bg-background/55`) over light ones, detected from the `<section>` under the header (`text-background` = dark), rAF-throttled.
- /trial restyled to v2 (FlowField amber panel, no yellow accents, display font on the form heading) and copy fixed: agenda Day 1 / Day 2 / After (matches /bootcamp), WhatsApp-first channel list, "bring the process owner" line, submit "Request my bootcamp" (was "Book my demo"), phone default India (+91), use-case field "Which job would you hand over first?", success link → /deployment.
- Platform and How we work mega-menus: the fixed bootcamp card is replaced by an image that follows the hovered item (like Industries) — product screens for product items, team photos for service items, with a caption. Each `PLATFORM_MENU` / `HOW_MENU` item now has `image { src, alt }`.
- Reverted (owner): Platform / How we work menus back to the fixed "Start with a 2-day bootcamp" card; the hover-image variant is gone (item `image` data kept, unused).
- LinkedIn (https://www.linkedin.com/company/xuralabs/) added to `siteConfig.profiles` → footer "Find us" link and Organization `sameAs` JSON-LD.
- Closing CTA headings unified on the "… now." pattern (owner liked "Meet your first AI employee now."): home "Meet your AI team now.", platform "See the platform on your data now.", workflows "Build your first workflow now.", apps "Build your first app now.", integrations "Connect your systems now.", security "Start your security review now.", AI transformation "Start your AI transformation now.", bootcamp "Book your 2-day bootcamp now.", deployment "Start your deployment now.", use cases "Hand over this job now.", comparisons "Meet your first AI employee now." Subs keep the promise: "Start with a 2-day bootcamp. See it live in 2 weeks."
- Industry "What changes" stats: values now 2xl–3xl light (not display size) in equal top-aligned white cards, so long values like "MES · LIMS · QMS · ERP" no longer wrap and misalign the row. Channel values stay "WhatsApp" (owner).
- `ChecklistSection`: a single list now renders centred at 52rem with items in two columns (was half-width with an empty right column, e.g. the industry "Systems … connect" section).
- Industry pages and /industries closing headings follow the "… now." pattern: "Start your {industry} AI transformation now." (acronyms like SaaS kept) and "Start your AI transformation now." with the "See it live in 2 weeks" promise in the sub.
- Docs removed from the top nav (desktop + phone menu); it stays in the footer. `site-nav.tsx` `LINKS` is now empty.
- **Ported to the live repo (2026-11-16):** `~/Documents/xura-marketing-live`, branch `v2-redesign` from `origin/main` (db99617), commit fc82d4b (168 files). Live-repo CI build + SEO check pass (28 pages). Not pushed: the local GitHub credential has no write access (403). Merging to `main` deploys to xuralabs.com via `.github/workflows/deploy.yml`. Removes /pricing.
- Product tour section SEO/AEO pass: heading "See it in 98 seconds" → "Watch Xura's AI employees at work" (label "Product tour · 2 min"; the video is 1:38, so no "1 minute" claim); leads name Xura; visible "In this video" highlights list; VideoObject JSON-LD only on /platform (home + /ai-employees opt out) with `publisher`, `inLanguage`, `SeekToAction`; YouTube thumbnail falls back to `hqdefault`.
- Scroll performance pass: Lenis `lerp` 0.1 → 0.16 (less trailing); `StickyHeader` dark-section detection via IntersectionObserver (no per-frame layout reads) and `backdrop-blur-md`; `AiOrb` pauses CSS loops + emotion cycle off-screen (`.m-orb--paused`) and its blurred halo gets its own layer; `OrbDockSlot` scroll measuring rAF-throttled. Note: the Claude desktop browser pane caps scrolling at ~30fps even on a blank page — judge smoothness in a real browser / production build.
- **SEO/AEO pass (2026-11-16):** `public/llms.txt` rewritten (key facts + every page); new `scripts/llms-full.mjs` generates `out/llms-full.txt` from the built pages after every build (`npm run build`, deploy workflow), stripping nav/footer and `aria-hidden` mockups. FAQs added to /industries/healthcare, /saas and /fintech (drafted from existing site facts — owner to review). /platform gets `SoftwareApplication` JSON-LD (`getPlatformStructuredData`). Sitemap drops build-time `lastModified`; robots.txt drops `Host:`. /trial is `noindex, follow` and out of the sitemap (`pageMetadata({ noindex })`, `NOINDEX` in seo-check). Home hero posters are one art-directed `<picture>` (eager, high priority) instead of two preloaded images. /privacy title lengthened. SEO check: 28 pages, no errors or warnings.
- Home: new `TeamStrip` above "What we build" — a dark band with a slow marquee of teams (Operations, Quality, Sales, Leadership, Hiring, Marketing, IT), each linking to its use-case page (internal links, not décor). Motion runs on the shared ticker (`useLoopInView`), pauses off-screen, static for reduced motion.
- Use-case pages: the scenario section no longer says "Example" three times (owner: too loud). Label "Example" → "In practice"; headings "An example …" → "From report to signed investigation" / "A typical morning" / "A typical month-end" / "A typical month" / "A typical week"; the "Example only, not a customer result." opener is removed.
- /trial (`views/trial.tsx`) review fixes: headline `display-light` → `display-light-md` and tighter spacing, so the agenda cards and points sit above the fold at 1440×900; orb line now states cost ("Paid, quoted per company. The fee is credited to your deployment.") instead of repeating "your data"; new point "A Xura deployment lead runs both days with your process owner"; phones get a one-line agenda (cards/points stay sm+); form heading keeps "2-day" on one line (`whitespace-nowrap`), form column top-aligned on `lg` (`lg:pt-48`) to line up with the headline; shorter intro. Social proof still pending (needs owner material).
- /bootcamp review fixes (`BOOTCAMP`, `BC_PREP` in `data/subpages.ts`): prep item "two half-days" → "A room for both days; your people join for about half of each" (no longer contradicts "two days"); FAQ "Is it on site?" → plain "Yes" (owner confirmed on site); cost answer says "Book a bootcamp" (was "Book a call") and quotes before scheduling; new FAQs from existing facts — data safety during the bootcamp, who comes from Xura (the deployment lead); "A plan to go live" card → "A written go-live plan" (removes the third repeat); Nora's product output shot added under "What you leave with". First-job examples not added (owner: nothing yet). `AnswerBlock` spacing tightened site-wide.
- Footer: "Book a bootcamp" and "Sign in" moved out of the Product list into pills under the brand blurb (inverse solid + outline, full width on phones). The 16-link Product column split into Product (7) and How we work (7, incl. the comparison pages), so the five link columns are balanced.
- **Ported to the live repo (2026-11-16, second batch):** `~/Documents/xura-marketing-live`, branch `v2-redesign`, commit 7384be9 on top of fc82d4b (SEO/AEO pass, scroll perf, team strip, /trial, /bootcamp, use-case and footer fixes). `yarn.lock` and `next-env.d.ts` were not synced (local noise; CI uses the committed lockfile). CI-style `next build --webpack` + seo-check (28 pages, no errors) + llms-full pass. Pushed after re-authenticating the GitHub CLI via browser device login with `repo,workflow` scopes (earlier tokens returned 403). PR harshaparuchuri/xura-marketing#14 merged to `main` 2026-11-16 → "Deploy to GitHub Pages" run 43857308696 succeeded; live on xuralabs.com (verified /, /platform, /bootcamp, llms.txt, llms-full.txt, robots.txt).
- **Share image v4 (v2 positioning):** old `open-graph-v3.png` ("The intelligence layer for leaders, one chat away", serif, green) replaced by `public/og-image.png`, rendered by new `scripts/og-image.mjs` (`npm run og`) with `next/og` and Figtree instanced to static TTFs (`src/fonts/og/`): monochrome, home-hero headline, sub, pills (2-day bootcamp · Live in 2 weeks · You approve every output), xuralabs.com. All 28 pages emit it for `og:image` and `twitter:image` (with alt). `manifest.json`: "App" → "Xura AI" + short name, description, start URL, colours. `siteConfig.themeColor` yellow → ink. Shipped via PR harshaparuchuri/xura-marketing#15 (branch `share-image-v2`), deploy run 43858884503.
- Full-site audit fixes (live review of 28 pages × desktop/mobile): `app/not-found.tsx` now runs a pre-paint redirect (GitHub Pages has no server redirects) — trailing slash → same path without it (`/platform/` was 404), and retired routes via `MOVED` (`/pricing` → `/bootcamp`); new `SkipLink`; platform/team card scrims stronger on phones; home hero scrim and ghost button stronger on desktop; "Example:" prefix dropped from home industry tabs and /industries cards.
- Audit fixes shipped via PR harshaparuchuri/xura-marketing#16 (branch `audit-fixes`), deploy run 43860836377 succeeded. Verified live: `/platform/` → `/platform`, `/pricing` → `/bootcamp`, skip link present, no "Example:" prefix.
- CTAs: new `CtaPair` — "Book a 2-day bootcamp" with "or talk to us" under it (hero/closing bands site-wide); use-case, use-cases index and comparison pages lead with "Talk to us" instead. "Talk to us" opens `/trial?talk` (heading "Talk to our team", 30-minute call), GA4 `cta: "talk"`. "See how we deploy" buttons now go to `/deployment`.
- **"Talk to us" is the primary CTA site-wide (owner):** header, footer, hero and closing pills, 404 and the floating orb now say "Talk to us" (→ `/trial?talk`, heading "Talk to our team"). "Book a 2-day bootcamp" leads only on /bootcamp and bootcamp-specific sections. The "or …" secondary text links were removed (owner: not needed).
- "Talk to us" CTA change shipped via PR harshaparuchuri/xura-marketing#17 (branch `talk-to-us-cta`), deploy run 43890166724 — first attempt failed in CI fetching the Bitter font from Google Fonts (`next/font/google` loader, transient); re-run succeeded, live and verified.
- Product tour video sections (/platform, /ai-employees): the "In this video" highlights list under the player is removed (owner: not required); `PRODUCT_TOUR.highlights` deleted.
- Video highlights removal shipped via PR harshaparuchuri/xura-marketing#18, deploy run 43896423384 succeeded; verified live on /platform and /ai-employees.
- **Bitter font removed.** No live page used the serif (only unused v1 components with `display-serif` / `font-serif`), yet every page preloaded a Bitter woff2 and the build fetched it from Google Fonts — the cause of the CI failure on PR #17. `layout.tsx` now loads Figtree only; `--font-display` falls back to Figtree. One font preload per page (28 KB) instead of two; no build-time network fetch for fonts.
- Bitter removal shipped via PR harshaparuchuri/xura-marketing#19, deploy run 43898648919 succeeded first time; live home page has 1 font preload.
- **New /about page (2026-11-18):** who Xura is, how we work (four principles), the team (Harsha Paruchuri, Balavinod Vaitla, Sreedatta Y N V; headshots in `public/assets/team/`, bios from the sales deck notes), “Where we’ve built” (ADP, Darwinbox, IBM, Townhall, CA Technologies, Practo, Microsoft, iGate as text), office address. Footer: About link + office address. New `siteConfig.address` (Hyderabad, Telangana 500019, India) feeds the footer, /about and Organization JSON-LD (now with `postalCode`). Sitemap + llms.txt updated. SEO check: 29 pages, no errors.
- /about: team headshots removed (owner: no photos of people); cards show name, role and bio only. `public/assets/team/` deleted.
- /about team section reworked (owner): no individual people (names, roles, bios removed); now a 30+ years line plus a logo grid of companies the team has built at: ADP, IBM, Townhall, CA Technologies, Practo, Microsoft, iGate (Darwinbox dropped). Logos in `public/assets/logos/`.
- /about logo grid: added Virtusa (formerly Polaris Financial Technology, from Harsha’s LinkedIn), now 8 logos (4 + 4). Company list checked against both founders’ LinkedIn profiles; Darwinbox and PASS GCA excluded. A23 (Head Digital Works) and Tutoryoung logos still needed: their sites could not be reached.
- /about logo grid: added Head Digital Works (A23), logo from hdworks.in recoloured to the shared grey; now 9 logos in a 5 + 4 grid (`BuiltAtLogo.stacked` shows multi-line marks taller). Tutoryoung still pending (site gone).
- Top nav: new “Company” link → /about (desktop and phone menu). /about answer block question “Who is Xura?” → “What is Xura?”.
- /about: workplace photo (Pexels 7580644, same series as the site’s other office photos; 2000/1080/640 WebP, credited in `public/assets/photos/CREDITS.txt`) between “How we work” and the team section, with caption.
- Copy: every “deployment lead” (21 places: home, /deployment, /bootcamp, /trial, /about, subpages, pricing data, alt text, llms.txt) now says “our team” (owner: say team, not one person). /deployment section label “Our team on your site”, heading “People on your site, not a ticket queue”; FAQ “Xura’s team works with each customer directly, on site.” Internal names (`DEPLOY_LEAD`, `DeployLead`) unchanged.
- Copy: no more “one new workflow every quarter” or “hand it over / move on to the next job” (owner: must not sound like we leave after launch). Now an ongoing partnership: “We stay with you”, “taking up new requests as they come”, “keep adding jobs as you need them”. Home 5-step strip step 5 = “We stay with you”; /deployment timeline last step “Ongoing · We stay with you”; /ai-transformation 90-day plan “Tune it together” + “Ongoing · We stay with you”; FAQs, pov “Run it together”, /about caption, llms.txt updated.
- Copy tone pass on the partnership wording (owner: make it professional): “We stay with you” → “Continuous improvement” (home step 5, /deployment and /ai-transformation timelines); “taking up new requests as they come” → “delivering new requirements as they arise / as your business evolves”; “Run it together” → “Long-term partnership”; “Tune it together” → “Refine and adopt”; /about caption “remain your partner long after launch”.
- Home: new “Our team has built products at” logo strip above the FAQ (same logos as /about, muted, links to /about). Placed late and labelled deliberately so it is not read as customer logos.
- Home logo strip is now a carousel (`BuiltAtMarquee`: endless spring-driven drift, pauses off screen, still for reduced motion); “Meet the team” link removed. Logo order (shared with /about) set by owner: ADP, IBM, CA Technologies, Virtusa, Microsoft, Practo, iGate, Townhall, Head Digital Works.
