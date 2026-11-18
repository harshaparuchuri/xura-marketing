/**
 * Platform page copy (/platform). Feature content carried over from the old
 * home sections (Features, HowItWorks, Outputs, Recommendations,
 * EnterpriseReady), reframed for the platform + team positioning (ADR-0037).
 */

type Shot = { src: string; alt: string; crop: { x: number; y: number; w: number; h: number } };

export const PLATFORM_HERO = {
  h1: "One platform for AI employees, workflows and apps",
  sub: "Everything our team builds for you runs on Xura: connected to your systems, working where your team works, and waiting for your approval.",
} as const;

export const PLATFORM_CONNECT = {
  label: "Connect",
  heading: "Your systems, joined into one live knowledge graph",
  items: [
    {
      title: "Connect once, over MCP",
      body: "MCP and 50+ native integrations: Snowflake, BigQuery, Postgres, Salesforce, HubSpot, SAP, SharePoint, Notion, and the Excel on your laptop. No ETL to build.",
    },
    {
      title: "Every shape of data",
      body: "Rows in Snowflake or SAP, JSON in Postgres, and PDFs, decks and Excel notes, reconciled against your business terms.",
    },
    {
      title: "One live knowledge graph",
      body: "Entities, relationships, metrics and owners resolve into a single graph, so 'top at-risk accounts' means the same thing to every team.",
    },
    {
      title: "Always in sync",
      body: "New rows, files and schemas flow in continuously. Ask again tomorrow and the answer reflects today.",
    },
  ],
} as const;

export const PLATFORM_ASK = {
  label: "Ask and act",
  heading: "Ask in plain language. The work gets done.",
  steps: [
    { title: "Tell Xura about your business", body: "What you do, your role and the goals that matter this quarter." },
    { title: "Connect the tools you already use", body: "Warehouse, CRM, ERP, Drive, Gmail, Slack and Teams. Xura reads only what you allow." },
    { title: "Get work done from one place", body: "Dashboards, decks, research and briefs one prompt away, plus workflows suggested from your priorities." },
  ],
} as const;

/** Outputs section heading; the cards are the shared `HOME_OUTPUTS` (one per output type). */
export const PLATFORM_OUTPUTS = {
  label: "Outputs",
  heading: "Work you can hand to leadership",
} as const;

/** Xura Apps — built by describing them in chat (product: src/server/custom-apps). */
export const PLATFORM_APPS = {
  label: "Apps",
  heading: "Describe the app you need. Xura builds it.",
  lead: "Tell Xura in plain words what your team should work through. It asks a few questions, then builds a working app on your data that your team can use the same day.",
  points: [
    { title: "Built from a chat", body: "Describe it, answer a couple of questions, publish. Change it later the same way." },
    { title: "Pages your team works in", body: "An overview with the numbers that matter, charts, a pipeline board, a calendar and a detail view for every record." },
    { title: "Ask Xura inside every app", body: "Ask where candidates drop off or which renewals are at risk, without leaving the app." },
    { title: "Yours, not generic", body: "Your brand, your fields, your data, and access only for the people you add." },
  ],
  examples: ["Hiring pipeline", "Renewals desk", "Billing exceptions", "Churn rescue", "Expansion pipeline"],
} as const;

export const PLATFORM_FLOWS = {
  label: "Workflows",
  heading: "Agentic workflows that run your processes",
  lead: "Triggers, data, AI steps, conditions, approvals and actions, wired together on one canvas. Our team builds workflows around your processes, and continues to refine them as your requirements evolve.",
  points: [
    { title: "Monitors that never sleep", body: "A threshold on any metric, or suggested from your goals. Xura checks continuously and alerts the moment something moves." },
    { title: "Signals from inside and out", body: "Internal data joined with market, competitor and customer signals, so you see why a number moved." },
    { title: "Recommendations with receipts", body: "Every recommendation shows the sources and numbers behind it, with the next action ready to approve." },
  ],
} as const;

export const PLATFORM_CHANNELS = {
  label: "Where it works",
  heading: "Approve it from WhatsApp, Slack or Teams",
  body: "Drafts, decks and updates arrive where your team already talks, as messages you approve before anything goes out. The web app is there when you want the full view.",
} as const;

