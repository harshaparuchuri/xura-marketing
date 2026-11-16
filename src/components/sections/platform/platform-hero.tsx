import Image from "next/image";

import { Spring } from "@/components/animation/springs/spring";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { FlowField } from "@/components/graphics/flow-field";
import { SiteNav } from "@/components/sections/site-nav";
import { PLATFORM_HERO } from "@/data/platform";
import { siteConfig } from "@/lib/site";

/** Platform hero — dark abstract field, centred H1, then the app on a stage. */
export const PlatformHero = () => (
  <section aria-labelledby="platform-h1" className="relative isolate z-20 overflow-hidden text-background">
    <FlowField tone="dark" variant={0} />
    <SiteNav overDark />
    <div className="shell pb-0 pt-14 text-center md:pt-20">
      <Breadcrumbs
        tone="dark"
        crumbs={[
          { name: "Home", path: "" },
          { name: "Platform", path: "/platform" },
        ]}
        className="mb-8 flex justify-center"
      />
      <Spring tag="h1" mode="once" from={{ y: 22 }} to={{ y: 0 }} config={{ tension: 175, friction: 28 }} className="display-light mx-auto max-w-[16ch]">
        <span id="platform-h1">{PLATFORM_HERO.h1}</span>
      </Spring>
      <Spring tag="p" mode="once" delayIn={90} from={{ y: 18 }} to={{ y: 0 }} config={{ tension: 175, friction: 28 }} className="mx-auto mt-6 max-w-[50ch] text-base leading-relaxed text-background/75 md:text-lg">
        {PLATFORM_HERO.sub}
      </Spring>
      <Spring mode="once" delayIn={160} from={{ y: 14 }} to={{ y: 0 }} config={{ tension: 180, friction: 27 }} className="mt-9 flex justify-center">
        <a href={siteConfig.demoUrl} className="pill pill-inverse pill-lg">
          Book a 2-day bootcamp <span aria-hidden>→</span>
        </a>
      </Spring>
      <Spring mode="once" delayIn={220} from={{ y: 40 }} to={{ y: 0 }} config={{ tension: 150, friction: 30 }} className="mx-auto mt-16 max-w-[60rem]">
        <Image
          src="/assets/product/home.webp"
          alt="Xura app home with a prompt box and shortcuts for dashboards, slides, research, infographics and briefs"
          width={1920}
          height={1200}
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full rounded-t-2xl shadow-product"
        />
      </Spring>
    </div>
  </section>
);
