// 📖 Docs: obsidian/frontend/design-system.md → "Responsive images"
//
// `next/image` loader for the static export: there is no image server, so each
// requested width maps to a variant made by scripts/resize-images.mjs. Other
// images are served as they are. `?w=` only satisfies next/image's loader check.
const RESIZED = /^\/(assets\/product|industries)\/.+\.webp$/;
const LOGO = "/assets/xura-logo.png";

export default function imageLoader({ src, width }) {
  if (src === LOGO && width <= 128) return `/assets/xura-logo-128.png?w=${width}`;
  if (RESIZED.test(src)) {
    if (width <= 640) return `${src.replace(/\.webp$/, "-640.webp")}?w=${width}`;
    if (width <= 1080) return `${src.replace(/\.webp$/, "-1080.webp")}?w=${width}`;
  }
  return `${src}?w=${width}`;
}
