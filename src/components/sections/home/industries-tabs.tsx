"use client";

import { HazeField } from "@/components/graphics/haze-field";

import Link from "next/link";
import { useState } from "react";

import { PhotoFill } from "@/components/common/photo-fill";
import { Reveal } from "@/components/sections/home/reveal";
import { HOME_INDUSTRIES } from "@/data/home";
import { INDUSTRIES } from "@/data/industries";

/**
 * Industries — pill tabs above one large card (visual reference: the
 * wonderful.ai industries block). The card shows the selected industry, its
 * an example workflow and a link to its page. Switching is a discrete state change.
 * Photos crossfade (discrete opacity, CSS transition) under a dark wash.
 */
export const IndustriesTabs = () => {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <section aria-labelledby="industries-heading" className="relative isolate overflow-hidden py-24 md:py-32">
      <HazeField variant={1} />
      <div className="shell">
        <div className="mx-auto max-w-[44rem] text-center">
          <Reveal tag="p" className="text-sm font-medium text-muted">Industries</Reveal>
          <Reveal tag="h2" delay={40} className="display-light-md mt-3">
            <span id="industries-heading">{HOME_INDUSTRIES.heading}</span>
          </Reveal>
        </div>

        <div role="tablist" aria-label="Industries" className="mx-auto mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-background p-1">
          {INDUSTRIES.map((item, i) => (
            <button
              key={item.slug}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="industry-panel"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-[var(--duration-fast)] ease-entrance ${
                i === active ? "bg-foreground font-medium text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label.split(" & ")[0]}
            </button>
          ))}
        </div>

        <div
          id="industry-panel"
          role="tabpanel"
          className="relative isolate mt-8 flex min-h-[26rem] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center text-background md:min-h-[34rem]"
        >
          {INDUSTRIES.map((item, i) =>
            item.photo ? (
              <PhotoFill
                key={item.slug}
                src={item.photo.src}
                alt={i === active ? item.photo.alt : ""}
                sizes="(min-width: 1200px) 1120px, 100vw"
                focus={item.photo.focus}
                className={`-z-20 transition-opacity duration-[var(--duration-normal)] ease-entrance ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ) : null,
          )}
          <span aria-hidden className="absolute inset-0 -z-10 bg-foreground/60" />
          <p className="text-sm text-background/60">Example: {ind.useCases[0]?.title}</p>
          <h3 className="display-light mt-3 max-w-[16ch]">AI for {ind.label}</h3>
          <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-background/70">{ind.subhead}</p>
          <Link href={`/industries/${ind.slug}`} className="pill pill-inverse mt-8">
            Explore {ind.label.split(" & ")[0]} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
