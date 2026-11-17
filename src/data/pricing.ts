import { siteConfig } from "@/lib/site";

/**
 * Pricing page content — the Nov 2026 engagement model (bootcamp →
 * deployment → platform plan) plus the Oct 2026 per-seat plans with a
 * monthly credit allowance. The free pilot was retired 2026-11-14 (ADR-0033).
 *
 * Credit policy (confirmed 2026-10-18): credits are per seat, do NOT roll
 * over, and can be topped up mid-month.
 *
 * Early-customer offer (2026-11-03): Starter $20 (list $50) and Growth $50
 * (list $100) for the first 6 months, limited spots. Custom business workflows
 * are a $25 one-time setup per workflow (normally $100) on every plan, limited slots.
 */

/**
 * The engagement model (Nov 2026 repositioning, ADR-0033): bootcamp →
 * deployment → platform plan. Bootcamp and deployment prices are not
 * published; the bootcamp fee is credited to the deployment.
 */
export const ENGAGEMENT_STEPS: { title: string; price: string; body: string }[] = [
  {
    title: "2-day bootcamp",
    price: "Quoted per company · fee credited to your deployment",
    body: "Our team puts an AI employee to work on your own data in two days, so you see it before you commit.",
  },
  {
    title: "Deployment",
    price: "Scoped with our team",
    body: "We connect your ERP, CRM and spreadsheets and see it live in about 2 weeks.",
  },
  {
    title: "Platform plan",
    price: "Per seat, per month",
    body: "Your AI employees run on Xura, with our team extending them as your requirements grow.",
  },
];

/** Label shown with the early-customer price on discounted plans. */
export const EARLY_OFFER = "Early-customer price · limited spots";

/** Custom business workflows — same setup price on every plan, shown below the cards. */
export const CUSTOM_FLOWS = {
  label: "Custom business workflows",
  offer: "Limited slots",
  summary:
    "We build a custom workflow around your business processes, on any plan. After setup, it runs on your credits.",
  price: "$25",
  /** Standard setup price, struck through while slots last. */
  listPrice: "$100",
  unit: "one-time setup per workflow",
};

export interface PricingPlan {
  name: string;
  /** Display price, e.g. "$50", "Free" or "Let's talk". */
  price: string;
  /** Standard price, shown struck through before `price` while an offer runs. */
  listPrice?: string;
  /** Short offer line under the price (e.g. `EARLY_OFFER`). */
  offer?: string;
  /** Show "what N credits gets you" on the card, using `CREDIT_EXAMPLES`. */
  creditBreakdown?: number;
  /** Unit shown after the price, e.g. "per user / month". */
  unit?: string;
  /** Credit allowance, shown as a highlighted line on the card. */
  credits: string;
  summary: string;
  /** Optional lead-in above the feature list, e.g. "Everything in Starter, plus:". */
  featuresLead?: string;
  features: string[];
  cta: { label: string; href: string };
  /** Visually emphasised as the recommended plan (dark card). */
  featured?: boolean;
  /** Small label on the card, e.g. "Start here" or "Most popular". */
  badge?: string;
  /** Tinted card for the free entry plan. */
  entry?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$20",
    listPrice: "$50",
    offer: EARLY_OFFER,
    unit: "per user / month for 6 months",
    credits: "500 credits per user / month",
    summary: "For a team trying Xura on one use case.",
    features: [
      "Dashboards, research, slides, briefs and social posts",
      "Custom integrations and connectors",
      "Xura on WhatsApp, Slack and Teams",
      "Top up credits any time",
      "24x7 support",
    ],
    cta: { label: "Book a 2-day bootcamp", href: siteConfig.demoUrl },
  },
  {
    name: "Growth",
    price: "$50",
    listPrice: "$100",
    offer: EARLY_OFFER,
    unit: "per user / month for 6 months",
    credits: "1,000 credits per user / month",
    summary: "For teams running Xura every day.",
    featuresLead: "Everything in Starter, plus:",
    features: [
      "AI employees and workflows",
      "Custom brand kit",
      "Company ontology and context graph",
      "24x7 support",
    ],
    cta: { label: "Book a 2-day bootcamp", href: siteConfig.demoUrl },
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Custom",
    price: "Let's talk",
    credits: "Credits sized to your team",
    summary: "For larger rollouts and custom needs.",
    featuresLead: "Everything in Growth, plus:",
    features: [
      "Custom AI employees and connectors",
      "Custom workflows for your business",
      "Agent evals, governance and updates",
      "Invoicing and custom billing terms",
      "24x7 support",
    ],
    cta: { label: "Talk to us", href: siteConfig.demoUrl },
  },
];

