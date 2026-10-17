import { Inview } from "@/components/animation/springs/in-view";
import { VideoTour } from "@/components/common/video-tour";
import { AiOrb } from "@/components/graphics/ai-orb";
import { ArcField } from "@/components/graphics/arc-field";

/**
 * AI employees — "hire a ready-made role, or build your own". A roster of the
 * four built-in employees (each an AiOrb tinted with its function colour),
 * then a dark stage where Nora's run resolves step by step and stops at an
 * approval gate. Trust detail (audit, scoped access) stays in EnterpriseReady.
 */
type Employee = { name: string; role: string; body: string; accent: string };

const EMPLOYEES: Employee[] = [
  {
    name: "Nora",
    role: "Chief of Staff",
    body: "Morning briefs, meeting pre-reads and follow-ups on what is slipping.",
    accent: "var(--employee-chief-of-staff)",
  },
  {
    name: "Ezra",
    role: "Marketing Associate",
    body: "Competitor watch, campaign drafts and content in your brand.",
    accent: "var(--employee-marketing)",
  },
  {
    name: "Kira",
    role: "Recruiting Coordinator",
    body: "Hiring briefs, feedback chasing and pipeline reports.",
    accent: "var(--employee-recruiting)",
  },
  {
    name: "Meera",
    role: "QA Investigation",
    body: "Investigates quality issues and drafts findings. QA signs off.",
    accent: "var(--employee-quality)",
  },
];

type RunStep = { label: string; detail: string };

const RUN_STEPS: RunStep[] = [
  { label: "Read the West revenue report", detail: "HubSpot · finance.xlsx" },
  { label: "Checked 12 months of lost deals", detail: "7 lost, all after June" },
  { label: "Matched them to market news", detail: "Rival cut prices 12% in July" },
  { label: "Drafted a recovery plan", detail: "Renewal offers for 2 accounts" },
];

const Check = () => (
  <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
    <path
      d="M6 12.5l4 4 8-8"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RunCard = () => (
  <div className="w-full max-w-sm rounded-2xl bg-background p-5 shadow-product">
    <div className="flex items-center gap-3">
      <AiOrb size={36} accent="var(--employee-chief-of-staff)" spin={false} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Why the West is losing deals</p>
        <p className="mt-0.5 text-xs text-muted">Nora · Chief of Staff</p>
      </div>
    </div>

    <ol className="mt-5 space-y-3">
      {RUN_STEPS.map((step, i) => (
        <Inview
          key={step.label}
          tag="li"
          mode="once"
          delayIn={350 + i * 380}
          from={{ opacity: 0, x: -10 }}
          to={{ opacity: 1, x: 0 }}
          config={{ tension: 200, friction: 24 }}
          className="flex items-start gap-3"
        >
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-ink text-white">
            <Check />
          </span>
          <span>
            <span className="block text-[0.8125rem] font-medium">{step.label}</span>
            <span className="block text-xs text-muted">{step.detail}</span>
          </span>
        </Inview>
      ))}
    </ol>

    <Inview
      mode="once"
      delayIn={350 + RUN_STEPS.length * 380}
      from={{ opacity: 0, y: 10, scale: 0.97 }}
      to={{ opacity: 1, y: 0, scale: 1 }}
      config={{ tension: 220, friction: 20 }}
      className="mt-5 rounded-xl border border-line bg-band-mist/60 p-3"
    >
      <p className="flex items-center gap-2 text-xs font-semibold">
        <span className="size-1.5 rounded-full bg-accent-strong" />
        Waiting for your approval
      </p>
      <p className="mt-1 text-xs text-muted">Send renewal offers to 2 accounts</p>
      <div className="mt-3 flex gap-2" aria-hidden>
        <span className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background">
          Approve and send
        </span>
        <span className="rounded-lg border border-line bg-background px-3 py-1.5 text-xs font-semibold">
          Edit first
        </span>
      </div>
    </Inview>
  </div>
);

export const AiEmployees = () => (
  <section
    id="ai-employees"
    aria-labelledby="ai-employees-heading"
    className="bg-band-sand-soft py-20 md:py-28"
  >
    <div className="shell">
      <Inview
        tag="p"
        mode="once"
        from={{ opacity: 0, y: 14 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="meta"
      >
        AI employees
      </Inview>
      <Inview
        tag="h2"
        mode="once"
        delayIn={70}
        from={{ opacity: 0, y: 18 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="display-serif mt-3 max-w-[22ch] text-balance"
      >
        <span id="ai-employees-heading">
          Hire a ready-made role,{" "}
          <span className="font-semibold italic">or build your own.</span>
        </span>
      </Inview>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {EMPLOYEES.map((employee, i) => (
          <Inview
            key={employee.name}
            tag="li"
            mode="once"
            delayIn={140 + i * 90}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
          >
            <AiOrb size={72} accent={employee.accent} expressive spin={false} />
            <h3 className="mt-6 font-serif text-3xl leading-display">{employee.name}</h3>
            <p
              className="mt-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: employee.accent }}
            >
              {employee.role}
            </p>
            <p className="mt-3 max-w-[30ch] text-sm text-muted">{employee.body}</p>
          </Inview>
        ))}
      </ul>

      {/* Product tour — "Meet your AI team" (98 s). Hero links here. */}
      <Inview
        id="tour"
        mode="once"
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 170, friction: 28 }}
        className="mx-auto mt-16 max-w-4xl scroll-mt-24"
      >
        <VideoTour
          videoId="8tkNY0mJBss"
          title="Xura AI: Meet your AI team"
          description="A 98-second tour of Xura's AI employees: they connect to your systems, answer from your own data, explain the reason behind the number and draft the next step for your approval."
          uploadDate="2026-10-14T12:33:05-07:00"
          duration="PT1M38S"
        />
      </Inview>

      {/* Stage — one employee's run, ending at the approval gate. */}
      <Inview
        mode="once"
        delayIn={120}
        from={{ opacity: 0, y: 28 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 160, friction: 30 }}
        className="grain relative isolate mt-16 overflow-hidden rounded-3xl bg-brand-ink p-6 sm:p-10"
      >
        <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[34ch] text-white md:order-2 md:self-center">
            <p className="font-serif text-2xl leading-display md:text-3xl">
              It does the work,{" "}
              <span className="font-semibold italic">you approve first.</span>
            </p>
            <p className="mt-3 text-sm text-white/70">
              Nora traced the West&apos;s lost deals to a rival&apos;s price cut and
              drafted a recovery plan. Nothing goes out until you say yes.
            </p>
          </div>
          <div className="md:order-1">
            <RunCard />
          </div>
        </div>
      </Inview>
    </div>
  </section>
);
