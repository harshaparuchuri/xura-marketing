import Link from "next/link";

import { FlowField } from "@/components/graphics/flow-field";
import { PulseLivePreview } from "@/components/graphics/pulse-preview";
import { Reveal } from "@/components/sections/home/reveal";
import { HOME_PULSE } from "@/data/home";

/**
 * PulseBand — home: one dark band introducing Xura Pulse (the second
 * product) between the outputs rail and Industries. Copy left, the coded live
 * run (100-seat crowd) right; links to /pulse. Server Component.
 */
export const PulseBand = () => (
  <section aria-labelledby="pulse-band-heading" className="relative isolate overflow-hidden py-24 text-background md:py-32">
    <FlowField tone="dark" variant={2} />
    <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.35fr] [&>*]:min-w-0">
      <div>
        <Reveal tag="p" className="flex items-center gap-2 text-sm font-medium text-background/60">
          {HOME_PULSE.label}
          <span className="rounded-full bg-background px-2 py-0.5 text-[0.625rem] font-semibold text-foreground">{HOME_PULSE.tag}</span>
        </Reveal>
        <Reveal tag="h2" delay={40} className="display-light-md mt-4 max-w-[16ch]">
          <span id="pulse-band-heading">{HOME_PULSE.heading}</span>
        </Reveal>
        <Reveal tag="p" delay={80} className="mt-6 max-w-[42ch] text-base leading-relaxed text-background/70 md:text-lg">
          {HOME_PULSE.body}
        </Reveal>
        <Reveal tag="ul" delay={100} className="mt-8 space-y-2.5 text-sm">
          {HOME_PULSE.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span aria-hidden className="size-1.5 rounded-full bg-pulse-yes" />
              {p}
            </li>
          ))}
        </Reveal>
        <Reveal delay={140} className="mt-9">
          <Link href="/pulse" className="pill pill-inverse pill-lg">
            {HOME_PULSE.cta} <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <PulseLivePreview className="ring-1 ring-background/10" />
      </Reveal>
    </div>
  </section>
);
