/**
 * Copy for the product and "How we work" sub-pages (ADR-0041):
 * /ai-employees, /workflows, /integrations, /security, /ai-transformation,
 * /bootcamp. Uses only facts already on the site (platform.ts, home.ts,
 * deployment.ts). No certifications or connectors beyond those listed there.
 */

import type { Profile, WalkStep } from "@/components/sections/shared/depth-sections";
import { HOME_EMPLOYEES } from "@/data/home";

type Item = { title: string; body: string };
type Faq = { q: string; a: string };
type Page = {
  path: string;
  name: string;
  meta: { title: string; description: string };
  h1: string;
  sub: string;
  faq: readonly Faq[];
  cta: { heading: string; sub: string };
};

/* ---------------------------------------------------------------- AI employees */

export const AI_EMPLOYEES: Page & {
  how: { label: string; heading: string; steps: readonly Item[] };
  good: { label: string; heading: string; items: readonly Item[] };
  compare: { label: string; heading: string; items: readonly Item[] };
} = {
  path: "/ai-employees",
  name: "AI employees",
  meta: {
    title: "AI Employees: AI Agents for Sales, Quality and Ops",
    description:
      "Xura's AI employees are AI agents that draft sales reviews, track quality issues, build leadership decks and run hiring, on your data. You approve every output.",
  },
  h1: "AI employees that do the work, and wait for your approval",
  sub: "Each AI employee is an AI agent with one job: a sales review, quality issue tracking, a leadership deck, hiring. It works on your data and in your channels, and nothing goes out until you approve it.",
  how: {
    label: "How they work",
    heading: "A teammate you can ask, not a chatbot",
    steps: [
      { title: "Connected to your data", body: "Reads your ERP, CRM, spreadsheets and documents through the Xura knowledge graph." },
      { title: "Does one job well", body: "Each one owns a job, like the monthly sales review, and knows the numbers and terms behind it." },
      { title: "Drafts, then asks", body: "Drafts land in WhatsApp, Slack, Microsoft Teams or email as messages you approve." },
      { title: "Shows its working", body: "Every number links to its source, so you can check it before you sign off." },
    ],
  },
  good: {
    label: "What they're good at",
    heading: "The recurring work that eats your week",
    items: [
      { title: "Monthly reviews", body: "Pulls the numbers from your ERP and CRM and drafts the review." },
      { title: "Issue tracking", body: "Tracks open quality and operations issues across teams and flags what's overdue." },
      { title: "Leadership decks", body: "Turns the month's numbers into a deck for leadership." },
      { title: "Hiring", body: "Runs your hiring pipeline: where candidates drop off, this week's interviews, summaries." },
      { title: "Briefs and updates", body: "Weekly updates and briefs for the people who need them, in the channel they use." },
      { title: "Answers on demand", body: "Ask a question in plain language and get the answer with its sources." },
    ],
  },
  compare: {
    label: "AI employees vs other options",
    heading: "Why not a chatbot or a new hire?",
    items: [
      { title: "AI employee", body: "Owns a job, works on your connected data, drafts the output and waits for your approval." },
      { title: "Generic AI chatbot", body: "Answers what you paste in. Doesn't know your systems or own any recurring work." },
      { title: "Another hire", body: "Months to recruit and onboard, and the same manual rebuilding every cycle." },
    ],
  },
  faq: [
    { q: "Is an AI employee the same as an AI agent?", a: "Yes. We call them AI employees because each one has a job and a name, and your team works with it like a teammate." },
    { q: "Can an AI employee act without approval?", a: "No. Every output waits for your approval. You decide which jobs earn the right to run on their own." },
    { q: "Who sets them up?", a: "Our deployment team builds them around your processes during a deployment, then hands them over to your team." },
  ],
  cta: { heading: "Meet your first AI employee now.", sub: "Start with a 2-day bootcamp. See it live in 2 weeks." },
};

/* ---------------------------------------------------------------- Workflows */

