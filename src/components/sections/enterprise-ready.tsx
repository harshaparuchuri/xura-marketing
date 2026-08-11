import { Inview } from "@/components/animation/springs/in-view";

/**
 * EnterpriseReady — dark trust band.
 *
 * Left column: eyebrow → mixed-weight heading → supporting copy → cred chips.
 * Right column: 9 assurance items, each with a check glyph, title, and body.
 * Covers privacy, setup, governance, permissions, integrations, and auditability
 * — the questions security teams ask on procurement calls.
 */

type Item = { title: string; body: string };

// Trust surface only. Feature parity vs generic LLMs lives in [[XuraVs]];
// integration breadth lives in [[Features]]. Do NOT restate them here.
const ITEMS: Item[] = [
  {
    title: "Data privacy, at the source",
    body: "Queries execute inside your VPC / warehouse. Prompts and results are encrypted in transit and at rest, isolated per tenant.",
  },
  {
    title: "Zero raw data stored",
    body: "Xura queries your databases directly. Only graph structures and learned patterns persist; no tables, no rows, no shadow copies. Your data never trains a model.",
  },
  {
    title: "RBAC, honoured everywhere",
    body: "Row-level access carries through to every answer, every dashboard, and every action, mirroring the roles you already defined in Snowflake / Salesforce.",
  },
  {
    title: "Human-in-the-loop by default",
    body: "Actions wait for approval until you trust them to run on their own.",
  },
  {
    title: "Explainable end to end",
    body: "Every workflow shows its steps and every chart shows its query. Audit logs record every prompt, tool call, and side-effect.",
  },
  {
    title: "Revocable at any time",
    body: "Disconnect a source and its graph nodes disappear. No residual data, no cleanup needed.",
  },
];

const CHIPS = [
  "SSO / SAML",
  "RBAC",
  "SOC 2 Type II",
  "GDPR-ready",
  "VPC deploy",
  "Data residency",
  "Audit logs",
];

export const EnterpriseReady = () => (
  <section
    id="enterprise-ready"
    className="relative isolate overflow-hidden bg-[#0a0d1a] py-20 text-white md:py-28"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #a4adc4 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />

    <div className="shell relative">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left column, pitch + chips */}
        <div className="lg:pt-6">
          <Inview
            tag="p"
            mode="once"
            from={{ opacity: 0, y: 12 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="meta text-accent"
          >
            Enterprise-ready
          </Inview>
          <Inview
            tag="h2"
            mode="once"
            delayIn={70}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="display-sans mt-3 max-w-[18ch] text-balance text-white"
          >
            Autonomy you can trust with the work.
          </Inview>
          <Inview
            tag="p"
            mode="once"
            delayIn={140}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="mt-5 max-w-[46ch] text-sm leading-relaxed text-white/60"
          >
            Xura runs where your data lives, respects every permission, and
            shows its work. Nothing executes without the guardrails you set.
          </Inview>

          <Inview
            mode="once"
            delayIn={200}
            from={{ opacity: 0, y: 14 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="mt-7 flex flex-wrap gap-1.5"
          >
            {CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.6875rem] text-white/70"
              >
                {c}
              </span>
            ))}
          </Inview>
        </div>

        {/* Right column, assurance list */}
        <Inview
          mode="once"
          delayIn={200}
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 170, friction: 28 }}
          className="divide-y divide-white/10"
        >
          {ITEMS.map((it) => (
            <article
              key={it.title}
              className="flex items-start gap-3 py-4 first:pt-0"
            >
              <span
                aria-hidden
                className="mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent"
              >
                <svg viewBox="0 0 24 24" className="size-3" fill="none">
                  <path
                    d="M6 12.5l4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  {it.title}
                </h3>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/60">
                  {it.body}
                </p>
              </div>
            </article>
          ))}
        </Inview>
      </div>
    </div>
  </section>
);
