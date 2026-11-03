import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { ShotCrop } from "@/components/common/shot-crop";
import { AiOrb } from "@/components/graphics/ai-orb";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { getProductStructuredData } from "@/utils/seo/structured-data";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";
import {
  CREDIT_EXAMPLES,
  CREDITS_NOTE,
  CUSTOM_FLOWS,
  PRICING_FAQ,
  PRICING_PLANS,
} from "@/data/pricing";

/**
 * Pricing view. Hero in Nora's voice, four plan cards (free pilot + three
 * paid; the `featured` plan is emphasised), a "what credits buy" strip of
 * chat-style examples, and an FAQ using native `<details>` with FAQPage
 * JSON-LD. Content lives in `data/pricing.ts`.
 */
/** Credit allowance chip: the leading number is set large, the rest small. */
const CreditsChip = ({ credits, featured }: { credits: string; featured?: boolean }) => {
  const match = credits.match(/^([\d,]+)\s+(.*)$/);
  return (
    <p
      className={`mt-4 flex items-baseline gap-1.5 rounded-xl px-3.5 py-2.5 text-xs ${
        featured ? "bg-white/10 text-white" : "bg-background ring-1 ring-line"
      }`}
    >
      {match ? (
        <>
          <span className={`text-lg font-semibold ${featured ? "text-accent" : ""}`}>{match[1]}</span>
          <span className={featured ? "text-white/70" : "text-muted"}>{match[2]}</span>
        </>
      ) : (
        <span className="font-medium">{credits}</span>
      )}
    </p>
  );
};