export const WORKFLOWS: Page & {
  parts: { label: string; heading: string; lead: string; steps: readonly Item[] };
  why: { label: string; heading: string; items: readonly Item[] };
  examples: { label: string; heading: string; items: readonly Item[] };
  compare: { label: string; heading: string; items: readonly Item[] };
} = {
  path: "/workflows",
  name: "Workflows",
  meta: {
    title: "Agentic AI Workflow Automation, with Approvals",
    description:
      "Agentic workflows on Xura: triggers, data, AI steps, conditions, approvals and actions on one canvas, built by our team. See it live in 2 weeks.",
  },
  h1: "AI workflow automation, with a person in the loop",
  sub: "Agentic workflows watch your data, explain what changed and draft the next step. Our team builds them around your processes, and nothing runs without your approval.",
  parts: {
    label: "How a workflow is built",
    heading: "Six kinds of step on one canvas",
    lead: "Every workflow is made of the same building blocks, so you can read exactly what it will do.",
    steps: [
      { title: "Trigger", body: "A schedule, an event like a new deviation, or a metric crossing a threshold." },
      { title: "Data", body: "Pulls the records it needs from your connected systems." },
      { title: "AI step", body: "Investigates, summarises or drafts, with the sources behind it." },
      { title: "Condition", body: "Branches on what it found, like severity or value." },
      { title: "Approval", body: "Waits for the right person to approve before going on." },
      { title: "Action", body: "Creates the record, sends the message or updates the system." },
    ],
  },
  why: {
    label: "What makes it agentic",
    heading: "Workflows that think, then wait for you",
    items: [
      { title: "Monitors that never sleep", body: "A threshold on any metric, or suggested from your goals. Xura checks continuously and alerts the moment something moves." },
      { title: "Signals from inside and out", body: "Internal data joined with market, competitor and customer signals, so you see why a number moved." },
      { title: "Recommendations with receipts", body: "Every recommendation shows the sources and numbers behind it, with the next action ready to approve." },
    ],
  },
  examples: {
    label: "Examples",
    heading: "Workflows our team builds",
    items: [
      { title: "Deviation to CAPA", body: "A deviation is raised, the batch record is checked, the root cause drafted and the CAPA sent to QA for approval." },
      { title: "Monthly sales review", body: "On the first of the month, numbers are pulled from the ERP and CRM and the review drafted for sign-off." },
      { title: "Renewal risk", body: "Renewals due in 90 days are scored and owners get the save plan to approve." },
      { title: "Billing exceptions", body: "Failed payments and invoice errors are grouped and routed to the right person." },
      { title: "Overdue issue alerts", body: "Open quality and operations issues past their date are flagged to the shift lead on WhatsApp." },
      { title: "Weekly leadership update", body: "Every Friday the week's numbers become a short update, approved before it goes out." },
    ],
  },
  compare: {
    label: "Agentic workflows vs rule-based automation",
    heading: "Why not RPA or a no-code automation tool?",
    items: [
      { title: "Xura workflows", body: "AI steps that read and reason over your data, approvals built in, and a team that builds them with you." },
      { title: "RPA bots", body: "Copy clicks between screens. Break when a screen changes and can't explain anything." },
      { title: "No-code automation tools", body: "Move data between apps on fixed rules. You still build, judge and maintain every step." },
    ],
  },
  faq: [
    { q: "What is an agentic workflow?", a: "A workflow with AI steps that read your data, reason about it and draft the next action, alongside the usual triggers, conditions and actions." },
    { q: "Do workflows run on their own?", a: "Only when you let them. Approval steps wait for a person, and you decide which workflows earn the right to run on their own." },
    { q: "Who builds the workflows?", a: "Our deployment team builds them around your processes, then hands them over to run on Xura." },
    { q: "How are workflows different from apps?", a: "A workflow runs on a trigger or schedule. An app is a place where your team works through records together. Many deployments use both." },
  ],
  cta: { heading: "Build your first workflow now.", sub: "Start with a 2-day bootcamp. See it live in 2 weeks." },
};

