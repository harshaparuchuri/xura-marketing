#!/usr/bin/env node
/**
 * SEO checklist for the static export in `out/`. Run after `next build`:
 *
 *   node scripts/seo-check.mjs            # checks ./out
 *   node scripts/seo-check.mjs path/to/out
 *
 * Exits 1 if any page fails an ERROR check (warnings don't fail). The full
 * checklist and the reasoning behind each rule live in
 * obsidian/workflows/seo-checklist.md.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = process.argv[2] ?? "out";
if (!existsSync(OUT)) {
  console.error(`No build output at "${OUT}". Run the build first.`);
  process.exit(2);
}

// ---------------------------------------------------------------- helpers
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const attr = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : "";
};
const meta = (html, key) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`, "i"));
const textOf = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** out/industries/pharma.html → /industries/pharma ; out/index.html → "" */
const routeOf = (file) => {
  const r = "/" + relative(OUT, file).replace(/\\/g, "/").replace(/(index)?\.html$/, "");
  return r === "/" ? "" : r.replace(/\/$/, "");
};

// Pages that are deliberately not indexed or not real routes.
const SKIP = new Set(["/404", "/_not-found"]);

// ---------------------------------------------------------------- sitemap
const sitemapXml = existsSync(join(OUT, "sitemap.xml")) ? readFileSync(join(OUT, "sitemap.xml"), "utf8") : "";
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const SITE = sitemapUrls[0]?.replace(/\/$/, "") ?? "";

// ---------------------------------------------------------------- checks
const files = walk(OUT).filter((f) => !SKIP.has(routeOf(f)));
const routes = new Set(files.map(routeOf));
const seen = { title: new Map(), description: new Map() };
const results = [];

for (const file of files) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const errors = [];
  const warns = [];
  const err = (m) => errors.push(m);
  const warn = (m) => warns.push(m);

  // 1. Language
  if (!/<html[^>]+lang="[a-z-]+"/i.test(html)) err("<html> has no lang attribute");

  // 2. Title
  const title = attr(html, /<title>([^<]*)<\/title>/i);
  if (!title) err("missing <title>");
  else if (title.length < 30 || title.length > 65) warn(`title is ${title.length} chars (aim 30–65): "${title}"`);
  seen.title.set(title, [...(seen.title.get(title) ?? []), route || "/"]);

  // 3. Meta description
  const description = meta(html, "description");
  if (!description) err("missing meta description");
  else if (description.length < 70 || description.length > 160)
    warn(`description is ${description.length} chars (aim 70–160)`);
  seen.description.set(description, [...(seen.description.get(description) ?? []), route || "/"]);

  // 4. Canonical points at this page
  const canonical = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const expected = `${SITE}${route}`;
  if (!canonical) err("missing canonical");
  else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, ""))
    err(`canonical is ${canonical}, expected ${expected}`);

  // 5. Indexable
  const robots = meta(html, "robots");
  if (/noindex/i.test(robots)) err(`robots meta is "${robots}"`);

  // 6. Social tags
  for (const key of ["og:title", "og:description", "og:image", "og:url", "twitter:card"])
    if (!meta(html, key)) err(`missing ${key}`);
  const ogUrl = meta(html, "og:url");
  if (ogUrl && ogUrl.replace(/\/$/, "") !== expected.replace(/\/$/, "")) warn(`og:url is ${ogUrl}, expected ${expected}`);

  // 7. Headings: exactly one H1, no skipped levels
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: textOf(m[2]),
  }));
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) err(`${h1s.length} <h1> elements (need exactly 1)`);
  else if (!h1s[0].text) err("<h1> is empty");
  let prev = 0;
  for (const h of headings) {
    if (prev && h.level > prev + 1) {
      warn(`heading jumps h${prev} → h${h.level} at "${h.text.slice(0, 40)}"`);
      break;
    }
    prev = h.level;
  }

  // 8. Structured data parses, and the right types are present
  const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set();
  for (const [, json] of ld) {
    try {
      const data = JSON.parse(json);
      const collect = (n) => {
        if (Array.isArray(n)) return n.forEach(collect);
        if (n && typeof n === "object") {
          if (n["@type"]) types.add(n["@type"]);
          Object.values(n).forEach(collect);
        }
      };
      collect(data);
    } catch {
      err("a JSON-LD block does not parse");
    }
  }
  if (!types.has("Organization")) err("no Organization JSON-LD");
  if (route && !types.has("BreadcrumbList") && route !== "/trial") warn("no BreadcrumbList JSON-LD");
  if (route.startsWith("/industries") && !/aria-label="Breadcrumb"/.test(html)) err("no visible breadcrumb nav");

  // 9. Images have alt text (empty alt="" is fine for decorative images)
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/\balt=/.test(i));
  if (noAlt.length) err(`${noAlt.length} <img> without alt`);

  // 10. Internal links resolve to a built page
  const hrefs = [...html.matchAll(/<a\b[^>]+href="(\/[^"#?]*)/gi)].map((m) => m[1].replace(/\/$/, ""));
  const broken = [...new Set(hrefs)].filter(
    (h) => h && !routes.has(h) && !existsSync(join(OUT, h)) && !SKIP.has(h),
  );
  if (broken.length) err(`broken internal links: ${broken.join(", ")}`);

  // 11. Listed in the sitemap
  if (!sitemapUrls.some((u) => u.replace(/\/$/, "") === expected.replace(/\/$/, ""))) err("not in sitemap.xml");

  results.push({ route: route || "/", title, errors, warns });
}

// Site-wide checks
const site = [];
if (!existsSync(join(OUT, "robots.txt"))) site.push("missing robots.txt");
else if (!/Sitemap:/i.test(readFileSync(join(OUT, "robots.txt"), "utf8"))) site.push("robots.txt does not reference the sitemap");
for (const u of sitemapUrls) {
  const r = u.replace(SITE, "").replace(/\/$/, "");
  if (!routes.has(r)) site.push(`sitemap lists ${u} but no page was built for it`);
}
for (const [kind, map] of Object.entries(seen))
  for (const [value, pages] of map) if (value && pages.length > 1) site.push(`duplicate ${kind} on ${pages.join(", ")}: "${value.slice(0, 60)}"`);

// ---------------------------------------------------------------- report
let failed = site.length > 0;
for (const r of results) {
  const status = r.errors.length ? "FAIL" : r.warns.length ? "WARN" : "PASS";
  if (r.errors.length) failed = true;
  console.log(`${status}  ${r.route}`);
  r.errors.forEach((e) => console.log(`        ✗ ${e}`));
  r.warns.forEach((w) => console.log(`        ! ${w}`));
}
if (site.length) {
  console.log("FAIL  site-wide");
  site.forEach((s) => console.log(`        ✗ ${s}`));
}
console.log(`\n${results.length} pages checked against ${SITE || "(no sitemap)"}${failed ? " — errors found" : " — no errors"}`);
process.exit(failed ? 1 : 0);
