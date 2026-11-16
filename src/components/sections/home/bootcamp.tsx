import { HazeField } from "@/components/graphics/haze-field";
import { PhotoFill } from "@/components/common/photo-fill";
import { Reveal } from "@/components/sections/home/reveal";
import { HOME_BOOTCAMP, HOME_TRUST_LINE } from "@/data/home";
import { siteConfig } from "@/lib/site";

/**
 * Bootcamp — a full-width grey band (breaks the run of white sections)
 * holding one large card: offer + CTA on white, photo on the right, and
 * the trust line under it.
 * Right half: workshop photo (generated stand-in, photo-brief.md).
 */
export const Bootcamp = () => (
  <section id="bootcamp" aria-labelledby="bootcamp-heading" className="relative isolate overflow-hidden py-24 md:py-32">
        <HazeField variant={0} />
    <div className="shell">
      <Reveal className="relative isolate grid overflow-hidden rounded-3xl md:grid-cols-2">
        <div className="bg-background px-8 py-16 md:px-14 md:py-24">
        <p className="text-sm font-medium text-muted">The first step</p>
        <h2 id="bootcamp-heading" className="display-light-md mt-3 max-w-[14ch]">
          {HOME_BOOTCAMP.heading}
        </h2>
        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">{HOME_BOOTCAMP.body}</p>
        <a href={siteConfig.demoUrl} className="pill pill-lg mt-9">
          {HOME_BOOTCAMP.cta} <span aria-hidden>→</span>
        </a>
        </div>
        <div className="relative min-h-[18rem]">
          <PhotoFill
            src="/assets/photos/bootcamp-room.webp"
            alt="A small team discussing printed reports around a meeting table"
            sizes="(min-width: 768px) 560px, 100vw"
          />
        </div>
      </Reveal>
      <p className="mt-6 text-center text-sm text-muted">{HOME_TRUST_LINE}</p>
    </div>
  </section>
);
