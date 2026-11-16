import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { HOME_FAQ } from "@/data/home";

/**
 * FAQ — native <details> (no JS), plus FAQPage JSON-LD built from the same
 * array so the markup and the visible answers can't drift. Questions must
 * not duplicate the (currently hidden) pricing FAQ in `data/pricing.ts`.
 */
export const Faq = () => (
  <section aria-labelledby="faq-heading" className="border-t border-line py-24 md:py-32">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }}
    />
    <div className="shell">
      <SectionHead id="faq-heading" label="FAQ" heading="Frequently asked questions" center />
      <Reveal tag="ul" className="mx-auto mt-12 max-w-[48rem] divide-y divide-line border-y border-line">
        {HOME_FAQ.map((f) => (
          <li key={f.q}>
            <details className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <span aria-hidden className="text-muted group-open:hidden">+</span>
                <span aria-hidden className="hidden text-muted group-open:inline">−</span>
              </summary>
              <p className="-mt-2 max-w-[60ch] pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);
