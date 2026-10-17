import { siteConfig } from "@/lib/site";

/**
 * Pricing page content — matches the Oct 2026 sales deck (per-seat plans with
 * a monthly credit allowance) plus the free pilot.
 *
 * Credit policy (confirmed 2026-10-18): credits are per seat, do NOT roll
 * over, and can be topped up mid-month.
 */

export interface PricingPlan {
  name: string;
  /** Display price, e.g. "$50", "Free" or "Let's talk". */
  price: string;
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
    name: "Pilot",
    price: "Free",
    unit: "for 1 week",
    credits: "100 credits · 1 user",
    summary: "Put one AI employee to work on your own data.",
    features: [
      "Every output: dashboards, decks, research, briefs",
      "Connect your tools or upload a file",
      "Goal: automate one crucial business flow",
      "No credit card",
    ],
    cta: { label: "Get started for free", href: siteConfig.signupUrl },
    badge: "Start here",
    entry: true,
  },
  {
    name: "Starter",
    price: "$50",
    unit: "per user / month",
    credits: "500 credits per user / month",
    summary: "For a team trying Xura on one use case.",
    features: [
      "Dashboards, research, slides, briefs and social posts",
      "Custom integrations and connectors",
      "Xura on WhatsApp, Slack and Teams",
      "Top up credits any time",
    ],
    cta: { label: "Get started for free", href: siteConfig.signupUrl },
  },
  {
    name: "Growth",
    price: "$100",
    unit: "per user / month",
    credits: "1,000 credits per user / month",
    summary: "For teams running Xura every day.",
    featuresLead: "Everything in Starter, plus:",
    features: [
      "AI employees and Flows",
      "Custom brand kit",
      "Company ontology and context graph",
    ],
    cta: { label: "Get started for free", href: siteConfig.signupUrl },
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
      "Custom Flows for your business",
      "Agent evals, governance and updates",
      "Invoicing and custom billing terms",
    ],
    cta: { label: "Book a demo", href: siteConfig.demoUrl },
  },
];

/** What a credit buys — rates derived from the deck (500 credits ≈ 25 dashboards, etc.). */
export interface CreditExample {
  output: string;
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
    credits: 6,
    prompt: "Turn Q4 plant performance into a shareable infographic",
    result: "Ready in your brand, as PNG or PDF.",
    shot: {
      src: "/assets/product/out-infographic.png",
      alt: "A Xura infographic headed Q4 Plant Performance Leaders with a headline number and a capacity chart",
      crop: { x: 0.21, y: 0.17, w: 0.58, h: 0.56 },
    },
  },
  {
    output: "Live dashboard",
    credits: 20,
    prompt: "Show headcount by department",
    result: "Live dashboard, refreshing daily.",
    shot: {
      src: "/assets/product/dashboard.png",
      alt: "A Xura dashboard with headcount, compensation and training KPIs above a headcount-by-department chart",
      crop: { x: 0.07, y: 0.41, w: 0.6, h: 0.59 },
    },
  },
  {
    output: "Slide deck",
    credits: 40,
    prompt: "Make a team review deck on task completion by team",
    result: "Numbers sourced, exported to .pptx.",
    shot: {
      src: "/assets/product/out-deck.png",
      alt: "A Xura-generated slide titled Task Completion Rate by Team",
      crop: { x: 0.157, y: 0.218, w: 0.64, h: 0.58 },
    },
  },
  {
    output: "Research report",
    credits: 60,
    prompt: "Research the market for our next launch",
    result: "87 citations from 30 sources.",
    shot: {
      src: "/assets/product/out-research.png",
      alt: "A Xura deep-research report title page with 87 citations from 30 sources",
      crop: { x: 0.22, y: 0.08, w: 0.56, h: 0.6 },
    },
  },
];

export const CREDITS_NOTE =
  "500 credits a month is about 25 dashboards, 12 decks, 8 research reports or 80 social posts, or any mix, since credits work across everything.";

export const PRICING_FAQ: { question: string; answer: string }[] = [
  {
    question: "Is the pilot really free?",
    answer:
      "Yes. One week, one user, 100 credits, on your own data. No credit card. The goal is to automate one crucial business flow; if it works, pick a plan.",
  },
  {
    question: "What is a credit?",
    answer:
      "Credits are what Xura spends doing work for you: building a dashboard, writing a deck, researching a question, running a Flow. They work across every output, so you can spend them however your team needs.",
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
