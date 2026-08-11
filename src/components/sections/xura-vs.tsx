import { Inview } from "@/components/animation/springs/in-view";

/**
 * XuraVs — dark comparison band.
 *
 * Positions Xura against generic LLMs (ChatGPT / Claude) with a
 * feature-by-feature grid. Dark surface to break the light-band rhythm of
 * WhatsApp/Values above; two-column table on md+, stacked pairs on mobile.
 */

type Row = {
  axis: string;
  llm: string;
  xura: string;
};

const ROWS: Row[] = [
  {
    axis: "Data access",
    llm: "Upload a CSV or copy-paste. No live connection to your systems.",
    xura: "Native connectors to your CRM, warehouse, and 50+ tools. Always live.",
  },
  {
    axis: "Business context",
    llm: "Doesn't know your fields, metrics, or terminology. You prompt from scratch every time.",
    xura: "Builds a knowledge graph of your business. Learns your team's language and patterns.",
  },
  {
    axis: "Output",
    llm: "Text responses and static tables. You copy results into slides or sheets.",
    xura: "Live dashboards, shareable decks, and a ranked action queue, ready to run.",
  },
  {
    axis: "Actions",
    llm: "Tells you what to do. You do it manually.",
    xura: "Queues actions across your tools. One click to execute.",
  },
  {
    axis: "Memory",
    llm: "Context window resets. Insights don't compound across sessions.",
    xura: "Context graph remembers how your team works. Every answer improves the next.",
  },
  {
    axis: "Security",
    llm: "Data leaves your org. May be used for training. No RBAC.",
    xura: "Queries run at source. Zero raw data stored. SSO, RBAC, and audit logs built in.",
  },
];

export const XuraVs = () => (
  <section
    id="why-xura"
    className="relative isolate overflow-hidden bg-[#0b0f1e] py-20 text-white md:py-28"
  >
    {/* subtle dot grid backdrop */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #a4adc4 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />

    <div className="shell relative">
      <div className="mx-auto max-w-[60ch] text-center">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="meta text-accent"
        >
          Why Xura
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mx-auto mt-3 max-w-[24ch] text-balance text-white"
        >
          Generic LLMs give you answers.{" "}
          <span className="font-semibold">Xura runs the work.</span>
        </Inview>
        <Inview
          tag="p"
          mode="once"
          delayIn={140}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mx-auto mt-5 max-w-[54ch] text-sm leading-relaxed text-white/60"
        >
          General-purpose AI can summarise and draft. Xura connects to your
          live data, reasons across it, and executes the next step.
        </Inview>
      </div>

      <Inview
        mode="once"
        delayIn={200}
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 170, friction: 28 }}
        className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
      >
        {/* Header row */}
        <div className="grid grid-cols-1 gap-px border-b border-white/10 bg-white/5 md:grid-cols-[1fr_1.4fr_1.4fr]">
          <div className="hidden md:block" />
          <div className="px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/45">
            ChatGPT&nbsp;/&nbsp;Claude
          </div>
          <div className="px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Xura AI
          </div>
        </div>

        {/* Rows */}
        <ul>
          {ROWS.map((r, i) => (
            <li
              key={r.axis}
              className={
                "grid grid-cols-1 gap-px md:grid-cols-[1fr_1.4fr_1.4fr] " +
                (i > 0 ? "border-t border-white/10" : "")
              }
            >
              <div className="px-5 pt-4 text-sm font-semibold text-white/90 md:py-5">
                {r.axis}
              </div>
              <div className="px-5 pb-3 pt-1 text-[0.8125rem] leading-relaxed text-white/60 md:py-5 md:pt-5">
                <span className="mr-1 inline-block text-[0.625rem] uppercase tracking-wide text-white/35 md:hidden">
                  LLM
                </span>
                {r.llm}
              </div>
              <div className="border-t border-white/10 px-5 py-4 text-[0.8125rem] leading-relaxed text-white md:border-l md:border-t-0 md:bg-white/[0.02] md:py-5">
                <span className="mr-1 inline-block text-[0.625rem] uppercase tracking-wide text-accent md:hidden">
                  Xura AI
                </span>
                {r.xura}
              </div>
            </li>
          ))}
        </ul>
      </Inview>
    </div>
  </section>
);
