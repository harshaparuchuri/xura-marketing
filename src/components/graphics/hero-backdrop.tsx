"use client";

import { useEffect, useRef } from "react";

/**
 * HeroBackdrop — subtle rotating low-poly wireframe rendered behind the hero.
 * Ported from the Xura app's post-login home page (canvas + rAF, zero deps).
 * Honours prefers-reduced-motion.
 */

type Vec3 = { x: number; y: number; z: number };
type Surface = (u: number, v: number) => Vec3;
type Form = Surface | Surface[];

function makeCylinder(cx: number, cy: number, cz: number, radius: number, height: number): Surface {
  return (u, v) => {
    const theta = u * Math.PI * 2;
    return {
      x: cx + Math.cos(theta) * radius,
      y: cy + (v - 0.5) * height,
      z: cz + Math.sin(theta) * radius,
    };
  };
}
function makeSphere(cx: number, cy: number, cz: number, radius: number): Surface {
  return (u, v) => {
    const theta = u * Math.PI * 2;
    const phi = v * Math.PI;
    return {
      x: cx + Math.sin(phi) * Math.cos(theta) * radius,
      y: cy + Math.cos(phi) * radius,
      z: cz + Math.sin(phi) * Math.sin(theta) * radius,
    };
  };
}

const FORMS: Record<string, Form> = {
  // torus knot (2,3) — WhatsApp/connectivity vibe, our default for the hero.
  torusKnot: [
    (u, v) => {
      const s = u * Math.PI * 2;
      const R = 0.6,
        r = 0.22;
      const tube = 0.08;
      const angle = v * Math.PI * 2;
      const cx = (R + r * Math.cos(3 * s)) * Math.cos(2 * s);
      const cy = r * Math.sin(3 * s);
      const cz = (R + r * Math.cos(3 * s)) * Math.sin(2 * s);
      return { x: cx + Math.cos(angle) * tube, y: cy + Math.sin(angle) * tube * 0.6, z: cz };
    },
    makeSphere(-1.25, 0.9, 0.15, 0.1),
    makeSphere(1.25, 0.85, -0.1, 0.11),
    makeSphere(-1.2, -0.7, 0.2, 0.09),
    makeSphere(1.2, -0.75, -0.15, 0.1),
  ],
  coinStack: [
    makeCylinder(0, 0.55, 0, 0.42, 0.2),
    makeCylinder(0, 0.15, 0, 0.62, 0.24),
    makeCylinder(0, -0.32, 0, 0.85, 0.28),
  ],
  helix: [
    (u, v) => {
      const t = u * Math.PI * 4;
      const r = 0.85;
      const angle = t + v * Math.PI;
      return { x: Math.cos(angle) * r, y: (u - 0.5) * 2.1, z: Math.sin(angle) * r };
    },
  ],
};

const U_STEPS = 40;
const V_STEPS = 20;

type Props = {
  form?: keyof typeof FORMS;
  color?: string;
  className?: string;
  /** Multiplier on the shape's on-screen size (fraction of min(width, height)). */
  scale?: number;
};

