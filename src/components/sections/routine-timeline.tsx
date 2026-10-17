import { Inview } from "@/components/animation/springs/in-view";
import { AiOrb } from "@/components/graphics/ai-orb";
import { EMPLOYEE_ACCENT, type Routine } from "@/data/industries";

/**
 * RoutineTimeline — an industry's AI-employee routines laid out as a vertical
 * timeline, grouped by cadence from the big picture down (every month → week
 * → day → hour), so an industry's lead routine (e.g. pharma's monthly review)
 * opens the timeline. A spine runs
 * down the left; each routine is a node in its employee's colour, with the
 * time on the rail and a compact card: who, what you get, what you approve.
 */

type Cadence = { key: string; label: string; match: (schedule: string) => boolean };

const CADENCES: Cadence[] = [
  { key: "month", label: "Every month", match: (s) => /month/i.test(s) },
  { key: "week", label: "Every week", match: (s) => /mondays|tuesdays|wednesdays|thursdays|fridays/i.test(s) },
  {
    key: "day",
    label: "Every day",
    match: (s) => /weekdays|daily|before each meeting/i.test(s),
  },
  { key: "hour", label: "Every hour", match: (s) => /hourly/i.test(s) },
];

/**
 * Splits a schedule into a short rail label and a qualifier:
 * "Weekdays, 9:30" → 9:30 / Weekdays · "Hourly, Mon–Sat" → Hourly / Mon–Sat ·
 * "1st working day of the month" → 1st / working day of the month.
 */
const splitSchedule = (schedule: string) => {
  const [first, second] = schedule.split(", ");
  if (second) {
    return /\d:\d\d/.test(second)
      ? { when: second, qualifier: first }
      : { when: first, qualifier: second };
  }
  const leading = schedule.match(/^(\d+\w*)\s+(.*)$/);
  return leading
    ? { when: leading[1], qualifier: leading[2] }
    : { when: schedule, qualifier: "" };
};

/** Minutes past midnight for ordering within a group; untimed items go first. */
const minutesOf = (schedule: string) => {
  const m = schedule.match(/(\d{1,2}):(\d{2})/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : -1;
};

export const RoutineTimeline = ({ routines }: { routines: Routine[] }) => {
  const groups = CADENCES.map((cadence) => ({
    cadence,
    items: routines
      .filter((r) => cadence.match(r.schedule))
      .sort((a, b) => minutesOf(a.schedule) - minutesOf(b.schedule)),
  })).filter((g) => g.items.length > 0);

  let index = 0;

  return (
    <ol className="relative mx-auto mt-14 max-w-4xl">
      {/* Spine */}
      <span
        aria-hidden
        className="absolute bottom-4 left-[0.6875rem] top-2 w-0.5 rounded-full bg-subtle/50 md:left-[8.125rem]"
      />

      {groups.map(({ cadence, items }) => (
        <li key={cadence.key} className="relative pb-10 last:pb-0">
          {/* Cadence marker */}
          <Inview
            mode="once"
            from={{ opacity: 0, x: -10 }}
            to={{ opacity: 1, x: 0 }}
            config={{ tension: 190, friction: 26 }}
            className="relative flex items-center gap-4 md:pl-[7.5rem]"
          >
            <span
              aria-hidden
              className="relative z-10 flex size-[1.375rem] items-center justify-center rounded-full border border-line bg-background"
            >
              <span className="size-2 rounded-full bg-foreground" />
            </span>
            <h3 className="meta">{cadence.label}</h3>
          </Inview>

          <ul className="mt-5 space-y-4">
            {items.map((routine) => {
              const { when, qualifier } = splitSchedule(routine.schedule);
              const accent = EMPLOYEE_ACCENT[routine.employee];
              const delay = (index++ % 6) * 70;
              return (
                <Inview
                  key={routine.title}
                  tag="li"
                  mode="once"
                  delayIn={delay}
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="relative grid grid-cols-[1.375rem_1fr] gap-4 md:grid-cols-[6.5rem_1.375rem_1fr]"
                >
                  {/* Time on the rail (desktop) */}
                  <p className="hidden pt-4 text-right md:block">
                    <span className={`block font-serif leading-display ${when.length > 7 ? "text-base" : "text-xl"}`}>
                      {when}
                    </span>
                    {qualifier && (
                      <span className="block text-[0.6875rem] text-muted">{qualifier}</span>
                    )}
                  </p>

                  {/* Node */}
                  <span aria-hidden className="relative z-10 flex justify-center pt-5">
                    <span
                      className="size-3 rounded-full ring-4 ring-background"
                      style={{ background: accent }}
                    />
                  </span>

                  {/* Card */}
                  <article className="rounded-2xl border border-line bg-background p-5 shadow-product md:p-6">
                    <div className="flex items-center gap-3">
                      <AiOrb size={34} accent={accent} spin={false} />
                      <p className="text-xs">
                        <span className="font-semibold">{routine.employee}</span>
                        <span className="text-muted md:hidden"> · {routine.schedule}</span>
                      </p>
                    </div>
                    <h4 className="mt-3 text-base font-semibold">{routine.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{routine.body}</p>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-band-mist px-3 py-1 text-xs">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent-strong" />
                      {routine.approval}
                    </p>
                  </article>
                </Inview>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
};
