/**
 * Home page copy — platform + a team that custom-builds AI employees, apps
 * and agentic flows on it (apps infra added 2026-11-15).
 * Source: obsidian/workflows/home-repositioning-plan.md (incl. the SEO/AEO
 * review). Only facts that are true today; no customer names, logos or counts.
 */
import type { EmployeeName } from "@/data/industries";

export const HOME_HERO = {
  h1: "AI transformation, built for your business.",
  /** Leads with who it's for — role and region, never company size (see repositioning plan). */
  sub: "For operations, sales, quality and IT teams in pharma and manufacturing. Our team finds the work AI should be doing, then custom\u2011builds the apps and workflows that do it. See it live in 2 weeks.",
} as const;

/** Hero background video: factory → pharma lab → industrial zone, one file with crossfades (Pexels, see photo-brief.md). */
export const HOME_HERO_VIDEO = {
  src: "/assets/video/hero-sequence.mp4",
  poster: "/assets/video/hero-sequence-poster.webp",
  /** Phones: centre-cropped 9:16 cut, 540×960, ~1.5 MB (ffmpeg crf 30, no audio). */
  mobileSrc: "/assets/video/hero-sequence-mobile.mp4",
  mobilePoster: "/assets/video/hero-sequence-mobile-poster.webp",
  alt: "Aerial view of a manufacturing plant beside farmland",
} as const;

/** Silk band: one short statement (two lines at display size) + a one-line kicker. */
export const HOME_STATEMENT = {
  label: "Platform + team",
  heading: "The platform and the team that make AI work for your business",
  kicker: "Another tool won't fix it. Someone has to make it work.",
} as const;

/** Statement band's live feed: the kind of work Xura does, waiting on a person. */
export const HOME_FEED = [
  { source: "SAP + Excel", task: "Monthly sales review", status: "Draft ready", action: "Approve" },
  { source: "QMS", task: "CAPA ageing digest", status: "3 overdue, nudges drafted", action: "Review" },
  { source: "CRM", task: "Pipeline update for leadership", status: "Deck ready", action: "Approve" },
  { source: "LIMS", task: "Deviation intake", status: "Logged with precedents", action: "Open" },
  { source: "Hiring app", task: "Offer stage", status: "Biggest drop this week, 50%", action: "Ask Xura" },
  { source: "ERP", task: "Raw material reorder check", status: "2 items below threshold", action: "Approve" },
] as const;

/** Platform + team section (replaces Problem, How we deliver and Why Xura). */
export const HOME_PLATFORM = {
  label: "How we deliver",
  heading: "An AI implementation partner that deploys it for you",
  lead: "We find where work gets stuck, decide where an AI agent can improve it, and custom-build the apps and workflows to fix it. Others bring people or software. Xura brings both, so every build reuses what already works.",
  platform: {
    title: "The Xura platform",
    body: "AI employees, agentic workflows and apps built from a chat, on one platform. Connected to your ERP, CRM and spreadsheets, working in WhatsApp, Slack and Teams, and waiting for your approval.",
  },
  team: {
    title: "Our deployment team",
    body: "Our team works with yours on site. We map the processes that need attention, pick the ones an AI agent can improve, and build the workflows and apps around them. We then continue to support and extend them as new requirements arise.",
  },
  steps: ["2-day bootcamp", "Find what needs attention", "Custom-build apps and workflows", "See it live in 2 weeks", "Continuous improvement"],
  stat: "Vendor- and partner-led AI deployments succeed about twice as often as internal builds. — MIT NANDA, The GenAI Divide (2025)",
} as const;

export const HOME_PROBLEM = {
  heading: "Why AI projects stall in companies that run on spreadsheets",
  pillars: [
    { title: "Scattered data", body: "Numbers live in the ERP, the CRM and a dozen spreadsheets that never agree." },
    { title: "Manual work", body: "Monthly reviews, decks and approvals are rebuilt by hand, every cycle." },
    { title: "No AI team", body: "There's no one in-house whose job is to make AI work." },
  ],
  band: "Another tool won't fix it. Someone has to make it work.",
  stat: "Vendor- and partner-led AI deployments succeed about twice as often as internal builds.",
  statSource: "MIT NANDA, The GenAI Divide (2025)",
} as const;

export const HOME_DEPLOY = {
  heading: "An AI implementation partner that deploys it for you",
  lead: "Our team deploys it, your team runs it, and we remain your partner as requirements evolve, on site rather than through a ticket queue.",
  steps: [
    { title: "Prove it", body: "A two-day bootcamp on your own data." },
    { title: "Embed", body: "Our team maps your systems and picks one workflow." },
    { title: "Build on Xura", body: "Built on the platform, with no side code to maintain." },
    { title: "Go live", body: "See it live in 2 weeks." },
    { title: "Expand", body: "We deliver new requirements as they arise." },
  ],
} as const;

