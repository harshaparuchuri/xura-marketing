"use client";

import { animated, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import { ShotCrop } from "@/components/common/shot-crop";
import { AiOrb } from "@/components/graphics/ai-orb";

/**
 * MobilePromptCard — the phone version of the hero's `PromptGenerationCard`.
 *
 * The desktop card scaled down to phone width leaves 7–9px text, so this one
 * cycles the same four use cases with real product captures cropped large
 * enough to read: a prompt types out, the AI employee works ("Nora is…"), then
 * the output cross-fades in and the pill cites its sources.
 *
 * Each crop bounds whole UI elements (cards, a slide, a title block) so nothing
 * is cut at the edges, and is fitted (contain) inside a fixed 3:2 stage — the
 * card's height never changes between scenes, so the page never shifts.
 * Prompts and pill copy are kept short enough to fit a 320px phone.
 */

type Scene = {
  prompt: string;
  employee: { name: string; accent: string; task: string };
  sources: string[];
  src: string;
  alt: string;
  crop: { x: number; y: number; w: number; h: number };
};

const SCENES: Scene[] = [
  {
    prompt: "Show headcount by department",
    employee: { name: "Nora", accent: "var(--employee-chief-of-staff)", task: "building your dashboard" },
    sources: ["HRIS", "Sheets"],
    src: "/assets/product/dashboard.webp",
    alt: "A Xura dashboard with headcount, compensation and training KPIs above a headcount-by-department chart",
    crop: { x: 0.068, y: 0.42, w: 0.458, h: 0.255 },
  },
  {
    prompt: "Board deck: completion by team",
    employee: { name: "Nora", accent: "var(--employee-chief-of-staff)", task: "writing your deck" },
    sources: ["Jira", "Sheets"],
    src: "/assets/product/out-deck.webp",
    alt: "A Xura-generated slide titled Task Completion Rate by Team",
    crop: { x: 0.15, y: 0.213, w: 0.652, h: 0.591 },
  },
  {
    prompt: "Research plant safety trends",
    employee: { name: "Ezra", accent: "var(--employee-marketing)", task: "reading 30 sources" },
    sources: ["30 sources", "87 citations"],
    src: "/assets/product/out-research.webp",
    alt: "A Xura deep-research report on plant safety trends with 87 citations from 30 sources",
    crop: { x: 0.213, y: 0.093, w: 0.574, h: 0.27 },
  },
  {
    prompt: "Track delivery timelines daily",
    employee: { name: "Nora", accent: "var(--employee-chief-of-staff)", task: "setting up your flow" },
    sources: ["Jira", "Slack"],
    src: "/assets/product/workflows.webp",
    alt: "Xura Flows with a scheduled delivery timeline tracker and other agentic workflows",
    crop: { x: 0.066, y: 0.192, w: 0.306, h: 0.2 },
  },
];

/** Rendered width ÷ height of a crop of a 2880×1800 capture. */
const fitRatio = (c: Scene["crop"]) => ((c.w * 2880) / (c.h * 1800)).toFixed(3);

const TYPE_MS_PER_CHAR = 38;
const WORK_MS = 900;
const HOLD_MS = 3200;

type Phase = "typing" | "working" | "showing";

export const MobilePromptCard = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [typed, setTyped] = useState(SCENES[0]!.prompt);
  // Start on a finished frame so the first paint is never empty.
  const [phase, setPhase] = useState<Phase>("showing");
  const scene = SCENES[sceneIdx]!;
  // Until the new output is ready, keep the previous one on screen (dimmed).
  const shownIdx =
    phase === "showing" ? sceneIdx : (sceneIdx + SCENES.length - 1) % SCENES.length;

  useEffect(() => {
    if (phase === "typing") {
      if (typed.length < scene.prompt.length) {
        const t = setTimeout(
          () => setTyped(scene.prompt.slice(0, typed.length + 1)),
          TYPE_MS_PER_CHAR,
        );
        return () => clearTimeout(t);
      }
      setPhase("working");
      return;
    }
    if (phase === "working") {
      const t = setTimeout(() => setPhase("showing"), WORK_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setSceneIdx((i) => (i + 1) % SCENES.length);
      setTyped("");
      setPhase("typing");
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [phase, typed, scene.prompt]);

  const transitions = useTransition(shownIdx, {
    keys: (i) => i,
    from: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -6 },
    config: { tension: 220, friction: 26 },
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-background shadow-product">
      <div className="flex items-center gap-2 border-b border-line bg-band-mist px-3 py-2.5">
        <span aria-hidden className="text-xs text-muted">✳</span>
        <p className="min-h-[1.25rem] flex-1 truncate text-sm">
          {typed}
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[0.9em] w-px translate-y-[0.15em] bg-foreground align-baseline"
            style={{ opacity: phase === "typing" ? 1 : 0 }}
          />
        </p>
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-ink text-background"
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </span>
      </div>

      <div
        className="relative aspect-[3/2] w-full overflow-hidden bg-band-mist transition-opacity duration-[var(--duration-normal)] ease-entrance"
        style={{ opacity: phase === "showing" ? 1 : 0.4 }}
      >
        {transitions((style, i) => {
          const s = SCENES[i]!;
          return (
            <animated.div
              style={{ ...style, containerType: "size" }}
              className="absolute inset-3 flex items-center justify-center"
            >
              {/* Contain: as wide as fits without exceeding the stage height. */}
              <div style={{ width: `min(100cqw, ${fitRatio(s.crop)} * 100cqh)` }}>
                <ShotCrop
                  src={s.src}
                  alt={s.alt}
                  crop={s.crop}
                  sizes="100vw"
                  className="rounded-lg shadow-product ring-1 ring-line"
                />
              </div>
            </animated.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-line px-3 py-2.5 text-xs">
        <AiOrb
          size={22}
          accent={scene.employee.accent}
          state={phase === "showing" ? "active" : "thinking"}
          spin={false}
        />
        <span className="truncate">
          <span className="font-semibold">{scene.employee.name}</span>
          <span className="text-muted">
            {phase === "showing"
              ? ` · built from ${scene.sources.join(" · ")}`
              : ` is ${scene.employee.task}…`}
          </span>
        </span>
      </div>
    </div>
  );
};
