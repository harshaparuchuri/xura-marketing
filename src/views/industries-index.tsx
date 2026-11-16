import { HazeField } from "@/components/graphics/haze-field";
import Link from "next/link";

import { Spring } from "@/components/animation/springs/spring";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { PhotoFill } from "@/components/common/photo-fill";
import { FlowField } from "@/components/graphics/flow-field";
import { Reveal } from "@/components/sections/home/reveal";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { INDUSTRIES, industryFocus } from "@/data/industries";
import { siteConfig } from "@/lib/site";
import { CtaPair, TALK_URL } from "@/components/common/cta-pair";

/**
 * Industries hub (/industries) — same system as the home (ADR-0036): a short
 * dark hero, large photo cards for each industry (focus + an example workflow),
 * a "don't see yours" line with the bootcamp CTA, and a dark closing. The
 * hub stays for breadcrumbs ("Home › Industries › …") and broad searches.
 */
export const IndustriesIndexView = () => (
  <div className="palette-green">
    <main>
      <section aria-labelledby="industries-h1" className="relative isolate z-20 overflow-hidden text-background">
        <FlowField tone="dark" variant={1} />
        <SiteNav overDark />
        <div className="shell pb-24 pt-14 text-center md:pb-32 md:pt-20">
          <Breadcrumbs
            tone="dark"
            crumbs={[
              { name: "Home", path: "" },
              { name: "Industries", path: "/industries" },
            ]}
            className="mb-8 flex justify-center"
          />
          <Spring tag="h1" mode="once" from={{ y: 22 }} to={{ y: 0 }} config={{ tension: 175, friction: 28 }} className="display-light mx-auto max-w-[16ch]">
            <span id="industries-h1">AI transformation for your industry</span>
          </Spring>
          <Spring tag="p" mode="once" delayIn={90} from={{ y: 18 }} to={{ y: 0 }} config={{ tension: 175, friction: 28 }} className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-background/80 md:text-lg">
            Our team starts with the work that needs attention in your sector, then custom&#8209;builds the apps and flows to handle it.
          </Spring>
        </div>
      </section>

      <section aria-label="Industries" className="relative isolate overflow-hidden py-20 md:py-28">
        <HazeField variant={0} />
        <ul className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} tag="li" delay={(i % 3) * 60}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl p-7 text-background"
              >
                <PhotoFill src={ind.photo.src} alt="" focus={ind.photo.focus} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="-z-20" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-foreground/90 via-foreground/35 to-transparent transition-opacity duration-[var(--duration-normal)] ease-entrance group-hover:opacity-90" />
                <p className="font-mono text-xs text-background/70">{ind.useCases[0]?.title}</p>
                <h2 className="mt-3 text-2xl font-light tracking-tight md:text-3xl">{ind.label}</h2>
                <p className="mt-1 text-sm text-background/75">{industryFocus(ind)}</p>
                <span className="mt-6 text-sm underline underline-offset-4">Explore <span aria-hidden>→</span></span>
              </Link>
            </Reveal>
          ))}
          <Reveal tag="li" delay={120}>
            <div className="flex aspect-[4/5] flex-col justify-end rounded-3xl border border-line bg-background p-7">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">Don&apos;t see your industry?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We start with the work, not the sector. If your team runs on ERP, spreadsheets and email, we can help.
              </p>
              <a href={TALK_URL} className="pill mt-6 self-start">
                Talk to us <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </ul>
      </section>

      <section aria-labelledby="industries-cta" className="relative isolate overflow-hidden py-24 text-center text-background md:py-32">
        <FlowField tone="dark" variant={2} />
        <div className="shell">
          <Reveal tag="h2" className="display-light-md mx-auto max-w-[20ch]">
            <span id="industries-cta">Start your AI transformation now.</span>
          </Reveal>
          <Reveal tag="p" delay={60} className="mx-auto mt-5 max-w-[48ch] text-base text-background/70">
            Start with a 2-day bootcamp. See it live in 2 weeks.
          </Reveal>
          <Reveal delay={80} className="mt-9 flex justify-center">
            <CtaPair />
          </Reveal>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
);
