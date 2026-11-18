/**
 * Xura Pulse — coded replicas of the product's run and report screens
 * (product: Xura-main src/poc-audience). Decorative (`aria-hidden`); the copy
 * around them carries the facts. Seat colours come from a fixed seeded
 * sequence so server and client render the same crowd.
 *
 * - `PulseCrowd`  a grid of seats coloured keen / unsure / put off / still watching
 * - `PulseLivePreview`  a live run: brief, the stage, a 100-seat crowd, the Live panel
 * - `PulseReportPreview`  the report: A/B result, attention by moment, top questions
 * - `PulseInterviewPreview`  a one-to-one follow-up with one persona
 * - `PulseSurveyPreview`  survey results: rating spread, choice split, themed open answers
 */

type Mood = "yes" | "maybe" | "no" | "wait";

const MOOD_BG: Record<Mood, string> = {
  yes: "bg-pulse-yes",
  maybe: "bg-pulse-maybe",
  no: "bg-pulse-no",
  wait: "bg-background/15",
};

/**
 * Deterministic moods: ~48% keen, 22% unsure, 14% put off, the rest still
 * watching. `bias` shifts the keen share (e.g. 0.2 for a winning version).
 */
const moods = (n: number, seed = 7, bias = 0): Mood[] => {
  let x = seed;
  const yes = 0.48 + bias;
  return Array.from({ length: n }, () => {
    x = (x * 9301 + 49297) % 233280;
    const r = x / 233280;
    return r < yes ? "yes" : r < yes + 0.22 ? "maybe" : r < yes + 0.36 ? "no" : "wait";
  });
};

