import Link from "next/link";

import { LogoMarquee } from "@/components/graphics/logo-marquee";
import { HazeField } from "@/components/graphics/haze-field";
import { KnowledgeGraph } from "@/components/graphics/knowledge-graph";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { PLATFORM_CONNECT } from "@/data/platform";

/** Connect — centred heading, knowledge graph card + hairline list of four. */
export const Connect = () => (
  <section aria-labelledby="connect-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={1} />
    <div className="shell">
      <SectionHead id="connect-heading" label={PLATFORM_CONNECT.label} heading={PLATFORM_CONNECT.heading} center />
      <LogoMarquee className="mt-8" />
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="rounded-3xl border border-line bg-background p-5 md:p-8">
          <div aria-hidden className="aspect-[4/3] w-full rounded-2xl bg-background p-4 shadow-product">
            <KnowledgeGraph className="h-full w-full" />
          </div>
        </Reveal>
        <ul className="border-t border-line">
          {PLATFORM_CONNECT.items.map((item, i) => (
            <Reveal key={item.title} tag="li" delay={i * 50} className="border-b border-line py-6">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/integrations" className="pill pill-ghost">
          See all integrations <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
);
