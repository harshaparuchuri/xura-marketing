import type { ReactNode } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { FlowField } from "@/components/graphics/flow-field";
import { SiteNav } from "@/components/sections/site-nav";
import { siteConfig } from "@/lib/site";

/**
 * PageHero — dark FlowField hero for inner pages (/apps, /deployment):
 * floating white nav, dark breadcrumbs, centred light H1, sub, bootcamp
 * pill, and an optional visual underneath.
 */
export const PageHero = ({
  id,
  title,
  sub,
  path,
  name,
  variant = 0,
  children,
}: {
  id: string;
  title: string;
  sub: string;
  path: string;
  name: string;
  variant?: 0 | 1 | 2;
  children?: ReactNode;
}) => (
  <section aria-labelledby={id} className="relative isolate z-20 overflow-hidden text-background">
    <FlowField tone="dark" variant={variant} />
    <SiteNav overDark />
    <div className="shell pb-24 pt-14 text-center md:pb-32 md:pt-20">
      <Breadcrumbs tone="dark" crumbs={[{ name: "Home", path: "" }, { name, path }]} className="mb-8 flex justify-center" />
      <Spring tag="h1" mode="once" from={{ y: 22 }} to={{ y: 0 }} config={{ tension: 175, friction: 28 }} className="display-light mx-auto max-w-[17ch]">
        <span id={id}>{title}</span>
      </Spring>
      <Spring tag="p" mode="once" delayIn={90} from={{ y: 18 }} to={{ y: 0 }} config={{ tension: 175, friction: 28 }} className="mx-auto mt-6 max-w-[54ch] text-base leading-relaxed text-background/80 md:text-lg">
        {sub}
      </Spring>
      <Spring mode="once" delayIn={160} from={{ y: 14 }} to={{ y: 0 }} config={{ tension: 180, friction: 27 }} className="mt-9 flex justify-center">
        <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
          Book a 2-day bootcamp <span aria-hidden>→</span>
        </a>
      </Spring>
      {children ? (
        <Spring mode="once" delayIn={220} from={{ y: 40 }} to={{ y: 0 }} config={{ tension: 150, friction: 30 }} className="mx-auto mt-16 max-w-[60rem] text-left">
          {children}
        </Spring>
      ) : null}
    </div>
  </section>
);
