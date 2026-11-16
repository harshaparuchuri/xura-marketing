#!/usr/bin/env node
/**
 * Renders the site's share image (Open Graph + Twitter card) to
 * `public/og-image.png`, 1200×630, with `next/og` (Satori):
 *
 *   npm run og
 *
 * Re-run whenever the headline or positioning changes, and commit the PNG.
 * A static PNG (not app/opengraph-image.tsx) because: (1) pages set their own
 * `openGraph`, which drops an inherited file-convention image on sub-pages,
 * and (2) static export writes that route as `opengraph-image` with no
 * extension, which GitHub Pages serves without an image content type.
 *
 * Satori can't read CSS variables or variable/woff2 fonts: colours mirror the
 * `--raw-color-*` tokens in globals.css, and Figtree is instanced to static
 * 300/500 TTFs in `src/fonts/og/` (fontTools instancer).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";

const root = process.cwd();
const light = readFileSync(join(root, "src/fonts/og/Figtree-300.ttf"));
const medium = readFileSync(join(root, "src/fonts/og/Figtree-500.ttf"));
const logo = `data:image/png;base64,${readFileSync(join(root, "public/assets/xura-logo.png")).toString("base64")}`;

// Mirrors --raw-color-ink-950 / --raw-color-white (globals.css).
const INK = "#101112";
const WHITE = "#ffffff";

// Keep in step with the home hero (src/views/home.tsx → HomeHero).
const HEADLINE = "AI transformation, built for your business.";
const SUB = "Our team finds the work AI should do and custom-builds the apps and workflows that do it.";
const POINTS = ["2-day bootcamp on your data", "Live in 2 weeks", "You approve every output"];

const pill = (text) =>
  h(
    "span",
    {
      key: text,
      style: {
        display: "flex",
        padding: "10px 20px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.25)",
        fontSize: 22,
        fontWeight: 500,
        color: "rgba(255,255,255,0.9)",
      },
    },
    text,
  );

const tree = h(
  "div",
  {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      padding: "64px 72px",
      background: INK,
      backgroundImage: "radial-gradient(circle at 85% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%)",
      color: WHITE,
      fontFamily: "Figtree",
    },
  },
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 16 } },
    h("img", { src: logo, width: 56, height: 56, style: { borderRadius: 14 } }),
    h("span", { style: { fontSize: 30, fontWeight: 500, letterSpacing: -0.5 } }, "Xura AI"),
  ),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column" } },
    h("div", { style: { fontSize: 84, fontWeight: 300, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 940 } }, HEADLINE),
    h(
      "div",
      { style: { marginTop: 28, fontSize: 30, fontWeight: 300, lineHeight: 1.35, color: "rgba(255,255,255,0.72)", maxWidth: 900 } },
      SUB,
    ),
  ),
  h(
    "div",
    { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
    h("div", { style: { display: "flex", gap: 12 } }, ...POINTS.map(pill)),
    h("span", { style: { fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.6)" } }, "xuralabs.com"),
  ),
);

const res = new ImageResponse(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Figtree", data: light, weight: 300, style: "normal" },
    { name: "Figtree", data: medium, weight: 500, style: "normal" },
  ],
});
const out = join(root, "public/og-image.png");
writeFileSync(out, Buffer.from(await res.arrayBuffer()));
console.log("wrote public/og-image.png");