export const PLATFORM_TRUST = {
  label: "Built for trust",
  heading: "Enterprise controls from day one",
  items: [
    { title: "Nothing runs without approval", body: "Every workflow shows its steps, the data it touched and what it will change. You decide which workflows earn the right to run on their own." },
    { title: "Data privacy at the source", body: "Queries execute inside your VPC or warehouse. Prompts and results are encrypted in transit and at rest, isolated per tenant." },
    { title: "Zero raw data stored", body: "Only graph structures and learned patterns persist; no tables, no rows, no shadow copies. Your data never trains a model." },
    { title: "Your permissions, everywhere", body: "Row-level access carries through to every answer, dashboard and action, mirroring the roles you already defined." },
    { title: "Explainable end to end", body: "Every workflow shows its steps and every chart its query. Audit logs record every prompt, tool call and side-effect." },
    { title: "Revocable at any time", body: "Disconnect a source and its graph nodes disappear. No residual data, no clean-up." },
  ],
} as const;

export const PLATFORM_CLOSING = {
  heading: "See the platform on your data now.",
  sub: "Start with a 2-day bootcamp. See it live in 2 weeks.",
} as const;

/** Nav "Platform" dropdown (visual reference: wonderful.ai's mega menu). */
export const PLATFORM_MENU = {
  columns: [
    [
      { label: "Platform overview", href: "/platform", body: "AI employees, workflows and apps on one platform", image: { src: "/assets/product/home.webp", alt: "The Xura home screen with the chat and recent outputs" } },
      { label: "AI employees", href: "/ai-employees", body: "AI agents for sales reviews, quality, decks and hiring", image: { src: "/assets/product/out-brief.webp", alt: "A situation brief drafted by a Xura AI employee" } },
      { label: "Workflows", href: "/workflows", body: "Agentic workflow automation, with approvals built in", image: { src: "/assets/product/workflows.webp", alt: "The Xura Flows screen listing agentic workflows" } },
    ],
    [
      { label: "Apps", href: "/apps", body: "Describe an app in chat, Xura builds it on your data", image: { src: "/assets/product/dashboard.webp", alt: "An app overview with KPIs and a chart" } },
      { label: "Integrations", href: "/integrations", body: "SAP, Salesforce, Snowflake and 50+ more over MCP", image: { src: "/assets/photos/industry-saas.webp", alt: "A developer connecting systems at a desk" } },
      { label: "Security", href: "/security", body: "Approvals, audit logs, your data stays yours", image: { src: "/assets/photos/industry-fintech.webp", alt: "A professional reviewing reports" } },
    ],
  ],
  /** Right-hand feature: Xura Pulse, drawn as a coded crowd (owner, 2026-11-19). */
  feature: {
    kind: "pulse",
    href: "/pulse",
    tag: "New",
    title: "Xura Pulse",
    body: "Test messages, decks, campaigns and prices on up to 200 simulated people before you launch.",
    cta: "See Xura Pulse",
  },
} as const;

/** Bootcamp feature card (How we work menu). */
export const BOOTCAMP_FEATURE = {
  kind: "image",
  href: "/trial",
  title: "Start with a 2-day bootcamp",
  cta: "Book a bootcamp",
  image: { src: "/assets/photos/bootcamp-room.webp", alt: "A small team discussing printed reports around a meeting table" },
} as const;

/** Nav "How we work" dropdown (ADR-0041): the service side of Xura. */
export const HOW_MENU = {
  columns: [
    [
      { label: "AI transformation", href: "/ai-transformation", body: "Our approach: one job at a time, live in 2 weeks", image: { src: "/assets/photos/team-workshop.webp", alt: "A team planning around a whiteboard" } },
      { label: "2-day bootcamp", href: "/bootcamp", body: "See AI working on your own data before you commit", image: { src: "/assets/photos/bootcamp-room.webp", alt: "A team discussing at a meeting table" } },
    ],
    [
      { label: "Deployment", href: "/deployment", body: "Our team on site, in your cloud or on premises", image: { src: "/assets/photos/industry-manufacturing.webp", alt: "A factory floor where a deployment team works on site" } },
      { label: "Use cases", href: "/use-cases", body: "Deviation investigation, sales reviews, plant reviews and more", image: { src: "/assets/product/out-deck.webp", alt: "A leadership deck slide built by Xura" } },
    ],
  ],
  feature: BOOTCAMP_FEATURE,
} as const;
