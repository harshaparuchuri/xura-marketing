import Link from "next/link";

import { HazeField } from "@/components/graphics/haze-field";
import { FlowBuilderPreview } from "@/components/graphics/flow-builder-preview";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { PLATFORM_FLOWS } from "@/data/platform";

/** Flows — grey band: heading, a branching flow on the builder canvas, three points. */
export const Flows = () => (
  <section id="flows" aria-labelledby="flows-heading" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={2} />
    <div className="shell">
      <SectionHead id="flows-heading" label={PLATFORM_FLOWS.label} heading={PLATFORM_FLOWS.heading} lead={PLATFORM_FLOWS.lead} center />
      <Reveal className="mx-auto mt-14 max-w-[64rem]">
        <FlowBuilderPreview />
        <p className="mt-3 text-center text-xs text-muted">A flow on Xura&apos;s canvas: a deviation is investigated, critical ones wait for QA approval before a CAPA is created.</p>
      </Reveal>
      <ul className="mx-auto mt-12 grid max-w-[60rem] gap-8 md:grid-cols-3">
        {PLATFORM_FLOWS.points.map((p, i) => (
          <Reveal key={p.title} tag="li" delay={i * 60}>
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12 flex justify-center">
        <Link href="/workflows" className="pill pill-ghost">
          More about workflows <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
);
