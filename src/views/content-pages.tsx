import Link from "next/link";
import { notFound } from "next/navigation";

import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { AnswerBlock, ComparisonTable, EssaySection, RelatedLinks } from "@/components/sections/shared/content-blocks";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { ChecklistSection, WalkthroughSection } from "@/components/sections/shared/depth-sections";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { getComparePage } from "@/data/compare";
import { USE_CASES, getUseCase } from "@/data/use-cases";

/**
 * Use-case and comparison pages (ADR-0046). Each answers one search:
 * hero → answer block (AEO) → why / table → walkthrough → systems and
 * approvals → labelled example → FAQ (JSON-LD) → related links → closing.
 */

export const UseCaseView = ({ slug }: { slug: string }) => {
  const u = getUseCase(slug);
  if (!u) notFound();
  return (
    <div className="palette-blue">
      <main>
        <PageHero id="uc-h1" title={u.h1} sub={u.sub} path={`/use-cases/${u.slug}`} name={u.name} variant={1} lead="talk" />
        <AnswerBlock id="uc-answer" {...u.answer} />
        <EssaySection id="uc-why" essay={{ label: "The problem", heading: u.why.heading, paragraphs: u.why.paragraphs }} variant={0} />
        <WalkthroughSection id="uc-walk" label="How it works" heading={u.walk.heading} lead={u.walk.lead} steps={u.walk.steps} variant={1} />
        <ChecklistSection
          id="uc-lists"
          label="What it takes"
          heading="Systems it reads, and what you approve"
          lists={[
            { title: "Works with", items: u.systems },
            { title: "You stay in control", items: u.approvals },
          ]}
          variant={2}
        />
        <EssaySection id="uc-example" essay={{ label: "In practice", heading: u.example.heading, paragraphs: u.example.body }} variant={0} />
        <FaqSection id="uc-faq" items={u.faq} />
        <RelatedLinks id="uc-related" links={u.related} />
        <CtaBand id="uc-cta" heading="Hand over this job now." sub="Start with a 2-day bootcamp. See it live in 2 weeks." lead="talk" />
      </main>
      <SiteFooter />
    </div>
  );
};

export const UseCasesIndexView = () => (
  <div className="palette-blue">
    <main>
      <PageHero
        id="ucs-h1"
        title="AI use cases for operations, sales, quality and IT"
        sub="Each one is a job an AI employee takes on: it runs on your systems, on a schedule, and waits for your approval."
        path="/use-cases"
        name="Use cases"
        variant={2}
      />
      <section aria-labelledby="ucs-list" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={0} />
        <div className="shell">
          <SectionHead id="ucs-list" label="By job" heading="Pick the job to start with" center />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.slug} tag="li" delay={(i % 3) * 60}>
                <Link
                  href={`/use-cases/${u.slug}`}
                  className="flex h-full flex-col rounded-3xl border border-line bg-background p-7 transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-foreground"
                >
                  <span className="font-mono text-xs text-muted">{u.team}</span>
                  <span className="mt-4 text-2xl font-light tracking-tight">{u.name}</span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">{u.answer.a.split(". ")[0]}.</span>
                  <span className="mt-6 text-sm font-medium">
                    Read more <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand id="ucs-cta" heading="Not sure where to start?" sub="The 2-day bootcamp finds your first job and shows it working on your data." lead="talk" />
    </main>
    <SiteFooter />
  </div>
);

export const CompareView = ({ slug }: { slug: string }) => {
  const c = getComparePage(slug);
  if (!c) notFound();
  return (
    <div className="palette-violet">
      <main>
        <PageHero id="cmp-h1" title={c.h1} sub={c.sub} path={`/compare/${c.slug}`} name={c.name} variant={0} lead="talk" />
        <AnswerBlock id="cmp-answer" {...c.answer} />
        <ComparisonTable id="cmp-table" data={c.table} variant={1} />
        <section aria-labelledby="cmp-choose" className="relative isolate overflow-hidden py-24 md:py-32">
          <HazeField variant={2} />
          <div className="shell">
            <SectionHead id="cmp-choose" label="Which to choose" heading="When each one fits" center />
            <ul className={`mt-14 grid gap-4 ${c.choose.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {c.choose.map((x, i) => (
                <Reveal key={x.title} tag="li" delay={i * 60} className="rounded-3xl border border-line bg-background p-7">
                  <h3 className="text-xl font-light tracking-tight">{x.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{x.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
        <FaqSection id="cmp-faq" items={c.faq} />
        <RelatedLinks id="cmp-related" links={c.related} />
        <CtaBand id="cmp-cta" heading="Meet your first AI employee now." sub="Start with a 2-day bootcamp. See it live in 2 weeks." lead="talk" />
      </main>
      <SiteFooter />
    </div>
  );
};