export const HOME_WHY = {
  heading: "Implementation partner or build in-house? Get both.",
  lead: "Others bring people or software. Xura brings a platform and a team, so every build is reused.",
  columns: [
    { name: "Agencies and IT services", body: "People, but every build starts from zero.", ours: false },
    { name: "Software alone", body: "A platform, but you have to make it fit.", ours: false },
    { name: "Xura", body: "Our platform and our deployment team. Every build reuses what already works.", ours: true },
  ],
} as const;

export const HOME_EMPLOYEES: {
  heading: string;
  lead: string;
  jobs: {
    job: string;
    name: EmployeeName;
    /** Role title, as on the live site's roster. */
    role: string;
    body: string;
    /** A real product output, cropped (fractions of the 2880×1800 capture). */
    shot: { src: string; alt: string; crop: { x: number; y: number; w: number; h: number } };
  }[];
  flow: { step: string; body: string }[];
  channels: string;
} = {
  heading: "AI employees for sales, operations, quality and leadership",
  lead: "Start with one job. We build the workflow or app around it, then extend it as your requirements grow. You approve every output.",
  jobs: [
    {
      job: "Monthly sales review",
      name: "Nora",
      role: "Chief of Staff",
      body: "Pulls the numbers from your ERP and CRM and drafts the review.",
      shot: {
        src: "/assets/product/out-infographic.webp",
        alt: "A Xura infographic headed Q4 Plant Performance Leaders with a headline number and a chart",
        crop: { x: 0.21, y: 0.17, w: 0.58, h: 0.56 },
      },
    },
    {
      job: "Quality and operations issue tracking",
      name: "Meera",
      role: "QA Investigation",
      body: "Tracks open issues across teams and flags what's overdue.",
      shot: {
        src: "/assets/product/out-brief.webp",
        alt: "A Xura situation brief titled Open High-Impact Risks Across Projects, with a bottom-line summary",
        crop: { x: 0.18, y: 0.1, w: 0.64, h: 0.5 },
      },
    },
    {
      job: "Leadership decks",
      name: "Ezra",
      role: "Marketing Associate",
      body: "Turns the month's numbers into a deck for leadership.",
      shot: {
        src: "/assets/product/out-deck.webp",
        alt: "A Xura-generated slide titled Task Completion Rate by Team",
        crop: { x: 0.157, y: 0.218, w: 0.46, h: 0.58 },
      },
    },
    {
      job: "Hiring",
      name: "Kira",
      role: "Recruiting Coordinator",
      body: "Runs your hiring pipeline app: where candidates drop off, this week's interviews, candidate summaries.",
      shot: {
        src: "/assets/product/dashboard.webp",
        alt: "A Xura dashboard with headcount KPIs above a headcount-by-department chart",
        crop: { x: 0.07, y: 0.41, w: 0.6, h: 0.59 },
      },
    },
  ],
  flow: [
    { step: "Connect", body: "ERP, CRM and spreadsheets" },
    { step: "Ask", body: "In plain language" },
    { step: "Act", body: "The AI employee does the work" },
    { step: "Approve", body: "Nothing goes out without you" },
  ],
  channels: "Works in WhatsApp, Slack, Microsoft Teams and email.",
};

type OutputShot = {
  src: string;
  alt: string;
  /** Fractions of the capture; the crop's top-left is pinned, its width spans the card. */
  crop: { x: number; y: number; w: number };
  /** Source size; product captures default to 2880×1800. */
  width?: number;
  height?: number;
};

/**
 * "What they produce" rail: one card per output type (owner, 2026-11-18).
 * Apps and Answers are coded previews (`HiringAppPreview`, `AskXuraPreview`); the rest are real captures.
 */
export const HOME_OUTPUTS: readonly { title: string; byline: string; shot?: OutputShot; preview?: "app" | "chat" | "pulse" | "pulse-report" | "persona" }[] = [
  { title: "Answers", byline: "Ask Xura anything about your business", preview: "chat" },
  { title: "Apps", byline: "Built in chat, like this hiring pipeline", preview: "app" },

  {
    title: "Dashboards",
    byline: "Live numbers from every system",
    shot: { src: "/assets/product/dashboard.webp", alt: "A Xura dashboard with headcount KPIs above a headcount-by-department chart", crop: { x: 0.07, y: 0.41, w: 0.6 } },
  },
  {
    title: "Research reports",
    byline: "Deep research on any topic",
    shot: { src: "/assets/product/out-research.webp", alt: "A Xura deep research report on plant safety trends in pharmaceutical manufacturing, with an executive summary", crop: { x: 0.22, y: 0.12, w: 0.58 } },
  },
  { title: "Audience tests", byline: "Xura Pulse: up to 200 people react before launch", preview: "pulse" },
  { title: "Pulse reports", byline: "A/B winners, attention and the questions they'd ask", preview: "pulse-report" },
  {
    title: "Decks",
    byline: "The month's numbers, ready for leadership",
    shot: { src: "/assets/product/out-deck.webp", alt: "A Xura-generated slide titled Task Completion Rate by Team", crop: { x: 0.157, y: 0.218, w: 0.46 } },
  },
  {
    title: "Social posts",
    byline: "On-brand posts for LinkedIn",
    shot: {
      src: "/assets/product/out-social.webp",
      alt: "A Xura LinkedIn post: a factory robot above the headline Vork Labs improves its throughput by 28%",
      crop: { x: 0, y: 0.36, w: 1 },
      width: 1080,
      height: 1350,
    },
  },
  {
    title: "Briefs",
    byline: "The bottom line on one page",
    shot: {
      src: "/assets/product/out-brief-overview.webp",
      alt: "A Xura situation brief titled Business Operations Overview, with a bottom-line summary and four key figures",
      crop: { x: 0.06, y: 0.05, w: 0.9 },
      width: 1654,
      height: 2339,
    },
  },
  {
    title: "Infographics",
    byline: "A visual story from your data",
    shot: { src: "/assets/product/out-infographic.webp", alt: "A Xura infographic headed Q4 Plant Performance Leaders with a headline number and a chart", crop: { x: 0.21, y: 0.17, w: 0.58 } },
  },
  { title: "Simulated personas", byline: "Interview any persona, one to one", preview: "persona" },
];

