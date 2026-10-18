import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { AiOrb } from "@/components/graphics/ai-orb";
import { ArcField } from "@/components/graphics/arc-field";
import { PRICING_PLANS } from "@/data/pricing";
import { siteConfig } from "@/lib/site";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";

/**
 * PilotOffer — homepage band selling the free pilot right after the AI
 * employees roster: "your first AI employee is on us". Left: offer, four
 * facts (incl. 24x7 support), CTAs, and a compact line with the paid plans
 * from `data/pricing.ts` + "See all plans" (this replaced the separate
 * homepage pricing teaser). Right: what the 100 pilot credits buy, as bars. Rates match
 * `CREDIT_EXAMPLES` in data/pricing.ts (dashboard ~20, deck ~40, report ~60,
 * post ~6 credits).
 */
const FACTS: { value: string; label: string }[] = [
  { value: "1 week", label: "on your own data" },
  { value: "100", label: "free credits" },
  { value: "$0", label: "no credit card" },
  { value: "24x7", label: "support" },
];

/** Paid plans for the compact pricing line (everything but the free Pilot). */
const PAID = PRICING_PLANS.filter((plan) => !plan.entry);

const SPEND: { output: string; count: number; max: number }[] = [
  { output: "Social posts", count: 16, max: 16 },
  { output: "Live dashboards", count: 5, max: 16 },
  { output: "Slide decks", count: 2, max: 16 },
  { output: "Research reports", count: 1, max: 16 },
];

export const PilotOffer = () => (
  <section
    id="pilot"
    aria-labelledby="pilot-heading"
    className="grain relative isolate overflow-hidden bg-brand-ink py-20 text-white md:py-28"
  >
    <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

    <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="meta text-accent"
        >
          Free to start
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mt-3 max-w-[18ch] text-white"
        >
          <span id="pilot-heading">
            Your first AI employee{" "}
            <span className="font-semibold italic text-accent">is on us.</span>
          </span>
        </Inview>
        <Inview
          tag="p"
          mode="once"
          delayIn={140}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mt-5 max-w-[48ch] text-sm leading-relaxed text-white/70 md:text-base"
        >
          Sign up, connect a tool or upload a file, and put Nora to work. If
          she hasn&apos;t automated one flow you care about in a week, walk
          away. No credit card, no sales call.
        </Inview>

        <Inview
          mode="once"
          delayIn={200}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mt-8 max-w-xl"
        >
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.label} className="rounded-xl bg-white/[0.06] p-3.5 ring-1 ring-white/10">
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-serif text-2xl leading-display text-accent">{fact.value}</dd>
              <dd className="mt-1 text-[0.6875rem] text-white/60">{fact.label}</dd>
            </div>
          ))}
          </dl>
        </Inview>

        <Inview
          mode="once"
          delayIn={260}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href={siteConfig.signupUrl}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-foreground transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-90"
          >
            Get started for free <span aria-hidden>→</span>
          </Link>
          <a
            href={siteConfig.demoUrl}
            className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-white hover:bg-white/10"
          >
            Book a demo
          </a>
        </Inview>

        {/* Paid plans, compact — from data/pricing.ts */}
        <Inview
          mode="once"
          delayIn={320}
          from={{ opacity: 0, y: 12 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mt-8 border-t border-white/10 pt-5 text-sm text-white/70"
        >
          <p>
            Then{" "}
            {PAID.map((plan, i) => (
              <span key={plan.name}>
                {i > 0 && <span aria-hidden className="mx-1.5 text-white/30">·</span>}
                <span className="font-semibold text-white">{plan.name}</span>{" "}
                {plan.price}
                {plan.unit ? <span className="text-white/50"> /user/mo</span> : null}
              </span>
            ))}
            . Every plan includes 24x7 support.
          </p>
          <Link
            href="/pricing"
            className="mt-2 inline-flex items-center gap-1.5 font-semibold text-white underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:underline"
          >
            See all plans <span aria-hidden>→</span>
          </Link>
        </Inview>
      </div>

      {/* What 100 credits buy */}
      <Inview
        mode="once"
        delayIn={160}
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 170, friction: 28 }}
        className="rounded-3xl bg-background p-6 text-foreground shadow-product md:p-8"
      >
        <div className="flex items-center gap-3">
          <OrbDockSlot id="pilot-offer" size={40} accent="var(--employee-chief-of-staff)" />
          <div>
            <p className="text-sm font-semibold">What 100 free credits get you</p>
            <p className="text-xs text-muted">Credits work across everything. Pick any mix.</p>
          </div>
        </div>
        <ul className="mt-6 space-y-4">
          {SPEND.map((item) => (
            <li key={item.output}>
              <div className="flex items-baseline justify-between text-sm">
                <span>{item.output}</span>
                <span className="font-serif text-xl leading-display">{item.count}</span>
              </div>
              <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-band-mist">
                <span
                  className="block h-full rounded-full bg-brand-ink"
                  style={{ width: `${Math.max(8, (item.count / item.max) * 100)}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
          Or mix them: one deck, two dashboards and three posts is about 100.
        </p>
      </Inview>
    </div>
  </section>
);
