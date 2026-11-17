import { DeployBootcamp, DeployHosting, DeployLead, DeployWhy } from "@/components/sections/deployment/deployment-sections";
import { ChecklistSection, WalkthroughSection } from "@/components/sections/shared/depth-sections";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { GridSection, StepsSection } from "@/components/sections/shared/feature-sections";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { DEPLOY_FAQ, DEPLOY_HERO, DEPLOY_NEEDS, DEPLOY_OWNERSHIP, DEPLOY_PEOPLE, DEPLOY_STEPS, DEPLOY_SUPPORT } from "@/data/deployment";

/**
 * Deployment view (/deployment, ADR-0040) — the *how* of an engagement
 * (/ai-transformation carries the *why* and *what*): hero → step-by-step
 * walkthrough → who's involved → our team on site → ownership over time →
 * what we need from you → 2-day bootcamp → where Xura runs → after go-live →
 * why partner-led → FAQ → closing.
 */
export const DeploymentView = () => (
  <div className="palette-amber">
    <main>
      <PageHero id="deployment-h1" title={DEPLOY_HERO.h1} sub={DEPLOY_HERO.sub} path="/deployment" name="Deployment" variant={2} />
      <WalkthroughSection id="deploy-steps" {...DEPLOY_STEPS} variant={0} />
      <ChecklistSection id="deploy-people" {...DEPLOY_PEOPLE} variant={1} />
      <DeployLead />
      <StepsSection id="deploy-ownership" {...DEPLOY_OWNERSHIP} variant={2} />
      <ChecklistSection id="deploy-needs" {...DEPLOY_NEEDS} variant={0} />
      <DeployBootcamp />
      <DeployHosting />
      <GridSection id="deploy-support" {...DEPLOY_SUPPORT} variant={1} />
      <DeployWhy />
      <FaqSection id="deployment-faq" items={DEPLOY_FAQ} />
      <CtaBand id="deployment-cta" heading="Start your deployment now." sub="Start with a 2-day bootcamp. See it live in 2 weeks." variant={1} />
    </main>
    <SiteFooter />
  </div>
);
