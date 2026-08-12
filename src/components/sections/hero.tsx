import Link from "next/link";

import { Spring } from "@/components/animation/springs/spring";
import { HeroBackdrop } from "@/components/graphics/hero-backdrop";
import { PromptGenerationCard } from "@/components/graphics/prompt-generation-card";
import { SiteNav } from "@/components/sections/site-nav";

export const Hero = () => (
  <section className="relative isolate overflow-hidden">
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
        floating "AI help agent" in the root layout. */}

    <div className="relative z-10">
      <SiteNav />

      <div className="shell pt-14 text-center md:pt-20">
        <Spring
          tag="h1"
          mode="once"
          from={{ opacity: 0, y: 22 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="display-serif mx-auto max-w-[26ch]"
        >
          The intelligence layer for leaders,{" "}
          <span className="font-semibold italic">one chat away.</span>
        </Spring>

        <Spring
          tag="p"
          mode="once"
          delayIn={90}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="mx-auto mt-5 max-w-[54ch] text-base leading-relaxed text-muted md:text-lg"
        >
          Ask any business question on WhatsApp. Xura returns live answers,
          dashboards, and workflows you can run on the spot.
        </Spring>

        <Spring
          mode="once"
          delayIn={170}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="mt-7 flex flex-col items-center gap-3"
        >
          <Link href="/trial" className="pill">
            <span aria-hidden>▪</span> Start free trial
          </Link>
          <p className="text-xs text-muted">
            One-time setup · No credit card
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
          {/* On mobile the card's internal absolute-positioned layers
              overflow the narrow viewport, so we CSS-`zoom` it down as one
              piece. Layout scales, proportions stay intact, and the
              typewriter + scene cycling keep working. */}
          <div className="[zoom:0.42] sm:[zoom:1]">
            <PromptGenerationCard />
          </div>
        </div>
      </Spring>
    </div>
  </section>
);
