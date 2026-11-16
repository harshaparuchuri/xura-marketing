import { HiringAppPreview } from "@/components/graphics/hiring-app-preview";
import { AppsAnatomy, AppsCompare, AppsExamples, AppsSteps } from "@/components/sections/apps/apps-sections";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { APPS_FAQ, APPS_HERO } from "@/data/apps";

/**
 * Apps view (/apps, ADR-0040): hero with the Hiring pipeline app → how it's
 * built → what's in every app → examples → apps vs flows vs AI employees →
 * FAQ → closing.
 */
export const AppsView = () => (
  <div className="palette-teal">
    <main>
      <PageHero id="apps-h1" title={APPS_HERO.h1} sub={APPS_HERO.sub} path="/apps" name="Apps" variant={1}>
        <HiringAppPreview />
      </PageHero>
      <AppsSteps />
      <AppsAnatomy />
      <AppsExamples />
      <AppsCompare />
      <FaqSection id="apps-faq" items={APPS_FAQ} />
      <CtaBand id="apps-cta" heading="Build your first app now." sub="Start with a 2-day bootcamp. See it live in 2 weeks." />
    </main>
    <SiteFooter />
  </div>
);
