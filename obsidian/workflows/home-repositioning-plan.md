---
tags: [workflow, copy, positioning, draft]
updated: 2026-11-14
status: built in xura-marketing-v2 (2026-11-14) — see ADR-0033
---

# Home page repositioning — forward-deployed model (draft plan)

Planning note for rewriting the home page around the **platform + deployment
team** positioning from the Nov 2026 pitch deck. No code has changed yet.

## Positioning shift

| | Current home | New home |
|---|---|---|
| What we are | An AI employee product | Platform + our team on the ground, deployed for you |
| Who it's for | Many industries | Mid-size companies in **all industries** (pharma is one, not the only one) |
| First step | Free pilot | Paid 2-day bootcamp on their own data |
| Core message | Features and integrations | Someone finally makes AI work for you |

Decided: keep the marketing site **industry-agnostic**. Pharma stays one of the
industry pages (pharma, manufacturing, healthcare, fintech, SaaS).

## Proposed section order (10, down from 14)

Hero → Problem → How we deliver → AI employees → Product → Industries →
Why Xura → Built for trust → Bootcamp offer → Closing CTA.

Cut: `DomainsStrip`, `Recommendations`, `Outputs` + `Channels` (folded into
Product), `CaseStudy` (return after the December pilots have a result).

## Draft copy

1. **Hero** — eyebrow *AI transformation for mid-size companies*. H1 options:
   "Your AI team, deployed by ours. Live in weeks." / "We don't sell you AI. We
   make it work." Sub: Xura puts AI employees to work across sales, operations,
   quality and leadership. Our deployment team connects your ERP, CRM and
   spreadsheets and ships the first one in about four weeks. Every number
   traceable, every output approved by you. CTAs: **Book a 2-day bootcamp** ·
   Watch the demo.
2. **Problem** — "Most companies still run on spreadsheets, manual decks and
   email approvals." Pillars: scattered data · manual work · no AI team. Band:
   "Another tool won't fix it. Someone has to make it work." Stat: MIT 2025 —
   vendor/partner-led deployments succeed about twice as often as internal
   builds (no pharma-only stats).
3. **How we deliver** — "Our team deploys it. You run it." Prove it (2-day
   bootcamp) → Embed (deployment lead maps systems, picks one workflow) → Build
   on Xura (no side code) → Go live (~4 weeks) → Expand (next job every quarter).
4. **AI employees** — "Start with one job. Add the next every quarter." Nora
   (sales review), Meera (quality/ops issue tracking), Ezra (leadership decks),
   Kira (hiring).
5. **Product** — "Every AI employee does the work. You approve it." Connect →
   Ask → Act → Approve. Works in WhatsApp, Slack, Teams and email.
6. **Industries** — "Built for industries the software wave left behind." Cards
   link to existing industry pages, each with a first job to deploy.
7. **Why Xura** — "Others bring people or software. We bring both." Agencies /
   IT services (every build from zero) · software alone (you make it fit) ·
   Xura (platform + team, every build reused).
8. **Built for trust** — traceable numbers, approvals + audit log, your data
   stays yours; only badges we can back up.
9. **Bootcamp offer** — "See it on your own data in two days." Paid; fee
   credited to the deployment.
10. **Closing CTA** — "Your first AI employee, live in weeks."

## Open decisions

- Hero headline choice.
- Show ₹ pricing on site? Recommendation: no, just "paid bootcamp".
- Don't name Palantir publicly (investor language).
- Confirm which "Also" jobs each AI employee can do today (avoid overpromising).
- Update pricing page and industry pages to the same model?

## Review against wonderful.ai (2026-11-14)

What wonderful.ai's homepage does (enterprise AI OS, platform + deployment teams):
- **Platform + people** stated as one line of three parts: "the AI platform,
  deployment teams, and strategic partnership". Then each part gets its own short
  block with one link: OS (list of platform pieces), "Deployment teams in every
  market" ("build it with you, then hand it over and move to the next use
  case"), Strategy ("which problems, what order").
