#!/usr/bin/env node
/**
 * Writes `out/llms-full.txt` — a plain-text copy of every indexable page for
 * AI answer engines (ChatGPT, Claude, Perplexity). Run after `next build`:
 *
 *   node scripts/llms-full.mjs        # reads ./out, writes ./out/llms-full.txt
 *
 * Generated from the built HTML so it never drifts from the live copy. Page
 * order follows sitemap.xml. `public/llms.txt` (the hand-written index) links
 * to it. See obsidian/workflows/seo-checklist.md.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.argv[2] ?? "out";
const sitemapPath = join(OUT, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  console.error(`No sitemap at "${sitemapPath}". Run the build first.`);
  process.exit(2);
}

const decode = (s) =>
  s
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

/**
 * Remove every element marked aria-hidden="true" with its whole subtree
 * (decorative product mockups carry sample numbers that must not be read as
 * facts). Walks tags with a depth counter so nested same-name tags close
 * correctly.
 */
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const stripHidden = (html) => {
  const open = /<([a-z][a-z0-9-]*)\b[^>]*\baria-hidden="true"[^>]*>/i;
  let out = html;
  for (let m = open.exec(out); m; m = open.exec(out)) {
    const tag = m[1].toLowerCase();
    const start = m.index;
    let i = start + m[0].length;
    if (VOID.has(tag) || m[0].endsWith("/>")) {
      out = out.slice(0, start) + out.slice(i);
      continue;
    }
    const re = new RegExp(`<(/?)${tag}\\b[^>]*?(/?)>`, "gi");
    re.lastIndex = i;
    let depth = 1;
    let t;
    while (depth && (t = re.exec(out))) {
      if (t[1]) depth--;
      else if (!t[2]) depth++;
      i = re.lastIndex;
    }
    out = out.slice(0, start) + " " + out.slice(depth ? out.length : i);
  }
  return out;
};

/** <main> HTML → readable text with markdown headings and list bullets. */
const toText = (html) =>
  decode(
    stripHidden(html)
      .replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/gi, "")
      // Site chrome (the nav lives inside each hero, so inside <main>).
      .replace(/<header\b[\s\S]*?<\/header>/gi, "")
      .replace(/<nav\b[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer\b[\s\S]*?<\/footer>/gi, "")
      .replace(/<h([1-4])\b[^>]*>/gi, (_, n) => `\n\n${"#".repeat(Number(n) + 1)} `)
      .replace(/<\/h[1-4]>/gi, "\n")
      .replace(/<li\b[^>]*>/gi, "\n- ")
      .replace(/<(p|div|section|tr|br|dt|dd|figcaption|blockquote)\b[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .filter((l, i, a) => l && !(l === "-" ) && l !== a[i - 1])
    .join("\n")
    .replace(/\n(?!#|- )/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

const urls = [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const origin = new URL(urls[0]).origin;

const sections = [];
for (const url of urls) {
  const path = new URL(url).pathname.replace(/\/$/, "");
  if (path === "/privacy") continue; // legal text adds noise, not answers
  const file = path === "" ? join(OUT, "index.html") : join(OUT, `${path}.html`);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const title = decode(html.match(/<title>([^<]*)/)?.[1] ?? path);
  const description = decode(html.match(/name="description" content="([^"]*)/)?.[1] ?? "");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  // Drop the page's own <h1> line (the title already names the page).
  const body = toText(main).replace(/^## .*\n/, "");
  sections.push(`# ${title}\n\nURL: ${url}\n\n> ${description}\n\n${body.trim()}`);
}

const header = `# Xura — full site text\n\n> Plain-text copy of every page on ${origin}, generated at build time for AI assistants. Index: ${origin}/llms.txt\n`;
writeFileSync(join(OUT, "llms-full.txt"), [header, ...sections].join("\n\n---\n\n") + "\n");
console.log(`llms-full.txt: ${sections.length} pages`);
