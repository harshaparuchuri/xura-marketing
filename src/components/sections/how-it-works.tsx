import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ShotCrop } from "@/components/common/shot-crop";
import { ArcField } from "@/components/graphics/arc-field";
import {
  SlackMark,
  TeamsMark,
  WebMark,
  WhatsAppMark,
} from "@/components/graphics/channel-marks";

/**
 * HowItWorks — three-step setup story mirroring the product's onboarding,
 * resolved on a "stage": the product's forest-green arc + grain backdrop, a
 * tight crop of the real home (composer, quick asks, output shortcuts), and
 * two coded floating cards (sources connecting, workspace ready) that drift
 * with scroll.
 */
const STEPS: { title: string; body: string }[] = [
  {
    title: "Tell Xura about your business",
    body: "What you do, your role, and the goals that matter this quarter. Xura speaks your language from the first answer.",
  },
  {
    title: "Connect the tools you already use",
    body: "Warehouse, CRM, ERP, Drive, Gmail, Slack and Teams. Xura reads only what you allow and builds a live knowledge graph.",
  },
  {
    title: "Get a home built around your goals",
    body: "Dashboards, slides, research, infographics and briefs one prompt away, plus flows suggested from your priorities.",
  },
];

const SOURCE_MARKS = [WhatsAppMark, SlackMark, TeamsMark, WebMark];

const SourcesCard = () => (
  <div className="w-56 rounded-2xl bg-background p-4 text-foreground shadow-product">
    <p className="flex items-center gap-2 text-xs font-semibold">
      <span className="size-1.5 rounded-full bg-brand-ink" />
      Connecting sources
    </p>
    <div className="mt-3 grid grid-cols-5 gap-1.5">
      {SOURCE_MARKS.map((Mark, i) => (
        <span
          key={i}
          className="flex aspect-square items-center justify-center rounded-lg bg-band-mist"
        >
          <Mark className="size-4 text-foreground" />
        </span>
      ))}
      <span className="flex aspect-square items-center justify-center rounded-lg bg-band-mist text-[0.625rem] font-semibold text-muted">
        +40
      </span>
    </div>
    <p className="mt-3 text-[0.6875rem] text-muted">Understanding your business…</p>
  </div>
);

const ReadyCard = () => (
  <div className="w-60 rounded-2xl bg-background p-4 text-foreground shadow-product">
    <p className="flex items-center gap-2 text-xs font-semibold">
      <span className="flex size-5 items-center justify-center rounded-full bg-brand-ink text-white">
        <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
          <path
            d="M6 12.5l4 4 8-8"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      Your workspace is ready
    </p>
    <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
      {[
        ["3", "goals"],
        ["6", "sources"],
        ["5", "flows"],
      ].map(([value, label]) => (
        <div key={label} className="rounded-lg bg-band-mist py-2">
          <dt className="sr-only">{label}</dt>
          <dd className="text-sm font-semibold">{value}</dd>
          <dd className="text-[0.625rem] text-muted">{label}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export const HowItWorks = () => (
  <section id="how-it-works" className="bg-background py-20 md:py-24">
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
          How it works
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mx-auto mt-3 max-w-[22ch] text-balance"
        >
          From sign-up to your first answer{" "}
          <span className="font-semibold">in minutes</span>
        </Inview>
      </div>

      <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Inview
            key={step.title}
            tag="li"
            mode="once"
            delayIn={120 + i * 80}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="border-t border-line pt-5"
          >
            <span className="font-mono text-xs text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{step.body}</p>
          </Inview>
        ))}
      </ol>

      {/* Stage */}
      <Inview
        mode="once"
        delayIn={160}
        from={{ opacity: 0, y: 32 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 160, friction: 30 }}
        className="grain relative isolate mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl bg-brand-ink px-4 pb-0 pt-12 sm:px-10 md:pt-16"
      >
        <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

        <SpringTrigger
          from={{ y: 40 }}
          to={{ y: -20 }}
          className="relative mx-auto max-w-4xl"
        >
          <ShotCrop
            src="/assets/product/home.png"
            alt="Xura home: a prompt box to describe any chart, report or view, quick questions like project health and blocked tasks, and one-click shortcuts to build dashboards, slides, deep research, infographics and briefs"
            crop={{ x: 0.13, y: 0.23, w: 0.79, h: 0.48 }}
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="rounded-t-2xl ring-1 ring-white/15"
          />
        </SpringTrigger>

        <SpringTrigger
          from={{ y: 30 }}
          to={{ y: -50 }}
          className="absolute left-3 top-6 hidden md:left-8 md:top-10 md:block"
        >
          <SourcesCard />
        </SpringTrigger>
        <SpringTrigger
          from={{ y: 60 }}
          to={{ y: -30 }}
          className="absolute bottom-8 right-3 hidden md:right-8 md:block"
        >
          <ReadyCard />
        </SpringTrigger>
      </Inview>
    </div>
  </section>
);
