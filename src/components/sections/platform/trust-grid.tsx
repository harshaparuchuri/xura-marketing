import Link from "next/link";

import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { PLATFORM_TRUST } from "@/data/platform";

/** Built for trust — six controls in a hairline 3×2 grid. */
export const TrustGrid = () => (
  <section id="trust" aria-labelledby="trust-heading" className="relative isolate overflow-hidden border-t border-line py-24 md:py-32">
    <HazeField variant={2} />
    <div className="shell">
      <SectionHead id="trust-heading" label={PLATFORM_TRUST.label} heading={PLATFORM_TRUST.heading} center />
      <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_TRUST.items.map((t, i) => (
          <Reveal key={t.title} tag="li" delay={(i % 3) * 50} className="border-b border-r border-line p-7">
            <h3 className="text-lg font-medium">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12 flex justify-center">
        <Link href="/security" className="pill pill-ghost">
          More about security <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
);
