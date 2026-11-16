/**
 * /deployment page copy. Uses only facts already on the site (bootcamp,
 * ~2 weeks to live, deployment lead on site, next workflow every quarter, bootcamp fee credited,
 * MIT stat). Bootcamp day split and client inputs are kept general —
 * confirm with the owner before adding detail.
 */

export const DEPLOY_HERO = {
  h1: "Our team deploys it. You run it.",
  sub: "A Xura deployment lead works with your team on site, finds the work AI should be doing, and builds the apps and workflows to do it. See it live in 2 weeks.",
} as const;

export const DEPLOY_STEPS = {
  label: "The engagement",
  heading: "From a 2-day bootcamp to live in 2 weeks",
  steps: [
    { when: "Days 1–2", title: "Bootcamp", body: "We map where your work gets stuck, pick the process an AI agent can improve, and show it working on your own data." },
    { when: "Week 1", title: "Find what needs attention", body: "Your deployment lead maps the systems and people involved and agrees what to build with you." },
    { when: "Week 2", title: "Custom-build and go live", body: "We build the apps and workflows on Xura, connected to your ERP, CRM and spreadsheets, and your team starts using them. Every output waits for your approval." },
    { when: "Every quarter", title: "Next workflow", body: "We add the next one, reusing what's already built." },
  ],
} as const;

export const DEPLOY_LEAD = {
  label: "Your deployment lead",
  heading: "A person on your site, not a ticket queue",
  points: [
    "Works with your team where the work happens",
    "Maps your systems and the process owners",
    "Builds and tunes the apps and workflows on Xura",
    "Hands them over, then moves to the next job",
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
  { q: "How long does a deployment take?", a: "You see it live in about 2 weeks after the bootcamp. We then add about one new workflow per quarter." },
  { q: "What does our team need to provide?", a: "Access to the systems the workflow uses, and a person who owns the process and can answer questions." },
  { q: "Can Xura run in our own cloud or on our premises?", a: "Yes. Xura can run in our cloud, inside your own cloud account (VPC), or on your own servers. Our team sets it up with yours." },
  { q: "What does the bootcamp cost?", a: "It depends on your company and the job we start with. Book a call and we'll quote it. If you go ahead, the fee is credited to your deployment." },
  { q: "What happens after go-live?", a: "Your team runs it, and every output waits for approval. We stay on to build the next workflow." },
] as const;
