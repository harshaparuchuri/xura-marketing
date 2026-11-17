"use client";

import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { BuiltAtLogo } from "@/data/about";
import { useInViewport } from "@/hooks/use-in-viewport";

/**
 * BuiltAtMarquee — client leaf for `BuiltAtStrip`: the former-employer logos
 * drifting left in an endless row. Same technique as `graphics/logo-marquee`:
 * two copies of the row and a linear spring loop from 0 to -50%, paused off
 * screen and still for reduced motion. Edges fade (`.mask-x`). Screen readers
 * get the names once, as text; the moving copies are decorative.
 */
export const BuiltAtMarquee = ({ logos }: { logos: readonly BuiltAtLogo[] }) => {
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
    from: { x: 0 },
    to: { x: -50 },
    loop: true,
    pause: !inView || still,
    config: { duration: logos.length * 3000 },
  });

  return (
    <div ref={ref} className="mask-x relative overflow-hidden">
      <p className="sr-only">{logos.map((l) => l.name).join(", ")}</p>
      <animated.ul aria-hidden className="flex w-max items-center py-2" style={{ transform: x.to((v) => `translateX(${v}%)`) }}>
        {[...logos, ...logos].map((l, i) => (
          <li key={`${l.name}-${i}`} className="flex shrink-0 items-center pr-14">
            <Image
              src={l.src}
              alt=""
              width={l.width}
              height={l.height}
              className={`${l.stacked ? "h-10" : "h-6"} w-auto object-contain opacity-50`}
            />
          </li>
        ))}
      </animated.ul>
    </div>
  );
};
