import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { HeroBackdrop } from "@/components/graphics/hero-backdrop";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { INDUSTRIES } from "@/data/industries";

export const IndustriesIndexView = () => (
  <>
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
        <HeroBackdrop
          className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-15"
          color="#059669"
          scale={0.65}
        />
        <div className="relative z-10">
          <SiteNav />
          <div className="shell pt-14 text-center md:pt-20">
            <Spring
              tag="h1"
              mode="once"
              from={{ opacity: 0, y: 22 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 175, friction: 28 }}
              className="display-serif mx-auto max-w-[20ch]"
            >
              Xura for{" "}
              <span className="font-semibold italic">every business</span>
            </Spring>
            <Spring
              tag="p"
              mode="once"
              delayIn={90}
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 175, friction: 28 }}
              className="mx-auto mt-5 max-w-[58ch] text-sm leading-relaxed text-muted"
            >
              One knowledge graph, shaped to your industry, asked and answered
              on the WhatsApp thread your team already lives in.
            </Spring>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="shell">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i, idx) => (
              <Inview
                key={i.slug}
                tag="li"
                mode="once"
                delayIn={idx * 70}
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
              >
                <Link
                  href={`/industries/${i.slug}`}
                  className="group block h-full rounded-sm border border-line p-6 transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-foreground"
                >
                  <p className="meta">{i.eyebrow}</p>
                  <h2 className="mt-4 text-lg font-semibold tracking-tight">
                    {i.headlineAccent.replace(/\.$/, "")}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {i.subhead}
                  </p>
                  <p className="mt-6 text-xs font-medium">
                    Explore
                    <span aria-hidden> →</span>
                  </p>
                </Link>
              </Inview>
            ))}
          </ul>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
);
