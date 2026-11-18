"use client";

import { animated, useTransition } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { PulseCrowd } from "@/components/graphics/pulse-preview";
import { useInViewport } from "@/hooks/use-in-viewport";

/**
 * PulseAbDemo — the A/B test walked through the product's three tabs:
 * Goal (the aim and versions A and B as social posts) → Audience (pick a
 * panel and its mix) → Run (each version's crowd and the winner). Cycles
 * every few seconds with a spring cross-fade; paused off screen, and parked
 * on Run (the result) for reduced motion. Decorative (`aria-hidden`).
 */
const TABS = ["Goal", "Audience", "Run"] as const;
const STEP_MS = 3800;

/** A social post mock: brand row, copy, a creative tile, actions. */
const Post = ({ v, copy, tag, stat }: { v: "A" | "B"; copy: string; tag: string; stat?: string }) => (
  <div className="rounded-xl bg-background p-3 text-foreground">
    <div className="flex items-center justify-between text-[0.5625rem] text-muted">
      <span className="font-semibold text-foreground">Version {v}</span>
      <span className="rounded-full bg-line-soft px-2 py-0.5">{tag}</span>
    </div>
    <div className="mt-2 flex items-center gap-1.5">
      <span className="size-5 rounded-full bg-foreground" />
      <span className="leading-none">
        <span className="block text-[0.5625rem] font-semibold">Your brand</span>
        <span className="block text-[0.5rem] text-muted">Sponsored</span>
      </span>
    </div>
    <p className="mt-2 text-[0.625rem] leading-snug">{copy}</p>
    <div className={`mt-2 flex aspect-[16/10] flex-col justify-end rounded-md p-2.5 ${v === "A" ? "bg-foreground text-background" : "bg-pulse-yes text-background"}`}>
      {stat ? <span className="text-2xl font-semibold leading-none tracking-tight">{stat}</span> : null}
      <span className="mt-1 text-[0.625rem] font-medium leading-tight">{v === "A" ? "Ship faster. Meet less." : "less planning time"}</span>
    </div>
    <div className="mt-2 flex gap-3 text-[0.5625rem] text-muted">
      <span>Like</span>
      <span>Comment</span>
      <span>Share</span>
    </div>
  </div>
);

const Label = ({ children }: { children: string }) => (
  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-background/50">{children}</p>
);

const GoalPane = () => (
  <div>
    <Label>What should it achieve?</Label>
    <p className="mt-2 rounded-lg bg-background/10 px-3 py-2 text-xs">Get product managers to book a demo</p>
    <div className="mt-4">
      <Label>Your versions</Label>
    </div>
    <div className="mt-2 grid grid-cols-2 gap-3">
      <Post v="A" tag="Benefit-led" copy="Your roadmap, without the status meetings." />
      <Post v="B" tag="Proof-led" stat="40%" copy="Teams like yours cut planning time by 40% in a quarter." />
    </div>
  </div>
);

const POOLS = [
  { name: "Product managers, SaaS", n: 200, on: true },
  { name: "Engineering leads", n: 150, on: false },
  { name: "Startup founders", n: 120, on: false },
] as const;

const MIX = [
  { label: "Company size 50–500", pct: 62 },
  { label: "Uses Jira or Linear", pct: 78 },
  { label: "Budget owner", pct: 35 },
] as const;

const AudiencePane = () => (
  <div>
    <Label>Choose an audience</Label>
    <ul className="mt-2 space-y-2">
      {POOLS.map((p) => (
        <li key={p.name} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs ${p.on ? "bg-background text-foreground" : "bg-background/10"}`}>
          <span className={`grid size-4 place-items-center rounded-full border ${p.on ? "border-foreground bg-foreground" : "border-background/40"}`}>
            {p.on ? <span className="size-1.5 rounded-full bg-background" /> : null}
          </span>
          {p.name}
          <span className={`ml-auto ${p.on ? "text-muted" : "text-background/50"}`}>{p.n} people</span>
        </li>
      ))}
    </ul>
    <div className="mt-4">
      <Label>The mix</Label>
    </div>
    <ul className="mt-2 space-y-2">
      {MIX.map((m) => (
        <li key={m.label} className="grid grid-cols-[9rem_1fr_2.5rem] items-center gap-2 text-[0.6875rem]">
          <span className="text-background/80">{m.label}</span>
          <span className="h-1.5 overflow-hidden rounded-full bg-background/10">
            <span className="block h-full rounded-full bg-background" style={{ width: `${m.pct}%` }} />
          </span>
          <span className="text-right tabular-nums text-background/60">{m.pct}%</span>
        </li>
      ))}
    </ul>
  </div>
);

const RunPane = () => (
  <div className="grid grid-cols-2 gap-3">
    {(
      [
        ["A", "38%", 3],
        ["B", "64%", 11],
      ] as const
    ).map(([v, pct, seed]) => (
      <div key={v} className={`rounded-xl p-3 ${v === "B" ? "bg-background/15 ring-1 ring-pulse-yes" : "bg-background/5"}`}>
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium">Version {v}</span>
          {v === "B" ? <span className="rounded-full bg-pulse-yes px-2 py-0.5 text-[0.5625rem] font-semibold">Winner</span> : null}
        </div>
        <p className="mt-1 text-3xl font-light tracking-tight">{pct}</p>
        <p className="text-[0.625rem] text-background/60">would book a demo</p>
        <PulseCrowd count={50} cols={10} seed={seed} bias={v === "B" ? 0.2 : -0.12} className="mt-3" />
        <p className="mt-3 text-[0.625rem] leading-relaxed text-background/70">
          {v === "B" ? "“The 40% number made me stop scrolling.”" : "“Nice line, but what does it actually do?”"}
        </p>
      </div>
    ))}
  </div>
);

const PANES = [GoalPane, AudiencePane, RunPane] as const;

export const PulseAbDemo = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref);
  const [still, setStill] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setStill(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (still) {
      setTab(2);
      return;
    }
    if (!inView) return;
    const id = window.setInterval(() => setTab((t) => (t + 1) % TABS.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, still]);

  const transitions = useTransition(tab, {
    from: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -10, position: "absolute" as const },
    config: { tension: 220, friction: 28 },
    immediate: still,
  });

  return (
    <div ref={ref} aria-hidden className={`overflow-hidden rounded-2xl bg-foreground text-left text-background shadow-product ${className}`}>
      <div className="flex items-center gap-3 border-b border-background/10 px-5 py-3 text-xs">
        <span className="font-medium">Launch post · A/B test</span>
        <span className="ml-auto flex gap-1.5">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-3 py-1 transition-colors duration-[var(--duration-fast)] ease-entrance ${i === tab ? "bg-background text-foreground" : "border border-background/20 text-background/70"}`}
            >
              {i + 1} {t}
            </span>
          ))}
        </span>
      </div>
      <div className="relative h-[24rem] p-5">
        {transitions((style, i) => {
          const Pane = PANES[i] ?? GoalPane;
          return (
            <animated.div style={{ ...style, transform: style.y.to((y) => `translateY(${y}px)`) }} className="inset-x-5 top-5">
              <Pane />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};
