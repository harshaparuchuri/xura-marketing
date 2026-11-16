import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * PhotoFill — a full-bleed photograph, sharp edge to edge, with a light film
 * grain on top (`.grain-photo`, 12%). The earlier lens-blur copy and heavy
 * grain were removed (owner, 2026-11-16: photos looked smudged). `focus` still
 * sets `--lens-x` / `--lens-y` for any caller that uses `.mask-lens`.
 * Fills its nearest positioned ancestor; layer text above it.
 */
export const PhotoFill = ({
  src,
  alt,
  sizes,
  priority = false,
  focus,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Where the subject is, as percentages (default centre-ish: 50% / 45%). */
  focus?: { x: string; y: string };
  /** Extra classes on the wrapper, e.g. a z-index or opacity transition. */
  className?: string;
}) => (
  <div
    className={`grain-photo absolute inset-0 overflow-hidden ${className}`}
    style={focus ? ({ "--lens-x": focus.x, "--lens-y": focus.y } as CSSProperties) : undefined}
  >
    <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
  </div>
);