- **Proof first**: logo strip directly under the hero, then 7 outcome-titled case
  cards with numbers ("Collections across 2.5 million clients", "91.5%
  containment rate"). Trust = logos + named outcomes + funding/partner news +
  Trust Center / AI Safety / Bug Bounty in the footer. No feature claims.
- **CTAs**: one primary, "Get in touch", repeated hero → footer band; secondary
  "Explore the platform". Each section has one quiet text link.
- **Tone**: short, confident, enterprise-strategic, transformation language
  ("operating layer", "AI-native enterprise"). Few words per section; mission
  ("we're hiring the people who'll define it").

Where our plan already matches: platform + team as the core idea; "hand it
over, next use case" ≈ our Expand step; trust as a section.

Where we differ (keep on purpose): mid-size, plain-spoken, a concrete paid first
step and timeline. Their abstract enterprise tone would weaken that, so don't
copy it.

### Proposed edits

1. **Hero** — pick "Your AI team, deployed by ours. Live in weeks." It says
   platform + people in one line, the way their three-part line does. Shorten
   the sub to two sentences: "AI employees for sales, operations, quality and
   leadership — deployed by our team on your ERP, CRM and spreadsheets. First
   one live in about four weeks, every output approved by you." Primary CTA
   "Book a 2-day bootcamp"; make the secondary "See how we deploy" (anchor to
   How we deliver) instead of "Watch the demo" until a demo exists.
2. **Proof directly under the hero** — they put proof second; our plan has none
   until Trust (section 8). Add a thin strip: pilot logos *only with permission*,
   or else one credible line such as "Deploying with [n] mid-size companies across
   pharma, manufacturing and fintech". Bring back `CaseStudy` with a numbered,
   outcome-titled card ("Monthly sales review: 3 days → 2 hours") as soon as the
   December pilots produce one.
3. **Problem** — keep it, but cut to the band line plus the MIT stat; three
   pillars plus a band plus a stat is more than they spend anywhere.
4. **How we deliver** — rename the step chips to outcomes and add their
   hand-over idea: "Our team deploys it. You run it. Then we move to the next
   job." Name the people: "A deployment lead on your site, not a ticket queue."
5. **Why Xura** — this is our version of their three-part line; promote it right
   after How we deliver (swap with AI employees) so the argument reads problem →
   who fixes it → why us → what they do.
6. **AI employees / Product** — merge into one section ("Start with one job. You
   approve every output.") to get down to 9 sections; they show the platform as
   one compact list, not two sections.
7. **Industries** — keep the per-industry "first job" cards (more concrete than
   their name-only list), but drop "software wave left behind" for "Built for
   companies that run on spreadsheets and email" (echoes the Problem, no slight
   to the reader's industry).
8. **Built for trust** — add footer-level trust links like theirs (security /
   data handling page) only once those pages exist; until then, three plain
   claims we can back up.
9. **CTAs** — like theirs, one primary everywhere: "Book a 2-day bootcamp"
   (hero, bootcamp section, closing). Per-section secondary links stay text-only.
   Closing: "Your first AI employee, live in weeks. Start with two days on your
   own data."
10. **Tone** — borrow their brevity (aim ≤ 25 words of body per section), not
    their abstraction. Avoid "transformation", "OS", "AI-native" outside the
    eyebrow.

## SEO / AEO review — agent simulation (2026-11-14)

Three simulations against the draft + edits above: a Google ranking audit
(10 queries), an answer-engine citation test (8 ChatGPT/Perplexity-style
prompts) and three buyer personas arriving from search.

**Main finding:** the draft speaks *our* language ("AI team", "AI
transformation", "deployed by ours"); buyers search for *jobs and categories*
("automate monthly sales review", "AI implementation partner", "AI employees
for mid-size companies"). The page has no "Xura is …" sentence, so engines
can't cite it for "What is Xura?".

What the current home emits: layout-default title, no `pageMetadata` in
`src/app/page.tsx`, site-wide Organization + WebSite JSON-LD, and a
free-pilot `SoftwareApplication` Offer in `src/utils/seo/structured-data.ts`
that contradicts the paid bootcamp. FAQPage exists only on `/pricing`.

### Changes (supersede hero edit 1 where they conflict)

1. **Metadata** (set via `pageMetadata` with an absolute title):
   - Title (58): `AI Employees for Mid-Size Companies, Deployed by Our Team`
   - Description (151): `Xura deploys AI employees for sales, operations and
     quality on your ERP, CRM and spreadsheets. Start with a paid 2-day
     bootcamp. Live in about 4 weeks.`
2. **H1 carries the keywords; the slogan becomes a tagline.** H1: "AI employees
   for mid-size companies, deployed by our team". "Your AI team, deployed by
   ours. Live in weeks." moves to a styled `<p>`.
3. **Definitional sentence in the hero sub:** "Xura builds AI employees and
   sends its own deployment team to set them up inside mid-size companies. The
   first one goes live in about four weeks." Every slogan elsewhere gets a
   factual sentence beside it.
4. **Use the words buyers use:** add "AI implementation partner" (Why Xura h2:
   "Implementation partner or build in-house? Get both."), "automate", "reports".
5. **Job first, name second** on AI-employee cards/h3s: "Monthly sales review
   (Nora)", not "Nora".
6. **H2 outline:** Why AI projects stall at mid-size companies → An AI
   implementation partner that deploys it for you → Why Xura vs agencies or
   software alone → AI employees for sales, operations, quality and leadership →
   Industries → Built for trust → The 2-day AI bootcamp → FAQ → Closing.
7. **Add a home FAQ (6 Qs) + FAQPage JSON-LD:** What is Xura? · What is a
   forward-deployed AI team? · How long does deployment take? · What is the
   2-day bootcamp? · How is Xura different from an AI agency? · Where do the AI
   employees work? Keep answers ≤ 50 words, only facts in this plan, and don't
   repeat `/pricing` FAQ questions. It also lifts the page above the ~400
   crawlable words the 25-word cap would leave.
8. **JSON-LD:** remove the free-pilot Offer; add `Service` (AI implementation,
   audience mid-size companies); add `sameAs` to Organization. A bootcamp Offer
   without a price earns no rich result — skip it or model as `Course`.
9. **Explain "paid" in the CTA:** "Book a 2-day bootcamp on your data — fee
   credited to your deployment."
10. **Proof:** no "[n] companies" placeholder may ship; "Monthly sales review:
    3 days → 2 hours" only once a pilot produces a real number. Link the MIT
    2025 source.
11. **Add `/llms.txt`:** the definitional sentence plus one-line links to Home,
    bootcamp, AI employees, Industries, Pricing.
12. **Separate pages later** (home can't rank for these): use-case pages
    (`/use-cases/sales-review-automation`), `/partner-vs-in-house`, and a fair
    `/compare/wonderful-ai` with no competitor branding.

### Answered (2026-11-14)

- **Location / market:** based in Hyderabad, India; serves India and Southeast
  Asia. → Organization `address` (Hyderabad, Telangana, IN), `areaServed`
  [India, Southeast Asia]; one copy line, e.g. FAQ "What is Xura?": "…based in
  Hyderabad, working with companies across India and Southeast Asia."
- **Mid-size:** internal target ₹100–1,000 crore revenue. **Not published.**
  Buyers don't like being labelled by size, so the site describes the
  customer by situation, not size: "companies that run on ERP, spreadsheets
  and email, without an AI team". The word "mid-size" stays only where search
  needs it (meta description, one FAQ answer); it is dropped from the H1,
  eyebrow and title. Supersedes SEO changes 1–2: title `AI Employees, Deployed
  by Our Team | Xura`; H1 "AI employees, deployed by our team on your systems".

### Still open

- Tagline / H1 sign-off.

## Next step

Sign off the H1 and tagline, then build.


## Update 2026-11-15 — apps infra

Xura now also custom-builds apps and agentic flows on the platform. Message:
our team finds the work that needs attention, decides where an AI agent can
improve it, and custom-builds the AI employees, apps and flows around that
process. Applied across the home copy, FAQ, JSON-LD, `llms.txt` and the
site tagline; the H1 stays "AI employees, deployed by our team on your
systems" for search. Open: name real apps/flows once pilots ship them; the
industry pages still describe only AI employees.

## Update 2026-11-15 — hero: AI transformation

Decided: the hero no longer sells "AI employees". "AI transformation" is the
category (search + budget line), made concrete and small:
**"AI transformation, built one workflow at a time."** No tagline above it.
Title "AI Transformation for Mid-Size Companies | Xura AI". This reverses the
earlier "avoid 'transformation'" rule for the H1/title only; body copy stays
concrete (bootcamp, ~4 weeks, approvals). Closed open decision: hero headline.

Update (same day): H1 changed to **"AI transformation, built for your business."** — "one workflow at a time" read as small, automation-tool scope.
