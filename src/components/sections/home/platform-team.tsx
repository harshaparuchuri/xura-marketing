import Link from "next/link";

import { PhotoFill } from "@/components/common/photo-fill";
import { FlowField } from "@/components/graphics/flow-field";
import { HiringAppPreview } from "@/components/graphics/hiring-app-preview";
import { Reveal } from "@/components/sections/home/reveal";
import { HOME_PLATFORM } from "@/data/home";

/**
 * Platform + team — the full-bleed dark section. Centred heading, then two
 * large cards (the platform, shown with the real app; the deployment team,
 * on an abstract field until there's a photo), the steps on one line, and
 * the MIT stat. Anchor for "See how we deploy".
 * Team card photo: generated stand-in (photo-brief.md) until a real one.
 */
export const PlatformTeam = () => (
  <section
    id="how-we-deploy"
    aria-labelledby="platform-heading"
    className="relative isolate overflow-hidden py-24 text-background md:py-32"
  >
    <FlowField tone="dark" variant={2} />
    <div className="shell">
      <div className="mx-auto max-w-[48rem] text-center">
        <Reveal tag="p" className="text-sm font-medium text-background/60">{HOME_PLATFORM.label}</Reveal>
        <Reveal tag="h2" delay={40} className="display-light-md mt-3">
          <span id="platform-heading">{HOME_PLATFORM.heading}</span>
        </Reveal>
        <Reveal tag="p" delay={80} className="mx-auto mt-5 max-w-[54ch] text-base leading-relaxed text-background/70 md:text-lg">
          {HOME_PLATFORM.lead}
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Reveal className="relative flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl bg-background/5 ring-1 ring-background/10 md:min-h-[34rem]">
          {/* The Hiring pipeline app (a coded replica), cropped by the card. */}
          <div className="absolute left-7 top-7 w-[46rem] origin-top-left scale-[0.62] md:left-9 md:top-9">
            <HiringAppPreview />
          </div>
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-foreground from-55% via-foreground/85 to-transparent md:from-30% md:via-foreground/70" />
          <div className="relative p-7 md:p-9">
            <h3 className="text-2xl font-light tracking-tight md:text-3xl">{HOME_PLATFORM.platform.title}</h3>
            <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-background/70">{HOME_PLATFORM.platform.body}</p>
            <Link href="/platform" className="pill pill-inverse mt-6">
              Platform overview <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80} className="relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl bg-background/5 ring-1 ring-background/10 md:min-h-[34rem]">
          {/* Framed like the app preview in the platform card: inset, rounded, cropped by the card. */}
          <div className="absolute left-7 top-7 -z-20 aspect-[4/3] w-[28.5rem] overflow-hidden rounded-2xl shadow-product md:left-9 md:top-9">
            <PhotoFill
              src="/assets/photos/team-workshop.webp"
              alt="A deployment lead walking a team through a process map on a whiteboard"
              sizes="456px"
            />
          </div>
          <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-foreground from-55% via-foreground/85 to-transparent md:from-30% md:via-foreground/70" />
          <div className="relative p-7 md:p-9">
            <h3 className="text-2xl font-light tracking-tight md:text-3xl">{HOME_PLATFORM.team.title}</h3>
            <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-background/70">{HOME_PLATFORM.team.body}</p>
            <a href="/deployment" className="pill pill-inverse mt-6">
              How a deployment works <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal tag="ol" className="mt-10 grid overflow-hidden rounded-2xl border border-background/15 text-sm sm:grid-cols-5">
        {HOME_PLATFORM.steps.map((step, i) => (
          <li
            key={step}
            className="flex items-center gap-3 border-background/15 px-5 py-4 not-last:border-b sm:flex-col sm:items-start sm:gap-2 sm:not-last:border-b-0 sm:not-last:border-r"
          >
            <span className="font-mono text-xs text-background/50">0{i + 1}</span>
            <span className="text-background/85">{step}</span>
          </li>
        ))}
      </Reveal>
      <p className="mx-auto mt-8 max-w-[60ch] text-center text-xs text-background/50">{HOME_PLATFORM.stat}</p>
    </div>
  </section>
);
