import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ArcField } from "@/components/graphics/arc-field";
import {
  MergedEntityCard,
  RelationshipCard,
} from "@/components/graphics/entity-cards";
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
  <section id="features" className="bg-background pb-20 pt-4 md:pb-24 md:pt-8">
    <div className="shell">
      <Inview
        tag="p"
        mode="once"
        from={{ opacity: 0, y: 14 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="meta text-center"
      >
        Grounded in your data
      </Inview>
      <Inview
        tag="h2"
        mode="once"
        delayIn={40}
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
          className="grain relative isolate overflow-hidden rounded-3xl bg-brand-ink px-5 py-10 sm:px-10 sm:py-14 md:pb-28 md:pr-36"
          data-slot="features-visual"
        >
          <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />
          {/* Graph stays still: the floating AiOrb docks into it by measuring
              its live rect, so no scroll transform on this panel. */}
          <div className="aspect-[4/3] w-full rounded-2xl bg-background p-4 shadow-product md:p-6">
            <KnowledgeGraph className="h-full w-full" />
          </div>

          <div className="absolute right-3 top-3 z-10 hidden origin-top-right scale-[0.8] md:block xl:scale-90">
            <SpringTrigger from={{ y: 20 }} to={{ y: -30 }}>
              <MergedEntityCard />
            </SpringTrigger>
          </div>
          <div className="absolute bottom-3 left-3 z-10 hidden origin-bottom-left scale-[0.8] md:block xl:scale-90">
            <SpringTrigger from={{ y: 30 }} to={{ y: -20 }}>
              <RelationshipCard />
            </SpringTrigger>
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
