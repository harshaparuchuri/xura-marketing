"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { AiOrb } from "@/components/graphics/ai-orb";
import { useOrbDock } from "@/hooks/use-orb-dock";

/**
 * KnowledgeGraph — animated context-graph illustration for the Features
 * section. Three tiers rendered in a single SVG:
 *
 *   1. DATA SOURCES row of real brand marks up top.
 *   2. A central slot that the site-wide floating `AiHelpAgent` docks into
 *      while this section is in view (see `useOrbDock` + `AiHelpAgent`).
 *   3. DASHBOARDS & ACTIONS row along the bottom.
 *
 * Motion is spring-based per project rules: connector dashes flow via a
 * looped `useSpring` on `strokeDashoffset`; the docked orb's arrival is
 * handled by the AiHelpAgent itself.
 */

const SOURCES = [
  { id: "salesforce", label: "Salesforce", Mark: SalesforceMark },
  { id: "hubspot", label: "HubSpot", Mark: HubSpotMark },
  { id: "snowflake", label: "Snowflake", Mark: SnowflakeMark },
  { id: "slack", label: "Slack", Mark: SlackMark },
  { id: "postgres", label: "Postgres", Mark: PostgresMark },
  { id: "notion", label: "Notion", Mark: NotionMark },
] as const;

const OUTPUTS = [
  { id: "chart", label: "Bar chart" },
  { id: "pct", label: "87%" },
  { id: "amt", label: "$2M" },
  { id: "spark", label: "Sparkline" },
] as const;

/* ── Layout constants (viewBox 600×450) ─────────────────────────────────── */
const VB = { w: 600, h: 450 } as const;
const SOURCE = { size: 44, gapY: 60, cx: VB.w / 2, count: 6 };
const OUTPUT = { w: 108, h: 66, y: 360, cx: VB.w / 2, count: 4 };
const HUB = { cx: VB.w / 2, cy: 220, size: 84 };

// Distribute N tiles evenly around a centre with a stride.
function spread(count: number, cx: number, stride: number) {
  const total = (count - 1) * stride;
  const start = cx - total / 2;
  return Array.from({ length: count }, (_, i) => start + i * stride);
}

