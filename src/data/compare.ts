/**
 * Comparison pages (/compare/[slug], ADR-0046): high-intent "X vs Y"
 * searches. Fair to the alternatives, no invented statistics; the one
 * external figure (MIT NANDA) is already cited on the site.
 */
import type { Answer, Comparison, RelatedLink } from "@/components/sections/shared/content-blocks";

export type ComparePage = {
  slug: string;
  name: string;
  meta: { title: string; description: string };
  h1: string;
  sub: string;
  answer: Answer;
  table: Comparison;
  choose: { title: string; body: string }[];
  faq: readonly { q: string; a: string }[];
  related: readonly RelatedLink[];
};

export const COMPARE_PAGES: readonly ComparePage[] = [
  {
    slug: "ai-agents-vs-rpa",
    name: "AI agents vs RPA",
    meta: {
      title: "AI Agents vs RPA: Which Should Automate Your Process?",
      description:
        "RPA copies clicks on fixed rules; AI agents read, reason and draft, with a person approving. How they differ, and when to use each.",
    },
    h1: "AI agents vs RPA: what's the difference?",
    sub: "Both automate work. RPA repeats clicks on fixed rules. AI agents read your data, reason about it and draft the next step, with a person approving.",
    answer: {
      q: "What is the difference between AI agents and RPA?",
      a: "RPA (robotic process automation) records and repeats fixed steps across screens, and breaks when a screen or rule changes. An AI agent reads unstructured and structured data, reasons about it, and drafts outputs such as an investigation or a review, with a person approving. RPA suits stable, rule-based tasks; AI agents suit work that needs judgement.",
    },
    table: {
      label: "Side by side",
      heading: "How they compare",
      columns: ["AI agents (Xura)", "RPA bots"],
      rows: [
        { criterion: "How it works", cells: ["Reads data, reasons about it, drafts the next step", "Repeats recorded clicks and keystrokes"] },
        { criterion: "Handles", cells: ["Documents, emails, PDFs, tables and exceptions", "Structured, predictable screens and fields"] },
        { criterion: "When things change", cells: ["Adapts to new formats and wording", "Breaks when a screen or rule changes"] },
        { criterion: "Explains itself", cells: ["Every output shows its sources and steps", "Logs actions, not reasons"] },
        { criterion: "People in the loop", cells: ["Approval steps built in", "Usually runs unattended"] },
        { criterion: "Best for", cells: ["Investigations, reviews, briefs, triage", "High-volume data entry between systems"] },
      ],
    },
    choose: [
      { title: "Choose RPA when", body: "The task is high-volume, the rules never change, and every input looks the same, like copying fields between two systems." },
      { title: "Choose AI agents when", body: "The work needs reading and judgement: deviations, monthly reviews, customer exceptions, anything a person drafts today." },
      { title: "Use both when", body: "An AI agent decides what should happen and a person approves it; a fixed action at the end can be done by any automation, including RPA." },
    ],
    faq: [
      { q: "Will AI agents replace RPA?", a: "Not entirely. RPA still suits stable, rule-based data entry. AI agents take over the work that needed a person to read, judge and write." },
      { q: "Are AI agents riskier than RPA?", a: "They can be without controls. Xura builds approval into every workflow: agents draft, people decide, and every step is logged." },
    ],
    related: [
      { href: "/workflows", label: "Agentic workflows", body: "Six kinds of step on one canvas, with approvals built in." },
      { href: "/use-cases/deviation-investigation", label: "Deviation investigation", body: "An example of work RPA can't do." },
      { href: "/compare/ai-employees-vs-chatbots", label: "AI employees vs chatbots", body: "Why owning a job beats answering prompts." },
    ],
  },
  {
    slug: "partner-led-vs-in-house-ai",
    name: "Partner-led vs in-house AI",
    meta: {
      title: "Build AI In-House or With a Partner? Compared",
      description:
        "In-house teams, agencies, software alone, or a platform with a deployment team. How each approach compares on time, cost of upkeep and reuse.",
    },
    h1: "Build AI in-house or with a partner?",
    sub: "Most companies choose between hiring an AI team, an agency, or buying software. There's a fourth option: a platform that comes with the team that deploys it.",
    answer: {
      q: "Should we build AI in-house or use a partner?",
      a: "Build in-house if AI is your product and you can hire and keep an AI team. Otherwise, a partner-led deployment is usually faster: MIT NANDA's 2025 report found vendor- and partner-led AI deployments succeed about twice as often as internal builds. The best partners leave you with a platform your team runs.",
    },
    table: {
      label: "Four ways to do it",
      heading: "How the options compare",
      columns: ["Xura (platform + team)", "In-house AI team", "Agency or IT services", "Software alone"],
      rows: [
        { criterion: "Who does the work", cells: ["Our deployment team, on your site", "Your hires", "The agency", "Your team"] },
        { criterion: "Time to first live job", cells: ["See it live in about 2 weeks", "Months to hire, then build", "Weeks to months per project", "Depends on your team"] },
        { criterion: "Each new build", cells: ["Reuses what's already connected", "Reuses your own code", "Often starts from zero", "Reuses the product"] },
        { criterion: "Upkeep", cells: ["Runs on the platform; no side code", "Your team maintains it", "Code you inherit", "Vendor maintains the product"] },
        { criterion: "Fits your process", cells: ["Built around it", "Built around it", "Built around it", "You adapt to it"] },
      ],
    },
    choose: [
      { title: "Build in-house when", body: "AI is core to your product and you can hire and retain the people to build and maintain it." },
      { title: "Use an agency when", body: "You need a one-off build and are ready to maintain the code afterwards." },
      { title: "Choose a platform with a team when", body: "You want AI running in operations, sales, quality and IT without building an AI department first." },
    ],
    faq: [
      { q: "Do we lose control with a partner?", a: "Not with Xura. Everything runs on a platform you own access to, in our cloud, your VPC or on your premises, and your team runs it after hand-over." },
      { q: "Where does the 'twice as often' figure come from?", a: "MIT NANDA, The GenAI Divide: State of AI in Business 2025." },
    ],
    related: [
      { href: "/ai-transformation", label: "Our approach", body: "AI transformation, one job at a time." },
      { href: "/deployment", label: "Deployment", body: "Our team on site, in your cloud or on premises." },
      { href: "/bootcamp", label: "2-day bootcamp", body: "See it working on your own data first." },
    ],
  },
  {
    slug: "ai-employees-vs-chatbots",
    name: "AI employees vs chatbots",
    meta: {
      title: "AI Employees vs AI Chatbots: What's the Difference?",
      description:
        "A chatbot answers what you paste in. An AI employee owns a recurring job on your connected data and waits for your approval. Here's how they differ.",
    },
    h1: "AI employees vs chatbots",
    sub: "A chatbot answers questions. An AI employee owns a job: it works on your systems, on a schedule, and sends its work to you for approval.",
    answer: {
      q: "What is the difference between an AI employee and a chatbot?",
      a: "A chatbot answers prompts using what you give it in the conversation. An AI employee is an AI agent that owns a recurring job, such as the monthly sales review, works on your connected business data on a schedule, follows your playbooks, and sends drafts to a named person for approval.",
    },
    table: {
      label: "Side by side",
      heading: "How they compare",
      columns: ["AI employee", "General AI chatbot"],
      rows: [
        { criterion: "Starts work", cells: ["On a schedule or an event, without being asked", "When you type a prompt"] },
        { criterion: "Knows your business", cells: ["Connected to your ERP, CRM, files and terms", "Only what you paste in"] },
        { criterion: "Owns", cells: ["A job, like a review, a digest or a pipeline", "Nothing between conversations"] },
        { criterion: "Follows", cells: ["Your playbooks, SOPs and formats", "General instructions"] },
        { criterion: "Before anything goes out", cells: ["A named person approves", "You copy and paste it yourself"] },
        { criterion: "Works in", cells: ["WhatsApp, Slack, Teams, email", "Its own chat window"] },
      ],
    },
    choose: [
      { title: "A chatbot is enough when", body: "You need one-off help writing or summarising something you already have in front of you." },
      { title: "You need an AI employee when", body: "The same work comes back every week or month, uses your systems, and someone has to sign it off." },
    ],
    faq: [
      { q: "Is an AI employee just a chatbot with integrations?", a: "No. It works on a schedule without being asked, follows playbooks for one job, and routes its work through approval." },
      { q: "Can we still chat with an AI employee?", a: "Yes. You can ask each one questions in WhatsApp, Slack, Teams or the web app." },
    ],
    related: [
      { href: "/ai-employees", label: "AI employees", body: "Meet Nora, Meera, Ezra and Kira." },
      { href: "/compare/ai-agents-vs-rpa", label: "AI agents vs RPA", body: "When to use each kind of automation." },
      { href: "/use-cases", label: "Use cases", body: "The jobs AI employees take on." },
    ],
  },
];

export const getComparePage = (slug: string) => COMPARE_PAGES.find((c) => c.slug === slug);
