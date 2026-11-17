import Image from "next/image";

import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import type { ABOUT_TEAM } from "@/data/about";

/**
 * TeamSection — /about: the team's combined experience and a row of
 * monochrome logos of companies the founders have built at. No individual
 * people or headshots (owner 2026-11-18). Logos sit five to a row on desktop
 * (three on tablets, two on phones), 28px tall, capped to their cell so wide
 * wordmarks don't dominate.
 */
export const TeamSection = ({ id, team }: { id: string; team: typeof ABOUT_TEAM }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={1} />
    <div className="shell">
      <SectionHead id={id} label={team.label} heading={team.heading} lead={team.lead} center />
      <Reveal delay={80} className="mx-auto mt-14 max-w-[68rem] border-t border-line pt-10 text-center">
        <h3 className="text-sm font-medium text-muted">{team.builtAt.label}</h3>
        <ul className="mx-auto mt-8 flex max-w-[60rem] flex-wrap items-center justify-center gap-y-10">
          {team.builtAt.logos.map((l) => (
            <li key={l.name} className="flex basis-1/2 justify-center px-4 sm:basis-1/3 md:basis-1/5">
              <Image
                src={l.src}
                alt={l.name}
                width={l.width}
                height={l.height}
                className={`${l.stacked ? "h-12" : "h-7"} w-auto max-w-full object-contain opacity-60`}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
