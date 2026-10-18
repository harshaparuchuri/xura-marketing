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

export const INDUSTRIES: Industry[] = [
  {
    slug: "pharma",
    label: "Pharma & Life Sciences",
    eyebrow: "Pharma & Life Sciences",
    headline: "Xura for pharma. Your AI employees for",
    headlineAccent: "batch, quality, and compliance.",
    subhead:
      "Your batch records, lab results, deviations, and inventory live in systems that don't talk to each other. On WhatsApp or the web, Xura joins them and answers back.",
    seoDescription:
      "AI employees for pharma: a monthly brand and market review from PharmaTrac and SAP, plus deviation, OOS and CAPA routines that QA signs off.",
    intro: "The answer exists. It's just trapped across five systems.",
    heroImage: "/industries/pharma-v3.webp",
    heroImageAlt: "Scientist working at a microscope in a life-sciences lab",
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
      heading:
        "A specialty API manufacturer cuts yield investigations from 3 days to hours.",
      stats: [
        { value: "3d → hrs", label: "yield root-cause time" },
        { value: "1", label: "knowledge graph across MES, LIMS, QMS, ERP" },
        { value: "100%", label: "answers delivered on WhatsApp or the web" },
      ],
    },
    cta: "Start a free one-week pilot and connect Xura to your batch, quality, and supply-chain systems.",
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
  },
  {
    slug: "saas",
    label: "SaaS & Technology",
    eyebrow: "SaaS & Technology",
    headline: "Xura for SaaS. Your AI employees for",
    headlineAccent: "growth, retention, and revenue.",
    subhead:
      "Your funnel lives in product analytics, revenue in billing, and accounts in the CRM, none of them joined. Ask on WhatsApp, get the answer in the same chat.",
    seoDescription:
      "AI employees for SaaS: a morning pipeline brief from HubSpot, renewal risk flags, campaign alerts and board-ready reviews, each approved by you.",
    intro: "The metric you need is one join away, across four tools.",
    heroImage: "/industries/saas-v3.webp",
    heroImageAlt: "Growth team reviewing a dashboard on a laptop",
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
      heading: "A vertical SaaS goes from weekly board slides to a live board chat.",
      stats: [
        { value: "1 day → 1 msg", label: "pipeline questions" },
        { value: "0", label: "manual dashboards to maintain" },
        { value: "24/7", label: "board answers on WhatsApp" },
      ],
    },
    cta: "Start a free one-week pilot and connect Xura to your CRM, product, and billing stack.",
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
    headline: "Xura for fintech. Your AI employees for",
    headlineAccent: "risk, operations, and growth.",
    subhead:
      "Your transactions live in the ledger, exposure in the risk engine, and customers in the CRM, reconciled by hand, after the fact. Xura reconciles live and answers on WhatsApp.",
    seoDescription:
      "AI employees for fintech: morning exposure briefs, reconciliation breaks flagged early, regulatory digests and follow-ups drafted for your OK.",
    intro: "The numbers have to reconcile, but they live in five places.",
    heroImage: "/industries/fintech-v3.webp",
    heroImageAlt: "Analyst monitoring trading and reconciliation screens",
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
      heading:
        "A payments company turns a two-day reconciliation into a same-morning close.",
      stats: [
        { value: "2d → hrs", label: "to a clean reconciliation with fixes" },
        { value: "1", label: "knowledge graph across ledger, payments, risk & CRM" },
        { value: "→ WhatsApp", label: "every answer ends in the next action" },
      ],
    },
    cta: "Start a free one-week pilot and connect Xura to your ledger, payments, and risk systems.",
    employees: [
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Sends a morning brief on the numbers you care about, preps you for every meeting, and drafts follow-ups for your approval.",
      },
    ],
  },
  {
    slug: "healthcare",
    label: "Healthcare & Providers",
    eyebrow: "Healthcare & Providers",
    headline: "Xura for healthcare. Your AI employees for",
    headlineAccent: "operations, quality, and care.",
    subhead:
      "Your clinical data lives in the EHR, capacity in scheduling, and revenue in billing, none of them joined. Xura joins them, and answers arrive on WhatsApp so care teams stay with patients.",
    seoDescription:
      "AI employees for healthcare: daily capacity and quality briefs, meeting pre-reads, hiring updates and follow-ups, with every action approved.",
    intro: "Care teams shouldn't wait on a data pull.",
    heroImage: "/industries/healthcare-v3.webp",
    heroImageAlt: "Clinician reviewing patient information at the point of care",
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
      heading:
        "A regional provider turns weekly quality reports into a Monday-morning WhatsApp brief.",
      stats: [
        { value: "days → mins", label: "to a quality submission" },
        { value: "1", label: "graph across EHR, scheduling, billing" },
        { value: "on WhatsApp", label: "for every huddle and hand-over" },
      ],
    },
    cta: "Start a free one-week pilot and connect Xura to your EHR, scheduling, and billing systems.",
    employees: [
      {
        name: "Nora",
        role: "Chief of Staff",
        does: "Sends a daily brief on capacity and quality, preps you for every meeting, and drafts follow-ups for your approval.",
      },
    ],
  },
  {
    slug: "manufacturing",
    label: "Manufacturing & Logistics",
    eyebrow: "Manufacturing & Logistics",
    headline: "Xura for manufacturing. Your AI employees for",
    headlineAccent: "production, quality, and supply.",
    subhead:
      "Your production data lives in the MES, inventory in the WMS, and orders in the ERP, reconciled by hand, after the shift. On WhatsApp, Xura answers before the next one starts.",
    seoDescription:
      "AI employees for manufacturing: morning OEE and downtime briefs, deviation intake, CAPA ageing and trend reports that quality signs off.",
    intro: "The answer spans the plant floor, the warehouse, and the ERP.",
    heroImage: "/industries/manufacturing-v3.webp",
    heroImageAlt: "Operator on the plant floor with a tablet dashboard",
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
      heading:
        "A contract manufacturer replaces the Monday OEE meeting with a live WhatsApp digest.",
      stats: [
        { value: "shift → real-time", label: "OEE visibility" },
        { value: "1", label: "graph across MES, WMS, ERP" },
        { value: "line-side", label: "answers on the operator's phone" },
      ],
    },
    cta: "Start a free one-week pilot and connect Xura to your ERP, MES, and warehouse systems.",
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
  },
];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
