"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLoopInView } from "@/hooks/animation/use-loop-in-view";

type Team = { name: string; href: string };

/** Pixels per second. Slow enough to read every name. */
const SPEED = 28;

/**
 * TeamMarquee — client leaf for `TeamStrip`. Two copies of the list slide
 * left on the shared animation ticker (`useLoopInView`: one app-wide rAF,
 * stops a few frames after leaving the viewport) and wrap seamlessly at one
 * copy's width. The second copy is `aria-hidden` with untabbable links, so
 * screen readers, keyboards and crawlers see each team once. Reduced motion:
 * a static, centred, wrapping list.
 */
export const TeamMarquee = ({ teams }: { teams: readonly Team[] }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLUListElement>(null);
  const offset = useRef(0);
  const last = useRef<number | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(reduced.matches);
    sync();
    reduced.addEventListener("change", sync);
    return () => reduced.removeEventListener("change", sync);
  }, []);

  useLoopInView(
    viewportRef as React.RefObject<HTMLDivElement>,
    (time) => {
      const track = trackRef.current;
      const width = firstRef.current?.offsetWidth ?? 0;
      if (still || !track || !width) return;
      // Clamp the step so a backgrounded tab doesn't jump on return.
      const dt = last.current === null ? 0 : Math.min(time - last.current, 64);
      last.current = time;
      offset.current = (offset.current + (SPEED * dt) / 1000) % width;
      track.style.transform = `translate3d(${-offset.current}px,0,0)`;
    },
    { framerate: 0, onUnMount: () => (last.current = null) },
  );

  const list = (hidden: boolean) => (
    <ul
      ref={hidden ? undefined : firstRef}
      aria-hidden={hidden || undefined}
      className={still ? "flex flex-wrap justify-center gap-x-10 gap-y-4" : "flex shrink-0"}
    >
      {teams.map((t) => (
        <li key={t.name} className={still ? "" : "px-8 md:px-12"}>
          <Link
            href={t.href}
            tabIndex={hidden ? -1 : undefined}
            className="whitespace-nowrap text-xl font-light tracking-tight text-background/70 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-background md:text-2xl"
          >
            {t.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={viewportRef} className={still ? "" : "mask-x overflow-hidden"}>
      {still ? (
        list(false)
      ) : (
        <div ref={trackRef} className="flex w-max will-change-transform">
          {list(false)}
          {list(true)}
        </div>
      )}
    </div>
  );
};
