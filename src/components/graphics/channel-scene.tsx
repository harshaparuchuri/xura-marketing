import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ArcField } from "@/components/graphics/arc-field";
import { Avatar, AvatarStack, XuraAvatar } from "@/components/graphics/avatar";
import {
  SlackMark,
  TeamsMark,
  WhatsAppMark,
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

const WhatsAppPhone = () => (
  <div className="rounded-[2rem] bg-foreground p-1.5 shadow-product">
    <div className="overflow-hidden rounded-[1.6rem] bg-band-sand-soft">
      <div className="flex items-center gap-2 bg-background px-3 py-2.5">
        <XuraAvatar className="size-6 rounded-full" />
        <div>
          <p className="text-[0.6875rem] font-semibold leading-tight">Xura</p>
          <p className="text-[0.5625rem] text-muted">online</p>
        </div>
        <WhatsAppMark className="ml-auto size-4" />
      </div>
      <div className="space-y-2 p-3">
        <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-duo-wash px-2.5 py-1.5 text-[0.6875rem]">
          Which plants are behind on OEE today?
        </p>
        <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-background px-2.5 py-2 text-[0.6875rem]">
          <p className="font-semibold">2 of 6 plants below target</p>
          <ul className="mt-1.5 space-y-1">
            {[
              ["Pune", "68%", 68],
              ["Leeds", "72%", 72],
              ["Austin", "86%", 86],
            ].map(([plant, label, pct]) => (
              <li key={plant} className="flex items-center gap-2">
                <span className="w-10 text-muted">{plant}</span>
                <span className="h-1.5 flex-1 rounded-full bg-line">
                  <span
                    className="block h-full rounded-full bg-brand-ink"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-7 text-right font-medium">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-muted">Pune: line 3 down 2h. Notify shift lead?</p>
        </div>
        <p className="ml-auto w-fit rounded-xl rounded-tr-sm bg-duo-wash px-2.5 py-1.5 text-[0.6875rem]">
          Yes, notify
        </p>
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
    place: "mx-auto w-[78%] sm:absolute sm:right-[5%] sm:top-[24%] sm:w-[32%] sm:z-30",
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
