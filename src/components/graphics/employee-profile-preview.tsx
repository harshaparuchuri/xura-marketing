import type { CSSProperties, ReactNode } from "react";

import { AiOrb } from "@/components/graphics/ai-orb";

/**
 * EmployeeProfilePreview — a coded replica of the product's AI employee page
 * (Xura-main src/poc-metadata/AgentProfile.tsx) for Nora, the built-in Chief
 * of Staff, laid out like the product: hero (large orb, role, description,
 * stats), "A day with Nora" strip with icon markers and a two-column legend,
 * and routine rows with an icon, schedule, Run now and an on/off switch.
 * Content mirrors her seed (chiefOfStaff.js). Accent `--employee-chief-of-staff`.
 * Compact type so it reads as a screenshot of the app. Decorative (aria-hidden).
 */

const ACCENT = "var(--employee-chief-of-staff)";
const tint = (pct: number) => `color-mix(in srgb, ${ACCENT} ${pct}%, var(--background))`;

/** Minimal line icons (24×24, stroke) matching the product's routine icons. */
const ICON: Record<"doc" | "calendar" | "bell" | "sparkle" | "chart", ReactNode> = {
  doc: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6" />,
  calendar: <path d="M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />,
  chart: <path d="M12 3a9 9 0 1 0 9 9h-9zM15 3.5A9 9 0 0 1 20.5 9H15z" />,
};

const Icon = ({ name, className = "size-3.5" }: { name: keyof typeof ICON; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {ICON[name]}
  </svg>
);

const STATS = [
  { value: "3", sub: "/4", label: "Routines on" },
  { value: "4", label: "Playbooks" },
  { value: "35", label: "Tools" },
  { value: "10", label: "Ask you first" },
] as const;

/** Strip runs 0:00–24:00 like the product. */
const pos = (h: number) => `${(h / 24) * 100}%`;
const MARKERS = [
  { at: 8.5, icon: "doc", lane: 0, on: true },
  { at: 10, icon: "sparkle", lane: 0, on: true },
  { at: 16, icon: "bell", lane: 0, on: true },
  { at: 17, icon: "chart", lane: 1, on: false },
] as const;
const LEGEND = [
  { icon: "doc", time: "8:30 am", name: "Morning brief", days: "Weekdays" },
  { icon: "sparkle", time: "10 am", name: "Weekly learning retro", days: "Fridays" },
  { icon: "bell", time: "4 pm", name: "Follow-up check", days: "Weekdays" },
  { icon: "chart", time: "5 pm", name: "Week in review", days: "Fridays" },
  { icon: "calendar", time: "Hourly", name: "Meeting prep 8 am–6 pm", days: "Weekdays" },
] as const;

const ROUTINES = [
  { icon: "doc", name: "Morning brief", when: "Weekdays 8:30 IST", body: "What needs you today, what is at risk, your schedule and what changed, in one short email.", on: true },
  { icon: "calendar", name: "Meeting prep", when: "Hourly, 8:00–18:00 IST, weekdays", body: "A short pre-read for each meeting starting in the next 90 minutes that has other attendees.", on: true },
  { icon: "bell", name: "Follow-up check", when: "Weekdays 16:00 IST", body: "Overdue and stuck items by owner, with draft nudges you can send.", on: true },
] as const;

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg" style={{ background: tint(14), color: ACCENT }}>
    {children}
  </span>
);

