import Image from "next/image";
import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";

/**
 * Case-study strip — a pale wash panel holding a duotone image on the left and
 * a short narrative with a single action on the right.
 *
 * PLACEHOLDER CONTENT: the pharma narrative below stands in for a real,
 * permissioned customer reference. Replace before launch — do not ship an
 * invented customer outcome.
 */
export const CaseStudy = () => (
  <section className="bg-background py-16 md:py-20">
    <div className="shell">
      <Inview
        mode="once"
        from={{ opacity: 0, y: 22 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 175, friction: 28 }}
        className="grid items-stretch gap-0 overflow-hidden rounded-sm bg-duo-wash md:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative min-h-56 w-full overflow-hidden bg-duo">
          <Image
            src="/case-study-pharma-v2.jpg"
            alt="Scientist working at a microscope in a life-sciences lab"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover opacity-90 mix-blend-luminosity"
            priority={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-duo-soft/40 to-duo/60 mix-blend-color"
          />
        </div>

        <div className="p-7 md:p-9">
          <h2 className="text-sm font-semibold">
            How Xura AI is transforming pharma and life sciences
          </h2>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
            From early discovery to post-market surveillance, research, medical
            affairs, and commercial teams ask Xura in plain language and get
            trial data, regulatory context, and field signals back in seconds,
            grounded in their own evidence, ready for the next decision.
          </p>
          <Link href="/industries/pharma" className="pill mt-6">
            <span aria-hidden>▪</span> Read case study
          </Link>
        </div>
      </Inview>
    </div>
  </section>
);
