---
tags: [workflow, seo]
updated: 2026-10-18
---

# SEO checklist

What Google needs from every page, and how this repo enforces it.
`scripts/seo-check.mjs` checks the static build (`out/`) for all of the
**automated** items below. It runs in CI after the build (`deploy.yml`) and
fails the deploy on any error. Run it locally with:

```bash
npx next build --webpack && node scripts/seo-check.mjs
```

Related: [[seo-metadata]], [[html-semantics]], [[new-page]], [[decisions-log]] ADR-0027.

## Automated per page (errors fail the deploy)

| # | Check | Why |
|---|-------|-----|
| 1 | `<html lang>` set | Language targeting |
| 2 | `<title>` present; **30–65 chars** (warning), **unique** across the site | Title is the result headline; Google truncates ~60 chars |
| 3 | Meta description present; **70–160 chars** (warning), unique | The result snippet |
| 4 | **Canonical = this page's own URL** | Otherwise Google treats the page as a duplicate of whatever it points to |
| 5 | Not `noindex` | The page must be indexable |
| 6 | `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` | Link previews on LinkedIn, Slack, X and WhatsApp |
| 7 | **Exactly one `<h1>`**, not empty; headings don't skip levels (warning) | Clear page topic and outline |
| 8 | JSON-LD parses; `Organization` on every page; `BreadcrumbList` on inner pages (warning) | Rich results and the brand panel |
| 9 | Industry pages show a visible breadcrumb nav | Users and Google see the hierarchy |
| 10 | Every `<img>` has `alt` (empty `alt=""` is OK for decorative images) | Image search and accessibility |
| 11 | Internal links resolve to a built page | No broken links or crawl dead ends |
| 12 | Page is listed in `sitemap.xml` | Discovery |

**Site-wide:** `robots.txt` exists and points to the sitemap; every sitemap URL
has a built page; no duplicate titles or descriptions.

## How to pass them when adding a page

- Export metadata with `pageMetadata({ title, description, path })` from
  `utils/seo/generate-page-metadata.ts`. It sets the canonical, `og:url` and the
  social titles. **Never** set only `title`/`description`, or the page inherits
  the layout's canonical `/`.
- Add the route to `src/app/sitemap.ts`. Industry pages are listed
  automatically from `INDUSTRIES`.
- Inner pages render `<Breadcrumbs crumbs={…} />`
  (`components/common/breadcrumbs.tsx`), which also emits `BreadcrumbList`.
- One `<h1>` per page, then `h2` → `h3` with no skipped levels.

## Speed (Core Web Vitals) — checked with Lighthouse, not the script

- **LCP text must be visible in the HTML.** Don't animate `opacity` from 0 on the
  hero `h1` or subline. Springs may slide (`y`), but not fade.
- **No root `app/loading.tsx`.** With static export it wraps the whole page in
  a hidden Suspense `<div>` that is revealed only by a script at the end of the
  HTML (ADR-0027).
- Canvas or WebGL loops start after `load` plus idle, run at ≤30fps, and
  pause off screen and when the tab is hidden (see `hero-backdrop.tsx`).
- Images in `public/` are **WebP**, at most ~1920px wide (`cwebp -q 80 -resize 1920 0`).
  `next/image` doesn't optimise under static export.
- Check with `npx lighthouse <url> --only-categories=performance,seo`, or
  PageSpeed Insights once live.

## Manual / off-page (not automatable here)

- Google Search Console: verify `xuralabs.com`, submit the sitemap, and
  watch Coverage and Core Web Vitals.
- Content that targets real searches (one topic per page), case studies and
  comparison pages.
- Backlinks: G2, Product Hunt, partner and press listings.
