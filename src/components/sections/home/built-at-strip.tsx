import { BuiltAtMarquee } from "@/components/sections/home/built-at-marquee";
import { Reveal } from "@/components/sections/home/reveal";
import { ABOUT_TEAM } from "@/data/about";

/**
 * BuiltAtStrip — slim home-page credibility strip above the FAQ: “Our team has
 * built products at” over a slow, endless logo carousel (`BuiltAtMarquee`).
 * Logos come from `ABOUT_TEAM.builtAt.logos`, the single source shared with
 * /about, in the owner’s order.
 *
 * Deliberately labelled and placed late on the page (owner, 2026-11-18) so it
 * reads as the team’s background, never as “trusted by” customer logos.
 */
export const BuiltAtStrip = () => (
  <section aria-labelledby="built-at-heading" className="py-16 md:py-20">
    <div className="shell">
      <Reveal className="mx-auto max-w-[68rem] border-t border-line pt-10 text-center">
        <h2 id="built-at-heading" className="text-sm font-medium text-muted">
          Our team has built products at
        </h2>
        <div className="mt-7">
          <BuiltAtMarquee logos={ABOUT_TEAM.builtAt.logos} />
        </div>
      </Reveal>
    </div>
  </section>
);
