import { Bootcamp } from "@/components/sections/home/bootcamp";
import { EmployeesGrid } from "@/components/sections/home/employees-grid";
import { Faq } from "@/components/sections/home/faq";
import { HomeClosing } from "@/components/sections/home/home-closing";
import { HomeHero } from "@/components/sections/home/home-hero";
import { IndustriesTabs } from "@/components/sections/home/industries-tabs";
import { PulseBand } from "@/components/sections/home/pulse-band";
import { PlatformTeam } from "@/components/sections/home/platform-team";
import { Statement } from "@/components/sections/home/statement";
import { TeamStrip } from "@/components/sections/home/team-strip";
import { SiteFooter } from "@/components/sections/site-footer";
import { getServiceStructuredData } from "@/utils/seo/structured-data";

/**
 * Home view — Server Component. Seven sections modelled on wonderful.ai's
 * structure (obsidian/workflows/home-repositioning-plan.md, ADR-0035):
 * hero → statement → platform + team → team strip → AI employees grid → industries tabs
 * → Xura Pulse band → bootcamp → FAQ + closing → footer. Monochrome; abstract `FlowField`
 * backdrops stand in for photography until real team photos exist.
 */
export const HomeView = () => (
  <div className="palette-blue">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceStructuredData()) }}
    />
    <main>
      <HomeHero />
      <Statement />
      <PlatformTeam />
      <TeamStrip />
      <EmployeesGrid />
      <IndustriesTabs />
      <PulseBand />
      <Bootcamp />
      <Faq />
      <HomeClosing />
    </main>
    <SiteFooter />
  </div>
);
