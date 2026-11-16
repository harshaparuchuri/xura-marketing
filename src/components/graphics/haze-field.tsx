/**
 * HazeField — the light counterpart of FlowField's dark gradient: a soft
 * pale-blue haze fading to warm off-white with fine grain
 * (the page palette's `--field-light-{variant}`, from
 * scripts/generate-gradient-textures.py). For light bands (Flows, Bootcamp,
 * Apps anatomy, industry examples). Variant 0 = haze at the top, 1 = at the
 * bottom, 2 = a band across the middle. Parent needs `relative isolate`.
 */
export const HazeField = ({ variant = 0, className = "" }: { variant?: 0 | 1 | 2; className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 -z-10 mask-band bg-line-soft bg-cover bg-center ${className}`}
    style={{ backgroundImage: `var(--field-light-${variant})` }}
  />
);
