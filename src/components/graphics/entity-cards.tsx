/**
 * Entity cards — coded stand-ins for the product's Entity Manager, floated on
 * the Features stage: a merged entity (three source tables resolved into one
 * Customer) and a discovered relationship with its confidence. Decorative;
 * the Features copy carries the message. Illustrative values.
 */

const Confidence = ({ value }: { value: number }) => (
  <span className="flex items-center gap-2">
    <span className="h-1.5 w-16 rounded-full bg-line">
      <span
        className="block h-full rounded-full bg-brand-ink"
        style={{ width: `${value * 100}%` }}
      />
    </span>
    <span className="font-mono text-[0.625rem] text-muted">{value.toFixed(2)}</span>
  </span>
);

const SOURCES: { name: string; system: string }[] = [
  { name: "Account", system: "Salesforce" },
  { name: "Client", system: "SAP" },
  { name: "customer_id", system: "Postgres" },
];

export const MergedEntityCard = () => (
  <div className="w-64 rounded-2xl bg-background p-4 shadow-product">
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
      Entity resolved
    </p>
    <ul className="mt-3 space-y-1.5">
      {SOURCES.map((s) => (
        <li
          key={s.name}
          className="flex items-center justify-between rounded-lg bg-band-mist px-2.5 py-1.5 text-[0.6875rem]"
        >
          <span className="font-mono">{s.name}</span>
          <span className="text-muted">{s.system}</span>
        </li>
      ))}
    </ul>
    <div className="my-2 flex justify-center text-muted" aria-hidden>
      <svg viewBox="0 0 24 24" className="size-4" fill="none">
        <path
          d="M12 5v14M6 13l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div className="flex items-center justify-between rounded-lg bg-brand-ink px-3 py-2 text-white">
      <span className="text-xs font-semibold">Customer</span>
      <span className="text-[0.625rem] text-white/70">12,480 records</span>
    </div>
    <div className="mt-2.5 flex items-center justify-between text-[0.6875rem] text-muted">
      <span>Match confidence</span>
      <Confidence value={0.94} />
    </div>
  </div>
);

export const RelationshipCard = () => (
  <div className="w-64 rounded-2xl bg-background p-4 shadow-product">
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
      Relationship found
    </p>
    <p className="mt-2 flex items-center gap-2 text-xs font-semibold">
      <span className="rounded-md bg-band-mist px-2 py-1">Customer</span>
      <span className="text-muted" aria-hidden>
        →
      </span>
      <span className="rounded-md bg-band-mist px-2 py-1">Invoice</span>
    </p>
    <p className="mt-2 text-[0.6875rem] text-muted">
      one-to-many · via <span className="font-mono">customer_id</span>
    </p>
    <div className="mt-3 flex items-center justify-between text-[0.6875rem] text-muted">
      <span>Confidence</span>
      <Confidence value={0.88} />
    </div>
    <p className="mt-3 text-[0.6875rem] text-muted">
      Semantic type: <span className="font-medium text-foreground">revenue</span>
    </p>
  </div>
);
