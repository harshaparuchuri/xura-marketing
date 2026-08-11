/**
 * Hero product card.
 *
 * Reproduces the reference frame's dashboard panel: greeting row, a four-up
 * metric strip (one tile carrying the flat accent block, one an image chip, one
 * a forecast callout), and a dense thin-bar trend chart with a single
 * highlighted column. Built from markup, not a screenshot, so it stays sharp
 * and recolours from tokens. Server Component.
 */
const BARS = [
  18, 22, 19, 26, 24, 30, 27, 33, 29, 36, 31, 38, 35, 42, 39, 47, 44, 52, 48,
  58, 54, 63, 59, 70, 66, 78, 100, 88, 82, 90, 85, 79, 83, 76, 81, 74, 78, 71,
  75, 69,
];

const PEAK = 26;

export const ProductCard = () => (
  <div className="overflow-hidden rounded-2xl border border-line bg-background shadow-[0_28px_70px_-32px_rgba(16,17,18,0.30)]">
    {/* Greeting */}
    <div className="px-6 pt-6">
      <p className="text-sm font-semibold">Good morning, Acme Inc</p>
      <p className="mt-1 text-sm text-muted">
        Your daily intelligence brief is ready to review.
      </p>
    </div>

    {/* Metric strip */}
    <div className="mt-5 grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4">
      <div className="bg-background px-5 py-4">
        <p className="meta uppercase">Pipeline coverage</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <span className="text-2xl font-semibold tracking-tight">56%</span>
          <span className="h-11 w-16 rounded-[2px] bg-accent" />
        </div>
      </div>

      <div className="bg-background px-5 py-4">
        <p className="meta">Queries answered</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight">583.7</span>
          <span className="meta">k</span>
        </div>
        <p className="mt-1 text-[0.6875rem] font-medium text-duo">+12.4%</p>
      </div>

      {/* Image chip — placeholder, see duotone note in the section files. */}
      <div className="bg-background px-5 py-4">
        <div
          aria-hidden
          className="h-full min-h-16 w-full rounded-[3px]"
          style={{
            background:
              "linear-gradient(140deg, var(--duo-soft), var(--duo) 55%, var(--raw-color-ink-950))",
          }}
        />
      </div>

      <div className="bg-background px-5 py-4">
        <span className="inline-flex rounded-[2px] bg-accent px-2 py-0.5 text-[0.625rem] font-medium">
          Forecast
        </span>
        <p className="mt-2 text-[0.6875rem] leading-snug">
          You&rsquo;re 16% ahead of your Q4 pipeline goal
        </p>
      </div>
    </div>

    {/* Trend chart */}
    <div className="px-6 pb-6 pt-5">
      <p className="meta">Decision velocity trend</p>

      <div className="relative mt-4 flex h-32 items-end gap-[3px]">
        {BARS.map((h, i) => (
          // Wrapper must be full-height: the bar's percentage height resolves
          // against it, and under `items-end` an auto-height parent collapses.
          <div key={i} className="relative flex h-full flex-1 items-end">
            {i === PEAK ? (
              <span className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-[2px] bg-accent px-1.5 py-0.5 text-[0.5625rem] font-medium">
                Peak
              </span>
            ) : null}
            <div
              className={i === PEAK ? "w-full bg-accent" : "w-full bg-foreground"}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
          <span key={m} className="meta">
            {m}
          </span>
        ))}
      </div>
    </div>
  </div>
);
