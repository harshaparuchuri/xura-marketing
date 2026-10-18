"use client";

import { create } from "zustand";

/**
 * Cross-component channel: a surface that wants to "host" the floating AiOrb
 * (the KnowledgeGraph centre, Meera's slot in the AI employees roster…)
 * publishes a target rect in viewport coordinates; the AiHelpAgent reads it
 * and springs its wrapper into place. `null` means the orb returns to its
 * default bottom-right dock.
 *
 * Each publisher passes an `owner` id, and `clearTarget(owner)` only clears
 * the target if that owner still holds it — so one section scrolling out of
 * view can't undock the orb from another section that just claimed it.
 */

export type OrbDockTarget = {
  /** Viewport-space center of the target slot (px). */
  cx: number;
  cy: number;
  /** Desired visual diameter (px). Used to scale the orb up while docked. */
  size: number;
  /** Optional accent colour while docked (e.g. an AI employee's colour). */
  accent?: string;
};

type OrbDockStore = {
  target: OrbDockTarget | null;
  owner: string | null;
  setTarget: (target: OrbDockTarget, owner: string) => void;
  clearTarget: (owner: string) => void;
};

export const useOrbDock = create<OrbDockStore>((set) => ({
  target: null,
  owner: null,
  setTarget: (target, owner) => set({ target, owner }),
  clearTarget: (owner) =>
    set((state) => (state.owner === owner ? { target: null, owner: null } : state)),
}));
