"use client";

import { animated, to, useTransition } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { useInViewport } from "@/hooks/use-in-viewport";
import { HOME_FEED } from "@/data/home";

const VISIBLE = 3;
/** One slot = card height (4.5rem) + gap (0.75rem). */
const SLOT_REM = 5.25;
const FADE = [1, 0.7, 0.4, 0];

/**
 * ApprovalFeed — a stack of work cards that cycles: each shows where the data
 * came from, the task, its status and the action waiting on a person. One
 * spring transition drives the whole stack: the newest card drops in on
 * top, the others glide down a slot and fade back, and the oldest slides
 * out. Pauses off screen.
 * Decorative illustration of the product (aria-hidden); the statement next
 * to it carries the message.
 */
export const ApprovalFeed = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, [inView]);

  const items = Array.from({ length: VISIBLE }, (_, i) => {
    const n = tick - i;
    return { key: n, item: HOME_FEED[((n % HOME_FEED.length) + HOME_FEED.length) % HOME_FEED.length] };
  });

  const transitions = useTransition(
    items.map((it, i) => ({ ...it, slot: i })),
    {
      keys: (it) => it.key,
      from: { slot: -0.6, opacity: 0, scale: 0.96 },
      enter: (it) => ({ slot: it.slot, opacity: FADE[it.slot], scale: 1 }),
      update: (it) => ({ slot: it.slot, opacity: FADE[it.slot], scale: 1 }),
      leave: { slot: VISIBLE, opacity: 0, scale: 0.96 },
      config: { tension: 170, friction: 26 },
    },
  );

  return (
    <div ref={ref} aria-hidden className="relative" style={{ height: `${VISIBLE * SLOT_REM - 0.75}rem` }}>
      {transitions((style, { item }) => (
        <animated.div
          className="absolute inset-x-0 top-0"
          style={{
            opacity: style.opacity,
            transform: to([style.slot, style.scale], (v, k) => `translateY(${v * SLOT_REM}rem) scale(${k})`),
          }}
        >
          <div className="flex h-18 items-center gap-3 rounded-2xl sm:gap-4 bg-background px-4 text-foreground shadow-product">
            <span className="hidden shrink-0 rounded-full bg-line-soft px-3 py-1 font-mono text-[0.6875rem] text-muted sm:inline">
              {item.source}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{item.task}</span>
              <span className="block truncate text-xs text-muted">{item.status}</span>
            </span>
            <span className="shrink-0 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background">
              {item.action}
            </span>
          </div>
        </animated.div>
      ))}
    </div>
  );
};
