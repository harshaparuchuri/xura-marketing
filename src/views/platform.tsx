import { FlowField } from "@/components/graphics/flow-field";
import { Reveal } from "@/components/sections/home/reveal";
import { Apps } from "@/components/sections/platform/apps";
import { AskAct } from "@/components/sections/platform/ask-act";
import { PlatformChannels } from "@/components/sections/platform/channels";
import { Connect } from "@/components/sections/platform/connect";
import { Flows } from "@/components/sections/platform/flows";
import { OutputsRail } from "@/components/sections/platform/outputs-rail";
import { PlatformHero } from "@/components/sections/platform/platform-hero";
import { TrustGrid } from "@/components/sections/platform/trust-grid";
import { VideoSection } from "@/components/sections/shared/video-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { PLATFORM_CLOSING } from "@/data/platform";
import { siteConfig } from "@/lib/site";

/**
 * Platform view (/platform) — the feature depth the lean home left out
 * (ADR-0037), in the same monochrome system: hero → connect → ask and act →
 * outputs → apps → flows → where it works → trust → closing.
 */
export const PlatformView = () => (
  <div className="palette-violet">
    <main>
      <PlatformHero />
      <VideoSection id="platform-tour" label="Product tour" heading="See it in 98 seconds" lead="AI employees connected to your systems, answering from your own data and drafting the next step for your approval." variant={0} />
      <Connect />
      <AskAct />
      <OutputsRail />
      <Apps />
      <Flows />
      <PlatformChannels />
      <TrustGrid />
      <section aria-labelledby="platform-cta" className="relative isolate overflow-hidden py-24 text-center text-background md:py-36">
        <FlowField tone="dark" variant={2} />
        <div className="shell">
          <Reveal tag="h2" className="display-light-md mx-auto max-w-[20ch]">
            <span id="platform-cta">{PLATFORM_CLOSING.heading}</span>
          </Reveal>
          <Reveal tag="p" delay={60} className="mx-auto mt-5 max-w-[48ch] text-base text-background/70">
            {PLATFORM_CLOSING.sub}
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
