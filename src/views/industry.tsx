import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { HeroBackdrop } from "@/components/graphics/hero-backdrop";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { getIndustry } from "@/data/industries";

type Props = { slug: string };

export const IndustryView = ({ slug }: Props) => {
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <main>
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[38rem]"
            style={{
              background:
                "linear-gradient(180deg, var(--duo-soft) 0%, var(--duo-wash) 30%, var(--background) 70%)",
            }}
          />
          <HeroBackdrop
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-15"
            color="#059669"
            scale={0.65}
          />
          <div className="relative z-10">
            <SiteNav />
            <div className="shell pt-14 pb-16 text-center md:pt-20">
              <Spring
                tag="p"
                mode="once"
                from={{ opacity: 0, y: 14 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="meta"
              >
                {industry.eyebrow}
              </Spring>
              <Spring
                tag="h1"
                mode="once"
                delayIn={80}
                from={{ opacity: 0, y: 22 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 175, friction: 28 }}
                className="display-serif mx-auto mt-3 max-w-[22ch]"
              >
                {industry.headline}{" "}
                <span className="font-semibold italic">
                  {industry.headlineAccent}
                </span>
              </Spring>
              <Spring
                tag="p"
                mode="once"
                delayIn={160}
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 175, friction: 28 }}
                className="mx-auto mt-5 max-w-[60ch] text-sm leading-relaxed text-muted"
              >
                {industry.subhead}
              </Spring>
              <Spring
                mode="once"
                delayIn={240}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 175, friction: 28 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
              >
                <Link href="/trial" className="pill">
                  <span aria-hidden>▪</span> Join the waitlist
                </Link>
                <Link href="#use-cases" className="pill pill-ghost">
                  <span aria-hidden>▪</span> See the use cases
                </Link>
              </Spring>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-24">
          <div className="shell">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-sans mx-auto max-w-[28ch] text-center"
            >
              {industry.problem.heading}
            </Inview>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {industry.problem.items.map((item, i) => (
                <Inview
                  key={item.title}
                  tag="li"
                  mode="once"
                  delayIn={i * 70}
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="rounded-sm border border-line p-6"
                >
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </Inview>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-band-mist py-20 md:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Inview
              mode="once"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 170, friction: 28 }}
              className="w-full"
              data-slot={`industry-${industry.slug}-solution`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-duo">
                <Image
                  src={industry.heroImage}
                  alt={industry.heroImageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover opacity-90 mix-blend-luminosity"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-duo-soft/40 to-duo/60 mix-blend-color"
                />
              </div>
            </Inview>
            <div>
              <Inview
                tag="h2"
                mode="once"
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="display-sans max-w-[24ch]"
              >
                {industry.solution.heading}
              </Inview>
              <Inview
                tag="p"
                mode="once"
                delayIn={80}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="mt-5 max-w-[54ch] text-sm leading-relaxed text-muted"
              >
                {industry.solution.body}
              </Inview>
            </div>
          </div>
        </section>

        <section id="use-cases" className="bg-background py-20 md:py-24">
          <div className="shell">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-sans mx-auto max-w-[24ch] text-center"
            >
              Six workflows, one conversation
            </Inview>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industry.useCases.map((uc, i) => (
                <Inview
                  key={uc.title}
                  tag="li"
                  mode="once"
                  delayIn={i * 60}
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="rounded-sm bg-band-sand-soft p-6"
                >
                  <p className="meta">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-sm font-semibold">{uc.title}</h3>
                  <p className="mt-2 text-xs text-muted">{uc.tag}</p>
                </Inview>
              ))}
            </ul>
          </div>
        </section>

        <section className="texture bg-band-sand py-20 md:py-24">
          <div className="shell text-center">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-serif mx-auto max-w-[30ch]"
            >
              {industry.scenario.heading}
            </Inview>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {industry.scenario.stats.map((s, i) => (
                <Inview
                  key={s.label}
                  tag="li"
                  mode="once"
                  delayIn={i * 80}
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="rounded-lg bg-background p-6"
                >
                  <p className="text-2xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-muted">{s.label}</p>
                </Inview>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-band-mist py-20 md:py-24">
          <div className="shell text-center">
            <Inview
              tag="h2"
              mode="once"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="display-sans mx-auto max-w-[46ch]"
            >
              {industry.cta}
            </Inview>
            <Inview
              mode="once"
              delayIn={80}
              from={{ opacity: 0, y: 14 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="mt-7 flex justify-center"
            >
              <Link href="/trial" className="pill">
                <span aria-hidden>▪</span> Start free trial
              </Link>
            </Inview>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};
