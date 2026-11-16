import { BackgroundVideo } from "@/components/common/background-video";
import { Spring } from "@/components/animation/springs/spring";
import { SiteNav } from "@/components/sections/site-nav";
import { HOME_BOOTCAMP, HOME_HERO, HOME_HERO_VIDEO } from "@/data/home";
import { siteConfig } from "@/lib/site";

/**
 * Home hero — full-bleed background video (factory → pharma lab →
 * industrial zone, crossfaded) under a dark gradient + grain,
 * the nav floating over it in white, and a huge centred light H1. Text
 * slides (y) but never fades, so LCP text is in the HTML.
 * Photo: generated stand-in (photo-brief.md) — replace with a real photo of
 * the team on site when one exists.
 */
export const HomeHero = () => (
  <section aria-labelledby="hero-heading" className="relative isolate z-20 flex min-h-[100svh] flex-col overflow-hidden text-background">
    <BackgroundVideo {...HOME_HERO_VIDEO} className="-z-20" />
    {/* Soft centre shade so the headline reads over busy footage. */}
    <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_50%,var(--foreground)_0%,transparent_100%)] opacity-70 md:bg-[radial-gradient(ellipse_68%_64%_at_50%_55%,var(--foreground)_0%,transparent_100%)] md:opacity-75" />
    <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
    <SiteNav overDark />

    <div className="shell flex flex-1 flex-col items-center justify-center pb-24 pt-10 text-center">
      <Spring
        tag="h1"
        mode="once"
        from={{ y: 22 }}
        to={{ y: 0 }}
        config={{ tension: 175, friction: 28 }}
        className="display-light mx-auto max-w-[17ch]"
      >
        <span id="hero-heading">{HOME_HERO.h1}</span>
      </Spring>

      <Spring
        tag="p"
        mode="once"
        delayIn={90}
        from={{ y: 18 }}
        to={{ y: 0 }}
        config={{ tension: 175, friction: 28 }}
        className="mx-auto mt-6 max-w-[50ch] text-base leading-relaxed text-background/85 md:text-lg"
      >
        {HOME_HERO.sub}
      </Spring>

      <Spring
        mode="once"
        delayIn={160}
        from={{ y: 14 }}
        to={{ y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="mt-9 flex flex-wrap justify-center gap-3"
      >
        <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
          {HOME_BOOTCAMP.cta} <span aria-hidden>→</span>
        </a>
        <a href="#how-we-deploy" className="pill pill-lg border border-background/50 bg-foreground/25 text-background backdrop-blur-sm hover:bg-background/10">
          See how we deploy
        </a>
      </Spring>
    </div>
  </section>
);
