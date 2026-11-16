import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import type { Tags } from "@/types/springs";

/**
 * Reveal — the home page's one scroll-reveal: a short spring rise + fade,
 * played once. Wraps `Inview` so every section shares the same physics.
 */
export const Reveal = ({
  children,
  tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  tag?: Tags;
  delay?: number;
  className?: string;
}) => (
  <Inview
    tag={tag}
    mode="once"
    delayIn={delay}
    from={{ opacity: 0, y: 18 }}
    to={{ opacity: 1, y: 0 }}
    config={{ tension: 180, friction: 27 }}
    className={className}
  >
    {children}
  </Inview>
);

/** Section heading block: small label, light h2, optional lead. */
export const SectionHead = ({
  label,
  heading,
  lead,
  inverse = false,
  center = false,
  id,
}: {
  label: string;
  heading: string;
  lead?: string;
  inverse?: boolean;
  center?: boolean;
  id?: string;
}) => (
  <div className={center ? "mx-auto max-w-[48rem] text-center" : "max-w-[48rem]"}>
    <Reveal tag="p" className={`text-sm font-medium ${inverse ? "text-background/60" : "text-muted"}`}>
      {label}
    </Reveal>
    <Reveal tag="h2" delay={40} className="display-light-md mt-3">
      <span id={id}>{heading}</span>
    </Reveal>
    {lead ? (
      <Reveal
        tag="p"
        delay={80}
        className={`mt-5 text-base leading-relaxed md:text-lg ${inverse ? "text-background/70" : "text-muted"} ${center ? "mx-auto max-w-[56ch]" : "max-w-[56ch]"}`}
      >
        {lead}
      </Reveal>
    ) : null}
  </div>
);
