/**
 * /deployment page copy. Uses only facts already on the site (bootcamp,
 * ~2 weeks to live, our team on site, continuous improvement after launch, bootcamp fee credited,
 * MIT stat). Bootcamp day split and client inputs are kept general —
 * confirm with the owner before adding detail.
 */

import type { WalkStep } from "@/components/sections/shared/depth-sections";

export const DEPLOY_HERO = {
  h1: "Our team deploys it. You run it.",
  sub: "Our team works with yours on site, finds the work AI should be doing, and builds the apps and workflows to do it. See it live in 2 weeks.",
} as const;

/** The engagement, phase by phase: what happens, what it reads, what it produces, where people approve. */
export const DEPLOY_STEPS: { label: string; heading: string; lead: string; steps: readonly WalkStep[] } = {
  label: "The engagement, step by step",
  heading: "From a 2-day bootcamp to live in 2 weeks",
  lead: "Our team is on site at every phase. Each one produces something you can see, and nothing reaches your business without a person approving it.",
  steps: [
    { tag: "Days 1–2", title: "Bootcamp", body: "We sit with the people who do the work, map where it gets stuck, and score the candidate jobs on pain, data access and value. Then we show the first one running on your own data.", reads: "Sample data and last month's outputs", makes: "The first job, agreed and seen working" },
    { tag: "Week 1", title: "Scope and access", body: "Our team maps the systems and people the job touches, agrees the outputs and who approves them, and sets up access with your IT team.", reads: "Your ERP, CRM, spreadsheets, with your permissions", makes: "An agreed build plan" },
    { tag: "Week 2", title: "Custom-build", body: "We build the AI employees, workflows and apps on Xura, connected to your systems. Your process owner reviews as we go, so what ships matches how the work really runs.", makes: "Working solution on your data" },
    { tag: "~2 weeks", title: "Go live", body: "Your team starts using it in the day-to-day. Outputs arrive for approval in WhatsApp, Slack or Teams, and we train your people on site.", gate: true, makes: "Your first live AI job" },
    { tag: "Weeks 3–12", title: "Refine and adopt", body: "We tune it with your team as real cases come in, and teach your people to adjust it themselves by asking in chat." },
    { tag: "Ongoing", title: "Continuous improvement", body: "We deliver new requirements as they arise and add the next jobs on the systems already connected, so each one is faster than the last.", makes: "More of your work handled, over time" },
  ],
};

/** Who's involved on both sides (from the bootcamp prep list and the team's role). */
export const DEPLOY_PEOPLE = {
  label: "Who's involved",
  heading: "Our team and yours, in the same room",
  lead: "A deployment works when the people who build it sit with the people who do the work.",
  lists: [
    { title: "Our team, on your site", items: ["Maps your process and systems with your people", "Builds the AI employees, workflows and apps on Xura", "Connects your ERP, CRM and spreadsheets", "Trains your team and tunes it after launch", "Stays on to deliver new requirements"] },
    { title: "Your team", items: ["A sponsor who can decide to go ahead", "A process owner who answers questions and approves outputs", "Two or three people who do the work today", "Someone from IT who can grant access"] },
  ],
} as const;

/** How control moves to the client over time. */
export const DEPLOY_OWNERSHIP = {
  label: "Ownership, by design",
  heading: "From our build to your team's control",
  lead: "We lead the build. Control moves to your team as trust is earned, one workflow at a time.",
  steps: [
    { title: "We build, you approve", body: "Our team builds and runs the first jobs with yours. Every output is a draft until a person on your side approves it." },
    { title: "Your team adjusts", body: "Your people learn to change what an AI employee does by asking in chat, without waiting on us." },
    { title: "You choose what runs alone", body: "Once a workflow has earned trust, you decide whether it keeps asking for approval or runs on its own. We keep building the next one." },
  ],
} as const;

/** What the client provides. */
export const DEPLOY_NEEDS = {
  label: "What we need from you",
  heading: "Less than you think",
  lead: "No data warehouse, no AI team, no new systems. Just access and the people who know the work.",
  lists: [
    { title: "Access", items: ["The systems the job uses, with your permissions", "Or exports, if direct access takes longer", "A contact in IT for access and security questions"] },
    { title: "Knowledge", items: ["Recent examples of the output, like last month's review", "Time with the people who do the work", "A process owner for quick decisions"] },
    { title: "Time", items: ["Two days for the bootcamp", "Short check-ins during the build", "Your team's feedback once it is live"] },
  ],
} as const;