export const HeroBackdrop = ({
  form = "torusKnot",
  color = "#059669",
  className,
  scale = 0.34,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef({ px: 0, py: 0, form, color, scale });

  useEffect(() => {
    targetRef.current.form = form;
    targetRef.current.color = color;
    targetRef.current.scale = scale;
  }, [form, color, scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rgb = hexToRgb(targetRef.current.color) ?? { r: 5, g: 150, b: 105 };
    const rgbRef = { current: rgb };

    let width = 0,
      height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let curPx = 0,
      curPy = 0,
      rotY = 0,
      raf = 0;

    const onPointer = (e: PointerEvent) => {
      const cx = window.innerWidth / 2,
        cy = window.innerHeight / 2;
      targetRef.current.px = (e.clientX - cx) / cx;
      targetRef.current.py = (e.clientY - cy) / cy;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const project = (p: Vec3, ry: number, rx: number) => {
      let x = p.x * Math.cos(ry) - p.z * Math.sin(ry);
      let z = p.x * Math.sin(ry) + p.z * Math.cos(ry);
      let y = p.y;
      const y2 = y * Math.cos(rx) - z * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z * Math.cos(rx);
      y = y2;
      z = z2;
      const persp = 3.2 / (3.2 + z);
      const s = Math.min(width, height) * targetRef.current.scale;
      return {
        sx: width / 2 + x * s * persp,
        sy: height / 2 + y * s * persp,
        depth: z,
      };
    };

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = targetRef.current;
      const formVal = FORMS[t.form] ?? FORMS.torusKnot;
      const surfaces: Surface[] = Array.isArray(formVal) ? formVal : [formVal];

      curPx += (t.px - curPx) * 0.06;
      curPy += (t.py - curPy) * 0.06;
      const tr = hexToRgb(t.color);
      if (tr) {
        rgbRef.current.r += (tr.r - rgbRef.current.r) * 0.08;
        rgbRef.current.g += (tr.g - rgbRef.current.g) * 0.08;
        rgbRef.current.b += (tr.b - rgbRef.current.b) * 0.08;
      }
      if (!reduced) rotY += dt * 0.18;

      const ry = rotY + curPx * 0.5;
      const rx = -0.32 + curPy * 0.28;
      const offX = -curPx * 26;
      const offY = -curPy * 18;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(offX, offY);
      ctx.lineWidth = 1;
      const { r, g, b } = rgbRef.current;
      const R = Math.round(r),
        G = Math.round(g),
        B = Math.round(b);

      type Node = { sx: number; sy: number; depth: number };
      const allNodes: Node[][][] = surfaces.map((surface) => {
        const grid: Node[][] = [];
        for (let i = 0; i <= U_STEPS; i++) {
          const row: Node[] = [];
          for (let j = 0; j <= V_STEPS; j++) {
            row.push(project(surface(i / U_STEPS, j / V_STEPS), ry, rx));
          }
          grid.push(row);
        }
        return grid;
      });

      const stroke = (a: Node, c: Node) => {
        const depth = (a.depth + c.depth) / 2;
        const alpha = 0.11 + (1 - (depth + 1) / 2) * 0.24;
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(c.sx, c.sy);
        ctx.stroke();
      };

      type Cell = { a: Node; b: Node; c: Node; d: Node; depth: number; light: number };
      const cells: Cell[] = [];
      for (const nodes of allNodes) {
        for (let i = 0; i < U_STEPS; i++) {
          for (let j = 0; j < V_STEPS; j++) {
            const a = nodes[i][j],
              b = nodes[i + 1][j],
              c = nodes[i + 1][j + 1],
              d = nodes[i][j + 1];
            const ex = b.sx - a.sx,
              ey = b.sy - a.sy;
            const fx = d.sx - a.sx,
              fy = d.sy - a.sy;
            const light = Math.max(0, Math.min(1, ((ex * fy - ey * fx) / 1200) * 0.5 + 0.5));
            cells.push({
              a,
              b,
              c,
              d,
              depth: (a.depth + b.depth + c.depth + d.depth) / 4,
              light,
            });
          }
        }
      }
      cells.sort((p, q) => q.depth - p.depth);
      for (const cell of cells) {
        const near = 1 - (cell.depth + 1) / 2;
        const fillA = 0.05 + near * 0.18 + cell.light * 0.08;
        ctx.fillStyle = `rgba(${R},${G},${B},${fillA.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(cell.a.sx, cell.a.sy);
        ctx.lineTo(cell.b.sx, cell.b.sy);
        ctx.lineTo(cell.c.sx, cell.c.sy);
        ctx.lineTo(cell.d.sx, cell.d.sy);
        ctx.closePath();
        ctx.fill();
      }

      for (const nodes of allNodes) {
        for (let i = 0; i <= U_STEPS; i++) {
          for (let j = 0; j < V_STEPS; j++) stroke(nodes[i][j], nodes[i][j + 1]);
        }
        for (let j = 0; j <= V_STEPS; j++) {
          for (let i = 0; i < U_STEPS; i++) stroke(nodes[i][j], nodes[i + 1][j]);
        }
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
