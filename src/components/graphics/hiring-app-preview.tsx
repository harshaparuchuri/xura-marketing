/**
 * HiringAppPreview — a coded replica of a Xura app (the "Hiring pipeline"
 * app built in chat), in the product's own colours (`app-*` tokens: brand
 * blue, green/red week-on-week change). Shows the full Overview page: top bar
 * with Ask Xura, left menu, numbers band, drop-off funnel, "Who is applying"
 * (candidates by role, applications per week) and the candidate list header.
 * Mirrors Xura-main docs/apps-ui-style-guide.md. Decorative illustration.
 */
const NUMBERS = [
  { label: "Active candidates", value: "11", change: "+22.2%", tone: "up", note: "vs 9 last week" },
  { label: "Offers out", value: "1", change: "−50%", tone: "down", note: "vs 2 last week" },
  { label: "Interviews in 7 days", value: "3", change: "No change", tone: "flat", note: "vs 3 last week" },
] as const;

const FUNNEL = [
  { stage: "Applied", n: 11, pct: 100, share: "" },
  { stage: "Screened", n: 7, pct: 64, share: "64%" },
  { stage: "Interviewed", n: 4, pct: 36, share: "57%" },
  { stage: "Offer", n: 2, pct: 18, share: "50%", flag: true },
  { stage: "Hired", n: 1, pct: 9, share: "50%" },
] as const;

const ROLES = [
  { role: "Engineer", pct: 58.3, n: 7, tone: "bg-app-brand" },
  { role: "Designer", pct: 16.7, n: 2, tone: "bg-app-brand-mid" },
  { role: "Sales", pct: 25, n: 3, tone: "bg-app-brand-soft" },
] as const;

/** Applications per week, last 12 weeks; the last bar is the current week. */
const WEEKS = [0, 0, 0, 0, 0, 1, 0, 1, 2, 3, 3, 2] as const;

const Bar = ({ pct, strong }: { pct: number; strong?: boolean }) => (
  <span className="h-2 overflow-hidden rounded-full bg-line-soft">
    <span className={`block h-full rounded-full ${strong ? "bg-app-brand" : "bg-app-brand-mid"}`} style={{ width: `${pct}%` }} />
  </span>
);

export const HiringAppPreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-line-soft text-foreground shadow-product ${className}`}>
    <div className="flex items-center gap-3 px-5 py-3 text-sm">
      <span className="text-muted">← Apps /</span>
      <span className="font-semibold">Hiring pipeline</span>
      <span className="ml-auto rounded-full border border-app-brand-soft bg-background px-3 py-1 text-xs font-medium text-app-brand">✦ Ask Xura</span>
    </div>
    <div className="grid grid-cols-[8.5rem_1fr] gap-2 px-2 pb-2">
      <ul className="space-y-1 pt-2 text-xs">
        <li className="rounded-lg bg-line px-3 py-2 font-medium">Overview</li>
        <li className="px-3 py-2 text-muted">Pipeline</li>
        <li className="px-3 py-2 text-muted">This week&apos;s interviews</li>
      </ul>
      <div className="space-y-3 rounded-xl bg-background p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-semibold tracking-tight">Overview</p>
            <p className="mt-0.5 text-xs text-muted">How is hiring going, and where do candidates drop off?</p>
          </div>
          <span className="shrink-0 rounded-lg bg-app-brand px-3 py-1.5 text-xs font-medium text-background">+ Add candidate</span>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-line">
          {NUMBERS.map((n) => (
            <div key={n.label} className="border-line p-3 not-last:border-r">
              <p className="text-[0.6875rem] text-muted">{n.label}</p>
              <p className="mt-1 text-2xl font-bold">{n.value}</p>
              <p className="text-[0.6875rem]">
                <span className={`font-semibold ${n.tone === "up" ? "text-app-positive" : n.tone === "down" ? "text-app-negative" : "text-foreground"}`}>{n.change}</span>{" "}
                <span className="text-muted">{n.note}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-line p-3">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-semibold">Where candidates drop off</p>
            <p className="text-xs font-semibold">1 of 11</p>
          </div>
          <p className="text-[0.625rem] text-muted">Number of candidates by stage · all candidates</p>
          <ul className="mt-2 space-y-1.5">
            {FUNNEL.map((f, i) => (
              <li key={f.stage} className="grid grid-cols-[5rem_1fr_7.5rem] items-center gap-2 text-[0.6875rem]">
                <span>{f.stage}</span>
                <Bar pct={f.pct} strong={i === 0} />
                <span className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                  {f.n}
                  <span className={`w-8 text-right ${"flag" in f ? "font-medium text-app-negative" : "text-muted"}`}>{f.share}</span>
                  {"flag" in f ? <span className="rounded-full bg-foreground px-1.5 py-0.5 text-[0.5625rem] text-background">● Biggest drop</span> : <span className="w-[4.25rem]" />}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="rounded-lg bg-line-soft px-3 py-2 text-xs font-medium">Who is applying</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs font-semibold">Candidates by role</p>
            <div className="mt-2 flex h-2 gap-0.5 overflow-hidden rounded-full">
              {ROLES.map((r) => (
                <span key={r.role} className={r.tone} style={{ width: `${r.pct}%` }} />
              ))}
            </div>
            <ul className="mt-2 space-y-1 text-[0.6875rem]">
              {ROLES.map((r) => (
                <li key={r.role} className="flex items-center gap-2">
                  <span className={`size-2 rounded-sm ${r.tone}`} />
                  {r.role}
                  <span className="ml-auto text-muted">{r.pct}%</span>
                  <span className="w-4 text-right font-medium">{r.n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line p-3">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-semibold">Applications per week</p>
              <p className="text-xs font-semibold">12</p>
            </div>
            <div className="mt-3 flex h-14 items-end gap-1 border-b border-line">
              {WEEKS.map((n, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-sm ${i === WEEKS.length - 1 ? "bg-app-brand" : "bg-app-brand-mid/70"}`}
                  style={{ height: `${(n / 3) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[0.5625rem] text-muted">
              <span>Aug 24</span>
              <span>Dec 7</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex-1 rounded-lg border border-line px-3 py-1.5 text-xs text-muted">⌕ Search candidates</span>
          <span className="rounded-full bg-foreground px-3 py-1 text-xs text-background">All 12</span>
          <span className="rounded-full border border-line px-3 py-1 text-xs">Interviewing 2</span>
        </div>
      </div>
    </div>
  </div>
);