/* ---------------------------------------------------------------- Integrations */

export const INTEGRATIONS: Page & {
  groups: { label: string; heading: string; lead: string; items: readonly { title: string; tools: readonly string[] }[] };
  how: { label: string; heading: string; items: readonly Item[] };
} = {
  path: "/integrations",
  name: "Integrations",
  meta: {
    title: "Integrations: SAP, Salesforce, Snowflake and 50+ More",
    description:
      "Xura connects over MCP and 50+ native integrations: SAP, Salesforce, HubSpot, Snowflake, BigQuery, Postgres, SharePoint, Notion and Excel. No ETL to build.",
  },
  h1: "Connect your systems once. No ETL to build.",
  sub: "Xura connects over MCP and 50+ native integrations, and joins your data into one live knowledge graph that your AI employees, workflows and apps all share.",
  groups: {
    label: "What Xura connects to",
    heading: "Your ERP, CRM, warehouse and files",
    lead: "A selection of the systems Xura connects to. Ask us about yours.",
    items: [
      { title: "ERP and CRM", tools: ["SAP", "Oracle", "Salesforce", "HubSpot", "Zoho", "Odoo"] },
      { title: "Data warehouses and databases", tools: ["Snowflake", "BigQuery", "Databricks", "Redshift", "Postgres", "MySQL", "MongoDB"] },
      { title: "Documents and files", tools: ["SharePoint", "Notion", "Confluence", "Google Drive", "Google Sheets", "Dropbox", "Airtable", "Excel", "PDFs and decks"] },
      { title: "Where your team works", tools: ["WhatsApp", "Slack", "Microsoft Teams", "Gmail", "Google Calendar", "Email"] },
      { title: "Tickets, BI and payments", tools: ["Jira", "Asana", "Zendesk", "Tableau", "Looker", "Stripe", "Razorpay", "QuickBooks"] },
      { title: "Anything with MCP", tools: ["Model Context Protocol servers", "AWS", "Google Cloud"] },
    ],
  },
  how: {
    label: "How it connects",
    heading: "One knowledge graph, always in sync",
    items: [
      { title: "Every shape of data", body: "Rows in Snowflake or SAP, JSON in Postgres, and PDFs, decks and Excel notes, reconciled against your business terms." },
      { title: "One live knowledge graph", body: "Entities, relationships, metrics and owners resolve into a single graph, so 'top at-risk accounts' means the same thing to every team." },
      { title: "Always in sync", body: "New rows, files and schemas flow in continuously. Ask again tomorrow and the answer reflects today." },
      { title: "Your permissions carry over", body: "Row-level access carries through to every answer, dashboard and action." },
      { title: "Queries run at the source", body: "Queries execute inside your VPC or warehouse. No shadow copies of your tables." },
      { title: "Revocable at any time", body: "Disconnect a source and its graph nodes disappear. No residual data, no clean-up." },
    ],
  },
  faq: [
    { q: "Does Xura integrate with SAP?", a: "Yes. SAP is one of Xura's native integrations, alongside Salesforce, HubSpot, Snowflake, BigQuery, Postgres, SharePoint and Notion." },
    { q: "What is MCP?", a: "The Model Context Protocol, an open standard for connecting AI to systems. Xura connects to any system that exposes an MCP server." },
    { q: "Do we need to build a data pipeline first?", a: "No. Xura connects directly to your systems and files. There's no ETL to build." },
    { q: "Our system isn't listed. Can you connect it?", a: "Most likely. Our deployment team connects the systems your workflow needs as part of the deployment." },
  ],
  cta: { heading: "Connect your systems now.", sub: "Start with a 2-day bootcamp. See it live in 2 weeks." },
};

/* ---------------------------------------------------------------- Security */

