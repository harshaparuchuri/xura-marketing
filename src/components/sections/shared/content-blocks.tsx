import Link from "next/link";

import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";

/**
 * Long-form content blocks for SEO / AEO (ADR-0046):
 * - AnswerBlock: a 40–60 word definition right under the hero, phrased as
 *   the question people search, so AI answer engines can quote it.
 * - EssaySection: a point of view (paragraphs) + numbered principles, the
 *   way wonderful.ai's /ai-transformation argues rather than lists.
 * - RelatedLinks: internal links between product, use-case, industry and
 *   comparison pages.
 * - ComparisonTable: a semantic <table> comparing options row by row.
 */

export type Answer = { q: string; a: string };

export const AnswerBlock = ({ id, q, a }: Answer & { id: string }) => (
  <section aria-labelledby={id} className="py-16 md:py-20">
    <div className="shell">
      <Reveal className="mx-auto max-w-[48rem] border-l-2 border-foreground pl-6 md:pl-8">
        <h2 id={id} className="text-xl font-medium tracking-tight md:text-2xl">
          {q}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{a}</p>
      </Reveal>
    </div>
  </section>
);

export type Essay = {
  label: string;
  heading: string;
  paragraphs: readonly string[];
  principlesHeading?: string;
  principles?: readonly { title: string; body: string }[];
};

export const EssaySection = ({ id, essay, variant = 0 }: { id: string; essay: Essay; variant?: 0 | 1 | 2 }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <div className="mx-auto max-w-[44rem]">
        <SectionHead id={id} label={essay.label} heading={essay.heading} />
        <div className="mt-10 space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {essay.paragraphs.map((p) => (
            <Reveal key={p.slice(0, 40)} tag="p">
              {p}
            </Reveal>
          ))}
        </div>
      </div>
      {essay.principles ? (
        <div className="mx-auto mt-16 max-w-[60rem]">
          {essay.principlesHeading ? <h3 className="text-center text-xl font-light tracking-tight md:text-2xl">{essay.principlesHeading}</h3> : null}
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {essay.principles.map((pr, i) => (
              <Reveal key={pr.title} tag="li" delay={(i % 3) * 40} className="grid gap-2 py-7 md:grid-cols-[5rem_1fr]">
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg font-medium">{pr.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{pr.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  </section>
);

export type RelatedLink = { href: string; label: string; body: string };

export const RelatedLinks = ({ id, heading = "Keep reading", links }: { id: string; heading?: string; links: readonly RelatedLink[] }) => (
  <section aria-labelledby={id} className="border-t border-line py-20 md:py-24">
    <div className="shell">
      <h2 id={id} className="text-2xl font-light tracking-tight md:text-3xl">
        {heading}
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col rounded-3xl border border-line bg-background p-6 transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-foreground"
            >
              <span className="text-lg font-medium">
                {l.label} <span aria-hidden>→</span>
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{l.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export type Comparison = {
  label: string;
  heading: string;
  lead?: string;
  columns: readonly string[];
  rows: readonly { criterion: string; cells: readonly string[] }[];
};

export const ComparisonTable = ({ id, data, variant = 1 }: { id: string; data: Comparison; variant?: 0 | 1 | 2 }) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={data.label} heading={data.heading} lead={data.lead} center />
      <Reveal className="mt-14 overflow-x-auto rounded-3xl border border-line bg-background">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-5 font-medium text-muted">
                <span className="sr-only">Criterion</span>
              </th>
              {data.columns.map((c, i) => (
                <th key={c} scope="col" className={`p-5 text-base font-medium ${i === 0 ? "bg-foreground text-background" : ""}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.criterion} className="border-b border-line last:border-b-0">
                <th scope="row" className="p-5 align-top font-medium">
                  {r.criterion}
                </th>
                {r.cells.map((cell, i) => (
                  <td key={`${r.criterion}-${i}`} className={`p-5 align-top leading-relaxed ${i === 0 ? "bg-line-soft" : "text-muted"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </div>
  </section>
);
