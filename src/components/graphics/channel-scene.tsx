import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ArcField } from "@/components/graphics/arc-field";
import { Avatar, AvatarStack, XuraAvatar } from "@/components/graphics/avatar";
import {
  SlackMark,
  TeamsMark,
} from "@/components/graphics/channel-marks";

/**
 * ChannelScene — dark product stage showing the same Xura answering in three
 * places at once: a Slack thread (question → chart reply with actions), a
 * Teams Monday brief card, and a WhatsApp chat on a phone. All UI is coded
 * with neutral tokens; channel identity comes from the brand marks only.
 * Surfaces overlap and drift at different rates on `sm+`; on mobile they
 * stack. Decorative: the section's copy carries the message.
 */

const Bars = ({ values, highlight }: { values: number[]; highlight: number }) => (
  <div className="flex h-16 items-end gap-1.5" aria-hidden>
    {values.map((v, i) => (
      <span
        key={i}
        className={`flex-1 rounded-t-sm ${i === highlight ? "bg-brand-ink" : "bg-line"}`}
        style={{ height: `${v}%` }}
      />
    ))}
  </div>
);

const ActionChip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-line px-2 py-1 text-[0.625rem] font-semibold">
    {children}
  </span>
);

const SlackWindow = () => (
  <div className="overflow-hidden rounded-2xl bg-background shadow-product">
    <div className="flex items-center gap-2 border-b border-line-soft px-4 py-2.5">
      <SlackMark className="size-4" />
      <span className="text-xs font-semibold"># ops-leadership</span>
      <span className="ml-auto text-[0.625rem] text-muted">Slack</span>
    </div>
    <div className="space-y-4 p-4">
      <div className="flex gap-2.5">
        <Avatar person="priya" className="size-7 rounded-lg" />
        <div>
          <p className="text-[0.6875rem] font-semibold">
            Priya <span className="font-normal text-muted">9:02</span>
          </p>
          <p className="text-xs">
            <span className="rounded bg-duo-wash px-1 text-duo">@Xura</span>{" "}
            how did delivery velocity move this week, by team?
          </p>
        </div>
      </div>
      <div className="flex gap-2.5">
        <XuraAvatar />
        <div className="min-w-0 flex-1">
          <p className="text-[0.6875rem] font-semibold">
            Xura <span className="font-normal text-muted">9:02</span>
          </p>
          <p className="text-xs">
            Down 6% overall. <strong>Atlas</strong> drove most of it (−18%);
            Helix and Nova are up.
          </p>
          <div className="mt-2 rounded-lg border border-line p-3">
            <Bars values={[72, 64, 38, 80, 70, 58]} highlight={2} />
            <div className="mt-1.5 flex justify-between text-[0.5625rem] text-muted">
              <span>Core</span>
              <span>Data</span>
              <span>Atlas</span>
              <span>Helix</span>
              <span>Nova</span>
              <span>Ops</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <ActionChip>Open dashboard</ActionChip>
            <ActionChip>Rebalance Atlas</ActionChip>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeamsCard = () => (
  <div className="overflow-hidden rounded-2xl bg-background shadow-product">
    <div className="flex items-center gap-2 border-b border-line-soft px-4 py-2.5">
      <TeamsMark className="size-4" />
      <span className="text-xs font-semibold">Leadership · Monday brief</span>
      <span className="ml-auto text-[0.625rem] text-muted">Teams</span>
    </div>
    <div className="p-4">
      <p className="text-xs font-semibold">Your week in three numbers</p>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["Pipeline", "$4.2M", "+8%"],
          ["On-time", "91%", "−3 pts"],
          ["Open risks", "4", "+1"],
        ].map(([label, value, delta]) => (
          <div key={label} className="rounded-lg bg-band-mist p-2">
            <dt className="text-[0.5625rem] text-muted">{label}</dt>
            <dd className="text-sm font-semibold">{value}</dd>
            <dd className="text-[0.5625rem] text-muted">{delta}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[0.6875rem] text-muted">
          1 recommendation waiting for approval
        </p>
        <span className="flex items-center gap-1.5 text-[0.625rem] text-muted">
          <AvatarStack people={["daniel", "wei", "sarah"]} className="size-5" />
          +4
        </span>
      </div>
    </div>
  </div>
);

/** WhatsApp chrome is coded to match the real app (wallpaper, bubble tails,
    read ticks, interactive reply buttons); colours come from --whatsapp-*. */
const ReadTicks = () => (
  <svg viewBox="0 0 16 11" className="inline-block h-2 w-3" aria-hidden>
    <path
      d="M11.07.65 4.7 7.02 2.18 4.5l-.88.88L4.7 8.78l7.25-7.25-.88-.88Zm3.38 0L8.08 7.02l-.53-.53-.88.88 1.41 1.41 7.25-7.25-.88-.88Z"
      fill="var(--whatsapp-read)"
    />
  </svg>
);

const Meta = ({ time, read }: { time: string; read?: boolean }) => (
  <span className="ml-2 inline-flex translate-y-1 items-center gap-0.5 whitespace-nowrap text-[0.5rem] text-[var(--whatsapp-meta)]">
    {time}
    {read && <ReadTicks />}
  </span>
);

const OutBubble = ({ children, time }: { children: ReactNode; time: string }) => (
  <div className="ml-auto w-fit max-w-[82%] rounded-lg rounded-tr-none bg-[var(--whatsapp-bubble-out)] px-2 py-1 text-[0.6875rem] shadow-sm">
    {children}
    <Meta time={time} read />
  </div>
);

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const WhatsAppPhone = () => (
  <div className="rounded-[2.2rem] bg-foreground p-1.5 shadow-product">
    <div className="overflow-hidden rounded-[1.8rem] bg-[var(--whatsapp-wallpaper)]">
      {/* Status bar + chat header */}
      <div className="bg-background">
        <div className="flex items-center justify-between px-5 pt-2 text-[0.5625rem] font-semibold">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-full bg-foreground" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-px">
              {[1, 2, 3, 4].map((h) => (
                <span key={h} className="w-0.5 rounded-sm bg-foreground" style={{ height: `${h * 2 + 1}px` }} />
              ))}
            </span>
            <span className="h-2 w-3.5 rounded-sm border border-foreground p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-foreground" />
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-2">
          <Icon d="M15 18l-6-6 6-6" />
          <XuraAvatar className="size-6 rounded-full" />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 text-[0.6875rem] font-semibold leading-tight">
              Xura
              <svg viewBox="0 0 24 24" className="size-2.5" aria-hidden>
                <circle cx="12" cy="12" r="11" fill="var(--whatsapp-action)" />
                <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              </svg>
            </p>
            <p className="text-[0.5rem] text-[var(--whatsapp-meta)]">Business account</p>
          </div>
          <span className="flex gap-3 text-[var(--whatsapp-action)]">
            <Icon d="M15 10l5-3v10l-5-3M3 7h12v10H3z" />
            <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
          </span>
        </div>
      </div>

      <div className="space-y-1.5 px-2.5 py-3">
        <p className="mx-auto w-fit rounded-md bg-background/90 px-2 py-0.5 text-[0.5rem] font-medium uppercase text-[var(--whatsapp-meta)] shadow-sm">
          Today
        </p>
        <OutBubble time="8:02">Which plants are behind on OEE today?</OutBubble>

        <div className="w-[88%]">
          <div className="rounded-lg rounded-tl-none bg-background px-2 py-1.5 text-[0.6875rem] shadow-sm">
            <p>
              <strong>2 of 6 plants</strong> are below the 75% target:
            </p>
            <p className="mt-1">
              🔴 Pune · 68%
              <br />
              🔴 Leeds · 72%
              <br />
              🟢 Austin · 86%
            </p>
            <p className="mt-1">
              Pune line 3 has been down 2h (filler jam). Want me to notify the shift lead?
              <Meta time="8:02" />
            </p>
          </div>
          {/* Interactive reply buttons, as WhatsApp Business renders them */}
          <div className="mt-0.5 grid grid-cols-2 gap-0.5">
            {["Notify lead", "Dashboard"].map((label) => (
              <span
                key={label}
                className="rounded-lg bg-background py-1.5 text-center text-[0.625rem] font-medium text-[var(--whatsapp-action)] shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <OutBubble time="8:03">Notify lead</OutBubble>
      </div>

      {/* Composer */}
      <div className="flex items-center gap-1.5 px-2 pb-3">
        <span className="flex-1 rounded-full bg-background px-3 py-1.5 text-[0.625rem] text-[var(--whatsapp-meta)]">
          Message
        </span>
        <span className="flex size-6 items-center justify-center rounded-full bg-[var(--whatsapp-action)] text-white">
          <Icon d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
        </span>
      </div>
    </div>
  </div>
);

const SURFACES = [
  {
    key: "slack",
    Surface: SlackWindow,
    place: "sm:absolute sm:left-[4%] sm:top-[4%] sm:w-[62%] sm:z-10",
    drift: 18,
    delay: 0,
  },
  {
    key: "teams",
    Surface: TeamsCard,
    place: "hidden sm:block sm:absolute sm:bottom-[4%] sm:left-[22%] sm:w-[48%] sm:z-20",
    drift: 36,
    delay: 260,
  },
  {
    key: "whatsapp",
    Surface: WhatsAppPhone,
    place: "mx-auto w-[78%] sm:absolute sm:right-[4%] sm:top-[10%] sm:w-[38%] sm:z-30",
    drift: 54,
    delay: 520,
  },
];

export const ChannelScene = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`grain relative isolate overflow-hidden rounded-3xl bg-brand-ink p-5 sm:aspect-[1/1.02] sm:p-0 ${className}`}
  >
    <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />
    <div className="flex flex-col gap-5 sm:block">
      {SURFACES.map(({ key, Surface, place, drift, delay }) => (
        <div key={key} className={place}>
          <Inview
            mode="once"
            delayIn={delay}
            from={{ opacity: 0, y: 24, scale: 0.97 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
            config={{ tension: 190, friction: 25 }}
          >
            <SpringTrigger from={{ y: drift }} to={{ y: -drift }}>
              <Surface />
            </SpringTrigger>
          </Inview>
        </div>
      ))}
    </div>
  </div>
);