export const SECURITY: Page & {
  controls: { label: string; heading: string; items: readonly Item[] };
  hosting: { label: string; heading: string; items: readonly Item[] };
} = {
  path: "/security",
  name: "Security",
  meta: {
    title: "Security: Approvals, Audit Logs, Your Data Stays Yours",
    description:
      "How Xura keeps your data safe: queries run in your VPC, no raw data stored, row-level permissions, audit logs, and nothing runs without approval.",
  },
  h1: "Your data stays yours. Every action waits for you.",
  sub: "Xura is built for regulated companies: queries run where your data lives, nothing is stored that doesn't need to be, and every action is approved and logged.",
  controls: {
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
  },
  hosting: {
    label: "Where Xura runs",
    heading: "Run it where your data has to stay",
    items: [
      { title: "Xura cloud", body: "We host and run it for you. Nothing to install, and updates arrive automatically." },
      { title: "Your cloud (VPC)", body: "Xura runs inside your own cloud account. Your data stays in your network, behind your controls." },
      { title: "On your premises", body: "Installed on your own infrastructure, for regulated sites and strict data-residency rules." },
    ],
  },
  faq: [
    { q: "Does Xura train models on our data?", a: "No. Your data never trains a model." },
    { q: "Does Xura copy our data?", a: "No raw data is stored. Only graph structures and learned patterns persist; no tables, no rows, no shadow copies." },
    { q: "Can Xura run on our own infrastructure?", a: "Yes. Xura can run in our cloud, inside your own cloud account (VPC), or on your own servers." },
    { q: "Can we see what Xura did?", a: "Yes. Audit logs record every prompt, tool call and side-effect, and every chart shows its query." },
  ],
  cta: { heading: "Start your security review now.", sub: "We walk your team through hosting, data and approvals during the bootcamp." },
};

/* ---------------------------------------------------------------- AI transformation */

export const TRANSFORMATION: Page & {
  problem: { label: string; heading: string; items: readonly Item[] };
  approach: { label: string; heading: string; steps: readonly Item[] };
  compare: { label: string; heading: string; items: readonly Item[] };
} = {
  path: "/ai-transformation",
  name: "AI transformation",
  meta: {
    title: "AI Transformation for Pharma and Manufacturing",
    description:
      "AI transformation, built for your business. Our team finds the work AI should be doing and custom-builds the apps and workflows. Live in 2 weeks.",
  },
  h1: "AI transformation, one job at a time",
  sub: "For operations, sales, quality and IT teams in pharma and manufacturing. Our team finds the work AI should be doing, then custom-builds the apps and workflows that do it.",
  problem: {
    label: "Why AI projects stall",
    heading: "The problem isn't the AI",
    items: [
      { title: "Scattered data", body: "Numbers live in the ERP, the CRM and a dozen spreadsheets that never agree." },
      { title: "Manual work", body: "Monthly reviews, decks and approvals are rebuilt by hand, every cycle." },
      { title: "No AI team", body: "There's no one in-house whose job is to make AI work." },
    ],
  },
  approach: {
    label: "Our approach",
    heading: "Prove it, build it, then add the next job",
    steps: [
      { title: "Prove it", body: "A two-day bootcamp on your own data." },
      { title: "Embed", body: "Your deployment lead maps your systems and picks one workflow." },
      { title: "Build on Xura", body: "Built on the platform, with no side code to maintain." },
      { title: "Go live", body: "See it live in 2 weeks." },
      { title: "Expand", body: "We add the next job every quarter, reusing what's already built." },
      { title: "Hand over", body: "Your team runs it. Every output waits for approval." },
    ],
  },
  compare: {
    label: "Partner or build in-house?",
    heading: "Get a platform and a team",
    items: [
      { title: "Xura", body: "Our platform and our deployment team. Every build reuses what already works." },
      { title: "Agencies and IT services", body: "People, but every build starts from zero." },
      { title: "Software alone", body: "A platform, but you have to make it fit." },
    ],
  },
  faq: [
    { q: "Where should we start?", a: "With one job that's rebuilt by hand every cycle. The 2-day bootcamp finds it and shows it working on your data." },
    { q: "How long until we see results?", a: "You see it live in about 2 weeks after the bootcamp, then we add the next job every quarter." },
    { q: "Do we need an AI team?", a: "No. Our deployment team does the build. Your team owns the process and approves the outputs." },
  ],
  cta: { heading: "Start your AI transformation now.", sub: "One job, on your own data. Start with a 2-day bootcamp. See it live in 2 weeks." },
};

