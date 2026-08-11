import { Inview } from "@/components/animation/springs/in-view";
import { KnowledgeGraph } from "@/components/graphics/knowledge-graph";

const ITEMS: { title: string; body: string }[] = [
  {
    title: "Connect once, over MCP",
    body: "Xura speaks MCP and 50+ native integrations: Snowflake, BigQuery, Postgres, Salesforce, HubSpot, SAP, SharePoint, Notion, and the Excel on your laptop. Point it once, no ETL to build.",
  },
  {
    title: "Understand every shape of data",
    body: "Structured rows in Snowflake or SAP, semi-structured JSON in Postgres, and unstructured PDFs, decks, and Excel notes. Xura parses them all and reconciles them against your business terms.",
  },
  {
    title: "One live knowledge graph",
    body: "Entities, relationships, metrics, and owners resolve into a single graph. Xura ranks nodes by business priority so 'top at-risk accounts' means the same thing to Sales, Finance, and your CEO.",
  },
  {
    title: "Sync, seamlessly",
    body: "After the one-time setup, changes flow in continuously: new rows, new files, new schemas. Ask again tomorrow and the answer reflects today's reality.",
  },
];

export const Features = () => (
  <section id="features" className="bg-background py-20 md:py-24">
    <div className="shell">
      <Inview
        tag="h2"
        mode="once"
        from={{ opacity: 0, y: 18 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="display-sans mx-auto max-w-[32ch] text-center"
      >
        One-time setup. A living knowledge graph across every source.
      </Inview>
      <Inview
        tag="p"
        mode="once"
        delayIn={80}
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="mx-auto mt-4 max-w-[62ch] text-center text-sm leading-relaxed text-muted"
      >
        Connect Xura once, over MCP or a native integration, from an Excel
        sheet to Snowflake to SAP. Xura reads structured rows, unstructured
        docs, and everything in between, and keeps them in sync as your
        business changes.
      </Inview>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Inview
          mode="once"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 170, friction: 28 }}
          className="relative"
          data-slot="features-visual"
        >
          {/* features-visual slot, animated context-graph illustration. */}
          <div className="aspect-[4/3] w-full rounded-sm bg-band-mist/50 p-4 md:p-6">
            <KnowledgeGraph className="h-full w-full" />
          </div>
        </Inview>

        <div>
          <ul>
            {ITEMS.map((item, i) => (
              <Inview
                key={item.title}
                tag="li"
                mode="once"
                delayIn={i * 80}
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 180, friction: 27 }}
                className="border-t border-line py-5 first:border-t-0 first:pt-0"
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.body}</p>
              </Inview>
            ))}
          </ul>

        </div>
      </div>
    </div>
  </section>
);
