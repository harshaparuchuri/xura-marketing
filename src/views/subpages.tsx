import { AiOrb } from "@/components/graphics/ai-orb";
import { EmployeeProfilePreview } from "@/components/graphics/employee-profile-preview";
import { VideoSection } from "@/components/sections/shared/video-section";
import { FlowBuilderPreview } from "@/components/graphics/flow-builder-preview";
import { HazeField } from "@/components/graphics/haze-field";
import { LogoMarquee } from "@/components/graphics/logo-marquee";
import { KnowledgeGraph } from "@/components/graphics/knowledge-graph";
import { ApprovalFeed } from "@/components/sections/home/approval-feed";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { AnswerBlock, EssaySection, RelatedLinks } from "@/components/sections/shared/content-blocks";
import { ChecklistSection, DataFlowDiagram, ProfilesSection, SplitSection, WalkthroughSection } from "@/components/sections/shared/depth-sections";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { CardsSection, CompareSection, GridSection, StepsSection } from "@/components/sections/shared/feature-sections";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import {
  AE_DAY,
  AE_PROFILES,
  AI_EMPLOYEES,
  BC_AGENDA,
  BC_PREP,
  BOOTCAMP,
  INT_CONNECTORS,
  INT_GRAPH,
  INTEGRATIONS,
  SEC_FLOW,
  SEC_REVIEW,
  SECURITY,
  TR_FIRST_JOBS,
  TR_TIMELINE,
  TRANSFORMATION,
  WF_TEMPLATES,
  WF_WALK,
  WORKFLOWS,
} from "@/data/subpages";
import { ANSWERS, ESSAYS, RELATED } from "@/data/pov";

/**
 * Product and "How we work" sub-pages (ADR-0041). Each is hero → content
 * sections (shared feature-sections) → FAQ (FAQPage JSON-LD) → closing band.
 * Palettes: Platform pages violet/blue/teal, How we work pages amber.
 */

type Page = { path: string; name: string; h1: string; sub: string };

const Hero = ({ page, id, variant = 0, children }: { page: Page; id: string; variant?: 0 | 1 | 2; children?: React.ReactNode }) => (
  <PageHero id={id} title={page.h1} sub={page.sub} path={page.path} name={page.name} variant={variant}>
    {children}
  </PageHero>
);

const Shell = ({ palette, children }: { palette: string; children: React.ReactNode }) => (
  <div className={palette}>
    <main>{children}</main>
    <SiteFooter />
  </div>
);