/** After launch. */
export const DEPLOY_SUPPORT = {
  label: "After go-live",
  heading: "We don't hand over and leave",
  lead: "Go-live is the start of the partnership, not the end of the project.",
  items: [
    { title: "New requirements", body: "When the business changes, tell us. We build it on what is already in place." },
    { title: "The next jobs", body: "We add the next jobs on the systems already connected, team by team." },
    { title: "Tuning", body: "We refine outputs as real cases come in, with your process owner." },
    { title: "Training", body: "New people on your team learn to use and adjust it, on site or online." },
    { title: "Platform updates", body: "On Xura cloud, updates arrive automatically. In your VPC or on premises, our team rolls them out with yours." },
    { title: "Approvals stay", body: "Every output still waits for a person, unless you've chosen to let a workflow run on its own." },
  ],
} as const;

export const DEPLOY_LEAD = {
  label: "Our team on your site",
  heading: "People on your site, not a ticket queue",
  points: [
    "Works with your team where the work happens",
    "Maps your systems and the process owners",
    "Builds and tunes the apps and workflows on Xura",
    "Remains engaged after launch, delivering new requirements as they arise",
  ],
} as const;

export const DEPLOY_BOOTCAMP = {
  label: "The first step",
  heading: "The 2-day bootcamp",
  body: "Two days with our team on your own data. You see an AI agent working on a real process before you commit to a deployment. If you go ahead, the fee is credited to your deployment.",
  days: [
    { day: "Day 1", body: "Map where your work gets stuck and pick the process to start with." },
    { day: "Day 2", body: "See it working on your data, and agree what going live takes." },
  ],
} as const;

/** Hosting options (owner, 2026-11-16): Xura's cloud, the client's VPC, or the client's premises. */
export const DEPLOY_HOSTING = {
  label: "Where Xura runs",
  heading: "Run it where your data has to stay",
  lead: "Same platform, same team, same approvals. You choose where it runs.",
  options: [
    { title: "Xura cloud", tag: "Fastest start", body: "We host and run it for you. Nothing to install, and updates arrive automatically." },
    { title: "Your cloud (VPC)", tag: "Your network", body: "Xura runs inside your own cloud account. Your data stays in your network, behind your controls." },
    { title: "On your premises", tag: "Your servers", body: "Installed on your own infrastructure, for regulated sites and strict data-residency rules. Our team sets it up with yours." },
  ],
} as const;

export const DEPLOY_WHY = {
  heading: "Why partner-led works",
  stat: "Vendor- and partner-led AI deployments succeed about twice as often as internal builds.",
  source: "MIT NANDA, The GenAI Divide (2025)",
} as const;

export const DEPLOY_FAQ = [
  { q: "How long does a deployment take?", a: "Your first solution goes live in about 2 weeks after the bootcamp. From there, our team continues to support and extend it, delivering new requirements as your business evolves." },
  { q: "What does our team need to provide?", a: "Access to the systems the workflow uses, and a person who owns the process and can answer questions." },
  { q: "Can Xura run in our own cloud or on our premises?", a: "Yes. Xura can run in our cloud, inside your own cloud account (VPC), or on your own servers. Our team sets it up with yours." },
  { q: "What does the bootcamp cost?", a: "It depends on your company and the job we start with. Book a call and we'll quote it. If you go ahead, the fee is credited to your deployment." },
  { q: "What happens after go-live?", a: "Your team runs it, and every output waits for approval. We stay on to tune it, deliver new requirements and build the next job." },
  { q: "Do we need a data warehouse or new systems?", a: "No. Xura connects to the systems you already use, or reads their exports, with your permissions." },
  { q: "Who from our side needs to be involved?", a: "A sponsor, the owner of the process we start with, two or three people who do the work, and someone from IT who can grant access." },
  { q: "Is our data safe during the build?", a: "Queries run where your data lives and no raw tables are copied out. Your data never trains a model, and every prompt, tool call and action is logged." },
] as const;
