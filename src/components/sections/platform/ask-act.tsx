import { FlowField } from "@/components/graphics/flow-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { PLATFORM_ASK } from "@/data/platform";

/** Ask and act — dark band with three numbered steps in one bordered row. */
export const AskAct = () => (
  <section aria-labelledby="ask-heading" className="relative isolate overflow-hidden py-24 text-background md:py-32">
    <FlowField tone="dark" variant={1} />
    <div className="shell">
      <SectionHead id="ask-heading" label={PLATFORM_ASK.label} heading={PLATFORM_ASK.heading} inverse center />
      <Reveal tag="ol" className="mt-14 grid overflow-hidden rounded-2xl border border-background/15 md:grid-cols-3">
        {PLATFORM_ASK.steps.map((s, i) => (
          <li key={s.title} className="border-background/15 p-7 not-last:border-b md:not-last:border-b-0 md:not-last:border-r">
            <span className="font-mono text-xs text-background/50">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-light tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-background/70">{s.body}</p>
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);