export const AiEmployeesView = () => {
  const p = AI_EMPLOYEES;
  return (
    <Shell palette="palette-blue">
      <Hero page={p} id="ai-employees-h1">
        <ul aria-label="The AI employees" className="mx-auto grid max-w-[44rem] grid-cols-2 gap-4 sm:grid-cols-4">
          {AE_PROFILES.profiles.map((e) => (
            <li key={e.name} className="flex flex-col items-center rounded-3xl bg-background/5 px-3 py-6 ring-1 ring-background/10">
              <AiOrb size={64} accent="var(--muted)" expressive spin={false} />
              <p className="mt-4 text-lg font-light tracking-tight">{e.name}</p>
              <p className="mt-0.5 text-xs text-background/60">{e.job}</p>
            </li>
          ))}
        </ul>
      </Hero>
      <AnswerBlock id="ae-answer" {...ANSWERS.aiEmployees} />
      <VideoSection id="ae-tour" label="Product tour" heading="Meet your AI team" lead="98 seconds: how AI employees connect to your systems, answer from your data and wait for your approval." variant={2} />
      <section aria-labelledby="ae-inside" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={0} />
        <div className="shell">
          <SectionHead
            id="ae-inside"
            label="Inside the product"
            heading="Every AI employee has a profile you control"
            lead="This is Nora's page in Xura. Each AI employee shows what it does on its own, when, and what it will always ask you first."
            center
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Routines you switch on", body: "Work done on a schedule without being asked, like the 8:30 morning brief. Run one now or turn it off." },
              { title: "A day at a glance", body: "See when each routine runs in your time zone, and which are switched off." },
              { title: "Ask you first", body: "Anything that leaves Xura, like an email or a calendar invite, always waits for your approval." },
              { title: "Playbooks and tools", body: "The playbooks it follows and the tools it can use are listed, and you can customise them." },
            ].map((pt, i) => (
              <Reveal key={pt.title} tag="li" delay={i * 40} className="border-t border-line pt-5">
                <h3 className="text-base font-medium">{pt.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{pt.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={80} className="mx-auto mt-12 max-w-[52rem]">
            <EmployeeProfilePreview />
          </Reveal>
        </div>
      </section>
      <ProfilesSection id="ae-profiles" {...AE_PROFILES} variant={0} />
      <WalkthroughSection id="ae-day" {...AE_DAY} variant={1} aside={<ApprovalFeed />} />
      <StepsSection id="ae-how" {...p.how} variant={2} />
      <CompareSection id="ae-compare" {...p.compare} variant={0} />
      <FaqSection id="ae-faq" items={p.faq} />
      <RelatedLinks id="ae-related" links={RELATED.aiEmployees} />
      <CtaBand id="ae-cta" {...p.cta} />
    </Shell>
  );
};

export const WorkflowsView = () => {
  const p = WORKFLOWS;
  return (
    <Shell palette="palette-violet">
      <Hero page={p} id="workflows-h1" variant={1}>
        <FlowBuilderPreview />
      </Hero>
      <AnswerBlock id="wf-answer" {...ANSWERS.workflows} />
      <WalkthroughSection id="wf-walk" {...WF_WALK} variant={0} />
      <StepsSection id="wf-parts" {...p.parts} variant={1} />
      <GridSection id="wf-why" {...p.why} variant={2} />
      <CardsSection id="wf-templates" {...WF_TEMPLATES} variant={0} />
      <CompareSection id="wf-compare" {...p.compare} variant={1} />
      <FaqSection id="wf-faq" items={p.faq} />
      <RelatedLinks id="wf-related" links={RELATED.workflows} />
      <CtaBand id="wf-cta" {...p.cta} />
    </Shell>
  );
};

export const IntegrationsView = () => {
  const p = INTEGRATIONS;
  const g = p.groups;
  return (
    <Shell palette="palette-teal">
      <Hero page={p} id="integrations-h1" variant={2} />
      <AnswerBlock id="int-answer" {...ANSWERS.integrations} />
      <section aria-labelledby="int-logos" className="relative isolate overflow-hidden pt-20 md:pt-28">
        <div className="shell">
          <SectionHead id="int-logos" label="Works with what you run" heading="Every system your team already uses" center />
        </div>
        <LogoMarquee className="mt-8" />
      </section>
      <section aria-labelledby="int-groups" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={0} />
        <div className="shell">
          <SectionHead id="int-groups" label={g.label} heading={g.heading} lead={g.lead} center />
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((group, i) => (
              <Reveal key={group.title} tag="li" delay={(i % 3) * 60} className="rounded-3xl border border-line bg-background p-7">
                <h3 className="text-xl font-light tracking-tight">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.tools.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-background px-3 py-1 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CardsSection id="int-connectors" {...INT_CONNECTORS} variant={1} />
      <SplitSection id="int-graph" {...INT_GRAPH} variant={2} visual={<KnowledgeGraph />} />
      <GridSection id="int-how" {...p.how} variant={0} />
      <FaqSection id="int-faq" items={p.faq} />
      <RelatedLinks id="int-related" links={RELATED.integrations} />
      <CtaBand id="int-cta" {...p.cta} />
    </Shell>
  );
};

export const SecurityView = () => {
  const p = SECURITY;
  return (
    <Shell palette="palette-violet">
      <Hero page={p} id="security-h1" variant={0} />
      <AnswerBlock id="sec-answer" {...ANSWERS.security} />
      <SplitSection id="sec-flow" {...SEC_FLOW} variant={0} visual={<DataFlowDiagram zones={SEC_FLOW.zones} />} />
      <GridSection id="sec-controls" {...p.controls} variant={1} />
      <CompareSection id="sec-hosting" {...p.hosting} variant={2} />
      <ChecklistSection id="sec-review" {...SEC_REVIEW} variant={0} />
      <FaqSection id="sec-faq" items={p.faq} />
      <RelatedLinks id="sec-related" links={RELATED.security} />
      <CtaBand id="sec-cta" {...p.cta} />
    </Shell>
  );
};

export const TransformationView = () => {
  const p = TRANSFORMATION;
  return (
    <Shell palette="palette-amber">
      <Hero page={p} id="transformation-h1" variant={2} />
      <AnswerBlock id="tr-answer" {...ANSWERS.transformation} />
      <EssaySection id="tr-pov" essay={ESSAYS.transformation} variant={1} />
      <CardsSection id="tr-problem" {...p.problem} variant={0} />
      <WalkthroughSection id="tr-timeline" {...TR_TIMELINE} variant={1} />
      <CardsSection id="tr-first" {...TR_FIRST_JOBS} variant={2} />
      <CompareSection id="tr-compare" {...p.compare} variant={0} />
      <FaqSection id="tr-faq" items={p.faq} />
      <RelatedLinks id="tr-related" links={RELATED.transformation} />
      <CtaBand id="tr-cta" {...p.cta} />
    </Shell>
  );
};

export const BootcampView = () => {
  const p = BOOTCAMP;
  return (
    <Shell palette="palette-amber">
      <Hero page={p} id="bootcamp-h1" variant={1} />
      <AnswerBlock id="bc-answer" {...ANSWERS.bootcamp} />
      <EssaySection id="bc-pov" essay={ESSAYS.bootcamp} variant={2} />
      <WalkthroughSection id="bc-agenda" {...BC_AGENDA} variant={0} />
      <CardsSection id="bc-get" {...p.get} variant={1} />
      <ChecklistSection id="bc-prep" {...BC_PREP} variant={2} />
      <FaqSection id="bc-faq" items={p.faq} />
      <RelatedLinks id="bc-related" links={RELATED.bootcamp} />
      <CtaBand id="bc-cta" {...p.cta} />
    </Shell>
  );
};
