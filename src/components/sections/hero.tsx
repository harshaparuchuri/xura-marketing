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
          Plug in your data and MCP tools. Xura&apos;s agents watch for the
          signals your team would overlook and answer every WhatsApp question
          with a live dashboard, deck, or workflow, so you&apos;re always ready
          to decide.
        </Spring>

        <Spring
          mode="once"
          delayIn={170}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 175, friction: 28 }}
          className="mt-7 flex flex-col items-center gap-3"
        >
          <a
            href="https://www.producthunt.com/products/xura-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-xura-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Third-party badge served by Product Hunt — sized by them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Xura AI - AI executive assistant for leaders & business teams. | Product Hunt"
              width={213}
              height={46}
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1206195&theme=neutral&t=1786793161875"
            />
          </a>
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
