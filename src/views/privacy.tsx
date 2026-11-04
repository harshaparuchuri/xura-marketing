import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import {
  PRIVACY_EFFECTIVE,
  PRIVACY_GLANCE,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  type PrivacyBlock,
} from "@/data/privacy";

/**
 * Privacy policy view (`/privacy`). Readable legal page: H1 + effective date,
 * an "at a glance" summary, a contents list, then one `<section>` per heading
 * with paragraphs, lists and two-column tables. Static on purpose (no reveal
 * animation) so it reads and prints immediately. Content: `data/privacy.ts`.
 */
const textClass = "text-sm leading-relaxed text-muted md:text-base";

const Block = ({ block }: { block: PrivacyBlock }) => {
  if (block.type === "p") return <p className={`mt-4 ${textClass}`}>{block.text}</p>;
  if (block.type === "list")
    return (
      <ul className={`mt-4 list-disc space-y-2 pl-5 ${textClass}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-band-mist text-xs font-semibold">
          <tr>
            {block.head.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row[0]} className="border-t border-line align-top">
              <th scope="row" className="w-2/5 px-4 py-3 font-medium">
                {row[0]}
              </th>
              <td className="px-4 py-3 leading-relaxed text-muted">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const PrivacyView = () => (
  <>
    <main>
      <SiteNav />
      <article className="shell pb-24 pt-14 md:pt-20">
        <div className="max-w-[72ch]">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "" },
              { name: "Privacy policy", path: "/privacy" },
            ]}
            className="mb-6"
          />
          <h1 className="display-serif">Privacy policy</h1>
          <p className="mt-3 text-xs text-muted">Effective {PRIVACY_EFFECTIVE}</p>
          <p className={`mt-6 ${textClass}`}>{PRIVACY_INTRO}</p>

          <section aria-labelledby="glance-h" className="mt-10">
            <h2 id="glance-h" className="text-xl font-semibold tracking-tight">
              Privacy at a glance
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PRIVACY_GLANCE.map((g) => (
                <li key={g.title} className="rounded-2xl bg-duo-wash p-5">
                  <p className="text-sm font-semibold">{g.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{g.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="On this page" className="mt-10 rounded-2xl border border-line p-5">
            <p className="text-xs font-semibold">On this page</p>
            <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
              {PRIVACY_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-muted underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground hover:underline"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {PRIVACY_SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-12">
              <h2 id={`${s.id}-h`} className="text-xl font-semibold tracking-tight">
                {s.heading}
              </h2>
              {s.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
    <SiteFooter />
  </>
);
