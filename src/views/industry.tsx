import { HazeField } from "@/components/graphics/haze-field";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Spring } from "@/components/animation/springs/spring";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { PhotoFill } from "@/components/common/photo-fill";
import { FlowField } from "@/components/graphics/flow-field";
import { RailNav } from "@/components/sections/home/rail-nav";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { AnswerBlock, RelatedLinks } from "@/components/sections/shared/content-blocks";
import { ChecklistSection } from "@/components/sections/shared/depth-sections";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { GridSection } from "@/components/sections/shared/feature-sections";
import { getIndustry } from "@/data/industries";
import { getUseCase } from "@/data/use-cases";
import { siteConfig } from "@/lib/site";

type Props = { slug: string };

/**
 * Industry view — same design system as the home (ADR-0035/0036):
 * full-bleed photo hero with a floating white nav, the problem as a
 * hairline list, the solution on a dark band, the workflows we build
 * as a scroll rail, the example as large numbers on a grey band, and a dark
 * closing. Monochrome; no employee colours or orbs.
 */
export const IndustryView = ({ slug }: Props) => {
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const short = industry.label.split(" & ")[0];
  /** "pharma", "manufacturing" — but keep acronyms like "SaaS" as written. */
  const shortInline = /[A-Z].*[A-Z]/.test(short) ? short : short.toLowerCase();
  const railId = `industry-${industry.slug}-rail`;
  const useCaseLinks = (industry.useCaseSlugs ?? [])
    .map((s) => getUseCase(s))
    .filter((u) => u !== undefined)
    .map((u) => ({ href: `/use-cases/${u.slug}`, label: u.name, body: u.meta.description }));

  return (
    <div className="palette-green">
      <main>
        {/* Hero */}
        <section aria-labelledby="industry-heading" className="relative isolate z-20 flex min-h-[88svh] flex-col overflow-hidden text-background">
          <PhotoFill
            src={industry.photo.src}
            alt={industry.photo.alt}
            focus={industry.photo.focus}
            priority
            sizes="100vw"
            className="-z-20"
          />
          <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-foreground/80 via-foreground/60 to-foreground/85" />
          <SiteNav overDark />

          <div className="shell flex flex-1 flex-col items-center justify-center pb-20 pt-8 text-center">
            <Breadcrumbs
              tone="dark"
              crumbs={[
                { name: "Home", path: "" },
                { name: "Industries", path: "/industries" },
                { name: industry.label, path: `/industries/${industry.slug}` },
              ]}
              className="mb-8 flex justify-center"
            />
            <Spring
              tag="h1"
              mode="once"
              from={{ y: 22 }}
              to={{ y: 0 }}
              config={{ tension: 175, friction: 28 }}
              className="display-light mx-auto max-w-[18ch]"
            >
              <span id="industry-heading">
                {industry.headline} {industry.headlineAccent}
              </span>
            </Spring>
            <Spring
              tag="p"
              mode="once"
              delayIn={90}
              from={{ y: 18 }}
              to={{ y: 0 }}
              config={{ tension: 175, friction: 28 }}
              className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-background/75 md:text-lg"
            >
              {industry.subhead}
            </Spring>
            <Spring
              mode="once"
              delayIn={160}
              from={{ y: 14 }}
              to={{ y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="mt-9 flex flex-wrap justify-center gap-3"
            >
              <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
                Book a 2-day bootcamp <span aria-hidden>→</span>
              </a>
              <Link href="/#how-we-deploy" className="pill pill-lg border border-background/40 bg-transparent text-background hover:bg-background/10">
                See how we deploy
              </Link>
            </Spring>
          </div>
        </section>

        {industry.answer ? <AnswerBlock id="industry-answer" {...industry.answer} /> : null}

        {/* Problem */}
        <section aria-labelledby="problem-heading" className="relative isolate overflow-hidden py-24 md:py-32">
          <HazeField variant={0} />
          <div className="shell">
            <SectionHead id="problem-heading" label="The problem" heading={industry.problem.heading} center />
            <ul className="mx-auto mt-14 grid max-w-[60rem] border-t border-line sm:grid-cols-2">
              {industry.problem.items.map((item, i) => (
                <Reveal
                  key={item.title}
                  tag="li"
                  delay={(i % 2) * 60}
                  className="border-b border-line py-7 sm:px-8 sm:odd:border-r"
                >
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section aria-labelledby="solution-heading" className="relative isolate overflow-hidden py-24 text-center text-background md:py-32">
          <FlowField tone="dark" variant={2} />
          <div className="shell">
            <SectionHead id="solution-heading" label="How we fix it" heading={industry.solution.heading} lead={industry.solution.body} inverse center />
          </div>
        </section>

        {industry.regulations ? (
          <GridSection id="industry-regs" label="Compliance" heading={industry.regulations.heading} lead={industry.regulations.lead} items={industry.regulations.items} variant={1} />
        ) : null}

        {/* Workflows we build */}
        <section id="use-cases" aria-labelledby="usecases-heading" className="relative isolate overflow-hidden py-24 md:py-32">
          <HazeField variant={2} />
          <div className="shell">
            <SectionHead
              id="usecases-heading"
              label="What we build"
              heading={`Workflows we build for ${short.toLowerCase()} teams`}
              lead="Each one runs on a schedule, and every output waits for your approval."
              center
            />
          </div>
          <div className="shell mt-10 flex justify-end">
            <RailNav targetId={railId} label={`Scroll the ${short} workflows`} />
          </div>
          <div className="relative">
            <ul
              id={railId}
              className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-75rem)/2+2.5rem))] pb-4"
            >
              {industry.useCases.map((u) => (
                <li key={u.title} className="w-[82vw] shrink-0 snap-start sm:w-[24rem]">
                  <article className="flex h-full flex-col rounded-3xl border border-line bg-background p-7">
                    <p className="font-mono text-xs text-muted">{u.schedule}</p>
                    <h3 className="mt-6 text-2xl font-light tracking-tight">{u.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{u.body}</p>
                    <p className="mt-auto border-t border-line pt-4 text-sm">{u.approval}</p>
                  </article>
                </li>
              ))}
            </ul>
            <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
          </div>
        </section>

        {/* Example */}
        <section aria-labelledby="example-heading" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={1} />
          <div className="shell">
            <SectionHead id="example-heading" label="What changes" heading={industry.scenario.heading} center />
            <dl className="mx-auto mt-14 grid max-w-[64rem] items-start gap-6 sm:grid-cols-3">
              {industry.scenario.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 60} className="flex h-full flex-col-reverse justify-end gap-2 rounded-3xl border border-line bg-background p-7 text-left">
                  <dt className="text-sm leading-relaxed text-muted">{s.label}</dt>
                  <dd className="text-2xl font-light tracking-tight md:text-3xl">{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {industry.systems ? (
          <ChecklistSection
            id="industry-systems"
            label="Works with"
            heading={industry.systems.heading}
            lists={[{ title: "Connected in place, or from exports", items: industry.systems.items }]}
            variant={0}
          />
        ) : null}

        {industry.faq ? <FaqSection id="industry-faq" items={industry.faq} /> : null}

        {useCaseLinks.length ? <RelatedLinks id="industry-related" heading={`${short} use cases`} links={useCaseLinks} /> : null}

        {/* Closing */}
        <section aria-labelledby="industry-cta" className="relative isolate overflow-hidden py-24 text-center text-background md:py-36">
          <FlowField tone="dark" variant={0} />
          <div className="shell">
            <Reveal tag="h2" className="display-light-md mx-auto max-w-[22ch]">
              <span id="industry-cta">Start your {shortInline} AI transformation now.</span>
            </Reveal>
            <Reveal tag="p" delay={60} className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-background/70">
              {industry.cta}
            </Reveal>
            <Reveal delay={120} className="mt-9 flex justify-center">
              <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
                Book a 2-day bootcamp <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
