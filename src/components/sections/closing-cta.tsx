import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";

/**
 * Closing CTA — a cool mist band with one centred question and a single pill.
 * Deliberately quiet: the reference saves its loudest surface for the footer.
 */
export const ClosingCta = () => (
  <section id="cta" className="bg-band-mist py-20 md:py-24">
    <div className="shell text-center">
      <Inview
        tag="h2"
        mode="once"
        from={{ opacity: 0, y: 18 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="display-sans mx-auto max-w-[28ch]"
      >
        Ready to run your business from your pocket?
      </Inview>

      <Inview
        mode="once"
        delayIn={90}
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
);