/* ---------------------------------------------------------------- Bootcamp */

export const BOOTCAMP: Page & {
  days: { label: string; heading: string; steps: readonly Item[] };
  get: { label: string; heading: string; items: readonly Item[] };
} = {
  path: "/bootcamp",
  name: "Bootcamp",
  meta: {
    title: "2-Day AI Bootcamp on Your Own Data",
    description:
      "In two days our team maps where your work gets stuck, picks the process AI can improve, and shows it working on your own data, before you commit.",
  },
  h1: "The 2-day AI bootcamp on your own data",
  sub: "See an AI agent working on a real process, on your own data, before you commit to anything more.",
  days: {
    label: "The two days",
    heading: "What happens in the bootcamp",
    steps: [
      { title: "Day 1: find the work", body: "Map where your work gets stuck and pick the process to start with." },
      { title: "Day 2: see it working", body: "See it working on your data, and agree what going live takes." },
      { title: "After: live in 2 weeks", body: "If you go ahead, your deployment lead builds it and you see it live in about 2 weeks." },
    ],
  },
  get: {
    label: "What you leave with",
    heading: "Proof, not a slide deck",
    items: [
      { title: "A working demo on your data", body: "One process, working on your own systems, that your team has seen run." },
      { title: "A clear first job", body: "The process to start with, agreed with the people who own it." },
      { title: "A plan to go live", body: "What going live takes: systems, people and timeline." },
    ],
  },
  faq: [
    { q: "What does the bootcamp cost?", a: "It depends on your company and the job we start with. Book a call and we'll quote it. If you go ahead, the fee is credited to your deployment." },
    { q: "What do we need to bring?", a: "Access to the systems the process uses, and a person who owns the process and can answer questions." },
    { q: "Is it on site?", a: "Our team works with yours where the work happens." },
    { q: "What happens after the bootcamp?", a: "If you go ahead, you see it live in about 2 weeks, and we add the next job every quarter." },
  ],
  cta: { heading: "Book your 2-day bootcamp now.", sub: "Two days with our team, on your own data. See it live in 2 weeks." },
};

/* ======================================================================
 * Depth content (ADR-0042): walkthroughs, profiles, checklists, diagrams.
 * Same fact base as above. Items marked CONFIRM need owner sign-off.
 * ==================================================================== */


const shotOf = (name: string) => HOME_EMPLOYEES.jobs.find((j) => j.name === name)!.shot;

/* ---------- AI employees */

