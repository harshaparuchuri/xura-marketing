import { HazeField } from "@/components/graphics/haze-field";
import { ShotCrop } from "@/components/common/shot-crop";
import { AiOrb } from "@/components/graphics/ai-orb";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";
import { RailNav } from "@/components/sections/home/rail-nav";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { HOME_EMPLOYEES, HOME_OUTPUTS_EXTRA } from "@/data/home";

/**
 * AI employees — two parts in one section:
 * 1. Who does the work: the live site's open roster in the v2 style — large
 *    expressive monochrome AiOrb, name in light display type, role in mono,
 *    then the job and what they do. No card boxes. Kira's spot is an
 *    OrbDockSlot: on desktop the floating site orb flies in and becomes Kira.
 * 2. What they produce: a scroll rail of large output cards (`ShotCrop`)
 *    with RailNav and a right-edge fade.
 */
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
      <ul
        id="employees-rail-list"
        className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-75rem)/2+2.5rem))] pb-4"
      >
        {[
          ...HOME_EMPLOYEES.jobs.map((j) => ({ title: j.job, by: j.name, shot: j.shot })),
          ...HOME_OUTPUTS_EXTRA,
        ].map((j) => (
          <li key={j.title} className="w-[82vw] shrink-0 snap-start sm:w-[26rem]">
            <article
              className="flex h-full flex-col overflow-hidden rounded-3xl bg-foreground bg-cover bg-bottom text-background"
              style={{ backgroundImage: "var(--field-1)" }}
            >
              <div className="p-7">
                <p className="text-2xl font-light tracking-tight">{j.title}</p>
                <p className="mt-1 text-sm text-background/70">by {j.by}</p>
              </div>
              <div className="mt-auto h-60 overflow-hidden pl-7">
                <ShotCrop src={j.shot.src} alt={j.shot.alt} crop={j.shot.crop} sizes="(min-width: 640px) 400px, 80vw" className="rounded-tl-2xl shadow-product" />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  </section>
);
