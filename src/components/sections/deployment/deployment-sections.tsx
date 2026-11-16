import { HazeField } from "@/components/graphics/haze-field";
import { PhotoFill } from "@/components/common/photo-fill";
import { FlowField } from "@/components/graphics/flow-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { DEPLOY_BOOTCAMP, DEPLOY_HOSTING, DEPLOY_LEAD, DEPLOY_STEPS, DEPLOY_WHY } from "@/data/deployment";
import { siteConfig } from "@/lib/site";

/** The engagement — a timeline: when · step · what happens. */
export const DeploySteps = () => (
  <section aria-labelledby="deploy-steps-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={0} />
    <div className="shell">
      <SectionHead id="deploy-steps-heading" label={DEPLOY_STEPS.label} heading={DEPLOY_STEPS.heading} center />
      <ol className="mx-auto mt-14 max-w-[60rem] border-t border-line">
        {DEPLOY_STEPS.steps.map((s, i) => (
          <Reveal key={s.title} tag="li" delay={i * 50} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[9rem_14rem_1fr] sm:gap-8">
            <span className="font-mono text-xs text-muted sm:pt-1.5">{s.when}</span>
            <h3 className="text-xl font-light tracking-tight">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

/** Deployment lead — workshop photo beside four points. */
export const DeployLead = () => (
  <section aria-labelledby="deploy-lead-heading" className="pb-24 md:pb-32">
    <div className="shell grid items-center gap-10 lg:grid-cols-2 [&>*]:min-w-0">
      <Reveal className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl">
        <PhotoFill src="/assets/photos/team-workshop.webp" alt="A deployment lead walking a team through a process map" sizes="(min-width: 1024px) 560px, 100vw" />
      </Reveal>
      <div>
        <SectionHead id="deploy-lead-heading" label={DEPLOY_LEAD.label} heading={DEPLOY_LEAD.heading} />
        <ul className="mt-8 border-t border-line">
          {DEPLOY_LEAD.points.map((p, i) => (
            <Reveal key={p} tag="li" delay={i * 50} className="flex gap-4 border-b border-line py-4 text-base">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              {p}
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/** The 2-day bootcamp — grey band, two day cards, CTA. */
export const DeployBootcamp = () => (
  <section id="bootcamp" aria-labelledby="deploy-bootcamp-heading" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={1} />
    <div className="shell">
      <SectionHead id="deploy-bootcamp-heading" label={DEPLOY_BOOTCAMP.label} heading={DEPLOY_BOOTCAMP.heading} lead={DEPLOY_BOOTCAMP.body} center />
      <ul className="mx-auto mt-12 grid max-w-[48rem] gap-4 sm:grid-cols-2">
        {DEPLOY_BOOTCAMP.days.map((d, i) => (
          <Reveal key={d.day} tag="li" delay={i * 60} className="rounded-3xl bg-background p-7">
            <p className="font-mono text-xs text-muted">{d.day}</p>
            <p className="mt-4 text-lg font-light leading-snug tracking-tight">{d.body}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10 flex justify-center">
        <a href={siteConfig.demoUrl} className="pill pill-lg">Book a 2-day bootcamp <span aria-hidden>→</span></a>
      </Reveal>
    </div>
  </section>
);

/** Where Xura runs — dark band, three hosting options. */
export const DeployHosting = () => (
  <section id="hosting" aria-labelledby="deploy-hosting-heading" className="relative isolate overflow-hidden py-24 text-background md:py-32">
    <FlowField tone="dark" variant={0} />
    <div className="shell">
      <SectionHead id="deploy-hosting-heading" label={DEPLOY_HOSTING.label} heading={DEPLOY_HOSTING.heading} lead={DEPLOY_HOSTING.lead} inverse center />
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {DEPLOY_HOSTING.options.map((o, i) => (
          <Reveal key={o.title} tag="li" delay={i * 60} className="rounded-3xl bg-background/5 p-7 ring-1 ring-background/15">
            <span className="rounded-full border border-background/25 px-3 py-1 font-mono text-[0.6875rem] text-background/70">{o.tag}</span>
            <h3 className="mt-8 text-2xl font-light tracking-tight">{o.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-background/70">{o.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/** Why partner-led — the MIT stat, large. */
export const DeployWhy = () => (
  <section aria-labelledby="deploy-why-heading" className="relative isolate overflow-hidden py-24 text-center md:py-32">
    <HazeField variant={2} />
    <div className="shell">
      <Reveal tag="p" className="text-sm font-medium text-muted">
        <span id="deploy-why-heading">{DEPLOY_WHY.heading}</span>
      </Reveal>
      <Reveal tag="p" delay={60} className="display-light-md mx-auto mt-4 max-w-[26ch]">{DEPLOY_WHY.stat}</Reveal>
      <Reveal tag="p" delay={100} className="mt-5 text-xs text-muted">{DEPLOY_WHY.source}</Reveal>
    </div>
  </section>
);