export const AE_PROFILES: { label: string; heading: string; lead: string; profiles: readonly Profile[] } = {
  label: "Meet the team",
  heading: "Four AI employees, four recurring jobs",
  lead: "Each one is built around a job your team already does by hand, on the systems that job already uses.",
  profiles: [
    {
      name: "Nora",
      role: "Chief of Staff",
      job: "Monthly sales review",
      body: "On the first working day of the month, Nora pulls the month's numbers, compares them to target and last month, and drafts the review with the reasons behind each movement.",
      reads: "ERP sales and invoices, CRM pipeline, the targets spreadsheet",
      produces: "A one-page review with headline numbers, movers and a short commentary",
      approves: "The sales head, before it goes to leadership",
      shot: shotOf("Nora"),
    },
    {
      name: "Meera",
      role: "QA Investigation",
      job: "Quality and operations issue tracking",
      body: "Meera keeps one list of every open deviation, complaint and CAPA across sites, chases what's overdue and writes the brief for the weekly quality meeting.",
      reads: "Deviation and CAPA records, batch records, site trackers in Excel",
      produces: "A situation brief with the open risks, owners and what's blocking",
      approves: "The QA head, and each owner for their own items",
      shot: shotOf("Meera"),
    },
    {
      name: "Ezra",
      role: "Marketing Associate",
      job: "Leadership decks",
      body: "Ezra turns the month's numbers into the deck leadership reviews: same structure every month, updated charts, and speaker notes for the presenter.",
      reads: "The approved monthly reviews, dashboards and last month's deck",
      produces: "A branded slide deck with charts and speaker notes",
      approves: "Whoever presents it",
      shot: shotOf("Ezra"),
    },
    {
      name: "Kira",
      role: "Recruiting Coordinator",
      job: "Hiring",
      body: "Kira runs the hiring pipeline app: where candidates drop off, this week's interviews, and a short summary of each candidate before the interview.",
      reads: "Applications, interview calendar, interviewer feedback",
      produces: "Pipeline overview, interview schedule and candidate summaries",
      approves: "The hiring manager, before anything reaches a candidate",
      shot: shotOf("Kira"),
    },
  ],
};

export const AE_DAY: { label: string; heading: string; lead: string; steps: readonly WalkStep[] } = {
  label: "A day with Meera",
  heading: "How an AI employee fits into a quality team's day",
  lead: "An example day. Every step runs on your systems, and every message waits for a person before it goes anywhere.",
  steps: [
    { tag: "07:30", title: "Checks what changed overnight", body: "New deviations, complaints and CAPA updates across every site are pulled into one list.", reads: "Deviation and CAPA records, site trackers", makes: "An updated open-issues list" },
    { tag: "08:00", title: "Flags what's overdue", body: "Three CAPAs are past their due date. Meera drafts a reminder for each owner.", makes: "Reminders, waiting for approval" },
    { tag: "08:05", title: "You approve in WhatsApp", body: "The QA head reads the three reminders on their phone, edits one, and approves.", gate: true },
    { tag: "11:00", title: "Answers a question", body: "\"Which line had the most deviations this quarter?\" Meera answers with the number and links to the records behind it.", reads: "Deviation history", makes: "An answer with sources" },
    { tag: "16:00", title: "Drafts the weekly brief", body: "Open risks, owners, what's blocking and what changed this week, ready for Friday's quality meeting.", makes: "A situation brief" },
    { tag: "16:30", title: "Brief approved and shared", body: "The QA head approves the brief and it goes to the meeting invitees on Teams.", gate: true },
  ],
};

/* ---------- Workflows */

export const WF_WALK: { label: string; heading: string; lead: string; steps: readonly WalkStep[] } = {
  label: "One workflow, step by step",
  heading: "Deviation to CAPA",
  lead: "A pharma quality workflow our team builds. Read each step to see exactly what it touches and what it produces.",
  steps: [
    { tag: "Trigger", title: "Deviation raised", body: "A new deviation is logged against a batch.", reads: "The deviation record" },
    { tag: "Data", title: "Pull the batch record", body: "Gathers the batch record and test results for the affected batch.", reads: "MES batch record, LIMS results", makes: "One view of the batch" },
    { tag: "AI step", title: "Investigate the root cause", body: "Compares the batch with similar past deviations and drafts the likely root cause, with the evidence behind it.", reads: "Past deviations and CAPAs", makes: "A draft investigation with sources" },
    { tag: "Condition", title: "Is it critical?", body: "Branches on severity. Minor deviations alert the shift lead; critical ones go to QA." },
    { tag: "Approval", title: "QA head approves the CAPA", body: "The QA head reviews the investigation and proposed CAPA, edits if needed, and approves.", gate: true },
    { tag: "Action", title: "Create the CAPA", body: "The approved CAPA is created in the quality system with owner and due date, and the shift lead is told on WhatsApp.", makes: "A CAPA record, and an alert" },
  ],
};

