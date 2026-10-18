import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { ShotCrop } from "@/components/common/shot-crop";
import { AiOrb } from "@/components/graphics/ai-orb";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { getProductStructuredData } from "@/utils/seo/structured-data";
import {
  CREDIT_EXAMPLES,
  CREDITS_NOTE,
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
      <section className="relative isolate overflow-hidden">
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
              <AiOrb size={64} accent="var(--employee-chief-of-staff)" expressive spin={false} />
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
              <span className="font-semibold italic">Free for a week.</span>
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
              &ldquo;Give me a week and 100 credits on your own data. If I
              haven&apos;t automated one flow you care about, walk away.&rdquo;
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
                <span className={`whitespace-nowrap ${plan.price.length > 5 ? "text-4xl" : "text-5xl"}`}>
                  {plan.price}
                </span>
                <span className={`mt-1 block font-sans text-xs ${plan.featured ? "text-white/60" : "text-muted"}`}>
                  {plan.unit ?? "Tailored to your rollout"}
                </span>
              </p>

              <CreditsChip credits={plan.credits} featured={plan.featured} />

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