export const KnowledgeGraph = ({ className }: { className?: string }) => {
  const setTarget = useOrbDock((s) => s.setTarget);
  const svgRef = useRef<SVGSVGElement>(null);
  const slotRef = useRef<SVGRectElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Publish the orb slot's viewport rect while the graph is in view. Clear it
  // when out of view so the orb returns to its bottom-right dock.
  useEffect(() => {
    const svg = svgRef.current;
    const slot = slotRef.current;
    if (!svg || !slot) return;

    let visible = false;
    const publish = () => {
      if (!visible) return;
      const r = slot.getBoundingClientRect();
      setTarget({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, size: r.width });
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = (entry?.isIntersecting ?? false) && (entry?.intersectionRatio ?? 0) > 0.35;
        if (visible) publish();
        else setTarget(null);
      },
      { threshold: [0, 0.35, 0.7, 1] },
    );
    io.observe(svg);
    const onScroll = () => publish();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      setTarget(null);
    };
  }, [setTarget]);

  // Flowing dashes on the connector stems.
  const flow = useSpring({
    from: { offset: 0 },
    to: { offset: -18 },
    loop: true,
    config: { duration: 1800 },
  });

  const sourceXs = spread(SOURCE.count, SOURCE.cx, 88);
  const outputXs = spread(OUTPUT.count, OUTPUT.cx, 126);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Mobile-only static hub avatar. Rendered as a sibling overlay
          (not inside <foreignObject>) because iOS Safari resolves %
          dimensions on foreignObject descendants against the outer SVG
          viewport, not the foreignObject box — which pushed the orb to
          the bottom-right of the graph. Position mirrors the SVG's HUB
          slot (cx=50%, cy=HUB.cy/VB.h ≈ 48.9%). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 flex justify-center sm:hidden"
        style={{ top: `${(HUB.cy / VB.h) * 100}%`, transform: "translateY(-50%)" }}
      >
        {mounted ? <AiOrb size={56} expressive /> : null}
      </div>
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="h-full w-full"
      role="img"
      aria-label="Xura context graph. Data sources on top connect through the Xura hub to dashboards and actions below."
    >
      <defs>
        <linearGradient id="kg-stem" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--duo)" stopOpacity="0.05" />
          <stop offset="50%" stopColor="var(--duo)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--duo)" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="kg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--duo)" stopOpacity="0.28" />
          <stop offset="70%" stopColor="var(--duo)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--duo)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Top eyebrow */}
      <text x={VB.w / 2} y={22} textAnchor="middle" fontSize="9" fontWeight={700} fill="var(--muted)" letterSpacing="3">
        DATA SOURCES
      </text>

      {/* Source tiles */}
      {SOURCES.map((s, i) => {
        const x = sourceXs[i]! - SOURCE.size / 2;
        return (
          <g key={s.id} transform={`translate(${x}, 40)`}>
            <rect
              width={SOURCE.size}
              height={SOURCE.size}
              rx="10"
              fill="var(--background)"
              stroke="var(--foreground)"
              strokeOpacity="0.12"
            />
            <foreignObject x={0} y={0} width={SOURCE.size} height={SOURCE.size}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <s.Mark />
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* Source → hub stems */}
      {sourceXs.map((sx, i) => (
        <animated.line
          key={i}
          x1={sx}
          y1={40 + SOURCE.size + 2}
          x2={HUB.cx}
          y2={HUB.cy - HUB.size / 2}
          stroke="url(#kg-stem)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          strokeDashoffset={flow.offset}
          opacity="0.55"
        />
      ))}

      {/* Hub slot: soft glow + invisible rect that AiHelpAgent docks into.
          The orb itself is NOT rendered here; it flies in from bottom-right. */}
      <circle cx={HUB.cx} cy={HUB.cy} r={HUB.size / 2 + 20} fill="url(#kg-glow)" />
      {/* Mobile static hub avatar lives outside the SVG — see wrapper above. */}
      <rect
        ref={slotRef}
        x={HUB.cx - HUB.size / 2}
        y={HUB.cy - HUB.size / 2}
        width={HUB.size}
        height={HUB.size}
        fill="transparent"
      />
      <text x={HUB.cx} y={HUB.cy + HUB.size / 2 + 20} textAnchor="middle" fontSize="9" fill="var(--muted)" letterSpacing="1">
        connects · reasons · acts
      </text>

      {/* Hub → outputs stems */}
      {outputXs.map((ox, i) => (
        <animated.line
          key={i}
          x1={HUB.cx}
          y1={HUB.cy + HUB.size / 2}
          x2={ox}
          y2={OUTPUT.y - 4}
          stroke="url(#kg-stem)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          strokeDashoffset={flow.offset}
          opacity="0.55"
        />
      ))}

      {/* Bottom eyebrow */}
      <text x={VB.w / 2} y={OUTPUT.y - 14} textAnchor="middle" fontSize="9" fontWeight={700} fill="var(--muted)" letterSpacing="3">
        DASHBOARDS &amp; ACTIONS
      </text>

      {/* Output tiles */}
      {OUTPUTS.map((o, i) => {
        const x = outputXs[i]! - OUTPUT.w / 2;
        return (
          <g key={o.id} transform={`translate(${x}, ${OUTPUT.y})`}>
            <rect
              width={OUTPUT.w}
              height={OUTPUT.h}
              rx="10"
              fill="var(--background)"
              stroke="var(--foreground)"
              strokeOpacity="0.12"
            />
            <g transform={`translate(${OUTPUT.w / 2}, ${OUTPUT.h / 2})`}>
              {o.id === "chart" && (
                <g fill="var(--foreground)" transform="translate(-32, -16)">
                  <rect x={0} y={20} width={10} height={12} rx="1.5" />
                  <rect x={16} y={12} width={10} height={20} rx="1.5" />
                  <rect x={32} y={4} width={10} height={28} rx="1.5" />
                  <rect x={48} y={16} width={10} height={16} rx="1.5" />
                </g>
              )}
              {o.id === "pct" && (
                <text textAnchor="middle" y="8" fontSize="22" fontWeight={700} fill="var(--foreground)">
                  87%
                </text>
              )}
              {o.id === "amt" && (
                <text textAnchor="middle" y="8" fontSize="22" fontWeight={700} fill="var(--foreground)">
                  $2M
                </text>
              )}
              {o.id === "spark" && (
                <polyline
                  points="-32,10 -18,4 -6,8 6,-6 18,-2 30,-14"
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
            </g>
          </g>
        );
      })}
    </svg>
    </div>
  );
};

/* ── Brand marks (recognisable, brand-coloured) ────────────────────────── */
/* Kept local to this file so the graph is self-contained; matches the
   marks used elsewhere in the workflow scene. */

function SalesforceMark() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22}>
      <path d="M9 6.5a3.5 3.5 0 0 1 6.4-2A4 4 0 0 1 22 8a3.5 3.5 0 0 1-1.4 6.7A4 4 0 0 1 13 17a3.5 3.5 0 0 1-6.2-.8A3.5 3.5 0 0 1 3 12a3.5 3.5 0 0 1 2.2-3.3A3.5 3.5 0 0 1 9 6.5z" fill="#00a1e0" />
    </svg>
  );
}

function HubSpotMark() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#ff7a59" strokeWidth="1.8">
      <circle cx="17" cy="12" r="4" />
      <path d="M17 8V4M13 12H9M6 18a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" strokeLinecap="round" />
    </svg>
  );
}

function SnowflakeMark() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} stroke="#29b5e8" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9" />
      <circle cx="12" cy="12" r="2.2" fill="#29b5e8" stroke="none" />
    </svg>
  );
}

function SlackMark() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22}>
      <rect x="4" y="10" width="6" height="2.5" rx="1.25" fill="#36c5f0" />
      <rect x="11.5" y="4" width="2.5" height="6" rx="1.25" fill="#2eb67d" />
      <rect x="14" y="11.5" width="6" height="2.5" rx="1.25" fill="#ecb22e" />
      <rect x="10" y="14" width="2.5" height="6" rx="1.25" fill="#e01e5a" />
    </svg>
  );
}

function PostgresMark() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22}>
      <path d="M12 3c-2.8 0-5 .7-5 2.3 0 .8.6 1.5 1.5 1.9-.3 4 .6 8.2 2 10.8.6 1 1.5 2 2.5 2s1.6-.7 2.2-1.8c1-1.9 1.6-4.9 1.8-8.2.1-1.1.1-2.1 0-2.9.8-.4 1.3-1 1.3-1.8C18.3 3.7 15.5 3 12 3z" fill="#336791" />
    </svg>
  );
}

function NotionMark() {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: 4,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.15)",
        color: "#000",
        fontFamily: "'Times New Roman', serif",
        fontWeight: 900,
        fontSize: 14,
      }}
    >
      N
    </span>
  );
}