export const HOME_CHANNELS = {
  heading: "Approve it from WhatsApp, Slack or Teams",
  body: "Your AI employees work where your team already talks. Every draft, deck and update arrives as a message you approve before anything goes out.",
} as const;

export const HOME_INDUSTRIES = {
  heading: "AI for companies that run on spreadsheets and email",
  lead: "Every industry page shows the workflows we build there.",
} as const;

export const HOME_TRUST_LINE = "Every number traceable · every output approved by you · your data stays yours";

export const HOME_TRUST = {
  heading: "Traceable, approved, yours: built for trust",
  items: [
    { title: "Traceable numbers", body: "Every number shows the system it came from." },
    { title: "Approvals and audit log", body: "You approve every output, and every action is logged." },
    { title: "Your data stays yours", body: "Your data is used only to do your company's work." },
  ],
} as const;

export const HOME_BOOTCAMP = {
  heading: "The 2-day AI bootcamp on your own data",
  body: "In two days our team maps where your work gets stuck, picks the processes an AI agent can improve, and shows one working on your own data, before you commit. If you go ahead, the fee is credited to your deployment.",
  cta: "Book a 2-day bootcamp",
} as const;

export const HOME_FAQ = [
  {
    q: "What is Xura?",
    a: "Xura is an AI company based in Hyderabad. Its team finds the work that needs attention and custom-builds AI employees, agentic workflows and apps on the Xura platform. It works with operations, sales, quality and IT teams in pharma and manufacturing across India and Southeast Asia.",
  },
  {
    q: "What is a forward-deployed AI team?",
    a: "A vendor team that works with your company directly. It maps your systems, builds AI workflows on your data, and continues to support them after launch. Xura’s team works with each customer directly, on site.",
  },
  {
    q: "What does Xura custom-build?",
    a: "Whatever the work needs: AI employees, agentic workflows and apps on the Xura platform. Apps are built by describing them in chat, for example a hiring pipeline with a drop-off funnel and this week's interviews. Our team starts where work gets stuck and builds around that process.",
  },
  {
    q: "How long does deployment take?",
    a: "Your first solution goes live in about 2 weeks after the bootcamp. Our team then continues to support and extend it as your requirements evolve.",
  },
  {
    q: "What is the two-day bootcamp?",
    a: "A two-day session where Xura shows its AI employees working on your company's data. If you go ahead, the fee is credited to your deployment.",
  },
  {
    q: "How is Xura different from an AI agency?",
    a: "Agencies usually build each project from zero. Xura brings a platform and a deployment team, so each build reuses tested components.",
  },
  {
    q: "Where do Xura's AI employees work?",
    a: "In WhatsApp, Slack, Microsoft Teams and email. You approve every output, and each action is recorded in an audit log.",
  },
] as const;

export const HOME_CLOSING = {
  heading: "Meet your AI team now.",
  sub: "Start with a 2-day bootcamp. See it live in 2 weeks.",
} as const;

/**
 * Team strip above "What we build": the teams Xura's AI employees work for,
 * each linked to the page that shows that job (internal links, not décor).
 */
export const HOME_TEAMS = {
  label: "AI employees for every team you run",
  teams: [
    { name: "Operations", href: "/use-cases/plant-performance-review" },
    { name: "Quality", href: "/use-cases/capa-tracking" },
    { name: "Sales", href: "/use-cases/monthly-sales-review" },
    { name: "Leadership", href: "/use-cases/leadership-decks" },
    { name: "Hiring", href: "/use-cases/hiring-pipeline" },
    { name: "Marketing", href: "/ai-employees" },
    { name: "IT", href: "/integrations" },
  ],
} as const;

/** Home "Xura Pulse" band (owner, 2026-11-19): the second product, after the outputs rail. */
export const HOME_PULSE = {
  label: "Xura Pulse",
  tag: "New",
  heading: "Hear your market before you launch",
  body: "Run a message, deck, campaign or price past up to 200 simulated people at once. A/B test versions, read the reasons, and interview anyone one to one.",
  points: ["Up to 200 people per run", "A/B tests before launch", "Rooted in your company's context"],
  cta: "See Xura Pulse",
} as const;
