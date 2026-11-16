export type Industry = {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subhead: string;
  /** Search-result description (70–160 chars). */
  seoDescription: string;
  intro: string;
  /** Path under /public — duotone-treated at render time. Sector-specific Pexels photography (matched to xuralabs.com CREDITS.txt). */
  heroImage: string;
  /** Alt text for the hero photograph. */
  heroImageAlt: string;
  /** New-design photo (generated stand-in, see obsidian/workflows/photo-brief.md). `focus` = subject position for PhotoFill. */
  photo: { src: string; alt: string; focus?: { x: string; y: string } };
  problem: {
    heading: string;
    items: { title: string; body: string }[];
  };
  solution: {
    heading: string;
    body: string;
  };
  /** Real scheduled routines of the built-in AI employees (from the app's seeds). */
  useCases: Routine[];
  scenario: {
    heading: string;
    stats: { value: string; label: string }[];
  };
  cta: string;
  /** Built-in AI employees featured on this page, lead first. */
  employees: Employee[];
  /** Depth for SEO / AEO (ADR-0046); optional per industry. */
  answer?: { q: string; a: string };
  regulations?: { heading: string; lead: string; items: { title: string; body: string }[] };
  systems?: { heading: string; items: string[] };
  /** Slugs from data/use-cases.ts. */
  useCaseSlugs?: string[];
  faq?: { q: string; a: string }[];
};

export type EmployeeName = "Nora" | "Ezra" | "Kira" | "Meera";

export type Employee = { name: EmployeeName; role: string; does: string };

/** A use case written as a routine: who runs it, when, what you get, what you approve. */
export type Routine = {
  title: string;
  employee: EmployeeName;
  schedule: string;
  body: string;
  approval: string;
};

/** Function colour per employee (tokens from globals.css). */
export const EMPLOYEE_ACCENT: Record<EmployeeName, string> = {
  Nora: "var(--employee-chief-of-staff)",
  Ezra: "var(--employee-marketing)",
  Kira: "var(--employee-recruiting)",
  Meera: "var(--employee-quality)",
};

