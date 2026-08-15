---
tags: [component, graphics, canvas]
updated: 2026-08-15
---

# PixelWordmark

Path: `src/components/graphics/pixel-wordmark.tsx`

Renders a text wordmark rasterised into a grid of cells drawn to a single
canvas. On pointer hover, each cell's brightness and scale rise with proximity
to the cursor (cursor-field), then decay back on `mouseleave`.

Used by [[site-footer]] as the **desktop-only** full-bleed footer band. Mobile
(`< md`) keeps the flat oversized `<p>Xura AI</p>` — the cursor field is
useless on touch, and the giant serif reads better than a low-res grid at
narrow widths.

## Props
- `text` (default `"Xura AI"`) — the string to rasterise.
- `cellSize` (default `14`) — approximate cell edge in CSS px. Smaller = higher
  fidelity but more cells to iterate per frame.
- `radius` (default `140`) — falloff radius of the cursor field in CSS px.
- `className` — passed through to the outer wrapper.

The component fills 100% of its parent; the parent controls the visual size
(the footer wraps it in a `clamp(10rem, 22vw, 22rem)` tall div with `pb-2` so
the base sits just above the footer edge). Container height must give at
least ~10 rows at the chosen `cellSize` — below that the rasterised glyphs
collapse and no cells make the `> 160` alpha threshold. Bump `cellSize` in
tandem with container height so proportions stay chunky.

## How it works

1. **Rasterise once per resize.** An offscreen `<canvas>` sized to `cols × rows`
   (derived from wrapper width/height ÷ `cellSize`) draws the text in a heavy
   system-ui font, sized to fit 92% width then capped at 92% height. Pixel red
   channel is thresholded at `> 160` (well above antialias spill) so only
   ink-solid cells count — otherwise glyph shoulders leak into the grid.
   Rasterise bails early if the wrapper is `display: none` or smaller than one
   cell; important because the desktop-only wrapper starts hidden on mobile
   and `getImageData` throws on a zero-sized source.
2. **rAF render loop with gaussian field.** Each cell's `target` heat is
   `exp(-(dx² + dy²) / (2σ²))` where `σ ≈ radius × 0.55` — smoother than a
   linear falloff, so cells fade out rather than clipping at the edge of the
   field. Heat eases with `heat += (target - heat) * 0.35` (fast enough that
   a moving cursor still lets neighbour cells reach their gaussian target —
   at slower eases the cluster collapses to only the cell under the pointer). Draw as a white
   rect with `alpha = 0.09 + heat * 0.9` and `size = cw * (0.92 - heat * 0.45)`
   — chunky dim base cells (~92% of cell width, 9% alpha) that **shrink inward
   to ~47% and brighten to near-white**
   under the cursor, matching the inward-pop hover cluster on 8090.ai. The
   shrink is the read; brightness reinforces it. Increase `radius` for a
   wider glow, decrease it for a tighter cluster.
3. **Cell centres are precomputed** in `rasterise` (`cell.cx`, `cell.cy`) so
   the hot path is one `exp()` + lerp + fillRect per cell.
4. **Loop runs while the wordmark is visible.** Cheaper to keep rAF running
   frame-locked than to spin it up on `pointermove` — start/stop causes
   perceptible chase-and-catch stutter.
5. **Gated by `IntersectionObserver`.** The loop pauses when the footer scrolls
   off-screen (200 px rootMargin) and resumes on re-entry. When the IO
   callback cancels the pending rAF, it also resets the internal `running`
   flag to `false` — otherwise `kick()` from a later IO callback,
   `pointermove`, or resize sees `running === true` and no-ops, leaving the
   loop permanently stuck.
5. **Reduced motion / coarse pointer.** Skips the loop entirely; draws the
   static grid once. On touch devices this avoids a permanent one-off "hot"
   state and matches the site's reduced-motion posture.

## Why canvas (not DOM or WebGL)

Cells are recomputed every hover frame. A DOM node per cell (~350–500 for a
`Xura AI` wordmark at the default cell size) would thrash layout under
`transform` updates; one canvas paint is ~0.3 ms. WebGL is overkill — this is
axis-aligned rects with a scalar field, no shaders needed.

## Deviation from the animation rule

The site's animation rule says all reveal/scroll/stagger motion is spring-based
via `@react-spring/web`. Cursor-field animations (input-driven, continuous,
per-frame) fall outside that scope and use an exponential ease in a rAF loop
instead. See [[decisions-log]] ADR entry dated 2026-08-15.

## Related
- [[site-footer]] — mounts the wordmark.
- [[design-system]] — token palette (base fill uses white with alpha; brand-ink
  background comes from the footer wrapper).