/** "What 100 credits gets you": how many of each output fit the allowance. */
const CreditBreakdown = ({ credits }: { credits: number }) => {
  const rows = CREDIT_EXAMPLES.map((e) => ({ n: Math.floor(credits / e.credits), e }))
    .filter((r) => r.n >= 1)
    .sort((a, b) => b.n - a.n);
  return (
    <div className="mt-3 rounded-xl bg-background px-3.5 py-3 text-xs ring-1 ring-line">
      <p className="font-semibold">What {credits} credits gets you</p>
      <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 xl:grid-cols-1">
        {rows.map(({ n, e }) => (
          <li key={e.output}>
            <span className="font-semibold">~{n}</span>{" "}
            <span className="text-muted">{n === 1 ? e.output.toLowerCase() : e.plural}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-muted">or any mix of them</p>
    </div>
  );
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const productJsonLd = getProductStructuredData(
  PRICING_PLANS.filter((plan) => /^(Free|\$\d+)$/.test(plan.price)).map((plan) => ({
    name: plan.name,
    price: plan.price === "Free" ? "0" : plan.price.replace("$", ""),
    description: `${plan.summary} ${plan.credits}.`,
  })),
);

export const PricingView = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
    <main>
      <section className="relative isolate overflow-hidden z-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[26rem]"
          style={{
            background:
              "linear-gradient(180deg, var(--duo-soft) 0%, var(--background) 80%)",
          }}
        />
        <div className="relative z-10">
          <SiteNav />
          <div className="shell pt-14 text-center md:pt-20">
            <Breadcrumbs crumbs={[
              { name: "Home", path: "" },
              { name: "Pricing", path: "/pricing" },
            ]} className="mb-6 flex justify-center" />
            <Spring
              mode="once"
              from={{ opacity: 0, y: 14 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="mb-5 flex justify-center"
            >
              <OrbDockSlot id="pricing-hero" size={64} accent="var(--employee-chief-of-staff)" />
            </Spring>
            <Spring
              tag="p"
              mode="once"
              from={{ opacity: 0, y: 14 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="meta"
            >
              Pricing
            </Spring>
            <Spring
              tag="h1"
              mode="once"
              delayIn={80}
              from={{ y: 22 }}
              to={{ y: 0 }}
              config={{ tension: 175, friction: 28 }}
              className="display-serif mx-auto mt-3 max-w-[20ch]"
            >
              Hire your first AI employee.{" "}
              <span className="font-semibold italic">Start with 100 free credits.</span>
            </Spring>
            <Spring
              tag="p"
              mode="once"
              delayIn={160}
              from={{ y: 18 }}
              to={{ y: 0 }}
              config={{ tension: 175, friction: 28 }}
              className="mx-auto mt-5 max-w-[56ch] text-sm leading-relaxed text-muted"
            >
              &ldquo;Explore with 100 credits on your own data. I&apos;ll learn
              your core flows and get them running for you.&rdquo;
              <span className="mt-1 block text-xs">Nora, Chief of Staff</span>
            </Spring>
          </div>
        </div>
      </section>

      <section aria-label="Plans" className="bg-background py-14 md:py-20">
        <ul className="shell grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PRICING_PLANS.map((plan, idx) => (
            <Inview
              key={plan.name}
              tag="li"
              mode="once"
              delayIn={idx * 70}
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-7 ${
                plan.featured
                  ? "border-brand-ink bg-brand-ink text-white shadow-product xl:-my-3 xl:py-10"
                  : plan.entry
                    ? "border-duo-soft bg-duo-wash"
                    : "border-line bg-background"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight">{plan.name}</h2>
                {plan.badge && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${
                      plan.featured ? "bg-accent text-foreground" : "bg-duo text-white"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className={`mt-2 min-h-[2.75rem] text-sm leading-relaxed ${plan.featured ? "text-white/70" : "text-muted"}`}>
                {plan.summary}
              </p>

              <p className="mt-6 font-serif leading-display">
                {plan.listPrice && (
                  <>
                    <del
                      className={`mr-2 whitespace-nowrap text-3xl decoration-2 ${
                        plan.featured ? "text-white/45" : "text-muted"
                      }`}
                    >
                      <span className="sr-only">Was </span>
                      {plan.listPrice}
                    </del>
                    <span className="sr-only">, now </span>
                  </>
                )}
                <span className={`whitespace-nowrap ${plan.price.length > 5 ? "text-4xl" : "text-5xl"}`}>
                  {plan.price}
                </span>
                <span className={`mt-1 block font-sans text-xs ${plan.featured ? "text-white/60" : "text-muted"}`}>
                  {plan.unit ?? "Tailored to your rollout"}
                </span>
              </p>
              {plan.offer && (
                <p
                  className={`mt-3 inline-flex self-start rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${
                    plan.featured ? "bg-white/10 text-accent" : "bg-duo-wash text-duo"
                  }`}
                >
                  {plan.offer}
                </p>
              )}

              <CreditsChip credits={plan.credits} featured={plan.featured} />

              {plan.creditBreakdown && <CreditBreakdown credits={plan.creditBreakdown} />}

              {plan.featuresLead && (
                <p className={`mt-6 text-xs font-semibold ${plan.featured ? "text-white/60" : "text-muted"}`}>
                  {plan.featuresLead}
                </p>
              )}
              <ul className={`${plan.featuresLead ? "mt-3" : "mt-6"} flex-1 space-y-3 text-sm`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? "bg-accent text-foreground" : "bg-brand-ink text-white"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
                        <path d="M6 12.5l4 4 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                className={`mt-8 inline-flex justify-center rounded-full px-4 py-3 text-sm font-semibold transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-85 ${
                  plan.featured
                    ? "bg-accent text-foreground"
                    : plan.entry
                      ? "bg-foreground text-background"
                      : "border border-foreground text-foreground"
                }`}
              >
                {plan.cta.label}
              </Link>
            </Inview>
          ))}
        </ul>

        {/* Custom flows: one price on every plan, while slots last */}
        <Inview
          mode="once"
          delayIn={280}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="shell mt-5"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-duo-soft bg-duo-wash p-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <div>
              <p className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-semibold tracking-tight">{CUSTOM_FLOWS.label}</span>
                <span className="rounded-full bg-duo px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
                  {CUSTOM_FLOWS.offer}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted">{CUSTOM_FLOWS.summary}</p>
            </div>
            <p className="shrink-0 font-serif leading-display">
              <del className="mr-2 text-2xl text-muted decoration-2">
                <span className="sr-only">Was </span>
                {CUSTOM_FLOWS.listPrice}
              </del>
              <span className="sr-only">, now </span>
              <span className="text-4xl">{CUSTOM_FLOWS.price}</span>
              <span className="mt-1 block font-sans text-xs text-muted">{CUSTOM_FLOWS.unit}</span>
            </p>
          </div>
        </Inview>
      </section>

      {/* What credits buy */}
      <section
        aria-labelledby="credits-heading"
        className="bg-band-sand-soft py-16 md:py-24"
      >
        <div className="shell">
          <p className="meta">How credits work</p>
          <h2 id="credits-heading" className="display-sans mt-3 max-w-[26ch]">
            One allowance, spent on whatever work you need.
          </h2>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">
            {CREDITS_NOTE} Credits reset monthly and don&apos;t roll over;
            top up any time a big project hits.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CREDIT_EXAMPLES.map((example, i) => (
              <Inview
                key={example.output}
                tag="li"
                mode="once"
                delayIn={i * 80}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="flex flex-col overflow-hidden rounded-2xl bg-background shadow-product"
              >
                {/* Output snap: a real capture, with the prompt floating on top */}
                <div className="relative aspect-[4/3] overflow-hidden bg-band-mist">
                  <div className="absolute inset-x-3 top-3">
                    <ShotCrop
                      src={example.shot.src}
                      alt={example.shot.alt}
                      crop={example.shot.crop}
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                      className="rounded-lg shadow-product ring-1 ring-line"
                    />
                  </div>
                  <p className="absolute inset-x-3 bottom-3 rounded-xl bg-foreground/90 px-3 py-2 text-xs text-background backdrop-blur">
                    <span aria-hidden className="mr-1 text-background/60">✳</span>
                    {example.prompt}
                  </p>
                  <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold shadow-product">
                    ~{example.credits} credits
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <AiOrb size={32} accent="var(--employee-chief-of-staff)" spin={false} />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{example.output}</h3>
                    <p className="text-xs text-muted">{example.result}</p>
                  </div>
                </div>
              </Inview>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pricing-faq" className="py-20 md:py-28">
        <div className="shell max-w-2xl">
          <h2
            id="pricing-faq"
            className="text-center text-xl font-semibold tracking-tight"
          >
            Questions
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {PRICING_FAQ.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none text-sm font-medium">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
);
