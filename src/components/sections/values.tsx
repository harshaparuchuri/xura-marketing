import { Inview } from "@/components/animation/springs/in-view";

/**
 * Values band — the reference's one textured section. Sand background with a
 * crumpled-material overlay, a mixed-typeface heading (serif line over sans
 * line), and three white outline-icon cards.
 */
type Value = {
  title: string;
  body: string;
  glyph: "segments" | "globe" | "arrow";
};

const VALUES: Value[] = [
  {
    glyph: "segments",
    title: "Meet teams where they are",
    body: "Insight belongs in the tools people already open, WhatsApp first, dashboards when you want them.",
  },
  {
    glyph: "globe",
    title: "One knowledge graph, every source",
    body: "From a single spreadsheet to your entire stack, Xura connects it once and answers from everywhere.",
  },
  {
    glyph: "arrow",
    title: "Answers that move",
    body: "Every question returns a visual, a summary, and a ranked next move, ready to act on in one tap.",
  },
];

const Glyph = ({ kind }: { kind: Value["glyph"] }) => (
  <svg
    viewBox="0 0 32 32"
    className="size-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    aria-hidden
    focusable="false"
  >
    <circle cx="16" cy="16" r="12" />
    {kind === "segments" ? <path d="M16 4v24M16 16H4" /> : null}
    {kind === "globe" ? (
      <>
        <path d="M4 16h24" />
        <ellipse cx="16" cy="16" rx="6" ry="12" />
      </>
    ) : null}
    {kind === "arrow" ? <path d="M11.5 20.5 20.5 11.5M13 11.5h7.5V19" /> : null}
  </svg>
);

export const Values = () => (
  <section
    id="values"
    className="texture relative isolate overflow-hidden bg-band-sand py-20 md:py-28"
  >
    <div className="shell relative">
      <div className="text-center">
        <Inview
          tag="h2"
          mode="once"
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif"
        >
          Built for the move
        </Inview>
        <Inview
          tag="p"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-sans mt-0.5"
        >
          Designed for the pocket
        </Inview>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {VALUES.map((value, i) => (
          <Inview
            key={value.title}
            mode="once"
            delayIn={i * 90}
            from={{ opacity: 0, y: 22 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 175, friction: 28 }}
            className="rounded-lg bg-background p-6"
          >
            <Glyph kind={value.glyph} />
            <h3 className="mt-8 text-sm font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {value.body}
            </p>
          </Inview>
        ))}
      </div>
    </div>
  </section>
);
