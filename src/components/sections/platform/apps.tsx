import { HazeField } from "@/components/graphics/haze-field";
import { HiringAppPreview } from "@/components/graphics/hiring-app-preview";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { PLATFORM_APPS } from "@/data/platform";

/** Apps — "describe it, Xura builds it": the Hiring pipeline app, four points, example apps. */
export const Apps = () => (
  <section id="apps" aria-labelledby="apps-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={0} />
    <div className="shell">
      <SectionHead id="apps-heading" label={PLATFORM_APPS.label} heading={PLATFORM_APPS.heading} lead={PLATFORM_APPS.lead} center />
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] [&>*]:min-w-0">
        <Reveal>
          <HiringAppPreview />
          <p className="mt-3 text-center text-xs text-muted">A hiring pipeline app, built in Xura by describing it in chat.</p>
        </Reveal>
        <ul className="border-t border-line">
          {PLATFORM_APPS.points.map((p, i) => (
            <Reveal key={p.title} tag="li" delay={i * 50} className="border-b border-line py-5">
              <h3 className="text-lg font-medium">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm">
        <a href="/apps" className="pill pill-ghost mr-3">More about Apps <span aria-hidden>→</span></a>
        <span className="mr-2 text-muted">Apps teams build:</span>
        {PLATFORM_APPS.examples.map((name) => (
          <span key={name} className="rounded-full border border-line px-3.5 py-1.5">{name}</span>
        ))}
      </Reveal>
    </div>
  </section>
);