export const EmployeeProfilePreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-line-soft p-3 text-foreground shadow-product ${className}`} style={{ "--accent": ACCENT } as CSSProperties}>
    <p className="px-1 pb-2 text-xs text-muted">← Agents</p>

    {/* Hero */}
    <div className="rounded-2xl border p-4 md:p-5" style={{ borderColor: tint(30), background: `linear-gradient(135deg, ${tint(14)}, var(--background) 70%)` }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="shrink-0">
          <AiOrb size={84} accent={ACCENT} expressive spin={false} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-2xl font-semibold tracking-tight">Nora</p>
            <span className="rounded-full border px-2 py-0.5 text-[0.625rem] font-medium" style={{ borderColor: tint(40), color: ACCENT }}>Built-in</span>
            <span className="ml-auto hidden rounded-full px-3 py-1.5 text-xs font-medium text-background sm:inline" style={{ background: ACCENT }}>
              Chat with Nora
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full px-2.5 py-0.5 font-medium" style={{ background: tint(16), color: ACCENT }}>Chief of Staff</span>
            <span className="text-muted">Office of the leader</span>
          </div>
          <p className="mt-2 max-w-[62ch] text-xs leading-relaxed md:text-sm">
            Keeps you on top of everything: a morning brief, pre-reads before meetings, follow-ups on what is slipping and a weekly review. She prepares and reminds; you decide.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-background px-3 py-2">
                <p className="text-lg font-semibold leading-tight">
                  {s.value}
                  {"sub" in s ? <span className="text-xs font-normal text-muted">{s.sub}</span> : null}
                </p>
                <p className="text-[0.6875rem] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Day strip */}
    <div className="mt-2 rounded-2xl border border-line bg-background p-4 md:p-5">
      <p className="text-sm font-semibold">A day with Nora</p>
      <p className="mt-0.5 text-[0.6875rem] text-muted">When Nora&apos;s routines run (IST). Faded ones are switched off.</p>
      <div
        className="relative mt-3 h-20"
        style={{
          backgroundImage: "linear-gradient(to right, var(--line) 1px, transparent 1px)",
          backgroundSize: `${100 / 24}% 100%`,
        }}
      >
        <span className="absolute inset-y-0" style={{ left: pos(6), width: `calc(${pos(18)} - ${pos(6)})`, background: tint(6) }} />
        <span
          className="absolute bottom-2 h-5 rounded-full border border-dashed pl-2 text-[0.5625rem] leading-5"
          style={{ left: pos(8), width: `calc(${pos(18)} - ${pos(8)})`, borderColor: tint(45), color: ACCENT, background: tint(8) }}
        >
          Meeting prep
        </span>
        {MARKERS.map((m) => (
          <span
            key={m.at}
            className="absolute flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background"
            style={{ left: pos(m.at), top: m.lane ? "1.9rem" : "0.35rem", background: m.on ? tint(70) : tint(30), color: "var(--background)" }}
          >
            <Icon name={m.icon} className="size-3" />
          </span>
        ))}
      </div>
      <div className="mt-1 flex justify-between px-[12%] text-[0.5625rem] text-muted">
        <span>6 am</span>
        <span>9 am</span>
        <span>12 pm</span>
        <span>3 pm</span>
        <span>6 pm</span>
        <span>9 pm</span>
      </div>
      <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-[0.6875rem] sm:grid-cols-2">
        {LEGEND.map((l) => (
          <li key={l.name} className="flex items-center gap-2">
            <Chip>
              <Icon name={l.icon} className="size-3" />
            </Chip>
            <span className="w-14 shrink-0 font-semibold">{l.time}</span>
            <span className="min-w-0 flex-1 truncate">{l.name}</span>
            <span className="text-muted">{l.days}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Routines */}
    <div className="mt-2 rounded-2xl border border-line bg-background p-4 md:p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Routines</p>
        <span className="rounded-md border border-line px-2 py-0.5 text-[0.6875rem]">Edit</span>
      </div>
      <p className="mt-0.5 text-[0.6875rem] text-muted">Work Nora does on a schedule, without being asked. Switch on the ones your team wants.</p>
      <ul className="mt-3 space-y-2">
        {ROUTINES.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-xl border border-line p-3">
            <Chip>
              <Icon name={r.icon} />
            </Chip>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">{r.name}</p>
              <p className="text-[0.625rem] text-muted">◷ {r.when}</p>
              <p className="mt-0.5 truncate text-[0.6875rem]">{r.body}</p>
            </div>
            <span className="hidden shrink-0 rounded-full border px-2.5 py-1 text-[0.625rem] font-medium sm:inline" style={{ borderColor: tint(40), color: ACCENT }}>
              ▷ Run now
            </span>
            <span className="relative h-4 w-7 shrink-0 rounded-full" style={{ background: r.on ? ACCENT : "var(--line)" }}>
              <span className={`absolute top-0.5 size-3 rounded-full bg-background ${r.on ? "right-0.5" : "left-0.5"}`} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
