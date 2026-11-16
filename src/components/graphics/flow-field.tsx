/**
 * FlowField — Xura's section background. Dark tone: a blue-to-ink gradient
 * with film grain (the page palette's `--field-{variant}` texture, made by
 * scripts/generate-gradient-textures.py; owner request 2026-11-16) with a
 * faint flow diagram on top (nodes on a grid, elbow connectors, a few step
 * "cards") echoing the workflows Xura builds, faded behind the centre
 * (`.mask-edges`). Variant 0 = light from the top, 1 = from the bottom,
 * 2 = a band across the middle.
 *
 * `tone="dark"`: gradient + pale lines. `tone="light"`: paper, ink lines.
 * Parent must be `relative isolate`; the field sits at `-z-10`.
 */

const W = 1440;
const H = 720;
const STEP = 80;

/** Small deterministic PRNG so server and client render the same pattern. */
const rng = (seed: number) => {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

type Node = { x: number; y: number; card: boolean; hot: boolean };

const build = (variant: number) => {
  const rand = rng(variant + 3);
  const nodes: Node[] = [];
  for (let x = STEP; x < W; x += STEP) {
    for (let y = STEP; y < H; y += STEP) {
      if (rand() < 0.22) nodes.push({ x, y, card: rand() < 0.18, hot: rand() < 0.08 });
    }
  }
  // Connect each node to the nearest node to its right with an elbow path.
  const links: string[] = [];
  for (const a of nodes) {
    const right = nodes
      .filter((b) => b.x > a.x && b.x - a.x <= STEP * 3)
      .sort((p, q) => Math.abs(p.y - a.y) - Math.abs(q.y - a.y) || p.x - q.x)[0];
    if (!right) continue;
    const mid = a.x + (right.x - a.x) / 2;
    links.push(`M${a.x} ${a.y} H${mid} V${right.y} H${right.x}`);
  }
  return { nodes, links };
};

const PATTERNS = [0, 1, 2].map(build);

export const FlowField = ({
  tone = "dark",
  variant = 0,
  className = "",
}: {
  tone?: "dark" | "light";
  variant?: 0 | 1 | 2;
  className?: string;
}) => {
  const { nodes, links } = PATTERNS[variant];
  const dark = tone === "dark";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${dark ? "bg-foreground bg-cover bg-center text-background" : "bg-line-soft text-foreground"} ${className}`}
      style={dark ? { backgroundImage: `var(--field-${variant})` } : undefined}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="mask-edges absolute inset-0 h-full w-full">
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity={dark ? 0.05 : 0.1}>
          {links.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {nodes.map((n) =>
          n.card ? (
            <rect
              key={`${n.x}-${n.y}`}
              x={n.x - 26}
              y={n.y - 9}
              width="52"
              height="18"
              rx="5"
              fill={dark ? "currentColor" : "var(--line-soft)"}
              fillOpacity={dark ? 0.02 : 1}
              stroke="currentColor"
              strokeOpacity={n.hot ? (dark ? 0.3 : 0.6) : dark ? 0.1 : 0.16}
            />
          ) : (
            <rect
              key={`${n.x}-${n.y}`}
              x={n.x - 3}
              y={n.y - 3}
              width="6"
              height="6"
              rx="1.5"
              fill="currentColor"
              fillOpacity={n.hot ? (dark ? 0.4 : 0.75) : dark ? 0.14 : 0.2}
            />
          ),
        )}
      </svg>
    </div>
  );
};
