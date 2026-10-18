"use client";

import { useEffect, useRef } from "react";

import { AiOrb } from "@/components/graphics/ai-orb";
import { useOrbDock } from "@/hooks/use-orb-dock";

/**
 * OrbDockSlot — an empty, fixed-size spot that "hosts" the floating AiOrb
 * (AiHelpAgent) while it's on screen: it publishes its viewport rect and an
 * accent via `useOrbDock`, so the floating orb flies in, recolours and becomes
 * this character. When the slot leaves the viewport it releases the orb, which
 * springs back to the bottom-right.
 *
 * Only one slot holds the orb at a time: a slot claims it only when it's free
 * (or already its own), so two slots on screen don't fight over it.
 *
 * The floating orb is desktop-only (`md+`), so below `md` the slot renders a
 * regular AiOrb in its place instead.
 */
export const OrbDockSlot = ({
  id,
  size,
  accent,
}: {
  /** Unique owner id for the dock store. */
  id: string;
  size: number;
  /** Accent while docked; omit for the default Xura green. */
  accent?: string;
}) => {
  const slotRef = useRef<HTMLSpanElement>(null);
  const setTarget = useOrbDock((s) => s.setTarget);
  const clearTarget = useOrbDock((s) => s.clearTarget);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const desktop = window.matchMedia("(min-width: 48rem)");
    let visible = false;

    const publish = () => {
      if (!visible || !desktop.matches) return;
      const owner = useOrbDock.getState().owner;
      if (owner && owner !== id) return; // another slot holds the orb
      const r = slot.getBoundingClientRect();
      setTarget({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, size: r.width, accent }, id);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = (entry?.isIntersecting ?? false) && (entry?.intersectionRatio ?? 0) > 0.6;
        if (visible) publish();
        else clearTarget(id);
      },
      { threshold: [0, 0.6, 1], rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(slot);
    // When another slot releases the orb, claim it if we're on screen.
    const unsubscribe = useOrbDock.subscribe((state, prev) => {
      if (prev.owner && !state.owner) publish();
    });
    window.addEventListener("scroll", publish, { passive: true });
    window.addEventListener("resize", publish);
    return () => {
      io.disconnect();
      unsubscribe();
      window.removeEventListener("scroll", publish);
      window.removeEventListener("resize", publish);
      clearTarget(id);
    };
  }, [id, accent, setTarget, clearTarget]);

  return (
    <span ref={slotRef} className="relative inline-block" style={{ width: size, height: size }}>
      <span className="md:hidden">
        <AiOrb size={size} accent={accent} expressive spin={false} />
      </span>
    </span>
  );
};
