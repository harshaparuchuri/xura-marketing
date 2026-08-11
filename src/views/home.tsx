import { CaseStudy } from "@/components/sections/case-study";
import { ClosingCta } from "@/components/sections/closing-cta";
import { EnterpriseReady } from "@/components/sections/enterprise-ready";
import { DomainsStrip } from "@/components/sections/domains-strip";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { SiteFooter } from "@/components/sections/site-footer";
import { WhatsApp } from "@/components/sections/whatsapp";
import { XuraVs } from "@/components/sections/xura-vs";

/**
 * Home view — Server Component.
 *
 * Section order: hero → domains → features → WhatsApp → Xura vs → case study →
 * industries → enterprise-ready → CTA → footer. Journal and Testimonial
 * removed 2026-08-10; Industries takes their slot as an inline showcase.
 */
export const HomeView = () => {
  return (
    <>
      <main>
        <Hero />
        <DomainsStrip />
        <Features />
        <WhatsApp />
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
