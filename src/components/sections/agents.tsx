import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ShotCrop } from "@/components/common/shot-crop";
import { ArcField } from "@/components/graphics/arc-field";

/**
 * Agents — "agents that act, with your approval". Benefit list left; right is
 * a stage: the real Flows grid tilted back in perspective, with a coded run
 * card in front whose steps resolve one by one and stop at an approval gate.
 * Trust detail (audit, RBAC) stays in EnterpriseReady.
 */
const POINTS: { title: string; body: string }[] = [
  {
    title: "Flows suggested from your goals",
    body: "Xura proposes workflows from the priorities you set at onboarding: resource rebalancing, compliance reports, change management.",
  },
  {
    title: "Run on demand or on a schedule",
    body: "Trigger a flow from a chat, a monitor alert, or a timetable. Every run is logged with its steps and inputs.",
  },
  {
    title: "Approve, then it runs",
    body: "Agents draft the action across your tools and wait for your approval. Promote a flow to run on its own once you trust it.",
  },
  {
    title: "Build your own in plain language",
    body: "Describe the outcome; Xura assembles the steps. Edit any step, add a gate, and share it with your team.",
  },
];

type RunStep = { label: string; detail: string };

const RUN_STEPS: RunStep[] = [
  { label: "Pulled utilisation", detail: "Jira · HRIS · 4 sources" },
  { label: "Spotted the gap", detail: "Atlas 3 weeks behind, Helix has spare capacity" },
  { label: "Drafted the move", detail: "Reassign 2 engineers, notify both leads" },
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
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold">Cross-BU resource rebalancing</p>
        <p className="mt-0.5 text-xs text-muted">Weekly · Mon 09:00</p>
      </div>
      <span className="rounded-full bg-band-mist px-2 py-0.5 font-mono text-[0.625rem] text-muted">
        run #14
      </span>
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
      <div className="mt-3 flex gap-2" aria-hidden>
        <span className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background">
          Approve
        </span>
        <span className="rounded-lg border border-line bg-background px-3 py-1.5 text-xs font-semibold">
          Review
        </span>
      </div>
    </Inview>
  </div>
);

export const Agents = () => (
  <section id="agents" className="bg-band-sand-soft py-20 md:py-28">
    <div className="shell">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Inview
            tag="p"
            mode="once"
            from={{ opacity: 0, y: 14 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="meta"
          >
            Agents & flows
          </Inview>
          <Inview
            tag="h2"
            mode="once"
            delayIn={70}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="display-serif mt-3 max-w-[18ch] text-balance"
          >
            Agents that act,{" "}
            <span className="font-semibold">with your approval</span>
          </Inview>

          <ul className="mt-8">
            {POINTS.map((point, i) => (
              <Inview
                key={point.title}
                tag="li"
                mode="once"
                delayIn={140 + i * 80}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="border-t border-line py-4 first:border-t-0 first:pt-0"
              >
                <h3 className="text-sm font-semibold">{point.title}</h3>
                <p className="mt-1.5 max-w-[48ch] text-sm text-muted">
                  {point.body}
                </p>
              </Inview>
            ))}
          </ul>
        </div>

        {/* Stage */}
        <Inview
          mode="once"
          delayIn={120}
          from={{ opacity: 0, y: 28 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 160, friction: 30 }}
          className="grain relative isolate overflow-hidden rounded-3xl bg-brand-ink p-6 sm:p-10"
        >
          <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

          <div
            className="pointer-events-none absolute -right-[12%] top-[8%] w-[95%] opacity-55"
            style={{
              transform: "perspective(70rem) rotateY(-18deg) rotateX(8deg)",
            }}
            aria-hidden
          >
            <SpringTrigger from={{ y: 30 }} to={{ y: -30 }}>
              <ShotCrop
                src="/assets/product/workflows.png"
                alt=""
                crop={{ x: 0.06, y: 0.55, w: 0.89, h: 0.36 }}
                className="rounded-xl ring-1 ring-white/20"
              />
            </SpringTrigger>
          </div>

          <div className="relative flex min-h-[26rem] items-end sm:min-h-[30rem]">
            <RunCard />
          </div>
        </Inview>
      </div>
    </div>
  </section>
);
