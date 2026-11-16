import { ShotCrop } from "@/components/common/shot-crop";
import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";

/**
 * Data-driven content sections shared by the product sub-pages
 * (/ai-employees, /workflows, /security). Same layouts as the /apps sections,
 * but they take their copy as props so each page only adds a data file.
 */

type Item = { title: string; body: string };
type Block = { id: string; label: string; heading: string; lead?: string; variant?: 0 | 1 | 2 };

/** Numbered steps in one bordered row (3–6 steps). */
export const StepsSection = ({ id, label, heading, lead, variant = 1, steps }: Block & { steps: readonly Item[] }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <Reveal
        tag="ol"
        className={`mt-14 grid overflow-hidden rounded-2xl border border-line ${steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
      >
        {steps.map((s, i) => (
          <li key={s.title} className="border-b border-line p-7 md:border-r">
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-light tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);

/** Hairline 3-column grid of points. */
export const GridSection = ({ id, label, heading, lead, variant = 0, items }: Block & { items: readonly Item[] }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.title} tag="li" delay={(i % 3) * 50} className="border-b border-r border-line bg-background p-7">
            <h3 className="text-lg font-medium">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/** Soft cards (examples, use cases). */
type Shot = { src: string; alt: string; crop: { x: number; y: number; w: number; h: number }; caption?: string };

/** Cards grid; an optional product `shot` shows the outcome below the cards. */
export const CardsSection = ({
  id,
  label,
  heading,
  lead,
  variant = 2,
  items,
  shot,
}: Block & { items: readonly Item[]; shot?: Shot }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <Reveal key={a.title} tag="li" delay={(i % 3) * 60} className="rounded-3xl border border-line bg-background p-7">
            <h3 className="text-2xl font-light tracking-tight">{a.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
          </Reveal>
        ))}
      </ul>
      {shot ? (
        <Reveal tag="figure" className="mx-auto mt-12 max-w-[46rem]">
          <ShotCrop src={shot.src} alt={shot.alt} crop={shot.crop} sizes="(min-width: 768px) 46rem, 100vw" className="rounded-2xl shadow-product" />
          {shot.caption ? <figcaption className="mt-4 text-center text-sm text-muted">{shot.caption}</figcaption> : null}
        </Reveal>
      ) : null}
    </div>
  </section>
);

/** Three-way comparison; the first column (this page's answer) is highlighted. */
export const CompareSection = ({ id, label, heading, lead, variant = 1, items }: Block & { items: readonly Item[] }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map((c, i) => (
          <Reveal key={c.title} tag="li" delay={i * 60} className={`rounded-3xl p-7 ${i === 0 ? "bg-foreground text-background" : "border border-line bg-background"}`}>
            <h3 className="text-2xl font-light tracking-tight">{c.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-background/75" : "text-muted"}`}>{c.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
