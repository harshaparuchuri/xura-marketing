import { PulseAbDemo } from "@/components/graphics/pulse-ab-demo";
import { PulseContextRing } from "@/components/graphics/pulse-context-ring";
import { PulseInterviewPreview, PulseLivePreview, PulseReportPreview, PulseSurveyPreview } from "@/components/graphics/pulse-preview";
import { SplitSection } from "@/components/sections/shared/depth-sections";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { CardsSection, StepsSection } from "@/components/sections/shared/feature-sections";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { PULSE_AB, PULSE_CONTEXT, PULSE_FAQ, PULSE_FEATURES, PULSE_SURVEY, PULSE_HERO, PULSE_REPORT, PULSE_STEPS, PULSE_USES } from "@/data/pulse";

/**
 * Pulse view (/pulse) — Xura Pulse, audience testing on simulated people:
 * hero with a coded live run (200-seat crowd) → what teams test → rooted in context (ring of people around the context graph) → goal, audience, run →
 * A/B setup → survey results → numbers and reasons (up to 200 live, interviews) → the report →
 * FAQ → closing. Server Component.
 */
export const PulseView = () => (
  <div className="palette-violet">
    <main>
      <PageHero id="pulse-h1" title={PULSE_HERO.h1} sub={PULSE_HERO.sub} path="/pulse" name="Xura Pulse" variant={0}>
        <div className="mx-auto max-w-[60rem]">
          <PulseLivePreview />
        </div>
      </PageHero>
      <CardsSection id="pulse-uses" {...PULSE_USES} variant={1} />
      <SplitSection id="pulse-context" {...PULSE_CONTEXT} variant={0} visual={<PulseContextRing className="mx-auto max-w-[32rem]" />} />
      <StepsSection id="pulse-steps" {...PULSE_STEPS} variant={2} />
      <SplitSection id="pulse-ab" {...PULSE_AB} variant={0} visual={<PulseAbDemo />} />
      <SplitSection id="pulse-survey" {...PULSE_SURVEY} variant={1} flip visual={<PulseSurveyPreview />} />
      <SplitSection id="pulse-features" {...PULSE_FEATURES} variant={0} visual={<PulseInterviewPreview />} />
      <SplitSection id="pulse-report" {...PULSE_REPORT} variant={1} flip visual={<PulseReportPreview />} />
      <FaqSection id="pulse-faq" items={PULSE_FAQ} />
      <CtaBand id="pulse-cta" heading="Test your next launch on Pulse." sub="Our team builds your audience panels. Run your first test in days." />
    </main>
    <SiteFooter />
  </div>
);