export const WF_TEMPLATES = {
  label: "By team",
  heading: "Workflows our team builds, by team",
  items: [
    { title: "Quality", body: "Deviation to CAPA · Overdue CAPA chasing · Complaint trending · Weekly quality brief" },
    { title: "Operations", body: "Plant performance review · Downtime alerts with likely cause · Shift handover summary" },
    { title: "Sales", body: "Monthly sales review · Renewal risk with save plan · Pipeline hygiene reminders" },
    { title: "Finance", body: "Billing exceptions queue · Month-end variance commentary · Overdue invoice follow-up" },
    { title: "Leadership", body: "Weekly leadership update · Monthly deck · Board pack first draft" },
    { title: "People", body: "Hiring pipeline updates · Interview summaries · Onboarding checklist chasing" },
  ],
} as const;

/* ---------- Integrations */

export const INT_CONNECTORS = {
  label: "What Xura does with each",
  heading: "Connected for a reason, not just connected",
  items: [
    { title: "SAP", body: "Orders, invoices, inventory and production numbers for reviews, variance commentary and plant performance." },
    { title: "Salesforce and HubSpot", body: "Pipeline, accounts and renewals for sales reviews, renewal risk and expansion signals." },
    { title: "Snowflake, BigQuery, Postgres", body: "Your warehouse tables, queried where they live, joined to the knowledge graph." },
    { title: "SharePoint and Notion", body: "SOPs, reports, decks and notes, read so answers use your own definitions and history." },
    { title: "Excel", body: "The trackers and targets your team actually keeps, reconciled with the systems of record." },
    { title: "WhatsApp, Slack, Teams, email", body: "Where drafts arrive and approvals happen, so your team doesn't need another tool." },
  ],
} as const;

export const INT_GRAPH = {
  label: "From question to answer",
  heading: "How a question becomes an answer",
  lead: "Ask \"Which customers are at risk of not renewing?\" and this is what happens.",
  points: [
    { title: "Understands your terms", body: "\"At risk\" and \"customer\" resolve to the definitions your teams agreed, from the knowledge graph." },
    { title: "Queries at the source", body: "The query runs inside your CRM and warehouse, with your permissions. No copies are made." },
    { title: "Joins what belongs together", body: "The same customer in Salesforce, SAP and an Excel tracker is recognised as one." },
    { title: "Answers with receipts", body: "You get the list, the reasons, and a link to every number's source." },
  ],
} as const;

/* ---------- Security */

export const SEC_FLOW = {
  label: "Where your data goes",
  heading: "Your data stays where it lives",
  lead: "What stays in your network, what Xura keeps, and what your people see.",
  points: [
    { title: "Queries run in your systems", body: "Xura sends the query to your VPC or warehouse. Rows are read there and never copied out to a store of ours." },
    { title: "Only structure is kept", body: "Graph structures and learned patterns persist; no tables, no rows, no shadow copies." },
    { title: "People see what they're allowed to", body: "Row-level access carries through to every answer, dashboard and action." },
    { title: "Every step is logged", body: "Audit logs record every prompt, tool call and side-effect." },
  ],
  zones: [
    { title: "Your network", tag: "Stays here", items: ["ERP, CRM, warehouse", "Files and documents", "Queries execute here", "Your roles and permissions"] },
    { title: "Xura", tag: "Kept", items: ["Graph structure", "Learned patterns", "Encrypted prompts and results", "Audit log"] },
    { title: "Your people", tag: "Approve", items: ["Drafts to approve", "Answers with sources", "WhatsApp, Slack, Teams"] },
  ],
} as const;

