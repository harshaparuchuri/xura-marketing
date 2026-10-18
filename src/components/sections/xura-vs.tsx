import { Inview } from "@/components/animation/springs/in-view";

/**
 * XuraVs — dark comparison band.
 *
 * Positions Xura against general AI chat assistants with a
 * feature-by-feature grid. Dark surface to break the light-band rhythm of
 * WhatsApp/Values above; two-column table on md+, stacked pairs on mobile.
 */

type Row = {
  axis: string;
  llm: string;
  xura: string;
};

// Every Xura claim here is checked against the app code (2026-10-18): native
// connectors in server/connectors + integrations/providers, MCP client,
// governance glossary/classifier, monitors + routines, approvalGates,
// agentLearning, document ACLs and db/audit. Don't add SSO, "zero data
// stored" or connector counts until they're true.
const ROWS: Row[] = [
  {
    axis: "Data access",
    llm: "Connectors to common apps, but you wire them up and pull data in each conversation.",
    xura: "Native connectors to HubSpot, Jira, Notion, Asana, Linear, Gmail, Slack and more, plus any MCP tool or a file upload.",
  },
  {
    axis: "Business context",
    llm: "Knows what you put in the chat or project. Your metric definitions aren't built in.",
    xura: "A glossary and semantic layer for your metrics and terms, so 'at-risk account' means the same thing in every answer.",
  },
  {
    axis: "Proactivity",
    llm: "Mostly waits for you to ask.",
    xura: "Monitors and scheduled routines watch your numbers and flag what changed, with a recommended next step.",
  },
  {
    axis: "Output",
    llm: "Text, tables and files you then polish into slides or sheets.",
    xura: "Live dashboards, slide decks, cited research, briefs and infographics, in your brand.",
  },
  {
    axis: "Actions",
    llm: "Can act through some connectors, one request at a time.",
    xura: "AI employees draft the action across your tools and stop at an approval gate before anything is sent or changed.",
  },
  {
    axis: "Memory",
    llm: "Remembers your preferences, not how your team's work gets done.",
    xura: "Each AI employee keeps a record of its runs, errors and your feedback, and its playbook is refined from it.",
  },
  {
    axis: "Control",
    llm: "Controls are set per account, not per task or per agent.",
    xura: "Each AI employee only gets the tools you grant, documents keep their access lists, sensitive columns can be classified, and every run is audit-logged.",
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
        {/* Header row is desktop-only; on phones each cell carries its own
            "AI chat" / "Xura AI" label instead. */}
        <div className="hidden gap-px border-b border-white/10 bg-white/5 md:grid md:grid-cols-[1fr_1.4fr_1.4fr]">
          <div className="hidden md:block" />
          <div className="px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/45">
            General AI chat
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
                  AI chat
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
