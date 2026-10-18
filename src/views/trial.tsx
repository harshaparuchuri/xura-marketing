import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { XuraLogo } from "@/components/brand/logo";
import { AiOrb } from "@/components/graphics/ai-orb";
import { ArcField } from "@/components/graphics/arc-field";
import { TrialForm } from "@/components/sections/trial-form";
import { siteConfig } from "@/lib/site";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";

/**
 * Book-a-demo view (`/trial`). A focused, two-panel page modelled on
 * viktor.com/contact-sales: no nav or footer, just the logo home link.
 * Left: dark proof panel (what the demo covers, Nora, what's true about
 * Xura). Right: the two-step `TrialForm` (work email → details). Stacks on
 * mobile with a compact proof panel first. `TrialForm` posts straight to a
 * Google Apps Script Web App; there is no `/api` route under static export.
 */
const POINTS: string[] = [
  "Answers from your own data, with the sources shown",
  "Works in Slack, Teams, WhatsApp and the web",
  "Nothing is sent or changed until you approve it",
];

const AGENDA: { title: string; body: string }[] = [
  { title: "Your use case", body: "The flow you most want off your plate." },
  { title: "Live on your stack", body: "Nora answering from tools like yours." },
  { title: "Your first Flow", body: "Set up together, approval gate included." },
];

export const TrialView = () => (
  <main className="grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
    {/* Proof panel */}
    <section
      aria-label="What a Xura demo covers"
      className="grain relative isolate overflow-hidden bg-brand-ink px-6 py-8 text-white sm:px-10 lg:px-14 lg:py-12"
    >
      <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

      <Link href="/" aria-label="Xura AI home" className="inline-block">
        <XuraLogo markOnly />
      </Link>

      <div className="mt-10 max-w-lg lg:mt-20">
        <Spring
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="flex items-center gap-4"
        >
          <OrbDockSlot id="demo-page" size={56} accent="var(--employee-chief-of-staff)" />
          <p className="text-sm text-white/70">
            30 minutes with our team,
            <br />
            built around your use case.
          </p>
        </Spring>

        <Spring
          tag="h1"
          mode="once"
          delayIn={80}
          from={{ y: 22 }}
          to={{ y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="display-serif mt-6 text-white lg:mt-8"
        >
          See your AI employees{" "}
          <span className="font-semibold italic text-accent">at work.</span>
        </Spring>

        <ol className="mt-10 hidden gap-3 sm:grid sm:grid-cols-3">
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
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">{item.body}</p>
            </Inview>
          ))}
        </ol>

        <ul className="mt-10 hidden space-y-3 text-sm text-white/80 sm:block">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-accent text-foreground"
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
      className="flex items-center justify-center bg-background px-6 py-12 sm:px-10"
    >
      <div className="w-full max-w-md">
        <h2 id="demo-form-heading" className="font-serif text-3xl leading-display">
          Book a personalised demo
        </h2>
        <p className="mt-2 text-sm text-muted">
          So the right person on our team can get back to you, within one
          business day.
        </p>
        <div className="mt-8">
          <TrialForm />
        </div>
        <p className="mt-10 border-t border-line pt-5 text-center text-sm text-muted">
          Rather try it yourself?{" "}
          <a
            href={siteConfig.signupUrl}
            className="font-semibold text-foreground underline underline-offset-4"
          >
            Get started for free
          </a>
        </p>
      </div>
    </section>
  </main>
);
