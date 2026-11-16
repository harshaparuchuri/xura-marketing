import { FlowField } from "@/components/graphics/flow-field";
import { Reveal } from "@/components/sections/home/reveal";
import { HOME_BOOTCAMP, HOME_CLOSING } from "@/data/home";
import { siteConfig } from "@/lib/site";

/** Closing CTA — dark band with the Xura FlowField pattern, one line, the hero CTA. */
export const HomeClosing = () => (
  <section aria-labelledby="closing-heading" className="relative isolate overflow-hidden py-24 text-center text-background md:py-36">
    <FlowField tone="dark" variant={0} />
    <div className="shell relative">
      <Reveal tag="h2" className="display-light mx-auto max-w-[16ch]">
        <span id="closing-heading">{HOME_CLOSING.heading}</span>
      </Reveal>
      <Reveal tag="p" delay={60} className="mx-auto mt-5 max-w-[48ch] text-base text-background/70 md:text-lg">
        {HOME_CLOSING.sub}
      </Reveal>
      <Reveal delay={120} className="mt-9 flex justify-center">
        <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
          {HOME_BOOTCAMP.cta} <span aria-hidden>→</span>
        </a>
      </Reveal>
    </div>
  </section>
);
