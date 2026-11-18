/**
 * /pulse copy — Xura Pulse, audience testing on simulated people (product:
 * Xura-main src/poc-audience, /pulse). Domain-agnostic (owner, 2026-11-19). Facts from the owner and
 * the product: Goal → Audience → Run; surveys, posts, media and decks; up to
 * 200 personas live in one run (MAX_POOL_SIZE); interview any persona one to
 * one; A/B versions; pools built in AI Studio. No accuracy numbers until the
 * owner supplies them.
 */

type Item = { title: string; body: string };

export const PULSE_HERO = {
  h1: "Hear your market before you launch",
  sub: "Xura Pulse runs your message, campaign, deck or price past up to 200 simulated people at once. See who leans in, who walks away and why, in minutes.",
} as const;

export const PULSE_USES = {
  label: "What teams test",
  heading: "Test it on the people it's for",
  lead: "Any audience you sell to, hire from or raise from. Our team builds the panel; you run anything past it.",
  items: [
    { title: "Messages and positioning", body: "See how your buyers read a new claim, tagline or product story before it goes out." },
    { title: "Sales and pitch decks", body: "Show the deck to decision makers or investors. See where attention drops and the questions they'd ask." },
    { title: "Campaigns and creatives", body: "Videos, LinkedIn and Instagram posts, A/B tested head to head before you spend on launch." },
    { title: "Pricing and offers", body: "Try price points, bundles and terms with customers or partners, and hear what makes them push back." },
    { title: "Surveys", body: "Run a survey with ratings, choices and open questions, and get the results from 200 people in minutes." },
    { title: "A/B tests", body: "Two versions of a post, ad, page or deck, side by side. See which wins, with whom, and why." },
  ] satisfies Item[],
} as const;

export const PULSE_CONTEXT = {
  label: "Rooted in context",
  heading: "Every reaction knows your company and the person",
  lead: "Pulse doesn't test in a vacuum. Your panel reacts with your company's context in hand, and each persona brings their own.",
  points: [
    { title: "Your company's context", body: "Products, pricing, customers, past campaigns, brand voice and market, from the knowledge Xura already holds about your business." },
    { title: "Your audience's context", body: "Each persona has a role, a company, habits, budget and the problems they care about, set by the panel you choose." },
    { title: "Reactions grounded in both", body: "So feedback sounds like your market talking about your offer, not generic opinions about a generic product." },
  ] satisfies Item[],
} as const;

export const PULSE_STEPS = {
  label: "How it works",
  heading: "Goal, audience, run",
  lead: "One test, three steps. No survey vendor, no six-week wait.",
  steps: [
    { title: "Goal", body: "Say what you want to learn, and add what you're testing: a post, a survey, a video or a deck. Add a second version to compare." },
    { title: "Audience", body: "Pick a panel built for your market: customers, decision makers, investors or partners, with the mix of people you need." },
    { title: "Run", body: "Up to 200 people react live, each in character. Watch the count, the quotes and the mood of the room as it fills." },
  ] satisfies Item[],
} as const;

export const PULSE_AB = {
  label: "A/B testing",
  heading: "Set up two versions in one form",
  lead: "Say what the piece should achieve, add version A and version B, pick the audience and run. Pulse shows which one wins and with which people.",
  points: [
    { title: "Any format", body: "Posts, ads, videos, landing pages, emails or decks, as images, text or PDF." },
    { title: "More than two", body: "Add a third or fourth version when you have more ideas to compare." },
    { title: "A winner, with reasons", body: "The share who would act on each version, and what tipped them." },
  ] satisfies Item[],
} as const;

export const PULSE_SURVEY = {
  label: "Surveys",
  heading: "Survey results in minutes, not weeks",
  lead: "Write the questions, choose ratings, choices or open answers, and 200 people answer at once. Open answers come back grouped into themes.",
  points: [
    { title: "Ratings and choices", body: "Distributions and averages for every scale and multiple-choice question." },
    { title: "Open answers, themed", body: "Free text grouped into themes and counted, with quotes behind each one." },
    { title: "Split by audience", body: "See how answers change across segments in your panel." },
  ] satisfies Item[],
} as const;

export const PULSE_FEATURES = {
  label: "What you get",
  heading: "Numbers and reasons, at the same time",
  lead: "Every run is quantitative and qualitative at once.",
  points: [
    { title: "Up to 200 people in one run", body: "A whole panel reacts live, in one go, so you see the spread, not one opinion." },
    { title: "A/B before launch", body: "Put two versions of a video, post or deck side by side and see which one wins, and with whom." },
    { title: "Interview anyone one to one", body: "Open any persona and ask follow-up questions, so the why behind a score is one conversation away." },
    { title: "Reasons, not just scores", body: "What worked and what put people off, each point backed by quotes from the people who said it." },
  ] satisfies Item[],
} as const;

export const PULSE_REPORT = {
  label: "The report",
  heading: "Where they lean in, and where they check out",
  lead: "For decks and videos, Pulse tracks attention moment by moment, flags where people drop off, and lists the questions they would ask you.",
  points: [
    { title: "Attention, slide by slide", body: "An average score for every slide or moment, with the point where people checked out." },
    { title: "The questions they'd ask", body: "The objections your buyers will raise, grouped and counted, so you can answer them first." },
    { title: "Fixes, ranked", body: "Each weak slide gets a score out of 10, the quotes behind it and what to change." },
  ] satisfies Item[],
} as const;

export const PULSE_FAQ = [
  { q: "What is Xura Pulse?", a: "Xura Pulse tests a message, campaign, deck or price on a panel of simulated people before you launch. Up to 200 people react at once, each in character, and you get scores, reasons and quotes in minutes." },
  { q: "Who are the people in a panel?", a: "Simulated personas built to match your audience, such as customers, decision makers, investors or partners, with the mix of traits you set. Our team builds and tunes the panels with you." },
  { q: "Can we run surveys?", a: "Yes. Write rating, multiple-choice and open questions; up to 200 people answer at once, and open answers come back grouped into themes." },
  { q: "Can we compare two versions?", a: "Yes. Add a second version of a video, post, survey or deck and Pulse shows which one each part of your audience prefers, and why." },
  { q: "Can we talk to individual personas?", a: "Yes. Open any persona and interview them one to one, so you get qualitative depth alongside the panel's numbers." },
  { q: "Does it replace market research?", a: "It works earlier. Use Pulse to test and narrow ideas in minutes, then take the strongest one into live research or launch." },
] as const;
