import Image from "next/image";

/**
 * Avatar — a round profile photo for the fictional people in product scenes
 * (Slack, Teams, recommendations). Photos are free-licence Unsplash portraits
 * in `public/assets/people/` (128×128); `XuraAvatar` uses the real Xura logo.
 * Decorative: the person's name is always shown as text next to it.
 */
export const PEOPLE = {
  priya: { name: "Priya", src: "/assets/people/priya.jpg" },
  daniel: { name: "Daniel", src: "/assets/people/daniel.jpg" },
  wei: { name: "Wei", src: "/assets/people/wei.jpg" },
  sarah: { name: "Sarah", src: "/assets/people/sarah.jpg" },
} as const;

export type PersonKey = keyof typeof PEOPLE;

type AvatarProps = {
  person: PersonKey;
  /** Size + shape classes, e.g. "size-7 rounded-full" (no default rounding). */
  className?: string;
};

export const Avatar = ({ person, className = "size-7 rounded-full" }: AvatarProps) => (
  <Image
    src={PEOPLE[person].src}
    alt=""
    aria-hidden
    width={128}
    height={128}
    sizes="2rem"
    className={`shrink-0 object-cover ${className}`}
  />
);

/** Overlapping avatar row, e.g. who a brief was shared with. */
export const AvatarStack = ({
  people,
  className = "size-6",
}: {
  people: PersonKey[];
  className?: string;
}) => (
  <span className="flex -space-x-2">
    {people.map((p) => (
      <Avatar key={p} person={p} className={`${className} rounded-full ring-2 ring-background`} />
    ))}
  </span>
);

export const XuraAvatar = ({ className = "size-7 rounded-lg" }: { className?: string }) => (
  <Image
    src="/assets/xura-logo.png"
    alt=""
    aria-hidden
    width={64}
    height={64}
    sizes="2rem"
    className={`shrink-0 ${className}`}
  />
);
