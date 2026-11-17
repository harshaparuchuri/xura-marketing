/**
 * Point-of-view essays and answer blocks for existing pages (ADR-0046).
 * Essays argue a position (structure reference: wonderful.ai/ai-transformation,
 * not its words). Answers are 40–60 word definitions phrased as the search.
 * No outcome numbers; the only statistic is the MIT NANDA figure already cited.
 */
import type { Answer, Essay, RelatedLink } from "@/components/sections/shared/content-blocks";

export const ANSWERS: Record<string, Answer> = {
  aiEmployees: {
    q: "What is an AI employee?",
    a: "An AI employee is an AI agent that owns one recurring job, such as the monthly sales review or deviation tracking. It works on your connected business data on a schedule, follows your playbooks, and sends its drafts to a named person, who approves them before anything goes out.",
  },
  workflows: {
    q: "What is agentic workflow automation?",
    a: "Agentic workflow automation combines the usual triggers, conditions and actions with AI steps that read your data, reason about it and draft the next action. Approval steps let a person decide before anything changes, so the workflow handles judgement work, not just fixed rules.",
  },
  integrations: {
    q: "How does Xura connect to our systems?",
    a: "Xura connects over MCP and 50+ native integrations, or reads uploaded exports. Queries run where your data lives, with your permissions, and the results are joined in one knowledge graph, so your AI employees, workflows and apps share the same definitions and sources.",
  },
  security: {
    q: "Is it safe to connect company data to Xura?",
    a: "Queries run inside your VPC or warehouse and no raw tables are copied out. Only graph structure and learned patterns are kept, your data never trains a model, row-level permissions carry through, and every prompt, tool call and action is logged and needs approval.",
  },
  transformation: {
    q: "What is AI transformation?",
    a: "AI transformation is changing how work gets done by giving recurring jobs, such as reviews, reports and issue tracking, to AI that works on your own data, with people approving the results. It happens one job at a time, each one reusing what the last one connected.",
  },
  bootcamp: {
    q: "What is an AI bootcamp?",
    a: "Xura's AI bootcamp is two days with our team on your own data. On day one we map where work gets stuck and pick the first job; on day two you see it working on your systems and agree what going live takes.",
  },
};

export const ESSAYS: Record<"transformation" | "bootcamp", Essay> = {
  transformation: {
    label: "Our view",
    heading: "AI won't fix a process nobody owns.",
    paragraphs: [
      "Most companies start AI the way they started every software project: pick a tool, run a pilot, wait for adoption. The pilot works in a demo, then stalls, because nobody owns the job it was meant to do and the data it needs is spread across five systems.",
      "AI is different from the software that came before it. A CRM stores information for people to act on. An AI employee does the work itself: it pulls the numbers, drafts the review, chases the overdue CAPA. That means the question isn't which tool to buy. It's which job to hand over first, and who approves the result.",
      "So we start with one job, not a platform roll-out. A job that is rebuilt by hand every cycle, that a named person owns, and that runs on data you already have. We build it, put it live, and only then pick the next one, reusing everything the first one connected.",
    ],
    principlesHeading: "Five principles we work by",
    principles: [
      { title: "Start with a job, not a use-case list", body: "A job has an owner, a cycle and an output. 'The monthly sales review' is a job. 'Use AI in sales' is not." },
      { title: "Keep a person in the loop", body: "Every output is a draft until someone approves it. Trust is earned workflow by workflow, and you decide which ones can run on their own." },
      { title: "Connect once, reuse everywhere", body: "The ERP, CRM and spreadsheets the first job connects are reused by every job after it, so each one is faster than the last." },
      { title: "Show the working", body: "Every number links to its source and every step is logged. If a reviewer can't check it, it doesn't ship." },
      { title: "Long-term partnership", body: "Our team builds it with yours, your team runs it, and we continue to support and extend it." },
    ],
  },
  bootcamp: {
    label: "Why two days",
    heading: "Proof on your data beats a demo on ours.",
    paragraphs: [
      "Every AI vendor has a good demo. The demo uses clean data, a tidy process and a question that was chosen in advance. Your data isn't clean, your process has exceptions, and the question that matters is the one your team asks on a Tuesday afternoon.",
      "The bootcamp exists to close that gap before you commit. In two days, with the people who do the work, we find the job worth starting with and show it running on your own systems. You leave with something you've seen work, not slides.",
    ],
  },
};

export const RELATED: Record<string, readonly RelatedLink[]> = {
  aiEmployees: [
    { href: "/use-cases/monthly-sales-review", label: "Monthly sales review", body: "What Nora does on the first working day." },
    { href: "/use-cases/deviation-investigation", label: "Deviation investigation", body: "What Meera drafts for QA." },
    { href: "/compare/ai-employees-vs-chatbots", label: "AI employees vs chatbots", body: "Why owning a job matters." },
  ],
  workflows: [
    { href: "/use-cases/capa-tracking", label: "CAPA tracking", body: "Daily ageing digests and drafted nudges." },
    { href: "/compare/ai-agents-vs-rpa", label: "AI agents vs RPA", body: "When to use each." },
    { href: "/industries/pharma", label: "AI for pharma", body: "Quality workflows for pharma teams." },
  ],
  integrations: [
    { href: "/security", label: "Security", body: "Queries run where your data lives." },
    { href: "/use-cases/plant-performance-review", label: "Plant performance review", body: "MES and ERP, joined every morning." },
    { href: "/platform", label: "Platform overview", body: "How it all fits together." },
  ],
  security: [
    { href: "/deployment", label: "Deployment options", body: "Xura cloud, your VPC or on premises." },
    { href: "/integrations", label: "Integrations", body: "How Xura connects to your systems." },
    { href: "/workflows", label: "Approvals in workflows", body: "Nothing runs without a person." },
  ],
  transformation: [
    { href: "/compare/partner-led-vs-in-house-ai", label: "Partner-led vs in-house AI", body: "The four ways to do it, compared." },
    { href: "/use-cases", label: "Use cases", body: "Good first jobs, by team." },
    { href: "/deployment", label: "How a deployment works", body: "Each step, who's involved, where it runs." },
  ],
  bootcamp: [
    { href: "/ai-transformation", label: "Our approach", body: "AI transformation, one job at a time." },
    { href: "/deployment", label: "After the bootcamp", body: "How a deployment works." },
    { href: "/use-cases", label: "Use cases", body: "Jobs teams start with." },
  ],
};
