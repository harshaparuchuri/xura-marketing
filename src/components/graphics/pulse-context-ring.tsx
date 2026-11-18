/**
 * PulseContextRing — the audience seated in a circle around Xura's context
 * graph: company knowledge in the middle (products, pricing, customers, past
 * campaigns, brand, market), linked nodes, and threads out to every persona.
 * Says that each reaction is grounded in the company's context and the
 * persona's own. Static SVG, decorative (`aria-hidden`); colours from tokens
 * via classes (`fill-*` / `stroke-*`). Server Component.
 */

const SIZE = 560;
const C = SIZE / 2;
const RING_R = 232;
const PEOPLE = 28;

type Mood = "yes" | "maybe" | "no";
const MOOD_FILL: Record<Mood, string> = { yes: "fill-pulse-yes", maybe: "fill-pulse-maybe", no: "fill-pulse-no" };
const MOOD_STROKE: Record<Mood, string> = { yes: "stroke-pulse-yes", maybe: "stroke-pulse-maybe", no: "stroke-pulse-no" };
const SEQ: readonly Mood[] = ["yes", "yes", "maybe", "yes", "no", "yes", "maybe"];

/** The company context graph: a hub and six labelled nodes. */
const NODES = [
  { label: "Products", a: -90 },
  { label: "Pricing", a: -30 },
  { label: "Customers", a: 30 },
  { label: "Past campaigns", a: 90 },
  { label: "Brand voice", a: 150 },
  { label: "Market", a: 210 },
] as const;
const NODE_R = 112;

const polar = (r: number, deg: number) => {
  const t = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(t), y: C + r * Math.sin(t) };
};

/** A person glyph: head + shoulders, centred on (x, y). */
const Person = ({ x, y, mood }: { x: number; y: number; mood: Mood }) => (
  <g className={MOOD_FILL[mood]}>
    <circle cx={x} cy={y - 7} r={7} />
    <path d={`M${x - 12},${y + 13} a12,11 0 0 1 24,0 z`} opacity={0.7} />
  </g>
);

export const PulseContextRing = ({ className = "" }: { className?: string }) => {
  const people = Array.from({ length: PEOPLE }, (_, i) => ({ ...polar(RING_R, (360 / PEOPLE) * i - 90), mood: SEQ[i % SEQ.length] as Mood, i }));
  const nodes = NODES.map((n) => ({ ...n, ...polar(NODE_R, n.a) }));

  return (
    <div aria-hidden className={`rounded-3xl bg-foreground p-4 text-background shadow-product ${className}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full">
        {/* faint orbit rings */}
        {[RING_R, NODE_R, 168].map((r) => (
          <circle key={r} cx={C} cy={C} r={r} className="fill-none stroke-background/10" strokeWidth={1} />
        ))}

        {/* threads from every persona to the nearest context node */}
        {people.map((p) => {
          const n = nodes[Math.round((p.i / PEOPLE) * nodes.length) % nodes.length] ?? nodes[0];
          return (
            <line key={`t${p.i}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} className={MOOD_STROKE[p.mood]} strokeWidth={1} strokeOpacity={0.35} strokeDasharray="3 4" />
          );
        })}

        {/* graph edges: hub to nodes, and around the nodes */}
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length] ?? n;
          return (
            <g key={`e${n.label}`} className="stroke-background/30" strokeWidth={1.25}>
              <line x1={C} y1={C} x2={n.x} y2={n.y} />
              <line x1={n.x} y1={n.y} x2={next.x} y2={next.y} strokeOpacity={0.5} />
            </g>
          );
        })}

        {/* nodes with labels */}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={9} className="fill-foreground stroke-background" strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={3.5} className="fill-background" />
            <text x={n.x} y={n.y + (n.y > C + 4 ? 26 : -16)} textAnchor="middle" className="fill-background/80 text-sm">
              {n.label}
            </text>
          </g>
        ))}

        {/* hub */}
        <circle cx={C} cy={C} r={42} className="fill-background" />
        <text x={C} y={C - 3} textAnchor="middle" className="fill-foreground text-sm font-semibold">
          Your
        </text>
        <text x={C} y={C + 13} textAnchor="middle" className="fill-foreground text-sm font-semibold">
          context
        </text>

        {/* the audience, seated in a circle */}
        {people.map((p) => (
          <Person key={`p${p.i}`} x={p.x} y={p.y} mood={p.mood} />
        ))}
      </svg>
    </div>
  );
};