/** What a credit buys — rates derived from the deck (500 credits ≈ 25 dashboards, etc.). */
export interface CreditExample {
  output: string;
  /** Plural, lower-case, for counts ("16 social posts"). */
  plural: string;
  /** Approximate credit cost, as a number for the badge. */
  credits: number;
  prompt: string;
  result: string;
  /** A real product capture of this output (crop in fractions of 2880×1800). */
  shot: { src: string; alt: string; crop: { x: number; y: number; w: number; h: number } };
}

export const CREDIT_EXAMPLES: CreditExample[] = [
  {
    output: "Social post",
    plural: "social posts",
    credits: 6,
    prompt: "Turn Q4 plant performance into a shareable infographic",
    result: "Ready in your brand, as PNG or PDF.",
    shot: {
      src: "/assets/product/out-infographic.webp",
      alt: "A Xura infographic headed Q4 Plant Performance Leaders with a headline number and a capacity chart",
      crop: { x: 0.21, y: 0.17, w: 0.58, h: 0.56 },
    },
  },
  {
    output: "Live dashboard",
    plural: "dashboards",
    credits: 20,
    prompt: "Show headcount by department",
    result: "Live dashboard, refreshing daily.",
    shot: {
      src: "/assets/product/dashboard.webp",
      alt: "A Xura dashboard with headcount, compensation and training KPIs above a headcount-by-department chart",
      crop: { x: 0.07, y: 0.41, w: 0.6, h: 0.59 },
    },
  },
  {
    output: "Slide deck",
    plural: "slide decks",
    credits: 40,
    prompt: "Make a team review deck on task completion by team",
    result: "Numbers sourced, exported to .pptx.",
    shot: {
      src: "/assets/product/out-deck.webp",
      alt: "A Xura-generated slide titled Task Completion Rate by Team",
      crop: { x: 0.157, y: 0.218, w: 0.64, h: 0.58 },
    },
  },
  {
    output: "Research report",
    plural: "research reports",
    credits: 60,
    prompt: "Research the market for our next launch",
    result: "87 citations from 30 sources.",
    shot: {
      src: "/assets/product/out-research.webp",
      alt: "A Xura deep-research report title page with 87 citations from 30 sources",
      crop: { x: 0.22, y: 0.08, w: 0.56, h: 0.6 },
    },
  },
];

export const CREDITS_NOTE =
  "500 credits a month is about 25 dashboards, 12 decks, 8 research reports or 80 social posts, or any mix, since credits work across everything.";

export const PRICING_FAQ: { question: string; answer: string }[] = [
  {
    question: "What does the 2-day bootcamp cost?",
    answer:
      "The price depends on your company and the job we start with. Book a call and we'll quote it. If you go ahead, the fee is credited to your deployment.",
  },
  {
    question: "How long does the early-customer price last?",
    answer:
      "Your first 6 months: Starter is $20 per user / month (normally $50) and Growth is $50 (normally $100). After that the plan moves to its standard price. Spots are limited.",
  },
  {
    question: "What does a custom workflow cost?",
    answer:
      "$25 one-time setup per workflow (normally $100), on any plan, while slots last. We build it around your business process; after that it runs on your credits.",
  },
  {
    question: "What is a credit?",
    answer:
      "Credits are what Xura spends doing work for you: building a dashboard, writing a deck, researching a question, running a workflow. They work across every output, so you can spend them however your team needs.",
  },
  {
    question: "Are credits per user?",
    answer:
      "Yes. Each seat comes with its own monthly allowance: 500 credits on Starter, 1,000 on Growth.",
  },
  {
    question: "Do unused credits roll over?",
    answer:
      "No. Your allowance resets at the start of each billing month.",
  },
  {
    question: "What if I run out mid-month?",
    answer:
      "Top up any time. Extra credits are added straight away, so a big project never has to wait for next month.",
  },
  {
    question: "What support do I get?",
    answer:
      "24x7 support on every plan.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Any time. Upgrades apply immediately; downgrades take effect at the next billing cycle.",
  },
  {
    question: "Does my data train a public model?",
    answer:
      "No. Your data stays in your workspace, behind the permissions you set, with every run logged.",
  },
];
