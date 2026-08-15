"use client";

import { useEffect, useRef } from "react";

interface PixelWordmarkProps {
  text?: string;
  /** Approximate cell size in CSS pixels. Smaller = higher fidelity. */
  cellSize?: number;
  /** Falloff radius of the cursor field in CSS pixels. */
  radius?: number;
  className?: string;
}

/**
 * Renders a wordmark rasterised into a grid of cells. Cells brighten and
 * scale under the cursor via a canvas render loop; on `mouseleave` the field
 * decays back. Loop is gated by IntersectionObserver and disabled for coarse
 * pointers / reduced motion. See obsidian/frontend/components/pixel-wordmark.md
 * for the model.
 */
export const PixelWordmark = ({
  text = "Xura AI",
  cellSize = 14,
  radius = 140,
  className,
}: PixelWordmarkProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isStatic = coarse || reduced;

    let cells: { x: number; y: number; cx: number; cy: number; heat: number }[] = [];
    let cols = 0;
    let rows = 0;
    let cw = cellSize;
    let ch = cellSize;
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = false;
    let dpr = window.devicePixelRatio || 1;

    const rasterise = () => {
      const rect = wrap.getBoundingClientRect();
      // If the wrapper is display:none (mobile) or too small to hold one
      // cell, bail — otherwise getImageData throws on a zero-sized source.
      if (rect.width < cellSize || rect.height < cellSize) {
        cells = [];
        cols = 0;
        rows = 0;
        return;
      }
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(w / cellSize);
      rows = Math.floor(h / cellSize);
      cw = w / cols;
      ch = h / rows;

      // Offscreen sample: draw text at grid resolution, then read pixels.
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d");
      if (!octx) return;

      octx.fillStyle = "#000";
      octx.fillRect(0, 0, cols, rows);
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      const family = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      const targetW = cols * 0.92;
      const probe = 100;
      octx.font = `900 ${probe}px ${family}`;
      const probeW = octx.measureText(text).width || probe;
      let fontPx = (probe * targetW) / probeW;
      fontPx = Math.min(fontPx, rows * 0.92);
      octx.font = `900 ${fontPx}px ${family}`;
      octx.fillText(text, cols / 2, rows / 2 + fontPx * 0.02);

      const data = octx.getImageData(0, 0, cols, rows).data;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          // Any non-black pixel counts as an "on" cell.
          // Threshold well above antialias spill so only ink-solid cells
          // count — otherwise glyph shoulders leak into the surrounding grid.
          if (data[i] > 160) {
            cells.push({
              x: c,
              y: r,
              cx: c * cw + cw / 2,
              cy: r * ch + ch / 2,
              heat: 0,
            });
          }
        }
      }
    };

    // Gaussian variance derived from `radius` — softer than a linear falloff,
    // so cells fade rather than clip at the edge of the field.
    const sigma = radius * 0.55;
    const sigma2 = 2 * sigma * sigma;

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const active = pointer.active;
      const px = pointer.x;
      const py = pointer.y;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (!isStatic) {
          let target = 0;
          if (active) {
            const dx = cell.cx - px;
            const dy = cell.cy - py;
            target = Math.exp(-(dx * dx + dy * dy) / sigma2);
          }
          // Softer ease than before (0.12) — no start/stop, always-on loop
          // keeps the pointer field frame-locked instead of chasing.
          // Faster ease so heat settles in ~4 frames — otherwise a moving
          // cursor never gives neighbour cells time to reach their target
          // and the cluster collapses to just the cell under the pointer.
          cell.heat += (target - cell.heat) * 0.35;
        }

        const heat = cell.heat;
        // Base cells sit small and dim; hovered cells pop to ~1x cell width
        // and near-white, matching the 8090 look (tight cluster, big delta).
        // Base cells fill most of their tile at a low base alpha; heat
        // (gaussian on distance to pointer) shrinks the cell and brightens
        // it — center-most cell = smallest + brightest, outer cluster cells
        // are larger + dimmer. Wide alpha delta makes the gradient legible.
        const size = cw * (0.92 - heat * 0.45);
        const alpha = 0.09 + heat * 0.9;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(
          cell.cx - size / 2,
          cell.cy - size / 2,
          size,
          size,
        );
      }

      if (!isStatic && visible) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (running || isStatic) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      kick();
    };

    const onLeave = () => {
      pointer.active = false;
      kick();
    };

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) {
          kick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          // Reset `running` so a future `kick()` (from IO re-entry, resize,
          // or pointermove) can restart the loop. Without this, the loop
          // becomes permanently stuck after the first off-screen entry.
          running = false;
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(wrap);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rasterise();
        kick();
      }, 120);
    };

    rasterise();
    draw();

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
    };
  }, [text, cellSize, radius]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};
