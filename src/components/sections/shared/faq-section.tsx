import { Reveal, SectionHead } from "@/components/sections/home/reveal";

/** FaqSection — centred single-column FAQ with FAQPage JSON-LD from the same items. */
export const FaqSection = ({ id, items }: { id: string; items: readonly { q: string; a: string }[] }) => (
  <section aria-labelledby={id} className="border-t border-line py-24 md:py-32">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      }}
    />
    <div className="shell">
      <SectionHead id={id} label="FAQ" heading="Frequently asked questions" center />
      <Reveal tag="ul" className="mx-auto mt-12 max-w-[48rem] divide-y divide-line border-y border-line">
        {items.map((f) => (
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
