/**
 * Duotone image placeholders.
 *
 * The reference treats all photography as a blue duotone. No photography is
 * available for this build, so these are generated SVG stand-ins that carry the
 * same colour treatment and aspect ratios — enough to judge the layout.
 *
 * REPLACE with real photographs run through the same duotone treatment:
 *   feColorMatrix / duotone map from --duo-soft (highlights) to --duo (shadows).
 *
 * Server Component.
 */
type DuotoneProps = {
  className?: string;
  /** Chooses the generated composition, not a real subject. */
  variant?: "portrait" | "group" | "landscape" | "sky" | "molecule";
};

export const Duotone = ({ className, variant = "landscape" }: DuotoneProps) => {
  const id = `duo-${variant}`;

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="size-full"
        role="img"
        aria-label="Placeholder image"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--duo-soft)" />
            <stop offset="100%" stopColor="var(--duo)" />
          </linearGradient>
          <radialGradient id={`${id}-light`} cx="0.5" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="400" fill={`url(#${id}-bg)`} />
        <rect width="400" height="400" fill={`url(#${id}-light)`} />

        {variant === "sky" ? (
          <g fill="#ffffff" opacity="0.55">
            <ellipse cx="140" cy="150" rx="120" ry="42" />
            <ellipse cx="250" cy="120" rx="95" ry="32" />
            <ellipse cx="300" cy="230" rx="130" ry="46" />
          </g>
        ) : null}

        {variant === "landscape" ? (
          <g>
            <path
              d="M0 250 C 90 210, 170 260, 260 250 C 330 242, 370 230, 400 236 L400 400 L0 400 Z"
              fill="var(--duo)"
              opacity="0.85"
            />
            <path
              d="M0 300 C 110 268, 210 306, 400 292 L400 400 L0 400 Z"
              fill="var(--raw-color-ink-950)"
              opacity="0.55"
            />
          </g>
        ) : null}

        {variant === "portrait" ? (
          <g fill="var(--raw-color-ink-950)" opacity="0.6">
            <circle cx="200" cy="168" r="62" />
            <path d="M92 400 C 92 306, 140 260, 200 260 C 260 260, 308 306, 308 400 Z" />
          </g>
        ) : null}

        {variant === "group" ? (
          <g fill="var(--raw-color-ink-950)" opacity="0.55">
            <circle cx="112" cy="180" r="44" />
            <path d="M42 400 C 42 330, 74 296, 112 296 C 150 296, 182 330, 182 400 Z" />
            <circle cx="212" cy="164" r="48" />
            <path d="M136 400 C 136 324, 170 288, 212 288 C 254 288, 288 324, 288 400 Z" />
            <circle cx="312" cy="182" r="44" />
            <path d="M242 400 C 242 330, 274 296, 312 296 C 350 296, 382 330, 382 400 Z" />
          </g>
        ) : null}

        {variant === "molecule" ? (
          <g>
            <g
              stroke="var(--raw-color-ink-950)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.55"
              fill="none"
            >
              <path d="M60 340 C 130 280, 180 260, 220 220" />
              <path d="M220 220 C 260 180, 310 160, 360 110" />
              <path d="M120 90 C 170 140, 210 170, 220 220" />
              <path d="M220 220 C 240 260, 280 300, 340 330" />
              <path d="M80 200 L 168 200" />
              <path d="M220 220 L 300 260" />
            </g>
            <g fill="var(--raw-color-ink-950)" opacity="0.75">
              <circle cx="60" cy="340" r="18" />
              <circle cx="120" cy="90" r="14" />
              <circle cx="220" cy="220" r="26" />
              <circle cx="360" cy="110" r="16" />
              <circle cx="340" cy="330" r="20" />
              <circle cx="80" cy="200" r="10" />
              <circle cx="300" cy="260" r="12" />
            </g>
            <g fill="#ffffff" opacity="0.85">
              <circle cx="60" cy="340" r="6" />
              <circle cx="220" cy="220" r="9" />
              <circle cx="340" cy="330" r="6" />
            </g>
          </g>
        ) : null}
      </svg>
    </div>
  );
};
