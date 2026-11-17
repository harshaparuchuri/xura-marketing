import { HazeField } from "@/components/graphics/haze-field";

import { AiOrb } from "@/components/graphics/ai-orb";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";
import { RailNav } from "@/components/sections/home/rail-nav";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { OutputsList } from "@/components/sections/shared/outputs-list";
import { HOME_EMPLOYEES } from "@/data/home";

export const EmployeesGrid = () => (
  <section id="ai-employees" aria-labelledby="employees-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={2} />
    <div className="shell">
      <SectionHead id="employees-heading" label="What we build" heading={HOME_EMPLOYEES.heading} lead={`${HOME_EMPLOYEES.lead} ${HOME_EMPLOYEES.channels}`} center />
      <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {HOME_EMPLOYEES.jobs.map((j, i) => (
          <Reveal key={j.name} tag="li" delay={i * 80}>
            {j.name === "Kira" ? (
              <OrbDockSlot id="roster-kira" size={72} accent="var(--muted)" />
            ) : (
              <AiOrb size={72} accent="var(--muted)" expressive spin={false} />
            )}
            <h3 className="mt-6 text-2xl font-light tracking-tight sm:text-3xl">{j.name}</h3>
            <p className="mt-1 font-mono text-xs text-muted">{j.role}</p>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">{j.job}.</span> {j.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </div>

    <div className="shell mt-16 flex items-end justify-between gap-6">
      <h3 className="text-xl font-light tracking-tight md:text-2xl">What they produce</h3>
      <RailNav targetId="employees-rail-list" label="Scroll the outputs" />
    </div>
    <div className="relative">
      <OutputsList id="employees-rail-list" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  </section>
);
