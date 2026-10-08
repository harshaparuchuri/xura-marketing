import Link from "next/link";
import type { ComponentType } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { ChannelScene } from "@/components/graphics/channel-scene";
import {
  SlackMark,
  TeamsMark,
  WebMark,
  WhatsAppMark,
} from "@/components/graphics/channel-marks";

/**
 * Channels — "works where your team works" band. Xura answers on WhatsApp,
 * Slack, Microsoft Teams and the web app from the same knowledge graph.
 * Intro → channel row (mark + name + where it fits) → two-up: ChannelScene
 * (Slack, Teams and WhatsApp answering at once) left, benefit list right.
 */
type Channel = {
  name: string;
  context: string;
  Mark: ComponentType<{ className?: string }>;
};

const CHANNELS: Channel[] = [
  { name: "WhatsApp", context: "In the field", Mark: WhatsAppMark },
  { name: "Slack", context: "In team channels", Mark: SlackMark },
  { name: "Microsoft Teams", context: "Across the enterprise", Mark: TeamsMark },
  { name: "Web app", context: "For deep work", Mark: WebMark },
];

const POINTS: { title: string; body: string }[] = [
  {
    title: "Ask in the thread you're already in",
    body: "Mention Xura in a Slack channel, a Teams chat, or a WhatsApp message. No new app to open, no context to re-explain.",
  },
  {
    title: "Charts and briefs, right in the chat",
    body: "Answers arrive as charts, summaries and next-step actions inside Slack, Teams or WhatsApp, not as a link to another dashboard.",
  },
  {
    title: "One graph, every surface",
    body: "Start a question on WhatsApp in the field and pick it up at your desk in Teams or the web app. Same data, same answer.",
  },
  {
    title: "Permissions follow every message",
    body: "Row-level access and audit trails apply on every channel. People only see what they're allowed to see, wherever they ask.",
  },
];

export const Channels = () => (
  <section
    id="channels"
    className="relative isolate overflow-hidden bg-band-mist py-20 md:py-28"
  >
    <div className="shell">
      <div className="mx-auto max-w-4xl text-center">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="meta"
        >
          WhatsApp · Slack · Teams · Web
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mx-auto mt-3 max-w-[16ch] sm:max-w-2xl lg:max-w-none"
        >
          Works where your team{" "}
          <span className="font-semibold">already works</span>
        </Inview>
        <Inview
          tag="p"
          mode="once"
          delayIn={140}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mx-auto mt-5 max-w-[60ch] text-sm leading-relaxed text-muted"
        >
          WhatsApp for the field, Slack and Teams at the desk, the web app for
          deep work. Ask Xura wherever the conversation already is, and get
          the same answer from the same knowledge graph.
        </Inview>
      </div>

      <Inview
        tag="ul"
        mode="once"
        delayIn={200}
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        aria-label="Channels Xura works in"
        className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
      >
        {CHANNELS.map(({ name, context, Mark }) => (
          <li
            key={name}
            className="flex items-center gap-3 rounded-lg border border-line bg-background px-4 py-3"
          >
            <Mark className="size-7 shrink-0 text-foreground" />
            <span className="min-w-0 text-left">
              <span className="block text-sm font-semibold leading-tight">
                {name}
              </span>
              <span className="block text-xs text-muted">{context}</span>
            </span>
          </li>
        ))}
      </Inview>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <ChannelScene />

        <div>
          <ul>
            {POINTS.map((point, i) => (
              <Inview
                key={point.title}
                tag="li"
                mode="once"
                delayIn={i * 80}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="border-t border-line py-5 first:border-t-0 first:pt-0"
              >
                <h3 className="text-sm font-semibold">{point.title}</h3>
                <p className="mt-1.5 max-w-[50ch] text-sm text-muted">
                  {point.body}
                </p>
              </Inview>
            ))}
          </ul>

          <Inview
            mode="once"
            delayIn={360}
            from={{ opacity: 0, y: 14 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            <Link href="/trial" className="pill">
              <span aria-hidden>▪</span> Try it in your workspace
            </Link>
          </Inview>
        </div>
      </div>
    </div>
  </section>
);
