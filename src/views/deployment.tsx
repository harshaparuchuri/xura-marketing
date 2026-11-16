import { DeployBootcamp, DeployHosting, DeployLead, DeploySteps, DeployWhy } from "@/components/sections/deployment/deployment-sections";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FaqSection } from "@/components/sections/shared/faq-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { DEPLOY_FAQ, DEPLOY_HERO } from "@/data/deployment";

/**
 * Deployment view (/deployment, ADR-0040): hero → engagement timeline →
 * deployment lead → 2-day bootcamp → where Xura runs (Xura cloud / your VPC
 * / your premises) → why partner-led → FAQ → closing.
 */
export const DeploymentView = () => (
  <div className="palette-amber">
    <main>
      <PageHero id="deployment-h1" title={DEPLOY_HERO.h1} sub={DEPLOY_HERO.sub} path="/deployment" name="Deployment" variant={2} />
      <DeploySteps />
      <DeployLead />
      <DeployBootcamp />
      <DeployHosting />
      <DeployWhy />
      <FaqSection id="deployment-faq" items={DEPLOY_FAQ} />
      <CtaBand id="deployment-cta" heading="Start your deployment now." sub="Start with a 2-day bootcamp. See it live in 2 weeks." variant={1} />
    </main>
    <SiteFooter />
  </div>
);
