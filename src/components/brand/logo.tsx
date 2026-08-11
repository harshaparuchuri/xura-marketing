import Image from "next/image";

/**
 * Xura brand lockup.
 *
 * Uses the supplied logo file at `public/assets/xura-logo.png` — the real
 * asset, not a reconstruction. The mark is a lime glyph on a deep-green plate,
 * so it carries its own background and needs no recolouring per surface.
 */
type LogoProps = {
  className?: string;
  /** Render the mark alone, without the wordmark beside it. */
  markOnly?: boolean;
};

export const XuraLogo = ({ className, markOnly = false }: LogoProps) => (
  <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
    <Image
      src="/assets/xura-logo.png"
      alt={markOnly ? "Xura AI" : ""}
      width={1212}
      height={1212}
      priority
      className="size-7 shrink-0 rounded-[6px]"
    />
    {markOnly ? null : (
      <span className="text-[0.9375rem] font-bold tracking-tight">Xura AI</span>
    )}
  </span>
);
