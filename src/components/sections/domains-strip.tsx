"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

/**
 * DomainsStrip — dark band echoing the "one layer across every team you
 * onboard" section on xuralabs.com. Single-line, infinite side-scrolling
 * marquee driven by react-spring (no CSS keyframes).
 */
const DOMAINS = [
  "Marketing",
  "Product",
  "Finance",
  "Operations",
  "People",
  "Revenue",
  "Success",
  "Sales",
];

const SPEED_PX_PER_S = 60;

export const DomainsStrip = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTrackWidth(el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [style] = useSpring(
    () => ({
      from: { x: 0 },
      to: { x: -trackWidth },
      loop: trackWidth > 0,
      config: { duration: trackWidth ? (trackWidth / SPEED_PX_PER_S) * 1000 : 1 },
      reset: true,
    }),
    [trackWidth],
  );

  const items = [...DOMAINS, ...DOMAINS];

  return (
    <section className="relative isolate overflow-hidden bg-foreground py-10 text-background md:py-10">
      <div className="shell text-center">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.24em] opacity-60">
          One layer across every team you onboard
        </p>
      </div>

      <div
        className="mt-6 overflow-hidden md:mt-7 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-label="Domains Xura serves"
      >
        <animated.ul
          ref={trackRef}
          style={style}
          className="flex w-max flex-nowrap items-center gap-x-12 whitespace-nowrap md:gap-x-16 lg:gap-x-24"
        >
          {items.map((label, i) => (
            <li
              key={`${label}-${i}`}
              className="text-base font-semibold tracking-tight opacity-80 md:text-lg"
              aria-hidden={i >= DOMAINS.length}
            >
              {label}
            </li>
          ))}
        </animated.ul>
      </div>
    </section>
  );
};
