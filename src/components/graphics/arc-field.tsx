/**
 * ArcField — concentric-arc line pattern from the product's login and
 * onboarding backgrounds. Decorative SVG; strokes use `currentColor`, so the
 * caller sets colour and opacity with text utilities.
 */
type ArcFieldProps = {
  className?: string;
  /** Number of rings. */
  rings?: number;
};

export const ArcField = ({ className, rings = 14 }: ArcFieldProps) => (
  <svg
    viewBox="0 0 800 800"
    preserveAspectRatio="xMidYMid slice"
    className={className}
    fill="none"
    stroke="currentColor"
    aria-hidden
  >
    {Array.from({ length: rings }, (_, i) => (
      <circle key={i} cx="640" cy="760" r={90 + i * 52} strokeWidth="1" />
    ))}
  </svg>
);
