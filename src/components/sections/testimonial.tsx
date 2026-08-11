import { Inview } from "@/components/animation/springs/in-view";
import { Duotone } from "@/components/graphics/duotone";

/**
 * Testimonial — full-bleed duotone portrait on the left, oversized quote mark
 * and a short pull-quote on the right.
 *
 * PLACEHOLDER CONTENT: the quote and attribution below are invented to fill the
 * layout. Replace with a real, permissioned customer quote before launch, or
 * remove the section.
 */
export const Testimonial = () => (
  <section className="bg-background py-16 md:py-20">
    <div className="shell grid items-center gap-10 md:grid-cols-2">
      <Inview
        mode="once"
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 175, friction: 28 }}
        className="w-full"
      >
        <Duotone variant="portrait" className="aspect-[4/5] w-full" />
      </Inview>

      <Inview
        mode="once"
        delayIn={90}
        from={{ opacity: 0, y: 22 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 175, friction: 28 }}
      >
        <p aria-hidden className="text-2xl leading-none text-subtle">
          &ldquo;
        </p>
        <blockquote className="mt-4 text-2xl font-semibold leading-snug tracking-tight">
          Our field team runs the whole business from WhatsApp now. Ask, get
          an answer, act, before you're out of the car park.
        </blockquote>
        <figcaption className="mt-6">
          <p className="text-sm font-semibold">Placeholder Name</p>
          <p className="meta mt-0.5">Head of Operations, Placeholder Co</p>
        </figcaption>
      </Inview>
    </div>
  </section>
);
