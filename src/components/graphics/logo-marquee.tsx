"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { BRAND_LOGOS, SYSTEMS_LOGOS, WORK_LOGOS, type BrandLogo } from "@/data/brand-logos";
import { useInViewport } from "@/hooks/use-in-viewport";

/**
 * LogoMarquee — two endless rows of real integration logos (Simple Icons
 * marks in their brand colours) on white tiles, drifting in opposite
 * directions. A linear spring loop
 * over two copies of the row; paused off screen and still for people who
 * prefer reduced motion. Edges fade out. Logos are listed for screen readers
 * once, as text; the moving copies are decorative.
 */
const LogoRow = ({ logos, reverse = false }: { logos: readonly BrandLogo[]; reverse?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { x } = useSpring({
    from: { x: reverse ? -50 : 0 },
    to: { x: reverse ? 0 : -50 },
    loop: true,
    pause: !inView || still,
    config: { duration: logos.length * 3200 },
  });

  return (
    <div ref={ref} className="mask-x relative overflow-hidden">
      <animated.ul aria-hidden className="flex w-max py-3" style={{ transform: x.to((v) => `translateX(${v}%)`) }}>
        {[...logos, ...logos].map((l, i) => (
          <li key={`${l.name}-${i}`} className="flex flex-col items-center gap-3 pr-5">
            <span className="flex size-24 items-center justify-center rounded-3xl border border-line bg-background shadow-product md:size-28">
              <svg viewBox="0 0 24 24" className="size-10 md:size-12" fill={l.hex} role="img">
                <path d={l.path} />
              </svg>
            </span>
            <span className="text-xs text-muted">{l.name}</span>
          </li>
        ))}
      </animated.ul>
    </div>
  );
};

/** Two rows drifting in opposite directions: systems of record above, where work happens below. */
export const LogoMarquee = ({ className = "" }: { className?: string }) => (
  <div className={`py-3 ${className}`}>
    <p className="sr-only">Connects to {BRAND_LOGOS.map((l) => l.name).join(", ")}, and more.</p>
    <LogoRow logos={SYSTEMS_LOGOS} />
    <LogoRow logos={WORK_LOGOS} reverse />
  </div>
);
