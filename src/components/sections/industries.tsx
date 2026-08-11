"use client";

import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { INDUSTRIES } from "@/data/industries";

const CYCLE_MS = 5000;

/**
 * Industries — home showcase. Two-column band: left rail carries the header
 * copy and a duotone-treated photograph that rotates through each vertical
 * every `CYCLE_MS`; right rail is the list of every entry from
 * `src/data/industries.ts`. The active row highlights and shows a spring
 * progress bar for the current dwell; clicking a row jumps the timer.
 */
export const Industries = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % INDUSTRIES.length),
      CYCLE_MS,
    );
    return () => clearInterval(t);
  }, []);

  const [progress] = useSpring(
    () => ({
      from: { p: 0 },
      to: { p: 1 },
      reset: true,
      config: { duration: CYCLE_MS },
    }),
    [active],
  );

  const current = INDUSTRIES[active]!;

  return (
    <section id="industries" className="bg-background py-20 md:py-24">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Inview
            tag="p"
            mode="once"
            from={{ opacity: 0, y: 14 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="meta text-duo"
          >
            Built for the way every industry actually works
          </Inview>

          <Inview
            tag="h2"
            mode="once"
            delayIn={60}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="display-sans mt-3 max-w-[18ch]"
          >
            One Xura. Every industry, on its own terms.
          </Inview>

          <Inview
            mode="once"
            delayIn={180}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 170, friction: 28 }}
            className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-sm bg-duo"
          >
            {INDUSTRIES.map((industry, i) => (
              <Image
                key={industry.slug}
                src={industry.heroImage}
                alt={industry.heroImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority={i === 0}
                className={`object-cover mix-blend-luminosity transition-opacity duration-[600ms] ease-entrance ${
                  i === active ? "opacity-90" : "opacity-0"
                }`}
              />
            ))}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-duo-soft/40 to-duo/60 mix-blend-color"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/25">
              <animated.div
                className="h-full bg-accent"
                style={{
                  width: progress.p.to((p) => `${p * 100}%`),
                }}
              />
            </div>
            <p className="absolute bottom-3 left-4 text-xs font-medium text-background/90">
              {current.label}
            </p>
          </Inview>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {INDUSTRIES.map((industry, i) => {
            const headlineStat = industry.scenario.stats[0];
            const on = i === active;
            return (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  aria-current={on ? "true" : undefined}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group grid gap-4 py-6 transition-colors duration-[var(--duration-fast)] ease-entrance md:grid-cols-[1fr_auto] md:items-baseline md:gap-8 ${
                    on ? "bg-duo-wash/60 px-4 -mx-4 rounded-sm" : ""
                  }`}
                >
                  <div>
                    <h3 className="inline-flex items-baseline gap-2 text-base font-semibold tracking-tight">
                      {industry.label}
                      <span
                        aria-hidden
                        className="text-duo transition-transform duration-[var(--duration-fast)] ease-entrance group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">
                      {industry.intro}
                    </p>
                  </div>
                  {headlineStat ? (
                    <div className="md:text-right">
                      <p className="text-lg font-semibold tracking-tight text-duo">
                        {headlineStat.value}
                      </p>
                      <p className="meta mt-1">{headlineStat.label}</p>
                    </div>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
