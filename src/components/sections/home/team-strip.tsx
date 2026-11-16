import { TeamMarquee } from "@/components/sections/home/team-marquee";
import { HOME_TEAMS } from "@/data/home";

/**
 * TeamStrip — a dark band above "What we build": a small label and a slow
 * marquee of the teams Xura's AI employees work for, each linked to the page
 * for that job. Dark (`text-background`), so the sticky header switches to
 * its dark glass over it.
 */
export const TeamStrip = () => (
  <section aria-labelledby="teams-heading" className="bg-foreground py-14 text-background md:py-16">
    <div className="shell">
      <h2 id="teams-heading" className="text-center font-mono text-xs uppercase tracking-widest text-background/60">
        {HOME_TEAMS.label}
      </h2>
    </div>
    <div className="mt-8">
      <TeamMarquee teams={HOME_TEAMS.teams} />
    </div>
  </section>
);
