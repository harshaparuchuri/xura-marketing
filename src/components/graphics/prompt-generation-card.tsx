"use client";

import { animated, useSpring, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import { XuraLogo } from "@/components/brand/logo";

/**
 * PromptGenerationCard — desktop-app-styled hero device.
 *
 * A macOS-style window chrome frames a prompt bar at the top and a
 * fixed-size canvas underneath. The output is HIDDEN while the user is
 * typing and only fades in AFTER the prompt finishes. Container aspect
 * stays fixed (16:9) so the surrounding layout never shifts.
 *
 * Motion is spring-based (react-spring `useTransition` cross-fade;
 * useSpring for the output reveal; typing is a state-driven interval).
 */

type Kind = "dashboard" | "slides" | "research" | "workflow";

const SCENES: {
  prompt: string;
  kind: Kind;
  label: string;
  actions: string[];
}[] = [
  {
    prompt: "Show pipeline coverage by segment for Q4",
    kind: "dashboard",
    label: "Dashboard",
    actions: ["Share", "Export .csv", "Save"],
  },
  {
    prompt: "Board deck: Q4 outcomes and next-year bets",
    kind: "slides",
    label: "Slides",
    actions: ["Present", "Export .pptx", "Save"],
  },
  {
    prompt: "Research: what's driving enterprise churn?",
    kind: "research",
    label: "Research",
    actions: ["Cite", "Export .pdf", "Save"],
  },
  {
    prompt: "Reallocate spend from missed CAC campaigns",
    kind: "workflow",
    label: "Workflow",
    actions: ["Approve", "Log", "Run"],
  },
];

const TYPE_MS_PER_CHAR = 32;
const REVEAL_DELAY_MS = 320;
const HOLD_MS = 3800;

export const PromptGenerationCard = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "generating" | "showing">(
    "typing",
  );
  const scene = SCENES[sceneIdx]!;

  useEffect(() => {
    setTyped("");
    setPhase("typing");
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setTyped(scene.prompt.slice(0, i));
      if (i >= scene.prompt.length) {
        clearInterval(typer);
        setPhase("generating");
        const t = setTimeout(() => setPhase("showing"), REVEAL_DELAY_MS);
        return () => clearTimeout(t);
      }
    }, TYPE_MS_PER_CHAR);
    return () => clearInterval(typer);
  }, [sceneIdx, scene.prompt]);

  useEffect(() => {
    if (phase !== "showing") return;
    // Batch scene advance + phase reset in the SAME tick so the next scene's
    // kind isn't briefly rendered under the leaving one (React 18 auto-batches).
    const t = setTimeout(() => {
      setSceneIdx((i) => (i + 1) % SCENES.length);
      setPhase("typing");
      setTyped("");
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const reveal = useSpring({
    opacity: phase === "showing" ? 1 : 0,
    y: phase === "showing" ? 0 : 8,
    config: { tension: 220, friction: 26 },
  });

  const transitions = useTransition(phase === "showing" ? scene.kind : null, {
    keys: (k) => k ?? "empty",
    from: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -6 },
    config: { tension: 220, friction: 26 },
  });

  return (
    <div className="flex overflow-hidden rounded-xl border border-line bg-background shadow-[0_28px_70px_-32px_rgba(16,17,18,0.30)]">
      {/* App left rail — mirrors real product nav */}
      <AppRail />

      <div className="flex min-w-0 flex-1 flex-col">
      {/* App title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-band-mist px-3.5 py-2.5">
        {/* Prompt input */}
        <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-background px-3 py-1.5">
          <span aria-hidden className="text-xs text-muted">
            ✳
          </span>
          <p className="min-h-[1rem] flex-1 truncate text-xs text-foreground">
            {typed}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[0.9em] w-[1px] translate-y-[0.15em] bg-foreground align-baseline"
              style={{ opacity: phase === "typing" ? 1 : 0.35 }}
            />
          </p>
          <span className="hidden shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.625rem] font-semibold md:inline-flex">
            {phase === "showing" ? scene.label : phase === "generating" ? "…" : "Prompt"}
          </span>
        </div>

        {/* Actions row (like Present · Export · Save) */}
        <div className="hidden shrink-0 items-center gap-1.5 md:flex">
          {scene.actions.slice(0, 2).map((a) => (
            <span
              key={a}
              className="rounded-md px-2 py-1 text-[0.6875rem] font-medium text-muted"
            >
              {a}
            </span>
          ))}
          <span className="rounded-md bg-duo px-2.5 py-1 text-[0.6875rem] font-semibold text-background">
            {scene.actions[scene.actions.length - 1]}
          </span>
        </div>
      </div>

      {/* Canvas — 16:9 ratio (fixed h on mobile so it never grows/shrinks) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-band-mist/40">
        {/* Empty / generating state */}
        <animated.div
          style={{
            opacity: reveal.opacity.to((o) => 1 - o),
            transform: "translateY(0px)",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <p className="flex items-center gap-2 text-xs text-muted">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 animate-none rounded-full bg-duo"
            />
            {phase === "typing" ? "Waiting for your prompt…" : "Generating…"}
          </p>
        </animated.div>

        {/* Output */}
        {transitions((style, kind) =>
          kind ? (
            <animated.div style={style} className="absolute inset-0">
              {kind === "dashboard" && <DashboardScene />}
              {kind === "slides" && <SlidesScene />}
              {kind === "research" && <ResearchScene />}
              {kind === "workflow" && <WorkflowScene />}
            </animated.div>
          ) : null,
        )}
      </div>
      </div>
    </div>
  );
};

/** Left navigation rail — mirrors the real Xura product nav. */
const AppRail = () => (
  <div className="hidden shrink-0 flex-col items-center justify-between border-r border-line bg-band-mist py-3 md:flex md:w-11">
    <div className="flex flex-col items-center gap-1.5">
      <span className="mb-1 block">
        <XuraLogo markOnly className="[&_img]:size-6" />
      </span>
      <RailIcon active label="Home">
        <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
      </RailIcon>
      <RailIcon label="Projects">
        <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </RailIcon>
      <RailIcon label="Team">
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 19a6 6 0 0 1 12 0v1H3zm13-1a5 5 0 0 1 .5-2h4a3.5 3.5 0 0 1 3.5 3.5V20h-8z" />
      </RailIcon>
      <RailIcon label="Risks">
        <path d="M12 3l10 17H2zM12 10v5m0 2v.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </RailIcon>
      <RailIcon label="Analytics">
        <path d="M4 20V10m6 10V4m6 16v-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </RailIcon>
      <RailIcon label="Docs">
        <path d="M6 3h9l5 5v13H6zM14 3v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </RailIcon>
    </div>
    <div className="flex flex-col items-center gap-1.5">
      <RailIcon label="Sparks">
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
      </RailIcon>
      <RailIcon label="Compose">
        <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </RailIcon>
    </div>
  </div>
);

const RailIcon = ({
  children,
  active,
  label,
}: {
  children: React.ReactNode;
  active?: boolean;
  label: string;
}) => (
  <span
    aria-label={label}
    className={
      "flex h-7 w-7 items-center justify-center rounded-md " +
      (active
        ? "bg-background text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        : "text-muted")
    }
  >
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      {children}
    </svg>
  </span>
);

/* ── Scenes ────────────────────────────────────────────────────────────── */

const BARS = [
  18, 22, 19, 26, 24, 30, 27, 33, 29, 36, 31, 38, 35, 42, 39, 47, 44, 52, 48,
  58, 54, 63, 59, 70, 66, 78, 100, 88, 82, 90, 85, 79, 83, 76, 81, 74, 78, 71,
];
const PEAK = 26;

/** Dashboard — R&D Pipeline styled: title, AI insight, KPI row, bar + donut. */
const DashboardScene = () => (
  <div className="flex h-full flex-col gap-2 bg-background p-3 md:p-4">
    {/* Header */}
    <header className="flex items-start justify-between">
      <div>
        <h4 className="text-[0.8rem] font-bold tracking-tight text-foreground md:text-sm">
          R&amp;D Pipeline: Projects by Status &amp; Priority
        </h4>
        <p className="text-[0.55rem] text-muted">
          Overview of all R&amp;D pipeline projects grouped by status and priority.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 text-[0.55rem] font-medium text-muted">
        <span>↻ Regenerate</span>
        <span>↗ Share</span>
      </div>
    </header>

    {/* AI insight banner */}
    <div className="flex items-start gap-2 rounded-md bg-duo-soft px-2.5 py-1.5">
      <span className="mt-0.5 shrink-0 rounded-[2px] bg-duo px-1 py-0.5 text-[0.4375rem] font-bold text-background">
        AI
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.55rem] font-semibold text-foreground">
          Pipeline is predominantly active with strong commercial output
        </p>
        <p className="mt-0.5 line-clamp-1 text-[0.5rem] text-muted">
          Of 272 R&amp;D projects, 182 are Active — the bulk of pipeline investment at ~$567M.
          67 have reached Commercial Launch; only 8 Abandoned.
        </p>
      </div>
    </div>

    {/* KPI strip */}
    <div className="grid shrink-0 grid-cols-4 gap-px overflow-hidden rounded-md border border-line bg-line">
      {[
        { k: "Total Projects", v: "272", d: "All projects across mission" },
        { k: "Active Projects", v: "182", d: "67% of total pipeline" },
        { k: "Commercial Launches", v: "67", d: "25% of total pipeline" },
        { k: "Avg Duration", v: "24.7", d: "Months per project on avg" },
      ].map((k) => (
        <div key={k.k} className="bg-background px-2.5 pt-1.5 pb-2.5">
          <p className="text-[0.4375rem] uppercase tracking-wide text-muted">
            {k.k}
          </p>
          <p className="mt-1 text-[0.95rem] font-semibold tracking-tight text-foreground">
            {k.v}
          </p>
          <p className="mt-0.5 text-[0.4375rem] text-muted">{k.d}</p>
        </div>
      ))}
    </div>

    {/* Charts row: horizontal bar (status) + donut (budget) */}
    <div className="grid h-[9.5rem] shrink-0 grid-cols-[1.4fr_1fr] gap-2">
      {/* Horizontal bar chart */}
      <div className="flex flex-col rounded-md border border-line bg-background p-2">
        <p className="text-[0.5rem] font-semibold text-foreground">
          Projects by Status
        </p>
        <div className="mt-2 flex-1 space-y-1.5">
          {[
            { l: "Abandoned", v: 8 },
            { l: "Post-Launch Optimization", v: 15 },
            { l: "Commercial Launch", v: 67 },
            { l: "Active", v: 182 },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-1.5">
              <span className="w-[38%] shrink-0 truncate text-right text-[0.4375rem] text-muted">
                {r.l}
              </span>
              <div className="relative flex-1">
                <div
                  className="h-2 rounded-[2px] bg-duo"
                  style={{ width: `${(r.v / 200) * 100}%` }}
                />
              </div>
              <span className="w-6 text-right text-[0.4375rem] font-medium text-foreground">
                {r.v}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[0.4375rem] text-muted">
          {[0, 50, 100, 150, 200].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>

      {/* Donut chart */}
      <div className="flex flex-col items-stretch rounded-md border border-line bg-background p-2">
        <p className="text-[0.5rem] font-semibold text-foreground">
          Total Budget by Status ($/M)
        </p>
        <div className="mt-1 flex flex-1 items-center justify-center">
          <svg viewBox="0 0 42 42" className="h-full max-h-[5.5rem]">
            {/* segments: 67, 6, 24, 3 (%) — bg + duo + accent + gray */}
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--band-mist)" strokeWidth="6" />
            {/* Active 67% */}
            <circle
              cx="21"
              cy="21"
              r="15.9"
              fill="none"
              stroke="var(--duo)"
              strokeWidth="6"
              strokeDasharray="67 33"
              strokeDashoffset="25"
              transform="rotate(-90 21 21)"
            />
            {/* Commercial Launch 24% */}
            <circle
              cx="21"
              cy="21"
              r="15.9"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeDasharray="24 76"
              strokeDashoffset="-42"
              transform="rotate(-90 21 21)"
            />
            {/* Post-Launch 6% */}
            <circle
              cx="21"
              cy="21"
              r="15.9"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="6"
              strokeDasharray="6 94"
              strokeDashoffset="-66"
              transform="rotate(-90 21 21)"
            />
          </svg>
        </div>
        <ul className="mt-1 grid grid-cols-2 gap-x-1.5 gap-y-0.5 text-[0.4375rem]">
          {[
            { c: "var(--duo)", l: "Active" },
            { c: "var(--accent)", l: "Commercial" },
            { c: "var(--foreground)", l: "Post-Launch" },
            { c: "var(--band-mist)", l: "Abandoned" },
          ].map((s) => (
            <li key={s.l} className="flex items-center gap-1 text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: s.c }}
              />
              {s.l}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Sankey — flows from Priority → Status → Owner. Overflows to hint scroll. */}
    <div className="shrink-0 rounded-md border border-line bg-background p-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.5rem] font-semibold text-foreground">
          Pipeline flow: Priority → Status → Owner
        </p>
        <p className="text-[0.4375rem] text-muted">$567M across 272 projects</p>
      </div>
      <SankeyMini />
    </div>
  </div>
);

const SankeyMini = () => (
  <svg viewBox="0 0 600 130" className="mt-1 h-[7rem] w-full" preserveAspectRatio="xMidYMid meet">
    {[
      { d: "M 60 20 C 200 20, 200 30, 300 30", w: 22, c: "var(--duo)" },
      { d: "M 60 55 C 200 55, 200 68, 300 68", w: 32, c: "var(--duo)" },
      { d: "M 60 100 C 200 100, 200 100, 300 100", w: 18, c: "var(--accent)" },
      { d: "M 340 30 C 460 30, 460 25, 560 25", w: 18, c: "var(--duo)" },
      { d: "M 340 30 C 460 30, 460 60, 560 60", w: 8, c: "var(--duo)" },
      { d: "M 340 68 C 460 68, 460 65, 560 65", w: 22, c: "var(--duo)" },
      { d: "M 340 68 C 460 68, 460 100, 560 100", w: 10, c: "var(--duo)" },
      { d: "M 340 100 C 460 100, 460 105, 560 105", w: 14, c: "var(--accent)" },
    ].map((r, i) => (
      <path
        key={i}
        d={r.d}
        stroke={r.c}
        strokeWidth={r.w}
        fill="none"
        opacity={0.32}
        strokeLinecap="butt"
      />
    ))}
    {[
      { x: 44, y: 12, h: 16, l: "P0", anchor: "end", tx: 38 },
      { x: 44, y: 44, h: 22, l: "P1", anchor: "end", tx: 38 },
      { x: 44, y: 92, h: 14, l: "P2", anchor: "end", tx: 38 },
      { x: 300, y: 22, h: 20, l: "Active", anchor: "start", tx: 324 },
      { x: 300, y: 58, h: 24, l: "Launched", anchor: "start", tx: 324 },
      { x: 300, y: 94, h: 12, l: "Paused", anchor: "start", tx: 324 },
      { x: 558, y: 18, h: 14, l: "Chen", anchor: "start", tx: 580 },
      { x: 558, y: 52, h: 20, l: "Patel", anchor: "start", tx: 580 },
      { x: 558, y: 92, h: 20, l: "Kim", anchor: "start", tx: 580 },
    ].map((n) => (
      <g key={`${n.x}-${n.l}`}>
        <rect x={n.x} y={n.y} width={18} height={n.h} rx="1.5" fill="var(--foreground)" />
        <text
          x={n.tx}
          y={n.y + n.h / 2 + 3}
          textAnchor={n.anchor as "start" | "end"}
          fontSize="7"
          fill="var(--muted)"
        >
          {n.l}
        </text>
      </g>
    ))}
  </svg>
);

const SLIDES = [
  { title: "Q4 Pipeline Health", body: "Cover · exec brief", active: true },
  { title: "ARR Trajectory", body: "$142M ARR · +18% YoY" },
  { title: "Coverage by Segment", body: "Enterprise · Mid · SMB" },
  { title: "Top At-Risk Accounts", body: "23 accounts · $18.4M" },
  { title: "Win / Loss Themes", body: "Onboarding · price · exec" },
  { title: "Next Quarter Bets", body: "3 plays · 7 owners" },
];

/** Realistic slide editor: thumbnail rail, live 16:9 canvas with real data, inspector. */
const SlidesScene = () => (
  <div className="grid h-full grid-cols-[6.5rem_1fr_6rem] gap-2 bg-band-mist/60 p-2 md:grid-cols-[7.5rem_1fr_7.5rem] md:gap-3 md:p-3">
    {/* Thumbnail sidebar */}
    <ul className="space-y-1.5 overflow-hidden">
      {SLIDES.map((s, i) => (
        <li
          key={s.title}
          className={
            "relative aspect-video rounded-[3px] border p-1.5 " +
            (s.active
              ? "border-duo bg-[#0e1220] shadow-[0_0_0_1px_var(--duo)]"
              : "border-line bg-[#0e1220]/95")
          }
        >
          <span className="absolute left-1 top-1 text-[0.4375rem] font-medium text-white/40">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-1.5 truncate text-[0.5rem] font-semibold text-white/90">
            {s.title}
          </p>
          <p className="mt-0.5 truncate text-[0.4375rem] text-white/40">
            {s.body}
          </p>
        </li>
      ))}
    </ul>

    {/* Main slide canvas — real 16:9 with a live chart */}
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-full overflow-hidden rounded-md bg-gradient-to-br from-[#151a2e] via-[#0f1225] to-[#0a0d1e] p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)] md:p-6 aspect-video">
        {/* Client badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-[3px] bg-white/10 px-1.5 py-1 backdrop-blur-sm">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] bg-accent text-[0.5rem] font-bold text-background">
            N
          </span>
          <span className="text-[0.5rem] font-medium text-white/70">
            NovaLabs
          </span>
        </div>

        <div className="relative flex h-full flex-col">
          <p className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-[#a78bfa]">
            Q4 FY26 · Sales exec brief
          </p>
          <h4 className="mt-1 max-w-[22ch] text-sm font-bold leading-[1.1] text-white md:text-lg">
            Pipeline coverage tightens as enterprise closes accelerate
          </h4>

          {/* KPI row */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { k: "ARR", v: "$142M", d: "+18%" },
              { k: "Coverage", v: "3.4×", d: "target 3.0×" },
              { k: "At risk", v: "$18.4M", d: "23 accts" },
            ].map((k) => (
              <div key={k.k} className="rounded-[3px] bg-white/5 px-1.5 py-1">
                <p className="text-[0.4375rem] uppercase tracking-wide text-white/40">
                  {k.k}
                </p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-white md:text-xs">
                  {k.v}
                </p>
                <p className="text-[0.4375rem] text-[#7dd3a5]">{k.d}</p>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="mt-2 flex flex-1 items-end gap-[3px] border-t border-white/10 pt-2">
            {[32, 38, 34, 44, 41, 52, 48, 60, 55, 68, 63, 74, 82].map((h, i) => (
              <div
                key={i}
                className={
                  "w-full rounded-[1px] " +
                  (i === 12 ? "bg-accent" : "bg-[#a78bfa]/70")
                }
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <p className="absolute bottom-0 right-0 text-[0.5rem] text-white/40">
            01 / 06
          </p>
        </div>
      </div>
    </div>

    {/* Inspector */}
    <div className="space-y-2 text-[0.5625rem]">
      {[
        { k: "Style", v: "Midnight" },
        { k: "Layout", v: "KPI + chart" },
        { k: "Data", v: "Salesforce" },
        { k: "Theme", v: "NovaLabs" },
      ].map((r) => (
        <div key={r.k}>
          <p className="meta uppercase">{r.k}</p>
          <p className="mt-1 truncate rounded-[3px] border border-line bg-background px-1.5 py-1 font-medium">
            {r.v}
          </p>
        </div>
      ))}
    </div>
  </div>
);

/** Word-doc styled research page: client header, title, insights, chart, cites. */
const ResearchScene = () => (
  <div className="flex h-full items-stretch justify-center bg-band-mist/70 p-2 md:p-3">
    <div className="flex h-full w-full flex-col rounded-sm bg-white px-6 py-4 font-serif text-black shadow-[0_12px_32px_-14px_rgba(0,0,0,0.35)] md:px-10 md:py-6">
      {/* Header: client logo + doc meta */}
      <div className="flex items-start justify-between border-b border-black/10 pb-2.5 font-sans">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-[#0057b7] text-[0.7rem] font-bold text-white">
            N
          </span>
          <div className="text-[0.55rem] leading-tight">
            <p className="font-semibold text-black/85">NovaLabs Pharma, Inc.</p>
            <p className="text-black/50">Client Briefing · Confidential</p>
          </div>
        </div>
        <div className="text-right text-[0.5rem] text-black/45">
          <p>Prepared by Xura</p>
          <p>Q4 FY26 · Rev 3</p>
        </div>
      </div>

      {/* Title */}
      <h4 className="mt-3 text-[0.9rem] font-bold leading-tight text-black md:text-base">
        Enterprise Churn Drivers: Cross-Segment Analysis of NovaLabs&rsquo; 2026
        Renewals
      </h4>
      <p className="mt-1 font-sans text-[0.55rem] text-black/50">
        Sales Intelligence · 8 pages · 12 sources cited · v3
      </p>

      {/* KPI strip */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 font-sans">
        {[
          { k: "Addressable market", v: "$4.2B", d: "+11% YoY" },
          { k: "At-risk ARR", v: "$18.4M", d: "23 accounts" },
          { k: "Win-back rate", v: "37%", d: "vs 22% peer" },
        ].map((x) => (
          <div
            key={x.k}
            className="rounded-[3px] border border-black/10 bg-[#f6f5f1] px-1.5 py-1"
          >
            <p className="text-[0.4375rem] uppercase tracking-wide text-black/50">
              {x.k}
            </p>
            <p className="mt-0.5 text-[0.75rem] font-semibold text-black">
              {x.v}
            </p>
            <p className="text-[0.4375rem] text-[#0057b7]">{x.d}</p>
          </div>
        ))}
      </div>

      {/* Body */}
      <p className="mt-3 font-sans text-[0.55rem] font-semibold uppercase tracking-wide text-black/55">
        Key insights
      </p>
      <ul className="mt-1 space-y-1 text-[0.625rem] leading-snug text-black/85">
        <li>
          — Onboarding under 40 days correlates with{" "}
          <span className="font-semibold">3.1× renewal odds</span> across
          enterprise cohort.
        </li>
        <li>
          — Executive-sponsor turnover preceded{" "}
          <span className="font-semibold">68%</span> of FY25 downgrades.
        </li>
        <li>
          — Multi-product accounts churn{" "}
          <span className="font-semibold">42% less</span> than single-SKU peers.
        </li>
      </ul>

      {/* Two-column body — ghost lines + inline chart */}
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-4">
        <div className="flex flex-col gap-1">
          {[100, 96, 92, 88, 94, 78, 84, 82, 76, 88, 72, 90, 84, 70, 80].map(
            (w, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full bg-black/10"
                style={{ width: `${w}%` }}
              />
            ),
          )}
          <p className="mt-1 font-sans text-[0.5rem] font-semibold uppercase tracking-wide text-black/55">
            Recommendation
          </p>
          <div className="mt-0.5 space-y-1">
            {[96, 92, 84, 78].map((w, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full bg-black/10"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>

        {/* Renewal-odds mini chart */}
        <figure className="flex flex-col rounded-sm border border-black/10 bg-[#fbfaf6] p-2 font-sans">
          <figcaption className="text-[0.4375rem] uppercase tracking-wide text-black/50">
            Renewal odds by onboarding depth
          </figcaption>
          <div className="mt-1.5 flex flex-1 items-end gap-1">
            {[22, 34, 41, 55, 68, 82, 96].map((h, i) => (
              <div
                key={i}
                className={
                  "w-full rounded-t-[1px] " +
                  (i >= 5 ? "bg-[#0057b7]" : "bg-black/25")
                }
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[0.375rem] text-black/45">
            <span>&lt;10d</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
            <span>60</span>
            <span>70+</span>
          </div>
          <p className="mt-1 text-[0.4375rem] text-black/60">
            <span className="font-semibold text-[#0057b7]">3.1×</span> lift once
            onboarding crosses 40 days.
          </p>
        </figure>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-1.5 font-sans text-[0.5rem] text-black/40">
        <span>NovaLabs × Xura · confidential</span>
        <span>Page 1 of 8</span>
      </div>
    </div>
  </div>
);

/** Agentic flow diagram (light) with an Integrations panel on the right. */
const WorkflowScene = () => {
  // Single source of truth for node geometry (viewBox 800×450 → 16:9).
  // Integrations panel occupies right ~32% (from x≈544). Keep flow ≤ 528.
  // h reflects the ACTUAL rendered height of each node so arrow midpoints
  // land dead-centre on the visible box. Nodes stay content-sized (no explicit
  // height); adjust y so mid = y + h/2 matches the arrow port.
  const N = {
    trigger: { x: 8, y: 207, w: 96, h: 34 }, // mid 224
    agent: { x: 128, y: 193, w: 148, h: 62 }, // mid 224
    router: { x: 306, y: 207, w: 78, h: 34 }, // mid 224
    vp: { x: 416, y: 103, w: 108, h: 34 }, // mid 120
    reps: { x: 416, y: 207, w: 108, h: 34 }, // mid 224
    exec: { x: 416, y: 311, w: 108, h: 34 }, // mid 328
  } as const;
  const pct = (n: number, axis: "x" | "y") =>
    `${(n / (axis === "x" ? 800 : 450)) * 100}%`;
  const nodeStyle = (n: { x: number; y: number; w: number; h: number }) => ({
    left: pct(n.x, "x"),
    top: pct(n.y, "y"),
    width: pct(n.w, "x"),
  });
  const mid = (n: { y: number; h: number }) => n.y + n.h / 2;
  const right = (n: { x: number; w: number }) => n.x + n.w;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fafaf7]">
      {/* dot grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4d4d0 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      {/* header chip */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-line bg-background/90 px-2 py-1 text-[0.5rem] font-medium text-muted shadow-sm backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22a06b] shadow-[0_0_6px_#22a06b]" />
        Sales digest · every Monday 09:00 · live
      </div>
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-line bg-background/80 px-2 py-1 text-[0.5rem] font-medium text-muted shadow-sm backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-duo" />
        12 runs · 0 failures · last 09:00 Mon
      </div>

      {/* Connectors — endpoints anchored to node edges */}
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <marker
            id="wf-arrow-l"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#9ca3af" />
          </marker>
        </defs>

        {/* trigger → agent (straight) */}
        <path
          d={`M ${right(N.trigger)} ${mid(N.trigger)} L ${N.agent.x - 2} ${mid(N.agent)}`}
          stroke="#9ca3af"
          strokeWidth="1.4"
          fill="none"
          markerEnd="url(#wf-arrow-l)"
        />
        {/* agent → router */}
        <path
          d={`M ${right(N.agent)} ${mid(N.agent)} L ${N.router.x - 2} ${mid(N.router)}`}
          stroke="#9ca3af"
          strokeWidth="1.4"
          fill="none"
          markerEnd="url(#wf-arrow-l)"
        />
        {/* router → VP (up) */}
        <path
          d={`M ${right(N.router)} ${mid(N.router) - 12} C ${right(N.router) + 14} ${mid(N.router) - 12}, ${N.vp.x - 16} ${mid(N.vp)}, ${N.vp.x - 2} ${mid(N.vp)}`}
          stroke="#9ca3af"
          strokeWidth="1.4"
          fill="none"
          markerEnd="url(#wf-arrow-l)"
        />
        {/* router → Reps (straight) */}
        <path
          d={`M ${right(N.router)} ${mid(N.router)} L ${N.reps.x - 2} ${mid(N.reps)}`}
          stroke="#9ca3af"
          strokeWidth="1.4"
          fill="none"
          markerEnd="url(#wf-arrow-l)"
        />
        {/* router → Exec (down) */}
        <path
          d={`M ${right(N.router)} ${mid(N.router) + 12} C ${right(N.router) + 14} ${mid(N.router) + 12}, ${N.exec.x - 16} ${mid(N.exec)}, ${N.exec.x - 2} ${mid(N.exec)}`}
          stroke="#9ca3af"
          strokeWidth="1.4"
          fill="none"
          markerEnd="url(#wf-arrow-l)"
        />
        {/* agent → sub-tools (dashed) */}
        {[168, 213, 258].map((x) => (
          <path
            key={x}
            d={`M ${x} ${N.agent.y + N.agent.h} L ${x} ${N.agent.y + N.agent.h + 34}`}
            stroke="#c8ccd4"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />
        ))}
      </svg>

      {/* Trigger */}
      <FlowNode style={nodeStyle(N.trigger)} tone="trigger">
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <div>
            <p className="text-[0.55rem] font-semibold text-foreground">
              Every Monday
            </p>
            <p className="text-[0.4375rem] text-muted">09:00 · UTC-8</p>
          </div>
        </div>
      </FlowNode>

      {/* AI Agent */}
      <FlowNode style={nodeStyle(N.agent)} tone="agent" accent>
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-[#d97706]">
            <span className="text-[0.55rem] font-bold text-white">A</span>
          </span>
          <div>
            <p className="text-[0.55rem] font-semibold text-foreground">
              Sales Digest Agent
            </p>
            <p className="text-[0.4375rem] text-muted">
              Xura Tools Agent · gpt-5
            </p>
          </div>
        </div>
        <div className="mt-1.5 flex justify-around border-t border-line pt-1 text-[0.4375rem] text-muted">
          <span>Model</span>
          <span>Memory</span>
          <span>Tools</span>
        </div>
      </FlowNode>

      {/* Router */}
      <FlowNode style={{ ...nodeStyle(N.router), padding: "0.35rem" }} tone="router">
        <div className="flex items-center gap-1.5">
          <RouterIcon />
          <div>
            <p className="text-[0.5rem] font-semibold text-foreground">
              Route by risk
            </p>
            <p className="text-[0.4375rem] text-muted">3 branches</p>
          </div>
        </div>
      </FlowNode>

      {/* Sub-tool marks below Agent (centred under N.agent) */}
      {[
        { x: 150, Mark: AnthropicMark, label: "Anthropic" },
        { x: 195, Mark: PostgresMark, label: "Postgres" },
        { x: 240, Mark: SalesforceMark, label: "Salesforce" },
      ].map(({ x, Mark, label }) => (
        <div
          key={label}
          className="absolute flex flex-col items-center gap-0.5"
          style={{ left: pct(x, "x"), top: pct(N.agent.y + N.agent.h + 30, "y"), width: pct(36, "x") }}
        >
          <Mark />
          <p className="text-[0.4375rem] font-medium text-foreground/70">{label}</p>
        </div>
      ))}

      {/* Outputs */}
      <FlowNode style={nodeStyle(N.vp)} tone="output">
        <div className="flex items-center gap-1.5">
          <GmailMark />
          <div>
            <p className="text-[0.5rem] font-semibold text-foreground">
              VP Sales digest
            </p>
            <p className="text-[0.4375rem] text-muted">gmail · report</p>
          </div>
        </div>
      </FlowNode>
      <FlowNode style={nodeStyle(N.reps)} tone="output">
        <div className="flex items-center gap-1.5">
          <GmailMark />
          <div>
            <p className="text-[0.5rem] font-semibold text-foreground">
              At-risk reps
            </p>
            <p className="text-[0.4375rem] text-muted">gmail · nudge</p>
          </div>
        </div>
      </FlowNode>
      <FlowNode style={nodeStyle(N.exec)} tone="output">
        <div className="flex items-center gap-1.5">
          <WhatsAppMark />
          <div>
            <p className="text-[0.5rem] font-semibold text-foreground">
              Exec alert
            </p>
            <p className="text-[0.4375rem] text-muted">whatsapp · top 3</p>
          </div>
        </div>
      </FlowNode>

      {/* Branch labels — placed on each connector, translated to centre. */}
      {[
        { top: 170, bg: "bg-[#e6f6ec]", fg: "text-[#0f7a3d]", label: "high" },
        { top: 224, bg: "bg-line", fg: "text-muted", label: "med" },
        { top: 280, bg: "bg-[#fdecec]", fg: "text-[#c23a3a]", label: "exec" },
      ].map((b) => (
        <span
          key={b.label}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${b.bg} ${b.fg} px-1.5 py-0.5 text-[0.4375rem] font-medium`}
          style={{ left: pct(400, "x"), top: pct(b.top, "y") }}
        >
          {b.label}
        </span>
      ))}

      {/* Integrations panel — right side */}
      <IntegrationsPanel />
    </div>
  );
};

const IntegrationsPanel = () => (
  <aside className="absolute right-2 top-2 bottom-2 flex w-[28%] flex-col overflow-hidden rounded-md border border-line bg-background/95 shadow-sm backdrop-blur">
    <div className="flex items-center justify-between border-b border-line px-2 py-1.5">
      <p className="text-[0.5rem] font-semibold uppercase tracking-wide text-foreground">
        Integrations
      </p>
      <span className="rounded-full bg-band-mist px-1.5 py-0.5 text-[0.4375rem] font-medium text-muted">
        120+
      </span>
    </div>
    <div className="border-b border-line px-2 py-1">
      <div className="flex items-center gap-1 rounded-[3px] border border-line bg-band-mist/60 px-1.5 py-[3px] text-[0.4375rem] text-muted">
        <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        Search 120+ apps
      </div>
    </div>
    <ul className="min-h-0 flex-1 divide-y divide-line overflow-hidden">
      {INTEGRATIONS.map(({ name, mark: Mark, hint }) => (
        <li
          key={name}
          className="flex items-center justify-between gap-1.5 px-2 py-[5px]"
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <Mark />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[0.5rem] font-medium text-foreground">
                {name}
              </p>
              <p className="truncate text-[0.4375rem] text-muted">{hint}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-line px-1.5 py-[1px] text-[0.4375rem] font-medium text-muted">
            +
          </span>
        </li>
      ))}
    </ul>
    <div className="border-t border-line px-2 py-1 text-center text-[0.4375rem] text-muted">
      View all →
    </div>
  </aside>
);

/* ── Flow-diagram bits ─────────────────────────────────────────────────── */

type FlowTone = "trigger" | "agent" | "router" | "output";

const TONE: Record<FlowTone, string> = {
  trigger:
    "border-line bg-background shadow-[0_4px_10px_-6px_rgba(16,17,18,0.15)]",
  agent:
    "border-line bg-background shadow-[0_10px_24px_-12px_rgba(16,17,18,0.22)]",
  router:
    "border-line bg-background shadow-[0_4px_10px_-6px_rgba(16,17,18,0.15)]",
  output:
    "border-line bg-background shadow-[0_4px_10px_-6px_rgba(16,17,18,0.15)]",
};

const FlowNode = ({
  children,
  style,
  tone,
  accent,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  tone: FlowTone;
  accent?: boolean;
}) => (
  <div
    className={
      "absolute rounded-md border px-2 py-1.5 " +
      TONE[tone] +
      (accent ? " ring-1 ring-[#a78bfa]/40" : "")
    }
    style={style}
  >
    {children}
  </div>
);

const ClockIcon = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-[#e6f6ec]">
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#0f7a3d]" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

const RouterIcon = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-[#efeafd]">
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#6b46d3]" fill="none">
      <path
        d="M4 12h6M14 6h6M14 18h6M10 12l4-6M10 12l4 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

/* Brand marks — simplified, recognizable, drawn inline. */

const AnthropicMark = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#d97706]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff">
      <path d="M8 5h2.5l4 14H12l-.9-3H7.4L6.5 19H4L8 5zm.1 8.6h2.4L9.3 8.9l-1.2 4.7zM15.5 5H18l4 14h-2.5l-4-14z" />
    </svg>
  </span>
);

const PostgresMark = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#336791]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff">
      <path d="M12 3c-2.8 0-5 .7-5 2.3 0 .8.6 1.5 1.5 1.9-.3 4 .6 8.2 2 10.8.6 1 1.5 2 2.5 2s1.6-.7 2.2-1.8c1-1.9 1.6-4.9 1.8-8.2.1-1.1.1-2.1 0-2.9.8-.4 1.3-1 1.3-1.8C18.3 3.7 15.5 3 12 3zm-.3 4.3c.5 0 .9.5.9 1.1 0 .6-.4 1.1-.9 1.1s-.9-.5-.9-1.1c0-.6.4-1.1.9-1.1zm4 .1c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9z" />
    </svg>
  </span>
);

const SalesforceMark = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00a1e0]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff">
      <path d="M9 6.5a3.5 3.5 0 0 1 6.4-2A4 4 0 0 1 22 8a3.5 3.5 0 0 1-1.4 6.7A4 4 0 0 1 13 17a3.5 3.5 0 0 1-6.2-.8A3.5 3.5 0 0 1 3 12a3.5 3.5 0 0 1 2.2-3.3A3.5 3.5 0 0 1 9 6.5z" />
    </svg>
  </span>
);

const GmailMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-white p-[3px]">
    <svg viewBox="0 0 24 18" className="h-full w-full">
      <path d="M2 2v14h3V7l7 5 7-5v9h3V2h-2l-8 6-8-6H2z" fill="#ea4335" />
      <path d="M2 2v14h3V7L2 4.6V2z" fill="#c5221f" />
      <path d="M22 2v14h-3V7l3-2.4V2z" fill="#c5221f" />
    </svg>
  </span>
);

const WhatsAppMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25d366]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff">
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm5 12.4c-.2.6-1.2 1.2-1.7 1.3-.4 0-1 .1-1.5-.1a12 12 0 0 1-5-3 6.4 6.4 0 0 1-1.4-3c0-.5.2-1 .5-1.3l.4-.4c.1-.1.2-.2.4-.2h.4c.1 0 .3 0 .4.4l.7 1.6c.1.2.1.4 0 .5l-.3.4-.2.2c-.1.1-.2.3-.1.5.2.3.7 1.1 1.5 1.8 1 .8 1.7 1.1 2 1.2.2.1.4 0 .5-.1l.7-.9c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.2.4.3.1.1.1.6-.1 1.1z" />
    </svg>
  </span>
);

const SlackMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-white p-[3px]">
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect x="4" y="10" width="6" height="2.5" rx="1.25" fill="#36c5f0" />
      <rect x="11.5" y="4" width="2.5" height="6" rx="1.25" fill="#2eb67d" />
      <rect x="14" y="11.5" width="6" height="2.5" rx="1.25" fill="#ecb22e" />
      <rect x="10" y="14" width="2.5" height="6" rx="1.25" fill="#e01e5a" />
    </svg>
  </span>
);

const HubSpotMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff7a59]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff">
      <circle cx="17" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M17 8V4M9 12h4M6 18a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  </span>
);

const NotionMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white">
    <span className="text-[0.7rem] font-bold text-black">N</span>
  </span>
);

const GSheetsMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#0f9d58]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <rect x="5" y="4" width="14" height="16" rx="1" fill="#fff" />
      <path d="M8 9h8M8 12h8M8 15h8M11 8v9M15 8v9" stroke="#0f9d58" strokeWidth="1.4" />
    </svg>
  </span>
);

const JiraMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-white p-[3px]">
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="#2684ff">
      <path d="M11.5 2L4 9.5a2 2 0 0 0 0 2.8l3.5 3.5-3.5 3.5a2 2 0 0 0 0 2.8L11.5 22V13a4 4 0 0 1 4-4L11.5 2z" />
      <path d="M12.5 2L20 9.5a2 2 0 0 1 0 2.8l-7.5 7.5V11a4 4 0 0 0-4-4L12.5 2z" opacity="0.65" />
    </svg>
  </span>
);

const GithubMark = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#181717]">
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff">
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
    </svg>
  </span>
);

const INTEGRATIONS: { name: string; mark: React.FC; hint: string }[] = [
  { name: "Gmail", mark: GmailMark, hint: "Email · send / read" },
  { name: "WhatsApp", mark: WhatsAppMark, hint: "Business API" },
  { name: "Slack", mark: SlackMark, hint: "Channels · DMs" },
  { name: "Salesforce", mark: SalesforceMark, hint: "CRM · pipeline" },
  { name: "HubSpot", mark: HubSpotMark, hint: "CRM · marketing" },
  { name: "Notion", mark: NotionMark, hint: "Docs · databases" },
  { name: "Google Sheets", mark: GSheetsMark, hint: "Rows · formulas" },
  { name: "Jira", mark: JiraMark, hint: "Issues · sprints" },
  { name: "GitHub", mark: GithubMark, hint: "Repos · PRs" },
  { name: "Postgres", mark: PostgresMark, hint: "SQL · warehouse" },
  { name: "Anthropic", mark: AnthropicMark, hint: "Claude models" },
];
