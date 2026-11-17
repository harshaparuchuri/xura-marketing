import Link from "next/link";

import { HazeField } from "@/components/graphics/haze-field";
import { RailNav } from "@/components/sections/home/rail-nav";
import { SectionHead } from "@/components/sections/home/reveal";
import { OutputsList } from "@/components/sections/shared/outputs-list";
import { PLATFORM_OUTPUTS } from "@/data/platform";

/** Outputs — the same output cards as the home rail (shared `OutputsList`). */
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
      <OutputsList id="platform-outputs-rail" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
      <div className="mt-12 flex justify-center">
        <Link href="/ai-employees" className="pill pill-ghost">
          Meet the AI employees <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  </section>
);
