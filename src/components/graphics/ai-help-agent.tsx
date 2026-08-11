"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { AiOrb } from "@/components/graphics/ai-orb";
import { useOrbDock } from "@/hooks/use-orb-dock";

/**
 * AiHelpAgent — floating orb in the viewport's bottom-right on desktop.
 * Doubles as the KnowledgeGraph's centrepiece: while any surface publishes
 * a dock target via `useOrbDock`, the orb springs from its default
 * bottom-right rest into that slot and scales up. When the target clears,
 * it springs back home.
 *
 * Hidden on mobile so it doesn't compete with the WhatsApp CTA.
 */

const REST_SIZE = 61;

export const AiHelpAgent = () => {
  const target = useOrbDock((s) => s.target);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<{ cx: number; cy: number } | null>(null);

  // Cache the resting anchor position (bottom-right dock) so the spring can
  // interpolate deltas from it. Re-measure on resize / scroll.
  useEffect(() => {
    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setAnchor({ cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Deltas + scale factor to reach the docked target.
  const docked = target && anchor;
  const dx = docked ? target.cx - anchor.cx : 0;
  const dy = docked ? target.cy - anchor.cy : 0;
  const scale = docked ? Math.max(1, target.size / REST_SIZE) : 1;

  const spring = useSpring({
    x: dx,
    y: dy,
    scale,
    config: { tension: 140, friction: 26 },
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 right-6 z-40 hidden md:block"
    >
      {/* Anchor stays put; it's a size-preserving box that the animated
          child transforms out of. Measuring this ref gives us the rest
          centre in viewport coordinates. */}
      <div ref={anchorRef} style={{ width: REST_SIZE, height: REST_SIZE }}>
        <animated.div
          style={{
            width: REST_SIZE,
            height: REST_SIZE,
            transformOrigin: "center center",
            transform: spring.x.to(
              (x) => `translate3d(${x}px, ${spring.y.get()}px, 0) scale(${spring.scale.get()})`,
            ),
            willChange: "transform",
          }}
        >
          <AiOrb size={REST_SIZE} expressive />
        </animated.div>
      </div>
    </div>
  );
};
