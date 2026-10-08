import Image from "next/image";

/**
 * ChannelMarks — official brand logos for the surfaces Xura answers on.
 * WhatsApp, Slack and Teams render the real SVGs in `public/assets/brands/`
 * (CC0 files from gilbarbara/logos; trademarks belong to their owners and are
 * used only to name the integrations). Web is a neutral globe glyph.
 * Decorative: callers pair each mark with a visible text label.
 */
type MarkProps = { className?: string };

const BrandMark = ({ src, className }: MarkProps & { src: string }) => (
  <Image
    src={src}
    alt=""
    aria-hidden
    width={32}
    height={32}
    unoptimized
    className={`object-contain ${className ?? ""}`}
  />
);

export const WhatsAppMark = ({ className }: MarkProps) => (
  <BrandMark src="/assets/brands/whatsapp.svg" className={className} />
);

export const SlackMark = ({ className }: MarkProps) => (
  <BrandMark src="/assets/brands/slack.svg" className={className} />
);

export const TeamsMark = ({ className }: MarkProps) => (
  <BrandMark src="/assets/brands/teams.svg" className={className} />
);

export const WebMark = ({ className }: MarkProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);
