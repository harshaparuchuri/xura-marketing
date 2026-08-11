"use client";

import { create } from "zustand";

/**
 * Cross-component channel: the KnowledgeGraph (and any other surface that
 * wants to "host" the floating AiOrb) publishes a target rect in viewport
 * coordinates; the AiHelpAgent reads it and springs its wrapper into place.
 * `null` means the orb returns to its default bottom-right dock.
 *
 * Kept in a store rather than props so any section can dock the orb without
 * threading state through the layout.
 */

export type OrbDockTarget = {
  /** Viewport-space center of the target slot (px). */
  cx: number;
  cy: number;
  /** Desired visual diameter (px). Used to scale the orb up while docked. */
  size: number;
};

type OrbDockStore = {
  target: OrbDockTarget | null;
  setTarget: (t: OrbDockTarget | null) => void;
};

export const useOrbDock = create<OrbDockStore>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));