export const SEC_REVIEW = {
  label: "For your security review",
  heading: "What your security team will ask, answered",
  lists: [
    { title: "Data", items: ["No raw data stored, no shadow copies", "Your data never trains a model", "Encrypted in transit and at rest", "Isolated per tenant", "Disconnect a source and its data disappears"] },
    { title: "Access and control", items: ["Row-level permissions carried through", "Nothing runs without approval", "You choose which workflows run on their own", "Audit log of every prompt, tool call and side-effect"] },
    { title: "Hosting", items: ["Xura cloud", "Your own cloud account (VPC)", "Your own servers, on premises", "Set up by our team with yours"] },
  ],
} as const;

/* ---------- AI transformation */

export const TR_TIMELINE: { label: string; heading: string; lead: string; steps: readonly WalkStep[] } = {
  label: "Your first 90 days",
  heading: "What AI transformation looks like in practice",
  lead: "One job at a time, each built on what's already there.",
  steps: [
    { tag: "Days 1–2", title: "Bootcamp", body: "We map where your work gets stuck, pick the first job, and show it working on your own data." },
    { tag: "Week 1", title: "Your deployment lead embeds", body: "They map the systems and people involved and agree what to build with you.", makes: "An agreed first job" },
    { tag: "Week 2", title: "Live", body: "The first app or workflow is live on your systems. Every output waits for approval.", makes: "Your first live AI job" },
    { tag: "Weeks 3–12", title: "Tune and hand over", body: "We tune it with your team until it runs without us, and your team learns to change it in chat." },
    { tag: "Every quarter", title: "The next job", body: "We add the next one, reusing the connections and knowledge already built." },
  ],
};

export const TR_FIRST_JOBS = {
  label: "Where to start",
  heading: "Good first jobs, by team",
  lead: "The best first job is one that's rebuilt by hand every cycle and everyone agrees is painful.",
  items: [
    { title: "Operations", body: "The monthly plant performance review, pulled from SAP and the site trackers." },
    { title: "Quality", body: "One list of open deviations and CAPAs across sites, with overdue items chased." },
    { title: "Sales", body: "The monthly sales review, drafted from the ERP and CRM." },
    { title: "IT", body: "Connecting the ERP, CRM and spreadsheets once, so every team's AI job reuses it." },
    { title: "Leadership", body: "The monthly leadership deck, built from the approved reviews." },
    { title: "People", body: "The hiring pipeline: where candidates drop off and this week's interviews." },
  ],
} as const;

/* ---------- Bootcamp (agenda detail: CONFIRM with owner) */

export const BC_AGENDA: { label: string; heading: string; lead: string; steps: readonly WalkStep[] } = {
  label: "The agenda",
  heading: "Two days, on your own data",
  lead: "An outline of the two days. We tailor it to your team before we arrive.",
  steps: [
    { tag: "Day 1 · Morning", title: "Where the work gets stuck", body: "Short sessions with the people who do the work: which reviews, reports and follow-ups are rebuilt by hand." },
    { tag: "Day 1 · Afternoon", title: "Pick the first job", body: "We score the candidates on pain, data access and value, and agree one to start with.", makes: "The first job, agreed" },
    { tag: "Day 2 · Morning", title: "Connect and build", body: "We connect the systems that job needs and build it on Xura, with your process owner beside us.", reads: "Your systems, with your access" },
    { tag: "Day 2 · Afternoon", title: "See it working", body: "Your team sees the job run on your data and approves its first output.", gate: true },
    { tag: "Day 2 · Close", title: "Agree what going live takes", body: "Systems, people and timeline for going live in about 2 weeks.", makes: "A plan to go live" },
  ],
};

export const BC_PREP = {
  label: "Before we arrive",
  heading: "Who to bring and what to prepare",
  lists: [
    { title: "Who should be there", items: ["A sponsor who can decide to go ahead", "The owner of the process we'll start with", "Two or three people who do the work today", "Someone from IT who can grant access"] },
    { title: "What to prepare", items: ["A shortlist of painful recurring jobs", "Access to the systems those jobs use", "Recent examples of the output, like last month's review", "A room and two half-days of the team's time"] },
  ],
} as const;
