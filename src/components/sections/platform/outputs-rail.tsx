import Link from "next/link";

import { HazeField } from "@/components/graphics/haze-field";
import { ShotCrop } from "@/components/common/shot-crop";
import { RailNav } from "@/components/sections/home/rail-nav";
import { SectionHead } from "@/components/sections/home/reveal";
import { PLATFORM_OUTPUTS } from "@/data/platform";

/** Outputs — scroll rail of real product outputs, like the home's rail. */
export const OutputsRail = () => (
  <section aria-labelledby="outputs-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={0} />
    <div className="shell">
      <SectionHead id="outputs-heading" label={PLATFORM_OUTPUTS.label} heading={PLATFORM_OUTPUTS.heading} center />
    </div>
    <div className="shell mt-10 flex justify-end">
      <RailNav targetId="platform-outputs-rail" label="Scroll the outputs" />
    </div>
    <div className="relative">
      <ul id="platform-outputs-rail" className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-75rem)/2+2.5rem))] pb-4">
        {PLATFORM_OUTPUTS.items.map((o) => (
          <li key={o.title} className="w-[82vw] shrink-0 snap-start sm:w-[26rem]">
            <article
              className="flex h-full flex-col overflow-hidden rounded-3xl bg-foreground bg-cover bg-bottom text-background"
              style={{ backgroundImage: "var(--field-1)" }}
            >
              <div className="p-7">
                <h3 className="text-2xl font-light tracking-tight">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/70">{o.body}</p>
              </div>
              <div className="mt-auto h-60 overflow-hidden pl-7">
                <ShotCrop src={o.shot.src} alt={o.shot.alt} crop={o.shot.crop} sizes="(min-width: 640px) 400px, 80vw" className="rounded-tl-2xl shadow-product" />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
      <div className="mt-12 flex justify-center">
        <Link href="/ai-employees" className="pill pill-ghost">
          Meet the AI employees <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
);
