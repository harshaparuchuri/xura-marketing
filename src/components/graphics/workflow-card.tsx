"use client";

import { animated, useSpring, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";

/**
 * WorkflowCard — dark terminal-styled card echoing xuralabs.com's
 * "Xura is on it" hero visual. A macOS-style window frame with a question
 * bar and an animated checklist that progressively completes step-by-step.
 *
 * Animation is a stepwise reveal + tick — springs only, no CSS keyframes.
 * When the visible index reaches STEPS.length - 1 the last step stays in the
 * pulsing "in progress" state to loop the illusion of ongoing work.
 */

const QUESTION = "Which campaigns are missing CAC targets?";
const TAG = "Marketing";
const STEPS = [
  "Joining spend with conversions",
  "Computing CAC by campaign",
  "Comparing to targets",
  "Recommending reallocation",
];

const STEP_INTERVAL_MS = 1200;
const LOOP_PAUSE_MS = 3200;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden focusable="false">
    <path
      d="M6 12.5l4 4 8-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WorkflowCard = () => {
  const [visible, setVisible] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      setVisible(0);
      setActive(0);
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        if (i < STEPS.length) {
          setVisible(i);
          setActive(i);
          setTimeout(tick, STEP_INTERVAL_MS);
        } else {
          setVisible(STEPS.length);
          setActive(STEPS.length - 1);
          setTimeout(() => !cancelled && run(), LOOP_PAUSE_MS);
        }
      };
      setTimeout(tick, STEP_INTERVAL_MS);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const shownItems = STEPS.slice(0, Math.max(visible, 1)).map(
    (label, i) => ({ label, index: i }),
  );

  const transitions = useTransition(shownItems, {
    keys: (item) => item.index,
    from: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 26 },
  });

  const [pulse] = useSpring(
    () => ({
      from: { scale: 0.75, opacity: 0 },
      to: async (next) => {
        while (true) {
          await next({ scale: 1.4, opacity: 0.55 });
          await next({ scale: 0.75, opacity: 0 });
        }
      },
      config: { tension: 120, friction: 22 },
    }),
    [],
  );

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[rgba(52,211,153,0.18)] bg-[#0b1310] p-5 text-[#d5e6df] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.7)] md:p-7"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Faint diagonal grid to echo the ref card's texture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(52,211,153,0.06) 0 1px, transparent 1px 60px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative">
        {/* Traffic lights + question bar */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.14)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.14)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.14)]" />
          </div>
          <div className="flex flex-1 items-center gap-2.5 rounded-md border border-[rgba(52,211,153,0.18)] bg-[rgba(52,211,153,0.06)] px-3 py-1.5 font-mono text-[0.75rem]">
            <span aria-hidden className="text-[#34d399]">
              ✳
            </span>
            <span className="truncate text-[#e6f6ef]">{QUESTION}</span>
            <span className="ml-auto whitespace-nowrap text-[#7ba895]">
              · {TAG}
            </span>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="mt-6 text-center font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#7ba895]">
          Xura is on it: defining and running the workflow
        </p>

        {/* Step list */}
        <ul className="mt-5 space-y-2">
          {transitions((style, item) => {
            const isActive = item.index === active && visible <= STEPS.length - 1
              ? true
              : item.index === STEPS.length - 1 && visible >= STEPS.length;
            const isDone = item.index < visible && !isActive;

            return (
              <animated.li
                style={style}
                className={
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm " +
                  (isActive
                    ? "border border-[rgba(190,242,100,0.35)] bg-[rgba(190,242,100,0.06)]"
                    : "border border-transparent")
                }
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  {isDone ? (
                    <>
                      <span className="absolute inset-0 rounded-full bg-[#34d399]" />
                      <span className="relative text-[#0b1310]">
                        <CheckIcon />
                      </span>
                    </>
                  ) : isActive ? (
                    <>
                      <animated.span
                        style={{
                          transform: pulse.scale.to((s) => `scale(${s})`),
                          opacity: pulse.opacity,
                        }}
                        className="absolute inset-0 rounded-full bg-[#bef264]"
                      />
                      <span className="relative h-3 w-3 rounded-full border-2 border-[#bef264]">
                        <span className="absolute inset-0.5 rounded-full bg-[#bef264]" />
                      </span>
                    </>
                  ) : (
                    <span className="h-3 w-3 rounded-full border border-[rgba(255,255,255,0.18)]" />
                  )}
                </span>
                <span
                  className={
                    isActive
                      ? "text-white"
                      : isDone
                        ? "text-[#a7c1b6]"
                        : "text-[#7ba895]"
                  }
                >
                  {item.label}
                </span>
              </animated.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