/** "Batch, quality, and compliance" — the headline accent as a short focus line. */
export const industryFocus = (industry: Industry) => {
  const t = industry.headlineAccent.replace(/\.$/, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "pharma",
    label: "Pharma & Life Sciences",
    eyebrow: "Pharma & Life Sciences",
    headline: "AI transformation for pharma:",
    headlineAccent: "batch, quality, and compliance.",
    subhead:
      "Your batch records, lab results, deviations, and inventory live in systems that don't talk to each other. On WhatsApp or the web, Xura joins them and answers back.",
    seoDescription:
      "AI employees for pharma: a monthly brand and market review from PharmaTrac and SAP, plus deviation, OOS and CAPA routines that QA signs off.",
    intro: "The answer exists. It's just trapped across five systems.",
    heroImage: "/industries/pharma-v3.webp",
    heroImageAlt: "Scientist working at a microscope in a life-sciences lab",
    photo: { src: "/assets/photos/industry-pharma.webp", alt: "A quality analyst in a clean room checking batch records on a tablet", focus: { x: "40%", y: "40%" } },
    problem: {
      heading: "The answer exists, trapped across five systems.",
      items: [
        {
          title: "Yield drops go unexplained for days",
          body: "MES, LIMS, and deviation logs sit apart. Root-cause takes shifts, not minutes.",
        },
        {
          title: "Audit prep eats weeks",
          body: "Deviations, CAPAs, and change controls are assembled by hand every cycle.",
        },
        {
          title: "Raw material stock-outs stall production",
          body: "Procurement can't see how batch plans shift demand until it's too late.",
        },
        {
          title: "QC release is a black box",
          body: "Nobody has a live view of pending batches or the bottleneck holding them.",
        },
      ],
    },
    solution: {
      heading: "Every system, joined into one knowledge graph.",
      body: "No pipelines to build, no schema to map. Xura queries MES, LIMS, QMS and ERP in place, and answers on WhatsApp so the shift lead sees it before the next hand-over.",
    },
    useCases: [
      {
        title: "Monthly brand and market review",
        employee: "Nora",
        schedule: "1st working day of the month",
        body: "Share, pricing and launch comparisons from PharmaTrac or AWACS exports, SAP extracts and competitor news, laid out as your leadership pack with every number sourced.",
        approval: "You approve the pack before it goes to the BU review.",
      },
      {
        title: "Competitor and regulatory digest",
        employee: "Ezra",
        schedule: "Weekdays, 9:30",
        body: "What competitors launched or repriced and what regulators changed since yesterday, and what each story means for your brands.",
        approval: "Read-only. Nothing is sent on your behalf.",
      },
      {
        title: "Deviation and OOS intake",
        employee: "Meera",
        schedule: "Hourly, Mon–Sat",
        body: "Picks up new deviation, incident and OOS notifications and posts a draft intake with precedents to the QA channel.",
        approval: "QA reviews every intake before it is logged.",
      },
      {
        title: "CAPA and deviation ageing digest",
        employee: "Meera",
        schedule: "Daily, 9:00",
        body: "Overdue and due-this-week deviations, CAPAs and change controls, grouped by owner.",
        approval: "Draft nudges to owners wait for your OK.",
      },
      {
        title: "Deviation trend report",
        employee: "Meera",
        schedule: "Mondays, 9:30",
        body: "Trends by product, equipment, area and root cause; flags repeats and CAPAs that may not be working.",
        approval: "QA signs off before it is shared.",
      },
      {
        title: "Quality metrics pack",
        employee: "Meera",
        schedule: "1st of the month",
        body: "Management-review metrics required under revised Schedule M, drafted for the QA head.",
        approval: "The QA head approves the final pack.",
      },
    ],
    scenario: {
      heading: "One place to ask, and nothing logged until QA signs.",
      stats: [
        { value: "MES · LIMS · QMS · ERP", label: "queried in place, joined in one knowledge graph" },
        { value: "QA signs", label: "every investigation and CAPA draft before it's logged" },
        { value: "WhatsApp", label: "where shift leads ask and get answers" },
      ],
    },
    cta: "Start with a 2-day bootcamp on your own data, then our team connects Xura to your batch, quality, and supply-chain systems.",
    employees: [
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Assembles your monthly brand and market review from secondary sales, SAP extracts and competitor news, with every number traced to its source. You approve before it ships.",
      },
      {
        name: "Meera",
        role: "QA Investigation",
        does: "Picks up deviations and OOS results, finds precedents and root causes, and drafts investigations and CAPAs. QA signs off.",
      },
    ],
    answer: {
      q: "How is AI used in pharma quality and operations?",
      a: "In pharma, AI employees take on recurring quality and operations work: drafting deviation and OOS investigations in your SOP format, tracking CAPA and change-control ageing, spotting repeat deviations, and drafting the monthly quality metrics pack. QA reviews, decides and signs everything; the AI never makes a GMP decision.",
    },
    regulations: {
      heading: "Built around how regulated sites already work",
      lead: "Xura doesn't replace your quality system or your judgement. Drafts follow your SOPs, and every decision stays with QA.",
      items: [
        { title: "Revised Schedule M", body: "Management-review metrics and deviation, CAPA and change-control handling drafted in the format your QA head signs." },
        { title: "21 CFR 211.192 (OOS)", body: "OOS investigation support follows your SOP: phase I and II steps, evidence gathered and linked, conclusions left to QA." },
        { title: "ICH Q9(R1) and Q10", body: "Change-control impact assessments and CAPA effectiveness checks drafted against your risk and quality-system procedures." },
        { title: "Data integrity", body: "Every statement links to its source record, every prompt and action is logged, and nothing is changed in your systems without approval." },
      ],
    },
    systems: {
      heading: "Systems pharma teams connect",
      items: ["QMS: TrackWise, Caliber, AmpleLogic or Excel registers", "MES and paper batch records", "LIMS test results", "SAP or another ERP", "SOPs and templates on SharePoint", "PharmaTrac or AWACS market data"],
    },
    useCaseSlugs: ["deviation-investigation", "capa-tracking", "monthly-sales-review"],
    faq: [
      { q: "Does the AI make GMP decisions?", a: "No. AI employees gather evidence and draft. QA reviews, decides and signs every investigation, CAPA and report." },
      { q: "Do we need to replace our QMS or LIMS?", a: "No. Xura reads exports or connects to the systems you already use and joins them in one knowledge graph." },
      { q: "Can Xura run on our premises?", a: "Yes. Xura can run in our cloud, in your own cloud account (VPC), or on your own servers for strict data-residency rules." },
      { q: "Where should a pharma company start?", a: "Usually with deviation intake and CAPA ageing: the work is recurring, the data exists, and QA already owns the decision." },
    ],
  },
  {
    slug: "manufacturing",
    label: "Manufacturing & Logistics",
    eyebrow: "Manufacturing & Logistics",
    headline: "AI transformation for manufacturing:",
    headlineAccent: "production, quality, and supply.",
    subhead:
      "Your production data lives in the MES, inventory in the WMS, and orders in the ERP, reconciled by hand, after the shift. On WhatsApp, Xura answers before the next one starts.",
    seoDescription:
      "AI employees for manufacturing: morning OEE and downtime briefs, deviation intake, CAPA ageing and trend reports that quality signs off.",
    intro: "The answer spans the plant floor, the warehouse, and the ERP.",
    heroImage: "/industries/manufacturing-v3.webp",
    heroImageAlt: "Operator on the plant floor with a tablet dashboard",
    photo: { src: "/assets/photos/industry-manufacturing.webp", alt: "A shift supervisor in a hi-vis vest walking a shop floor with robotic arms", focus: { x: "35%", y: "40%" } },
    problem: {
      heading: "The answer spans the plant floor, the warehouse, and the ERP.",
      items: [
        {
          title: "Downtime causes stay unexplained",
          body: "MES signals sit apart from maintenance logs.",
        },
        {
          title: "Stock-outs and overstock coexist",
          body: "Warehouse and demand don't share a view.",
        },
        {
          title: "Late orders surface at shipping",
          body: "By then, expediting is the only option left.",
        },
        {
          title: "OEE reporting is a weekly ritual",
          body: "The shift ends before anyone sees the number.",
        },
      ],
    },
    solution: {
      heading: "Every system, joined into one knowledge graph.",
      body: "No pipeline to build, no schema to map. Point Xura at MES, WMS, and ERP, supervisors ask on WhatsApp from the line.",
    },
    useCases: [
      {
        title: "Morning brief",
        employee: "Nora",
        schedule: "Weekdays, 8:30",
        body: "Output, OEE and downtime by line and orders at risk, from your MES and ERP over MCP or uploaded exports.",
        approval: "Read-only. Nothing is sent on your behalf.",
      },
      {
        title: "Deviation intake",
        employee: "Meera",
        schedule: "Hourly, Mon–Sat",
        body: "New deviations and incidents from the floor, each posted to the quality channel as a draft intake with precedents.",
        approval: "Quality reviews every intake before it is logged.",
      },
      {
        title: "CAPA ageing digest",
        employee: "Meera",
        schedule: "Daily, 9:00",
        body: "Overdue and due-this-week CAPAs and change controls, grouped by owner.",
        approval: "Draft nudges to owners wait for your OK.",
      },
      {
        title: "Deviation trend report",
        employee: "Meera",
        schedule: "Mondays, 9:30",
        body: "Trends by line, equipment and root cause; flags repeats and CAPAs that may not be working.",
        approval: "Quality signs off before it is shared.",
      },
      {
        title: "Follow-up check",
        employee: "Nora",
        schedule: "Weekdays, 16:00",
        body: "Overdue maintenance and supplier actions by owner, with drafted nudges.",
        approval: "Every nudge waits for your OK.",
      },
    ],
    scenario: {
      heading: "The numbers reach the line before the shift starts.",
      stats: [
        { value: "MES · WMS · ERP", label: "queried in place, joined in one knowledge graph" },
        { value: "8:30 brief", label: "output, downtime and late orders, every weekday" },
        { value: "Line-side", label: "answers on the supervisor's phone" },
      ],
    },
    cta: "Start with a 2-day bootcamp on your own data, then our team connects Xura to your ERP, MES, and warehouse systems.",
    employees: [
      {
        name: "Meera",
        role: "QA Investigation",
        does: "Picks up deviations from the line, finds root causes and repeats, and drafts investigations and CAPAs. Quality signs off.",
      },
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Sends a morning brief on output, downtime and late orders from your MES and ERP exports.",
      },
    ],
    answer: {
      q: "How is AI used in manufacturing operations?",
      a: "In manufacturing, AI employees join MES, maintenance, warehouse and ERP data to send a morning brief on output, OEE, downtime and late orders, draft deviation intakes and CAPA follow-ups, and prepare the monthly plant review. Supervisors ask questions on WhatsApp from the line, and every action waits for approval.",
    },
    regulations: {
      heading: "Built for how plants actually run",
      lead: "Answers come from the systems you already run, and nothing changes on the line without a person deciding.",
      items: [
        { title: "Quality systems (ISO 9001, IATF 16949)", body: "Deviation intake, CAPA ageing and trend reports drafted in your procedure's format, signed off by quality." },
        { title: "Shift hand-overs", body: "What happened on the last shift, from the MES and maintenance log, ready before the next one starts." },
        { title: "Supplier follow-ups", body: "Late parts and overdue supplier actions by owner, with drafted nudges you approve." },
        { title: "Audit trail", body: "Every answer links to its records and every action is logged." },
      ],
    },
    systems: {
      heading: "Systems manufacturing teams connect",
      items: ["MES and SCADA exports", "SAP, Oracle or Odoo ERP", "Warehouse management (WMS)", "Maintenance logs", "Quality registers in Excel", "WhatsApp for supervisors"],
    },
    useCaseSlugs: ["plant-performance-review", "capa-tracking", "deviation-investigation"],
    faq: [
      { q: "Do we need sensors or new hardware?", a: "No. Xura works from the data your MES, ERP and maintenance systems already hold, including exports." },
      { q: "Can supervisors use it from the shop floor?", a: "Yes. They ask on WhatsApp and get the answer with the records behind it." },
      { q: "Where should a plant start?", a: "Usually with the morning brief or CAPA ageing: both run on data you already have and save a weekly manual report." },
    ],
  },

  {
    slug: "healthcare",
    label: "Healthcare & Providers",
    eyebrow: "Healthcare & Providers",
    headline: "AI transformation for healthcare:",
    headlineAccent: "operations, quality, and care.",
    subhead:
      "Your clinical data lives in the EHR, capacity in scheduling, and revenue in billing, none of them joined. Xura joins them, and answers arrive on WhatsApp so care teams stay with patients.",
    seoDescription:
      "AI employees for healthcare: daily capacity and quality briefs, meeting pre-reads, hiring updates and follow-ups, with every action approved.",
    intro: "Care teams shouldn't wait on a data pull.",
    heroImage: "/industries/healthcare-v3.webp",
    heroImageAlt: "Clinician reviewing patient information at the point of care",
    photo: { src: "/assets/photos/industry-healthcare.webp", alt: "A hospital administrator and a nurse reviewing a scheduling board" },
    problem: {
      heading: "Care teams shouldn't wait on a data pull.",
      items: [
        {
          title: "Capacity problems surface too late",
          body: "Scheduling data sits disconnected from demand signals.",
        },
        {
          title: "Denials pile up unexplained",
          body: "Causes hide across coding and documentation systems.",
        },
        {
          title: "Quality reporting is manual",
          body: "Analysts spend days per cycle assembling submissions.",
        },
        {
          title: "Ops flies without a live view",
          body: "Every question needs a custom pull instead of a live answer.",
        },
      ],
    },
    solution: {
      heading: "Every system, joined into one knowledge graph.",
      body: "No pipeline to build, no schema to map, and your data never leaves your secure environment. Ask on WhatsApp; act at the bedside.",
    },
    useCases: [
      {
        title: "Morning brief",
        employee: "Nora",
        schedule: "Weekdays, 8:30",
        body: "Capacity, throughput and denials from your connected or uploaded data, plus what changed overnight.",
        approval: "Read-only. Nothing is sent on your behalf.",
      },
      {
        title: "Meeting pre-read",
        employee: "Nora",
        schedule: "Before each meeting",
        body: "A short pre-read for every meeting with other attendees, with the numbers that matter for it.",
        approval: "Read-only.",
      },
      {
        title: "Follow-up check",
        employee: "Nora",
        schedule: "Weekdays, 16:00",
        body: "Overdue actions and stuck items by owner, with drafted nudges.",
        approval: "Every nudge waits for your OK.",
      },
      {
        title: "Daily hiring brief",
        employee: "Kira",
        schedule: "Weekdays, 9:00",
        body: "Today’s interviews, open clinical and staff roles, and where candidates are stuck.",
        approval: "Messages to candidates wait for your OK.",
      },
      {
        title: "Week in review",
        employee: "Nora",
        schedule: "Fridays, 17:00",
        body: "What was done, what slipped, the numbers week on week and what matters next week.",
        approval: "You approve before it is shared.",
      },
    ],
    scenario: {
      heading: "The brief is ready before the morning huddle.",
      stats: [
        { value: "EHR · scheduling · billing", label: "joined in one knowledge graph" },
        { value: "Your environment", label: "data stays in your secure setup" },
        { value: "WhatsApp", label: "for every huddle and hand-over" },
      ],
    },
    cta: "Start with a 2-day bootcamp on your own data, then our team connects Xura to your EHR, scheduling, and billing systems.",
    faq: [
      { q: "Does the AI make clinical decisions?", a: "No. AI employees gather the numbers and draft briefs, pre-reads and follow-ups. People decide, and every message waits for your OK before it is sent." },
      { q: "Does patient data leave our environment?", a: "No. Xura can run in your own cloud account (VPC) or on your own servers. Queries run where your data lives, and no raw data is stored." },
      { q: "Do we need to replace our EHR or billing system?", a: "No. Xura connects to the EHR, scheduling and billing systems you already use, or reads their exports, and joins them in one knowledge graph." },
      { q: "Where should a hospital start?", a: "Usually with the morning brief on capacity, throughput and denials: it runs on data you already have and replaces a manual daily pull." },
    ],
    employees: [
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Sends a daily brief on capacity and quality, preps you for every meeting, and drafts follow-ups for your approval.",
      },
    ],
  },
  {
    slug: "saas",
    label: "SaaS & Technology",
    eyebrow: "SaaS & Technology",
    headline: "AI transformation for SaaS:",
    headlineAccent: "growth, retention, and revenue.",
    subhead:
      "Your funnel lives in product analytics, revenue in billing, and accounts in the CRM, none of them joined. Ask on WhatsApp, get the answer in the same chat.",
    seoDescription:
      "AI employees for SaaS: a morning pipeline brief from HubSpot, renewal risk flags, campaign alerts and board-ready reviews, each approved by you.",
    intro: "The metric you need is one join away, across four tools.",
    heroImage: "/industries/saas-v3.webp",
    heroImageAlt: "Growth team reviewing a dashboard on a laptop",
    photo: { src: "/assets/photos/industry-saas.webp", alt: "A product team talking around a desk in an open-plan office" },
    problem: {
      heading: "The metric you need is one join away, across four tools.",
      items: [
        {
          title: "Churn is spotted too late",
          body: "Product signals sit apart from billing and CRM. Renewal risk surfaces after the save window closes.",
        },
        {
          title: "Pipeline questions take a day",
          body: "Every board-ready number waits on a bespoke pull.",
        },
        {
          title: "Activation is a black box",
          body: "Nobody has a live picture of who's stuck, where, and why.",
        },
        {
          title: "Reporting eats the team",
          body: "Analysts spend the week rebuilding the same slides.",
        },
      ],
    },
    solution: {
      heading: "Every tool, joined into one knowledge graph.",
      body: "Xura connects CRM, product, billing and finance in place. Ask on WhatsApp, get the visual, the summary, and the next action, ready to run.",
    },
    useCases: [
      {
        title: "Morning brief",
        employee: "Nora",
        schedule: "Weekdays, 8:30",
        body: "What needs you today: deals and renewals at risk in HubSpot, what changed overnight and your meetings.",
        approval: "Read-only. Nothing is sent on your behalf.",
      },
      {
        title: "Follow-up check",
        employee: "Nora",
        schedule: "Weekdays, 16:00",
        body: "Stalled deals and overdue actions by owner, each with a drafted nudge.",
        approval: "Every nudge waits for your OK before it is sent.",
      },
      {
        title: "Campaign pulse",
        employee: "Ezra",
        schedule: "Weekdays, 15:00",
        body: "Unusual moves in traffic, leads or spend today, before they become a problem.",
        approval: "Alerts only; budget changes need your approval.",
      },
      {
        title: "Weekly marketing report",
        employee: "Ezra",
        schedule: "Mondays, 10:00",
        body: "Last week’s pipeline contribution, spend and what to double down on.",
        approval: "You review before it is shared.",
      },
      {
        title: "Week in review",
        employee: "Nora",
        schedule: "Fridays, 17:00",
        body: "Done, slipped, the numbers week on week and what matters next week, as a brief or a board-ready deck.",
        approval: "You approve before it goes to the board.",
      },
      {
        title: "Weekly hiring pipeline",
        employee: "Kira",
        schedule: "Fridays, 16:00",
        body: "Every open role by stage, movement this week, bottlenecks and roles at risk.",
        approval: "Feedback nudges to interviewers wait for your OK.",
      },
    ],
    scenario: {
      heading: "Pipeline questions answered in the chat where they're asked.",
      stats: [
        { value: "CRM · product · billing", label: "joined in one knowledge graph" },
        { value: "Every number", label: "linked to its source" },
        { value: "You approve", label: "before anything reaches the board" },
      ],
    },
    cta: "Start with a 2-day bootcamp on your own data, then our team connects Xura to your CRM, product, and billing stack.",
    faq: [
      { q: "Which tools does Xura connect to?", a: "Your CRM (such as HubSpot or Salesforce), product analytics, billing and finance, over MCP and 50+ native integrations. No ETL pipeline to build." },
      { q: "Can it send emails or change deals on its own?", a: "No. Briefs and alerts are read-only, and every nudge, message or budget change waits for your approval. Each action is recorded in an audit log." },
      { q: "Can it produce board-ready reporting?", a: "Yes. The week-in-review can be a brief or a board-ready deck, with every number linked to its source. You approve it before it goes to the board." },
      { q: "Where should a SaaS team start?", a: "Usually with the morning pipeline brief: deals and renewals at risk, what changed overnight and your meetings, from data your CRM already holds." },
    ],
    employees: [
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Sends your morning brief from HubSpot, flags renewals and deals at risk, and drafts the follow-ups for your approval.",
      },
      {
        name: "Ezra",
        role: "Marketing Associate",
        does: "Watches campaigns and competitors daily and turns what is working into next week’s content.",
      },
    ],
  },
  {
    slug: "fintech",
    label: "Fintech & Financial Services",
    eyebrow: "Fintech & Financial Services",
    headline: "AI transformation for fintech:",
    headlineAccent: "risk, operations, and growth.",
    subhead:
      "Your transactions live in the ledger, exposure in the risk engine, and customers in the CRM, reconciled by hand, after the fact. Xura reconciles live and answers on WhatsApp.",
    seoDescription:
      "AI employees for fintech: morning exposure briefs, reconciliation breaks flagged early, regulatory digests and follow-ups drafted for your OK.",
    intro: "The numbers have to reconcile, but they live in five places.",
    heroImage: "/industries/fintech-v3.webp",
    heroImageAlt: "Analyst monitoring trading and reconciliation screens",
    photo: { src: "/assets/photos/industry-fintech.webp", alt: "A finance operations analyst working on a laptop at dusk" },
    problem: {
      heading: "The numbers have to reconcile, but they live in five places.",
      items: [
        {
          title: "Reconciliation breaks silently",
          body: "Ledger, processor, and bank statements drift and the mismatch is only found days later.",
        },
        {
          title: "Risk signals arrive late",
          body: "Exposure and fraud patterns sit in separate systems, so a concentration surfaces after it matters.",
        },
        {
          title: "Regulator requests scramble the team",
          body: "Assembling transaction trails and KYC status means chasing exports across tools.",
        },
        {
          title: "Growth questions wait on analysts",
          body: "'Which segments are most profitable after risk cost?' needs a bespoke pull every time.",
        },
      ],
    },
    solution: {
      heading: "Every system, joined into one knowledge graph.",
      body: "Xura connects your ledger, payment processors, risk engine, and CRM and works out how a transaction, a customer, an exposure, and an exception all relate, from a message on your phone.",
    },
    useCases: [
      {
        title: "Morning brief",
        employee: "Nora",
        schedule: "Weekdays, 8:30",
        body: "Exposure, volumes and reconciliation breaks from your connected or uploaded data, plus what changed overnight.",
        approval: "Read-only. Nothing is sent on your behalf.",
      },
      {
        title: "Meeting pre-read",
        employee: "Nora",
        schedule: "Before each meeting",
        body: "A short pre-read for every meeting with other attendees: the account, the open issues and the numbers.",
        approval: "Read-only.",
      },
      {
        title: "Competitor and regulatory digest",
        employee: "Ezra",
        schedule: "Weekdays, 9:30",
        body: "New circulars, rule changes and competitor moves since yesterday, and what each means for you.",
        approval: "Read-only.",
      },
      {
        title: "Follow-up check",
        employee: "Nora",
        schedule: "Weekdays, 16:00",
        body: "Overdue fixes and stuck items by owner, with drafted nudges.",
        approval: "Every nudge waits for your OK.",
      },
      {
        title: "Week in review",
        employee: "Nora",
        schedule: "Fridays, 17:00",
        body: "What closed, what slipped, the numbers week on week and what matters next week.",
        approval: "You approve before it is shared.",
      },
    ],
    scenario: {
      heading: "Breaks flagged in the morning brief, not found days later.",
      stats: [
        { value: "Ledger · payments · risk · CRM", label: "joined in one knowledge graph" },
        { value: "Every fix", label: "drafted, then approved by you" },
        { value: "WhatsApp", label: "every answer ends in the next action" },
      ],
    },
    cta: "Start with a 2-day bootcamp on your own data, then our team connects Xura to your ledger, payments, and risk systems.",
    faq: [
      { q: "Does the AI move money or approve transactions?", a: "No. Briefs and digests are read-only. Fixes and follow-ups are drafted, and nothing is sent or changed without a person's approval." },
      { q: "Can Xura run inside our own infrastructure?", a: "Yes. Xura can run in our cloud, in your own cloud account (VPC), or on your own servers for strict data-residency rules." },
      { q: "Is there an audit trail?", a: "Yes. Every action is recorded in an audit log, and row-level permissions control who can see which data." },
      { q: "Where should a fintech team start?", a: "Usually with the morning brief on exposure, volumes and reconciliation breaks, so breaks are caught the same day instead of days later." },
    ],
    employees: [
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Sends a morning brief on the numbers you care about, preps you for every meeting, and drafts follow-ups for your approval.",
      },
    ],
  },];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