export const PulseCrowd = ({
  count = 100,
  cols = 20,
  seed = 7,
  bias = 0,
  className = "",
}: {
  count?: number;
  cols?: number;
  seed?: number;
  bias?: number;
  className?: string;
}) => (
  <div aria-hidden className={`grid gap-x-1.5 gap-y-2 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
    {moods(count, seed, bias).map((m, i) => (
      <span key={i} className="flex flex-col items-center">
        <span className={`aspect-square w-[55%] rounded-full ${MOOD_BG[m]}`} />
        <span className={`-mt-px aspect-[2/1] w-full rounded-t-full ${MOOD_BG[m]} opacity-60`} />
      </span>
    ))}
  </div>
);

const Legend = () => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] text-background/60">
    {(
      [
        ["yes", "Would take it forward"],
        ["maybe", "Maybe"],
        ["no", "Not for them"],
        ["wait", "Still watching"],
      ] as const
    ).map(([m, l]) => (
      <span key={m} className="flex items-center gap-1.5">
        <span className={`size-2 rounded-full ${MOOD_BG[m]}`} />
        {l}
      </span>
    ))}
  </div>
);

const QUOTES = [
  { who: "Ananya, 34", role: "Head of procurement", text: "Clear value in the first slide. I'd want to see the pricing before a second call.", mood: "yes" },
  { who: "Marcus, 47", role: "CFO", text: "The ROI claim needs a source. Without it, this reads like every other pitch.", mood: "maybe" },
  { who: "Leila, 29", role: "Operations lead", text: "I'd share this with my team. The demo slide does the work.", mood: "yes" },
  { who: "Tom, 52", role: "Managing director", text: "Too long. I checked out around slide seven.", mood: "no" },
] as const;

const TALLY = [
  { mood: "yes", label: "Would take it forward", n: 49 },
  { mood: "maybe", label: "Maybe", n: 22 },
  { mood: "no", label: "Not for them", n: 13 },
] as const;

export const PulseLivePreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-foreground text-left text-background shadow-product ${className}`}>
    <div className="flex items-center gap-3 border-b border-background/10 px-5 py-3 text-xs">
      <span className="font-medium">Sales deck · Version B</span>
      <span className="ml-auto flex gap-1.5">
        {["Goal", "Audience", "Run"].map((t, i) => (
          <span key={t} className={`rounded-full px-3 py-1 ${i === 2 ? "bg-background text-foreground" : "border border-background/20 text-background/70"}`}>
            {t}
          </span>
        ))}
      </span>
    </div>
    <div className="grid md:grid-cols-[1fr_17rem]">
      <div className="p-5">
        <p className="text-[0.6875rem] text-background/50">100 people from Decision makers, mid-size companies · Live</p>
        {/* The slide on stage: a 16:9 deck slide the quotes react to (the ROI claim, the demo). */}
        <div className="mx-auto mt-4 flex aspect-[16/9] max-w-[24rem] flex-col rounded-lg bg-background p-4 text-foreground shadow-product">
          <div className="flex items-center justify-between text-[0.5625rem] text-muted">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <span className="size-3 rounded-[3px] bg-foreground" /> Your brand
            </span>
            <span>Why teams switch · 4 / 12</span>
          </div>
          <div className="mt-3 flex flex-1 items-end gap-3">
            {(
              [
                ["Before", "5 days", "w-full", "bg-line"],
                ["With us", "1 day", "w-1/5", "bg-pulse-yes"],
              ] as const
            ).map(([k, v, w, bg]) => (
              <span key={k} className="flex-1">
                <span className="flex justify-between text-[0.5625rem] text-muted">
                  <span>{k}</span>
                  <span className="font-semibold text-foreground">{v}</span>
                </span>
                <span className="mt-1 block h-2 rounded-full bg-line-soft">
                  <span className={`block h-full rounded-full ${w} ${bg}`} />
                </span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-base font-semibold leading-tight tracking-tight">Close the books in 1 day, not 5</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                ["80%", "less manual work"],
                ["3.2×", "ROI in year one"],
                ["2 wks", "to go live"],
              ] as const
            ).map(([v, l]) => (
              <span key={l} className="rounded-md bg-line-soft px-2 py-1.5">
                <span className="block text-sm font-semibold tracking-tight">{v}</span>
                <span className="block text-[0.5625rem] text-muted">{l}</span>
              </span>
            ))}
          </div>
        </div>
        <PulseCrowd className="mx-auto mt-6 max-w-[30rem]" />
        <div className="mt-4">
          <Legend />
        </div>
      </div>
      <div className="border-t border-background/10 p-5 md:border-l md:border-t-0">
        <p className="text-xs font-medium">Live</p>
        <p className="mt-2 text-4xl font-light tracking-tight">
          84 <span className="text-xs text-background/60">of 100 have reacted</span>
        </p>
        <span className="mt-2 block h-1 overflow-hidden rounded-full bg-background/15">
          <span className="block h-full w-[84%] rounded-full bg-background" />
        </span>
        <ul className="mt-4 space-y-1.5 text-xs">
          {TALLY.map((t) => (
            <li key={t.label} className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${MOOD_BG[t.mood]}`} />
              <span className="text-background/80">{t.label}</span>
              <span className="ml-auto tabular-nums">{t.n}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-background/50">Just said</p>
        <ul className="mt-2 space-y-3">
          {QUOTES.slice(0, 3).map((q) => (
            <li key={q.who} className="flex gap-2.5">
              <span className={`mt-1 size-2 shrink-0 rounded-full ${MOOD_BG[q.mood]}`} />
              <span className="text-xs leading-relaxed">
                <span className="font-medium">{q.who}</span> <span className="text-background/50">· {q.role}</span>
                <span className="mt-0.5 block text-background/75">&ldquo;{q.text}&rdquo;</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/** Attention by moment (1–10) for version A and B, 12 moments. */
const ATTN_A = [7.8, 7.4, 6.9, 6.1, 5.8, 5.2, 4.6, 4.9, 5.1, 4.4, 4.8, 5.0] as const;
const ATTN_B = [8.2, 8.0, 7.6, 7.9, 7.4, 7.1, 6.8, 7.2, 7.0, 6.6, 7.3, 7.8] as const;

const line = (pts: readonly number[]) =>
  pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 300},${100 - v * 10}`).join(" ");

const QUESTIONS = [
  { q: "What does it cost for a team of our size?", n: 64 },
  { q: "Who else like us is using it?", n: 41 },
  { q: "How long before we see results?", n: 33 },
] as const;

export const PulseReportPreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-foreground p-5 text-left text-background shadow-product ${className}`}>
    <div className="grid grid-cols-2 gap-3">
      {(
        [
          ["A", "Version A", "43%", "would take it forward"],
          ["B", "Version B", "61%", "would take it forward"],
        ] as const
      ).map(([k, name, pct, note]) => (
        <div key={k} className={`rounded-xl p-4 ${k === "B" ? "bg-background text-foreground" : "bg-background/10"}`}>
          <p className="text-[0.6875rem] font-medium opacity-70">
            {name}
            {k === "B" ? " · Winner" : ""}
          </p>
          <p className="mt-1 text-3xl font-light tracking-tight">{pct}</p>
          <p className="text-[0.6875rem] opacity-70">{note}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 rounded-xl bg-background/5 p-4">
      <p className="text-xs font-medium">Attention, moment by moment</p>
      <svg viewBox="0 0 300 100" className="mt-3 h-28 w-full overflow-visible" preserveAspectRatio="none">
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} className="stroke-background/10" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={line(ATTN_A)} className="fill-none stroke-background/40" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d={line(ATTN_B)} className="fill-none stroke-pulse-yes" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <line x1="163.6" x2="163.6" y1="0" y2="100" className="stroke-pulse-no" strokeDasharray="3 3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[0.625rem] text-background/50">
        <span>Start</span>
        <span className="text-pulse-no">Version A loses people here</span>
        <span>End</span>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-background/50">What they&apos;d ask you</p>
      <ul className="mt-2 space-y-1.5">
        {QUESTIONS.map((q) => (
          <li key={q.q} className="flex items-center gap-3 rounded-lg bg-background/5 px-3 py-2 text-xs">
            <span>{q.q}</span>
            <span className="ml-auto shrink-0 text-background/50">{q.n} people</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CHAT = [
  { me: true, text: "You said the ROI claim needs a source. What would convince you?" },
  { me: false, text: "A named customer in my industry, and the before-and-after numbers. A case study I can forward to my CEO." },
  { me: true, text: "Would a free pilot change your answer?" },
  { me: false, text: "Yes, if it's under a month and my team doesn't have to set it up." },
] as const;

/** One-to-one interview with a persona: profile, traits, and a short chat. */
export const PulseInterviewPreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-foreground p-5 text-left text-background shadow-product ${className}`}>
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-pulse-maybe text-sm font-semibold text-foreground">MR</span>
      <div>
        <p className="text-sm font-medium">Marcus, 47 · CFO</p>
        <p className="text-[0.6875rem] text-background/60">Mid-size company · Felt unsure</p>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {["45–54", "Finance", "Risk-averse", "Budget owner", "Reads the numbers first"].map((t) => (
        <span key={t} className="rounded-full border border-background/20 px-2.5 py-0.5 text-[0.625rem] text-background/70">
          {t}
        </span>
      ))}
    </div>
    <ul className="mt-4 space-y-2.5">
      {CHAT.map((m, i) => (
        <li key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${m.me ? "ml-auto rounded-br-md bg-background text-foreground" : "rounded-bl-md bg-background/10"}`}>
          {m.text}
        </li>
      ))}
    </ul>
    <div className="mt-4 flex items-center rounded-full bg-background/10 px-3.5 py-2 text-xs text-background/50">
      Ask Marcus a follow-up…
      <span className="ml-auto grid size-5 place-items-center rounded-full bg-background text-[0.625rem] text-foreground">↑</span>
    </div>
  </div>
);

/** Rating distribution (1–10) for one survey question, 200 people. */
const RATING = [2, 3, 5, 8, 14, 21, 34, 46, 38, 29] as const;
const CHOICE = [
  { label: "Price", n: 41 },
  { label: "Ease of setup", n: 27 },
  { label: "Integrations", n: 19 },
  { label: "Support", n: 13 },
] as const;

/** Survey results: a 1–10 rating distribution, a multiple-choice split and themed open answers. */
export const PulseSurveyPreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-foreground p-5 text-left text-background shadow-product ${className}`}>
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium">Customer survey · 3 questions</span>
      <span className="text-background/50">200 of 200 answered</span>
    </div>
    <div className="mt-4 rounded-xl bg-background/5 p-4">
      <p className="text-xs">
        <span className="text-background/50">Q1 </span>How likely are you to recommend us? <span className="text-background/50">· avg 7.4</span>
      </p>
      <div className="mt-3 flex h-20 items-end gap-1.5">
        {RATING.map((n, i) => (
          <span key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className={`w-full rounded-sm ${i >= 8 ? "bg-pulse-yes" : i >= 6 ? "bg-pulse-maybe" : "bg-pulse-no"}`} style={{ height: `${(n / 46) * 60}px` }} />
            <span className="text-[0.5625rem] text-background/50">{i + 1}</span>
          </span>
        ))}
      </div>
    </div>
    <div className="mt-3 rounded-xl bg-background/5 p-4">
      <p className="text-xs">
        <span className="text-background/50">Q2 </span>What matters most when you choose a tool?
      </p>
      <ul className="mt-3 space-y-1.5">
        {CHOICE.map((c) => (
          <li key={c.label} className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-2 text-[0.6875rem]">
            <span className="text-background/80">{c.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-background/10">
              <span className="block h-full rounded-full bg-background" style={{ width: `${(c.n / 41) * 100}%` }} />
            </span>
            <span className="text-right tabular-nums text-background/60">{c.n}%</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-3 rounded-xl bg-background/5 p-4">
      <p className="text-xs">
        <span className="text-background/50">Q3 </span>What would make you switch? <span className="text-background/50">· open answers, themed</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Lower price · 58", "Faster onboarding · 44", "Better reporting · 31", "A free trial · 22"].map((t) => (
          <span key={t} className="rounded-full border border-background/20 px-2.5 py-1 text-[0.625rem] text-background/80">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);
