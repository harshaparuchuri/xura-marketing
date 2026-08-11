"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import "./ai-orb.css";

/**
 * AiOrb — Xura's animated visual identity. Ported from the Xura app's mobile
 * shell (`src/mobile/AiOrb.tsx`). Pure CSS animation via classes in
 * `./ai-orb.css`; only responsibility here is picking / cycling emotions.
 */

export type Emotion =
  | "calm"
  | "happy"
  | "curious"
  | "excited"
  | "surprised"
  | "focused"
  | "wink"
  | "alert"
  | "chill"
  | "eureka";

const ALL_EMOTIONS: Emotion[] = [
  "calm",
  "happy",
  "curious",
  "excited",
  "surprised",
  "focused",
  "wink",
  "alert",
  "chill",
  "eureka",
];

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const STATE_EMOTION: Record<"idle" | "thinking" | "active", Emotion> = {
  idle: "calm",
  thinking: "focused",
  active: "happy",
};

type Props = {
  size?: number;
  state?: "idle" | "thinking" | "active";
  emotion?: Emotion;
  expressive?: boolean;
  className?: string;
};

export const AiOrb = ({
  size = 40,
  state = "idle",
  emotion,
  expressive,
  className = "",
}: Props) => {
  const autoCycle = (expressive ?? size >= 56) && !emotion;
  const [idx, setIdx] = useState(0);
  // Deck is unshuffled on the server so SSR + first client render agree; we
  // shuffle on mount via useEffect below to avoid a hydration mismatch.
  const deck = useRef<Emotion[]>(ALL_EMOTIONS);

  const advance = useCallback(() => {
    setIdx((i) => {
      const next = i + 1;
      if (next >= deck.current.length) {
        deck.current = shuffled(ALL_EMOTIONS);
        return 0;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!autoCycle) return;
    deck.current = shuffled(ALL_EMOTIONS);
    const id = setInterval(advance, 2600);
    return () => clearInterval(id);
  }, [autoCycle, advance]);

  const emo: Emotion = emotion ?? (autoCycle ? deck.current[idx]! : STATE_EMOTION[state]);
  const withArc = size >= 30;
  const withSpin = size >= 56;

  const cls = [
    "m-orb",
    `m-orb--${state}`,
    `m-emo-${emo}`,
    withArc ? "m-orb--arc" : "",
    withSpin ? "m-orb--spin" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={cls}
      style={{ "--orb-size": `${size}px` } as CSSProperties}
      aria-hidden
    >
      <span className="m-orb__halo" />
      <span className="m-orb__body" />
      <span className="m-orb__face">
        <span className="m-orb__sheen" />
        <span className="m-orb__signal" />
        <span className="m-orb__eye m-orb__eye--l">
          <span className="m-orb__pupil" />
        </span>
        <span className="m-orb__eye m-orb__eye--r">
          <span className="m-orb__pupil" />
        </span>
      </span>
      <span className="m-orb__ring" />
    </span>
  );
};
