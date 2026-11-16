/**
 * /apps page copy. Facts from the product (Xura-main src/server/custom-apps,
 * apps/catalog.js, docs/apps-ui-style-guide.md). The catalog apps are marked
 * "planned" in the product, so they're presented as examples you can build,
 * not as ready-made apps.
 */

export const APPS_HERO = {
  h1: "Describe the app you need. Xura builds it.",
  sub: "Tell Xura in plain words what your team should work through. It asks a few questions, then builds a working app on your data that your team can use the same day.",
} as const;

export const APPS_STEPS = {
  label: "How it's built",
  heading: "From a sentence to a working app",
  steps: [
    { title: "Describe it", body: "\"A hiring pipeline: candidates by stage, where they drop off, this week's interviews.\"" },
    { title: "Answer a few questions", body: "Xura asks one thing at a time, with likely answers to tap, like which stages or who owns each record." },
    { title: "Publish", body: "The app goes live in your workspace, on your data, for the people you add." },
    { title: "Change it in chat", body: "\"Add a priority field.\" \"Show offers by team.\" Every change is versioned." },
  ],
} as const;

export const APPS_ANATOMY = {
  label: "What's in every app",
  heading: "A real app, not a dashboard",
  items: [
    { title: "Records you work through", body: "A ranked list with a detail view, actions, notes and a timeline for every record." },
    { title: "Pages for the work", body: "An overview with the numbers that matter, charts, a pipeline board, a calendar and tables." },
    { title: "Ask Xura inside", body: "Ask where candidates drop off or which renewals are at risk, without leaving the app." },
    { title: "Alerts", body: "What needs attention and what just went wrong surface as tasks and alerts." },
    { title: "Your brand", body: "Colours and fonts come from your company's brand kit automatically." },
    { title: "Access you control", body: "Only the people you add can open the app, with their own permissions." },
  ],
} as const;

export const APPS_EXAMPLES = {
  label: "Examples",
  heading: "Apps teams build with Xura",
  items: [
    { name: "Hiring pipeline", body: "Candidates by stage, where they drop off, offers out and this week's interviews." },
    { name: "Renewals desk", body: "Every renewal due in the next 90 days with health, owner and next step, so nothing renews by surprise." },
    { name: "Billing exceptions", body: "Failed payments, card declines and invoice errors in one queue, worked until they're resolved." },
    { name: "Churn rescue", body: "At-risk customers ranked by revenue and warning signs, with save plays and outcomes tracked." },
    { name: "Expansion pipeline", body: "Accounts showing upgrade signals, ranked by likely revenue, with the play for each." },
    { name: "Deviation and CAPA tracker", body: "Open deviations and CAPAs by owner and age, with what's overdue flagged." },
  ],
} as const;

export const APPS_COMPARE = {
  label: "Apps, workflows or AI employees?",
  heading: "Use the right one for the job",
  items: [
    { title: "Apps", body: "When your team needs a place to work through records together: candidates, renewals, cases." },
    { title: "Workflows", body: "When a process should run on a trigger or schedule, with approvals along the way." },
    { title: "AI employees", body: "When you want a teammate to ask, who drafts reviews, decks and briefs for you." },
  ],
} as const;

export const APPS_FAQ = [
  { q: "Do I need to code to build an app?", a: "No. You describe the app in chat and answer a few questions. Xura builds and checks the app before you publish it." },
  { q: "Where does an app's data come from?", a: "From the systems Xura is connected to in your workspace, plus anything your team adds in the app." },
  { q: "Who can see an app?", a: "Only the people you add. Each app has its own members and access." },
  { q: "Can our team build apps for us?", a: "Yes. During a deployment our team builds apps around your processes, then your team can change them in chat." },
] as const;
