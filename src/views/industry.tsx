import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { AiOrb } from "@/components/graphics/ai-orb";
import { HeroBackdrop } from "@/components/graphics/hero-backdrop";
import { RoutineTimeline } from "@/components/sections/routine-timeline";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { EMPLOYEE_ACCENT, getIndustry } from "@/data/industries";
import { siteConfig } from "@/lib/site";

type Props = { slug: string };

export const IndustryView = ({ slug }: Props) => {
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <main>
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[38rem]"
            style={{
              background:
                "linear-gradient(180deg, var(--duo-soft) 0%, var(--duo-wash) 30%, var(--background) 70%)",
            }}
          />
          <HeroBackdrop
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-15"
            color="#059669"
            scale={0.65}
          />
          <div className="relative z-10">
            <SiteNav />
            <div className="shell pt-14 pb-16 text-center md:pt-20">
              <Spring
                tag="p"
                mode="once"
                from={{ opacity: 0, y: 14 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="meta"
              >
                {industry.eyebrow}
              </Spring>
              <Spring
                tag="h1"
                mode="once"
                delayIn={80}
                from={{ opacity: 0, y: 22 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 175, friction: 28 }}
                className="display-serif mx-auto mt-3 max-w-[22ch]"
              >
                {industry.headline}{" "}
                <span className="font-semibold italic">
                  {industry.headlineAccent}
                </span>
              </Spring>
              <Spring
                tag="p"
                mode="once"
                delayIn={160}
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 175, friction: 28 }}
                className="mx-auto mt-5 max-w-[60ch] text-sm leading-relaxed text-muted"
              >
                {industry.subhead}
              </Spring>
              <Spring
                mode="once"
                delayIn={240}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 175, friction: 28 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
              >
                <Link href={siteConfig.signupUrl} className="pill">
                  <span aria-hidden>▪</span> Get started for free
                </Link>
                <Link href="#use-cases" className="pill pill-ghost">
                  <span aria-hidden>▪</span> See the use cases
                </Link>
              </Spring>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="shell">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-sans mx-auto max-w-[28ch] text-center"
            >
              {industry.problem.heading}
            </Inview>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {industry.problem.items.map((item, i) => (
                <Inview
                  key={item.title}
                  tag="li"
                  mode="once"
                  delayIn={i * 70}
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="rounded-sm border border-line p-6"
                >
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </Inview>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-band-mist py-20 md:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Inview
              mode="once"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 170, friction: 28 }}
              className="w-full"
              data-slot={`industry-${industry.slug}-solution`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-duo">
                <Image
                  src={industry.heroImage}
                  alt={industry.heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover opacity-90 mix-blend-luminosity"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-duo-soft/40 to-duo/60 mix-blend-color"
                />
              </div>
            </Inview>
            <div>
              <Inview
                tag="h2"
                mode="once"
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="display-sans max-w-[24ch]"
              >
                {industry.solution.heading}
              </Inview>
              <Inview
                tag="p"
                mode="once"
                delayIn={80}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="mt-5 max-w-[54ch] text-sm leading-relaxed text-muted"
              >
                {industry.solution.body}
              </Inview>
              <ul className="mt-8 grid max-w-[54ch] gap-3">
                {industry.employees.map((employee, i) => (
                  <Inview
                    key={employee.name}
                    tag="li"
                    mode="once"
                    delayIn={160 + i * 80}
                    from={{ opacity: 0, y: 16 }}
                    to={{ opacity: 1, y: 0 }}
                    config={{ tension: 180, friction: 27 }}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-background p-5"
                  >
                    <AiOrb size={48} accent={EMPLOYEE_ACCENT[employee.name]} spin={false} />
                    <div>
                      <p className="text-sm font-semibold">
                        Meet {employee.name}
                        <span
                          className="ml-2 text-[0.6875rem] font-semibold uppercase tracking-widest"
                          style={{ color: EMPLOYEE_ACCENT[employee.name] }}
                        >
                          {employee.role}
                        </span>
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {employee.does}
                      </p>
                    </div>
                  </Inview>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="use-cases" className="bg-background py-20 md:py-24">
          <div className="shell">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-sans mx-auto max-w-[24ch] text-center"
            >
              What your AI employees run, and when
            </Inview>
            <p className="mx-auto mt-4 max-w-[56ch] text-center text-sm text-muted">
              Built-in routines that start on day one. Each one shows who runs
              it, when, and what waits for your approval.
            </p>
            <RoutineTimeline routines={industry.useCases} />
          </div>
        </section>

        <section className="texture bg-band-sand py-20 md:py-24">
          <div className="shell text-center">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-serif mx-auto max-w-[30ch]"
            >
              {industry.scenario.heading}
            </Inview>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {industry.scenario.stats.map((s, i) => (
                <Inview
                  key={s.label}
                  tag="li"
                  mode="once"
                  delayIn={i * 80}
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="rounded-lg bg-background p-6"
                >
                  <p className="text-2xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-muted">{s.label}</p>
                </Inview>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-band-mist py-20 md:py-24">
          <div className="shell text-center">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-sans mx-auto max-w-[46ch]"
            >
              {industry.cta}
            </Inview>
            <Inview
              mode="once"
              delayIn={80}
              from={{ opacity: 0, y: 14 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="mt-7 flex justify-center"
            >
              <Link href={siteConfig.signupUrl} className="pill">
                <span aria-hidden>▪</span> Get started for free
              </Link>
            </Inview>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};
