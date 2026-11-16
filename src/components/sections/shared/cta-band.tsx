import { FlowField } from "@/components/graphics/flow-field";
import { Reveal } from "@/components/sections/home/reveal";
import { siteConfig } from "@/lib/site";

/** CtaBand — dark FlowField closing band: heading, optional sub, bootcamp pill. */
export const CtaBand = ({ id, heading, sub, variant = 2 }: { id: string; heading: string; sub?: string; variant?: 0 | 1 | 2 }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 text-center text-background md:py-36">
    <FlowField tone="dark" variant={variant} />
    <div className="shell">
      <Reveal tag="h2" className="display-light-md mx-auto max-w-[20ch]">
        <span id={id}>{heading}</span>
      </Reveal>
      {sub ? (
        <Reveal tag="p" delay={60} className="mx-auto mt-5 max-w-[48ch] text-base text-background/70">
          {sub}
        </Reveal>
      ) : null}
      <Reveal delay={120} className="mt-9 flex justify-center">
        <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
          Book a 2-day bootcamp <span aria-hidden>→</span>
        </a>
      </Reveal>
    </div>
  </section>
);
