import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ArcField } from "@/components/graphics/arc-field";
import { AvatarStack } from "@/components/graphics/avatar";

/**
 * Recommendations — "recommendations, not just reports". A dark product stage
 * plays a three-beat story left to right: a monitor catches a metric
 * crossing its threshold → a signal names the risk with its sources → a
 * recommendation arrives with evidence and a one-tap approval. Beats resolve
 * in sequence (staggered `Inview`) and drift on scroll (`SpringTrigger`).
 * All UI is coded — no screenshots.
 */
const POINTS: { title: string; body: string }[] = [
  {
    title: "Monitors that never sleep",
    body: "Set a threshold on any metric, or let Xura suggest them from your goals. It checks continuously and alerts the moment something moves.",
  },
  {
    title: "Signals from inside and out",
    body: "Internal data joined with market, competitor and customer signals, so you see why a number moved, not just that it did.",
  },
  {
    title: "Recommendations with receipts",
    body: "Every recommendation shows the sources and numbers behind it, and comes with the next action ready to approve.",
  },
];

const BEAT_DELAY = 420;

const Tag = ({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "risk" | "good";
}) => {
  const tones = {
    neutral: "bg-band-mist text-muted",
    risk: "bg-accent/30 text-foreground",
    good: "bg-duo-wash text-duo",
  } as const;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[0.625rem] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const BeatLabel = ({ step, label }: { step: string; label: string }) => (
  <p className="mb-3 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/55">
    <span className="flex size-5 items-center justify-center rounded-full border border-white/25 text-white/80">
      {step}
    </span>
    {label}
  </p>
);

const MonitorCard = () => (
  <div className="rounded-2xl bg-background p-4 shadow-product">
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-xs text-muted">Project Atlas · velocity</p>
        <p className="mt-1 text-xl font-semibold tracking-tight">−18%</p>
      </div>
      <Tag tone="risk">Below threshold</Tag>
    </div>
    <svg viewBox="0 0 200 64" className="mt-3 h-16 w-full" fill="none" aria-hidden>
      <line
        x1="0"
        y1="30"
        x2="200"
        y2="30"
        className="stroke-line"
        strokeDasharray="3 4"
      />
      <path
        d="M0 14 L25 16 L50 12 L75 18 L100 17 L125 26 L150 34 L175 44 L200 52"
        className="stroke-foreground"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="52" r="3.5" className="fill-accent-strong" />
    </svg>
    <p className="mt-2 text-[0.6875rem] text-muted">Checked 4 min ago · threshold −10%</p>
  </div>
);

const SignalCard = () => (
  <div className="rounded-2xl bg-background p-4 shadow-product">
    <p className="text-xs text-muted">Signal</p>
    <p className="mt-1 text-sm font-semibold leading-snug">
      Atlas is 3 weeks behind. Helix has spare capacity.
    </p>
    <ul className="mt-3 space-y-1.5 text-[0.6875rem] text-muted">
      <li className="flex justify-between gap-2">
        <span>Open tickets, Atlas</span>
        <span className="font-medium text-foreground">+42%</span>
      </li>
      <li className="flex justify-between gap-2">
        <span>Helix utilisation</span>
        <span className="font-medium text-foreground">61%</span>
      </li>
      <li className="flex justify-between gap-2">
        <span>Launch date</span>
        <span className="font-medium text-foreground">Q3, fixed</span>
      </li>
    </ul>
    <div className="mt-3 flex flex-wrap gap-1.5">
      <Tag>Jira</Tag>
      <Tag>HRIS</Tag>
      <Tag>Roadmap</Tag>
      <Tag>+1 source</Tag>
    </div>
  </div>
);

const RecommendationCard = () => (
  <div className="rounded-2xl bg-background p-5 shadow-product ring-2 ring-accent">
    <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-duo">
      Recommended decision
    </p>
    <p className="mt-2 text-base font-semibold leading-snug">
      Move 2 engineers to Project Atlas to protect the Q3 launch
    </p>
    <p className="mt-2 text-xs text-muted">
      Recovers ~2.5 weeks with no hiring. Helix stays on track at 85% capacity.
    </p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      <Tag tone="risk">Launch risk: high</Tag>
      <Tag tone="good">Confidence 0.86</Tag>
      <Tag>4 sources</Tag>
    </div>
    <p className="mt-3 flex items-center gap-2 text-[0.6875rem] text-muted">
      <AvatarStack people={["wei", "sarah"]} className="size-5" />
      Notifies Wei (Atlas) and Sarah (Helix)
    </p>
    <div className="mt-4 flex gap-2" aria-hidden>
      <span className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background">
        Approve & notify leads
      </span>
      <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold">
        Review
      </span>
    </div>
  </div>
);

const Connector = () => (
  <svg
    viewBox="0 0 48 12"
    className="mx-auto hidden h-3 w-12 shrink-0 self-center text-white/35 lg:block"
    fill="none"
    aria-hidden
  >
    <path d="M0 6h42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
    <path d="M38 2l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BEATS = [
  { step: "1", label: "Monitor", Card: MonitorCard, drift: 10 },
  { step: "2", label: "Signal", Card: SignalCard, drift: 25 },
  { step: "3", label: "Recommendation", Card: RecommendationCard, drift: 40 },
];

export const Recommendations = () => (
  <section id="recommendations" className="bg-background pb-20 pt-4 md:pb-28 md:pt-8">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="meta"
        >
          Monitors · Signals · Recommendations
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mx-auto mt-3 max-w-[20ch] text-balance"
        >
          Recommendations,{" "}
          <span className="font-semibold">not just reports</span>
        </Inview>
        <Inview
          tag="p"
          mode="once"
          delayIn={140}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mx-auto mt-5 max-w-[58ch] text-sm leading-relaxed text-muted"
        >
          Xura watches your business so you don&apos;t have to ask. When a
          number slips, it finds out why and tells you what to do about it,
          before the weekly meeting.
        </Inview>
      </div>

      {/* Stage */}
      <Inview
        mode="once"
        delayIn={160}
        from={{ opacity: 0, y: 32 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 160, friction: 30 }}
        className="grain relative isolate mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl bg-brand-ink px-5 py-10 sm:px-10 md:py-14"
      >
        <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

        <ol className="grid gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1.15fr] lg:items-center lg:gap-3">
          {BEATS.map(({ step, label, Card, drift }, i) => (
            <li key={step} className="contents">
              {i > 0 ? <Connector /> : null}
              <Inview
                mode="once"
                delayIn={300 + i * BEAT_DELAY}
                from={{ opacity: 0, y: 24, scale: 0.97 }}
                to={{ opacity: 1, y: 0, scale: 1 }}
                config={{ tension: 200, friction: 24 }}
              >
                <SpringTrigger from={{ y: drift }} to={{ y: -drift }}>
                  <BeatLabel step={step} label={label} />
                  <Card />
                </SpringTrigger>
              </Inview>
            </li>
          ))}
        </ol>
      </Inview>

      <ul className="mx-auto mt-10 grid max-w-6xl gap-8 md:grid-cols-3">
        {POINTS.map((p, i) => (
          <Inview
            key={p.title}
            tag="li"
            mode="once"
            delayIn={i * 80}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="border-t border-line pt-4"
          >
            <h3 className="text-sm font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.body}</p>
          </Inview>
        ))}
      </ul>
    </div>
  </section>
);
