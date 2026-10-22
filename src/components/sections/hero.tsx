import Link from "next/link";

import { Spring } from "@/components/animation/springs/spring";
import { HeroBackdrop } from "@/components/graphics/hero-backdrop";
import { MobilePromptCard } from "@/components/graphics/mobile-prompt-card";
import { PromptGenerationCard } from "@/components/graphics/prompt-generation-card";
import { SiteNav } from "@/components/sections/site-nav";
import { siteConfig } from "@/lib/site";

export const Hero = () => (
  <section className="relative isolate overflow-hidden z-20">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, var(--duo-soft) 0%, var(--duo-wash) 20%, var(--background) 50%, var(--band-sand-soft) 70%, var(--band-sand) 100%)",
      }}
    />

    {/* Animated wireframe backdrop, ported from the Xura app's post-login home. */}
    <HeroBackdrop
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-15"
      color="#059669"
      scale={0.65}
    />

    {/* AiOrb intentionally omitted here, it now lives site-wide as a
        floating AI help orb in the root layout. */}

    <div className="relative z-10">
      <SiteNav />

      <div className="shell pt-14 text-center md:pt-20">
        <Spring
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mb-6 flex justify-center"
        >
          <Link
            href="/#pilot"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-background/80 py-1 pl-1 pr-3.5 text-xs transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-foreground"
          >
            <span className="rounded-full bg-accent px-2.5 py-0.5 font-semibold">Free</span>
            Hire your first AI employee: 1 week, 100 credits
            <span aria-hidden>→</span>
          </Link>
        </Spring>

        <Spring
          tag="h1"
          mode="once"
          from={{ y: 22 }}
          to={{ y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="display-serif mx-auto max-w-[26ch]"
        >
          AI employees that{" "}
          <span className="font-semibold italic">answer, explain and act.</span>
        </Spring>

        <Spring
          tag="p"
          mode="once"
          delayIn={90}
          from={{ y: 18 }}
          to={{ y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="mx-auto mt-5 max-w-[54ch] text-base leading-relaxed text-muted md:text-lg"
        >
          Stop chasing numbers across spreadsheets, CRMs and inboxes.
          Xura&apos;s AI employees answer from your own data, find the reason
          behind the number, and draft the next step. Nothing goes out until
          you approve.
        </Spring>

        <Spring
          mode="once"
          delayIn={170}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="mt-7 flex flex-col items-center gap-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={siteConfig.demoUrl} className="pill px-7 py-4 text-sm font-semibold shadow-product">
              Book a demo <span aria-hidden>→</span>
            </a>
            <a href={siteConfig.signupUrl} className="pill pill-ghost px-6 py-4 text-sm font-semibold">
              Get started for free
            </a>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted">
            <span>✓ 100 free credits</span>
            <span>✓ No credit card</span>
            <Link
              href="/#tour"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              ▶ Meet your AI team
            </Link>
          </p>
        </Spring>
      </div>

      <Spring
        mode="once"
        delayIn={260}
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 155, friction: 30 }}
        className="shell mt-14 pb-20"
      >
        {/* SCREENSHOT SLOT: hero-device, mobile mockup of WhatsApp chat with Xura reply.
            Drop into <ProductCard /> or replace with an <Image /> when asset arrives. */}
        <div className="mx-auto max-w-[57rem]" data-slot="hero-device">
          {/* Phones: the desktop card would shrink to unreadable 7–9px
              text, so a phone-sized card cycles the same use cases with
              large crops of real captures. sm+ gets the full card. */}
          <div className="sm:hidden">
            <MobilePromptCard />
          </div>
          <div className="hidden sm:block">
            <PromptGenerationCard />
          </div>
        </div>
      </Spring>
    </div>
  </section>
);
