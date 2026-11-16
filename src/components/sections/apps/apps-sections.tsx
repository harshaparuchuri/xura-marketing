import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { APPS_ANATOMY, APPS_COMPARE, APPS_EXAMPLES, APPS_STEPS } from "@/data/apps";

/** How it's built — four numbered steps in one bordered row. */
export const AppsSteps = () => (
  <section aria-labelledby="apps-steps-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={1} />
    <div className="shell">
      <SectionHead id="apps-steps-heading" label={APPS_STEPS.label} heading={APPS_STEPS.heading} center />
      <Reveal tag="ol" className="mt-14 grid overflow-hidden rounded-2xl border border-line md:grid-cols-4">
        {APPS_STEPS.steps.map((s, i) => (
          <li key={s.title} className="border-line p-7 not-last:border-b md:not-last:border-b-0 md:not-last:border-r">
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-light tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);

/** What's in every app — hairline 3×2 grid on a grey band. */
export const AppsAnatomy = () => (
  <section aria-labelledby="apps-anatomy-heading" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={0} />
    <div className="shell">
      <SectionHead id="apps-anatomy-heading" label={APPS_ANATOMY.label} heading={APPS_ANATOMY.heading} center />
      <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {APPS_ANATOMY.items.map((t, i) => (
          <Reveal key={t.title} tag="li" delay={(i % 3) * 50} className="border-b border-r border-line bg-background p-7">
            <h3 className="text-lg font-medium">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/** Examples — six app cards. */
export const AppsExamples = () => (
  <section aria-labelledby="apps-examples-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={2} />
    <div className="shell">
      <SectionHead id="apps-examples-heading" label={APPS_EXAMPLES.label} heading={APPS_EXAMPLES.heading} center />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {APPS_EXAMPLES.items.map((a, i) => (
          <Reveal key={a.name} tag="li" delay={(i % 3) * 60} className="rounded-3xl border border-line bg-background p-7">
            <h3 className="text-2xl font-light tracking-tight">{a.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/** Apps vs flows vs AI employees — three columns, Apps highlighted. */
export const AppsCompare = () => (
  <section aria-labelledby="apps-compare-heading" className="relative isolate overflow-hidden border-t border-line py-24 md:py-32">
    <HazeField variant={1} />
    <div className="shell">
      <SectionHead id="apps-compare-heading" label={APPS_COMPARE.label} heading={APPS_COMPARE.heading} center />
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {APPS_COMPARE.items.map((c, i) => (
          <Reveal key={c.title} tag="li" delay={i * 60} className={`rounded-3xl p-7 ${i === 0 ? "bg-foreground text-background" : "border border-line"}`}>
            <h3 className="text-2xl font-light tracking-tight">{c.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-background/75" : "text-muted"}`}>{c.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
