/**
 * FlowBuilderPreview — a coded replica of Xura's flow builder canvas showing
 * one branching flow. Node kinds match the product's flow graph
 * (Xura-main src/server/flows/flowExecutor.js: trigger, data, agent,
 * condition, approval, action). Static, monochrome, decorative. Below `md`
 * the canvas is replaced by a vertical list of the same steps.
 */

type Kind = "Trigger" | "Data" | "AI step" | "Condition" | "Approval" | "Action";
type FlowNode = { id: string; kind: Kind; title: string; x: number; y: number; gate?: boolean };

/** Centres in % of the canvas (16:9). */
const NODES: FlowNode[] = [
  { id: "t", kind: "Trigger", title: "Deviation raised", x: 9, y: 42 },
  { id: "d", kind: "Data", title: "Batch record · MES + LIMS", x: 25, y: 42 },
  { id: "a", kind: "AI step", title: "Investigate root cause", x: 41, y: 42 },
  { id: "c", kind: "Condition", title: "Severity is critical?", x: 57, y: 42 },
  { id: "g", kind: "Approval", title: "QA head approves CAPA", x: 73, y: 22, gate: true },
  { id: "x", kind: "Action", title: "Create CAPA in QMS", x: 89, y: 22 },
  { id: "w", kind: "Action", title: "Alert shift lead on WhatsApp", x: 81, y: 68 },
];

const EDGES: [string, string, string?][] = [
  ["t", "d"],
  ["d", "a"],
  ["a", "c"],
  ["c", "g", "Critical"],
  ["g", "x"],
  ["c", "w", "Minor"],
];

const NODE_W = 13.5; // % of canvas width
const byId = (id: string) => NODES.find((n) => n.id === id)!;

/** Phone list order: the main line, then each branch with its condition label. */
const PHONE_ORDER: [string, string?][] = [["t"], ["d"], ["a"], ["c"], ["g", "Critical"], ["x", "Critical"], ["w", "Minor"]];

const PALETTE: Kind[] = ["Trigger", "Data", "AI step", "Condition", "Approval", "Action"];

export const FlowBuilderPreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`overflow-hidden rounded-2xl bg-background text-foreground shadow-product ${className}`}>
    {/* Builder bar */}
    <div className="flex items-center gap-3 border-b border-line px-5 py-3 text-sm">
      <span className="text-muted">← Flows /</span>
      <span className="font-semibold">Deviation to CAPA</span>
      <span className="ml-3 hidden rounded-full bg-line-soft px-2.5 py-0.5 text-xs text-muted sm:inline">Trigger: Deviation raised</span>
      <span className="ml-auto rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">▶ Run</span>
    </div>

    <div className="grid grid-cols-[1fr] md:grid-cols-[9rem_1fr]">
      {/* Node palette */}
      <ul className="hidden space-y-1.5 border-r border-line p-3 md:block">
        <li className="px-1 pb-1 text-[0.6875rem] text-muted">Add a step</li>
        {PALETTE.map((k) => (
          <li key={k} className="rounded-lg border border-line px-2.5 py-1.5 text-xs">{k}</li>
        ))}
      </ul>

      {/* Canvas */}
      {/* Phones: the same flow as a vertical list of steps (the canvas needs width). */}
      <ol className="space-y-2 p-4 md:hidden">
        {PHONE_ORDER.map(([id, branch]) => {
          const n = byId(id);
          return (
            <li key={id} className={branch ? "pl-5" : ""}>
              {branch ? <p className="mb-1 font-mono text-[0.625rem] text-muted">If {branch.toLowerCase()}</p> : null}
              <div className={`rounded-xl border p-3 ${n.gate ? "border-foreground bg-foreground text-background" : "border-line bg-background"}`}>
                <p className={`font-mono text-[0.625rem] ${n.gate ? "text-background/60" : "text-muted"}`}>{n.kind}</p>
                <p className="mt-0.5 text-sm font-medium">{n.title}</p>
                {n.gate ? <p className="mt-1 text-[0.6875rem] text-background/70">Waits for a person</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden overflow-x-auto md:block">
        <div
          className="relative aspect-[16/9] min-w-[46rem]"
          style={{
            backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
            backgroundSize: "1.1rem 1.1rem",
          }}
        >
          <svg viewBox="0 0 100 56.25" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {EDGES.map(([from, to]) => {
              const a = byId(from);
              const b = byId(to);
              const x1 = a.x + NODE_W / 2;
              const x2 = b.x - NODE_W / 2;
              const y1 = (a.y / 100) * 56.25;
              const y2 = (b.y / 100) * 56.25;
              const mid = x1 + (x2 - x1) / 2;
              return (
                <path
                  key={`${from}-${to}`}
                  d={`M${x1} ${y1} H${mid} V${y2} H${x2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {EDGES.filter((e) => e[2]).map(([from, to, label]) => {
            const a = byId(from);
            const b = byId(to);
            const mid = a.x + NODE_W / 2 + (b.x - NODE_W / 2 - (a.x + NODE_W / 2)) / 2;
            return (
              <span
                key={`${from}-${to}-label`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-background px-2 py-0.5 text-[0.625rem] text-muted"
                style={{ left: `${mid}%`, top: `${(a.y + b.y) / 2}%` }}
              >
                {label}
              </span>
            );
          })}

          {NODES.map((n) => (
            <div
              key={n.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border p-2.5 shadow-product ${
                n.gate ? "border-foreground bg-foreground text-background" : "border-line bg-background"
              }`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, width: `${NODE_W}%` }}
            >
              <p className={`font-mono text-[0.5625rem] ${n.gate ? "text-background/60" : "text-muted"}`}>{n.kind}</p>
              <p className="mt-0.5 text-[0.75rem] font-medium leading-snug">{n.title}</p>
              {n.gate ? <p className="mt-1.5 text-[0.5625rem] text-background/70">Waits for a person</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
