import Link from "next/link";
import { Suspense } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { XuraLogo } from "@/components/brand/logo";
import { AiOrb } from "@/components/graphics/ai-orb";
import { FlowField } from "@/components/graphics/flow-field";
import { TrialForm } from "@/components/sections/trial-form";
import { BootcampIntro, TrialIntro } from "@/components/sections/trial-intro";
import { siteConfig } from "@/lib/site";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";

/**
 * Book-a-bootcamp view (`/trial`). A focused, two-panel page modelled on
 * viktor.com/contact-sales: no nav or footer, just the logo home link.
 * Left: dark proof panel (what the demo covers, Nora, what's true about
 * Xura). Right: the two-step `TrialForm` (work email → details). Stacks on
 * mobile with a compact proof panel first. `TrialForm` posts straight to a
 * Google Apps Script Web App; there is no `/api` route under static export.
 */
const POINTS: string[] = [
  "Answers from your own data, with the sources shown",
  "Works in WhatsApp, Slack, Teams and the web",
  "Nothing is sent or changed until you approve it",
  "Our team runs both days with your process owner",
];

const AGENDA: { title: string; body: string }[] = [
  { title: "Day 1: find the job", body: "Where work gets stuck, and the one job to start with." },
  { title: "Day 2: see it working", body: "An AI employee running that job on your own systems." },
  { title: "After: live in 2 weeks", body: "What going live takes: systems, people and timeline." },
];

export const TrialView = () => (
  <main className="palette-amber grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
    {/* Proof panel */}
    <section
      aria-label="What the 2-day bootcamp covers"
      className="relative isolate overflow-hidden bg-foreground px-6 py-8 text-white sm:px-10 lg:px-14 lg:py-12"
    >
      <FlowField tone="dark" variant={0} />

      <Link href="/" aria-label="Xura AI home" className="inline-block">
        <XuraLogo markOnly />
      </Link>

      <div className="mt-8 max-w-lg lg:mt-12">
        <Spring
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="flex items-center gap-4"
        >
          <OrbDockSlot id="demo-page" size={56} accent="var(--employee-chief-of-staff)" />
          <p className="text-sm text-white/70">
            Paid, quoted per company.
            <br />
            The fee is credited to your deployment.
          </p>
        </Spring>

        <Spring
          tag="h1"
          mode="once"
          delayIn={80}
          from={{ y: 22 }}
          to={{ y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="display-light-md mt-6 text-white"
        >
          See your AI employees at work{" "}
          <span className="text-white/60">on your data.</span>
        </Spring>

        {/* Phones: the agenda in one line (cards and points are sm+). */}
        <p className="mt-6 text-sm leading-relaxed text-white/70 sm:hidden">
          <span className="whitespace-nowrap">Day 1: find the job</span> ·{" "}
          <span className="whitespace-nowrap">Day 2: see it working</span> ·{" "}
          <span className="whitespace-nowrap">Live in 2 weeks</span>
        </p>

        <ol className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
          {AGENDA.map((item, i) => (
            <Inview
              key={item.title}
              tag="li"
              mode="once"
              delayIn={160 + i * 80}
              from={{ opacity: 0, y: 14 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10"
            >
              <span className="font-mono text-xs text-white/50">0{i + 1}</span>
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">{item.body}</p>
            </Inview>
          ))}
        </ol>

        <ul className="mt-8 hidden space-y-3 text-sm text-white/80 sm:block">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-white text-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-3" fill="none">
                  <path d="M6 12.5l4 4 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Form panel */}
    <section
      aria-labelledby="demo-form-heading"
      className="flex items-center justify-center bg-background px-6 py-12 sm:px-10 lg:items-start lg:pt-48"
    >
      <div className="w-full max-w-md">
        <Suspense fallback={<BootcampIntro />}>
          <TrialIntro />
        </Suspense>
        <div className="mt-8">
          <TrialForm />
        </div>
        <p className="mt-10 border-t border-line pt-5 text-center text-sm text-muted">
          Already a customer?{" "}
          <a
            href={siteConfig.signinUrl}
            className="font-semibold text-foreground underline underline-offset-4"
          >
            Sign in
          </a>
        </p>
      </div>
    </section>
  </main>
);
