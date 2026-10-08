import { Agents } from "@/components/sections/agents";
import { CaseStudy } from "@/components/sections/case-study";
import { ClosingCta } from "@/components/sections/closing-cta";
import { EnterpriseReady } from "@/components/sections/enterprise-ready";
import { DomainsStrip } from "@/components/sections/domains-strip";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Industries } from "@/components/sections/industries";
import { Outputs } from "@/components/sections/outputs";
import { Recommendations } from "@/components/sections/recommendations";
import { SiteFooter } from "@/components/sections/site-footer";
import { Channels } from "@/components/sections/channels";
import { XuraVs } from "@/components/sections/xura-vs";

/**
 * Home view — Server Component.
 *
 * Section order: hero → domains → how it works → features → recommendations → agents →
 * outputs → channels → Xura vs → industries → enterprise-ready → case study →
 * CTA → footer.
 */
export const HomeView = () => {
  return (
    <>
      <main>
        <Hero />
        <DomainsStrip />
        <HowItWorks />
        <Features />
        <Recommendations />
        <Agents />
        <Outputs />
        <Channels />
        <XuraVs />
        <Industries />
        <EnterpriseReady />
        <CaseStudy />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
};
