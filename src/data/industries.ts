export type Industry = {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subhead: string;
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
  useCases: { title: string; tag: string }[];
  scenario: {
    heading: string;
    stats: { value: string; label: string }[];
  };
  cta: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "pharma",
    label: "Pharma & Life Sciences",
    eyebrow: "Pharma & Life Sciences",
    headline: "Xura for pharma. Your data team for",
    headlineAccent: "batch, quality, and compliance.",
    subhead:
      "Your batch records, lab results, deviations, and inventory live in systems that don't talk to each other. On WhatsApp or the web, Xura joins them and answers back.",
    intro: "The answer exists. It's just trapped across five systems.",
    heroImage: "/industries/pharma-v3.jpg",
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
      { title: "Batch yield & deviation analysis", tag: "correlate · root-cause · resolve" },
      { title: "QC release status", tag: "live view · bottlenecks · ETA" },
      { title: "Regulatory & audit readiness", tag: "assemble · draft · export" },
      { title: "Supply & procurement planning", tag: "forecast · flag · order" },
      { title: "Order & shipment risk", tag: "detect · escalate · notify" },
      { title: "Quality trending", tag: "monitor · drift · alert" },
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
    cta: "Join the waitlist and be first to connect Xura to your batch, quality, and supply-chain systems.",
  },
  {
    slug: "saas",
    label: "SaaS & Technology",
    eyebrow: "SaaS & Technology",
    headline: "Xura for SaaS. Your data team for",
    headlineAccent: "growth, retention, and revenue.",
    subhead:
      "Your funnel lives in product analytics, revenue in billing, and accounts in the CRM, none of them joined. Ask on WhatsApp, get the answer in the same chat.",
    intro: "The metric you need is one join away, across four tools.",
    heroImage: "/industries/saas-v3.jpg",
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
      { title: "Churn & renewal risk", tag: "score · flag · save" },
      { title: "Pipeline & revenue analysis", tag: "forecast · slice · brief" },
      { title: "Activation & onboarding", tag: "cohort · block · nudge" },
      { title: "Marketing efficiency", tag: "attribute · rank · cut" },
      { title: "Board & investor reporting", tag: "assemble · narrate · export" },
      { title: "Support-to-product loop", tag: "cluster · quantify · file" },
    ],
    scenario: {
      heading: "A vertical SaaS goes from weekly board slides to a live board chat.",
      stats: [
        { value: "1 day → 1 msg", label: "pipeline questions" },
        { value: "0", label: "manual dashboards to maintain" },
        { value: "24/7", label: "board answers on WhatsApp" },
      ],
    },
    cta: "Join the waitlist and be first to connect Xura to your CRM, product, and billing stack.",
  },
  {
    slug: "fintech",
    label: "Fintech & Financial Services",
    eyebrow: "Fintech & Financial Services",
    headline: "Xura for fintech. Your data team for",
    headlineAccent: "risk, operations, and growth.",
    subhead:
      "Your transactions live in the ledger, exposure in the risk engine, and customers in the CRM, reconciled by hand, after the fact. Xura reconciles live and answers on WhatsApp.",
    intro: "The numbers have to reconcile, but they live in five places.",
    heroImage: "/industries/fintech-v3.jpg",
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
      { title: "Reconciliation & settlement", tag: "match · flag · fix" },
      { title: "Risk & fraud monitoring", tag: "correlate · outlier · queue" },
      { title: "Compliance & reporting", tag: "assemble · audit · draft" },
      { title: "Portfolio & growth analysis", tag: "net · rank · recommend" },
      { title: "Payments operations", tag: "segment · root-cause · change" },
      { title: "Onboarding & conversion", tag: "funnel · quantify · file" },
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
    cta: "Join the waitlist and be first to connect Xura to your ledger, payments, and risk systems.",
  },
  {
    slug: "healthcare",
    label: "Healthcare & Providers",
    eyebrow: "Healthcare & Providers",
    headline: "Xura for healthcare. Your data team for",
    headlineAccent: "operations, quality, and care.",
    subhead:
      "Your clinical data lives in the EHR, capacity in scheduling, and revenue in billing, none of them joined. Xura joins them, and answers arrive on WhatsApp so care teams stay with patients.",
    intro: "Care teams shouldn't wait on a data pull.",
    heroImage: "/industries/healthcare-v3.jpg",
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
      { title: "Capacity & throughput", tag: "forecast · flex · flag" },
      { title: "Revenue-cycle & denials", tag: "root-cause · appeal · prevent" },
      { title: "Quality & compliance reporting", tag: "assemble · validate · submit" },
      { title: "Access & scheduling", tag: "slot · route · notify" },
      { title: "Operations & supply", tag: "monitor · reorder · flag" },
      { title: "Outcomes & population insight", tag: "cohort · trend · act" },
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
    cta: "Join the waitlist and be first to connect Xura to your EHR, scheduling, and billing systems.",
  },
  {
    slug: "manufacturing",
    label: "Manufacturing & Logistics",
    eyebrow: "Manufacturing & Logistics",
    headline: "Xura for manufacturing. Your data team for",
    headlineAccent: "production, quality, and supply.",
    subhead:
      "Your production data lives in the MES, inventory in the WMS, and orders in the ERP, reconciled by hand, after the shift. On WhatsApp, Xura answers before the next one starts.",
    intro: "The answer spans the plant floor, the warehouse, and the ERP.",
    heroImage: "/industries/manufacturing-v3.jpg",
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
      { title: "OEE & downtime analysis", tag: "detect · attribute · act" },
      { title: "Inventory & supply planning", tag: "forecast · balance · order" },
      { title: "Order & delivery risk", tag: "flag · reroute · notify" },
      { title: "Quality & yield", tag: "trend · alert · contain" },
      { title: "Supplier performance", tag: "score · rank · switch" },
      { title: "Production reporting", tag: "assemble · narrate · export" },
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
    cta: "Join the waitlist and be first to connect Xura to your ERP, MES, and warehouse systems.",
  },
];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
