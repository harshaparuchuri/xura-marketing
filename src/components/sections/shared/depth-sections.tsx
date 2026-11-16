import type { ReactNode } from "react";

import { ShotCrop } from "@/components/common/shot-crop";
import { AiOrb } from "@/components/graphics/ai-orb";
import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";

/**
 * Deeper sections for the product and How we work sub-pages (ADR-0042):
 * WalkthroughSection (one real job, step by step), SplitSection (copy +
 * visual), ProfilesSection (AI employee profiles with real outputs),
 * ChecklistSection (prep / review lists) and DataFlowDiagram (/security).
 */

type Shot = { src: string; alt: string; crop: { x: number; y: number; w: number; h: number } };
type Block = { id: string; label: string; heading: string; lead?: string; variant?: 0 | 1 | 2 };

/* ----------------------------------------------------------- Walkthrough */

export type WalkStep = {
  /** Small tag above the title, e.g. "Trigger" or "09:00". */
  tag: string;
  title: string;
  body: string;
  /** What the step reads, and what it produces. */
  reads?: string;
  makes?: string;
  /** Marks a step that waits for a person. */
  gate?: boolean;
};

/** A vertical, numbered walkthrough: sticky intro on the left, steps on the right. */
export const WalkthroughSection = ({ id, label, heading, lead, variant = 0, steps, aside }: Block & { steps: readonly WalkStep[]; aside?: ReactNode }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHead id={id} label={label} heading={heading} lead={lead} />
        {aside ? <div className="mt-10 hidden lg:block">{aside}</div> : null}
      </div>
      <ol className="relative space-y-4 before:absolute before:inset-y-6 before:left-[1.4rem] before:w-px before:bg-line">
        {steps.map((s, i) => (
          <Reveal key={s.title} tag="li" delay={(i % 4) * 40} className="relative pl-14">
            <span
              aria-hidden
              className={`absolute left-0 top-5 flex size-11 items-center justify-center rounded-full border font-mono text-xs ${
                s.gate ? "border-foreground bg-foreground text-background" : "border-line bg-background text-muted"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={`rounded-3xl border p-6 ${s.gate ? "border-foreground bg-background" : "border-line bg-background"}`}>
              <p className="font-mono text-xs text-muted">{s.tag}</p>
              <h3 className="mt-2 text-xl font-light tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              {s.reads || s.makes ? (
                <dl className="mt-4 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
                  {s.reads ? (
                    <div>
                      <dt className="text-xs text-muted">Reads</dt>
                      <dd className="mt-1">{s.reads}</dd>
                    </div>
                  ) : null}
                  {s.makes ? (
                    <div>
                      <dt className="text-xs text-muted">Produces</dt>
                      <dd className="mt-1">{s.makes}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

/* ----------------------------------------------------------- Split */

/** Copy with a bullet list on one side, a visual on the other. */
export const SplitSection = ({
  id,
  label,
  heading,
  lead,
  variant = 1,
  points,
  visual,
  flip = false,
}: Block & { points: readonly { title: string; body: string }[]; visual: ReactNode; flip?: boolean }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
      <div className={flip ? "lg:order-2" : ""}>
        <SectionHead id={id} label={label} heading={heading} lead={lead} />
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {points.map((p, i) => (
            <Reveal key={p.title} tag="li" delay={i * 40} className="py-5">
              <h3 className="text-base font-medium">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal delay={80} className={flip ? "lg:order-1" : ""}>
        {visual}
      </Reveal>
    </div>
  </section>
);

/* ----------------------------------------------------------- Profiles */

export type Profile = {
  name: string;
  role: string;
  job: string;
  body: string;
  reads: string;
  produces: string;
  approves: string;
  shot: Shot;
};

/** One row per AI employee: orb, job, what it reads / produces / who approves, and a real output. */
export const ProfilesSection = ({ id, label, heading, lead, variant = 0, profiles }: Block & { profiles: readonly Profile[] }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <ul className="mt-16 space-y-6">
        {profiles.map((p) => (
          <Reveal
            key={p.name}
            tag="li"
            className="grid overflow-hidden rounded-3xl border border-line bg-background lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] [&>*]:min-w-0"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4">
                <AiOrb size={48} accent="var(--muted)" expressive spin={false} />
                <div>
                  <h3 className="text-2xl font-light tracking-tight">{p.name}</h3>
                  <p className="font-mono text-xs text-muted">{p.role}</p>
                </div>
              </div>
              <p className="mt-6 text-lg font-medium">{p.job}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
              <dl className="mt-6 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
                {[
                  ["Reads", p.reads],
                  ["Produces", p.produces],
                  ["You approve", p.approves],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-muted">{k}</dt>
                    <dd className="mt-1 leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div
              className="flex items-end overflow-hidden bg-foreground bg-cover bg-center pl-8 pt-8 md:pl-10 md:pt-10"
              style={{ backgroundImage: "var(--field-1)" }}
            >
              <ShotCrop src={p.shot.src} alt={p.shot.alt} crop={p.shot.crop} sizes="(min-width: 1024px) 34rem, 90vw" className="w-full rounded-tl-2xl shadow-product" />
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

/* ----------------------------------------------------------- Checklist */

/** Two or more titled lists with check marks (prep lists, review lists). */
export const ChecklistSection = ({
  id,
  label,
  heading,
  lead,
  variant = 2,
  lists,
}: Block & { lists: readonly { title: string; items: readonly string[] }[] }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <div className={`mt-14 grid gap-4 ${lists.length === 1 ? "mx-auto max-w-[52rem]" : lists.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {lists.map((l, i) => (
          <Reveal key={l.title} delay={i * 60} className="rounded-3xl border border-line bg-background p-8">
            <h3 className="text-xl font-light tracking-tight">{l.title}</h3>
            {/* A single list spans the width, so its items flow in two columns. */}
            <ul className={`mt-5 text-sm ${lists.length === 1 ? "grid gap-x-8 gap-y-3 sm:grid-cols-2" : "space-y-3"}`}>
              {l.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[0.625rem] text-background">
                    ✓
                  </span>
                  <span className="leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- Data flow */

/**
 * DataFlowDiagram — where data lives when Xura runs: your network (systems,
 * queries, permissions) → Xura (graph structure and patterns only) → your
 * people (approvals, audit log). Decorative; the copy beside it carries the facts.
 */
export const DataFlowDiagram = ({ zones }: { zones: readonly { title: string; tag: string; items: readonly string[] }[] }) => (
  <div aria-hidden className="grid gap-3">
    {zones.map((z, i) => (
      <div key={z.title}>
        <div className={`rounded-3xl border p-6 ${i === 0 ? "border-foreground bg-background" : "border-line bg-background"}`}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-lg font-light tracking-tight">{z.title}</p>
            <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">{z.tag}</span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {z.items.map((it) => (
              <li key={it} className="rounded-full bg-line-soft px-3 py-1 text-xs">
                {it}
              </li>
            ))}
          </ul>
        </div>
        {i < zones.length - 1 ? <div className="mx-auto h-6 w-px bg-line" /> : null}
      </div>
    ))}
  </div>
);
