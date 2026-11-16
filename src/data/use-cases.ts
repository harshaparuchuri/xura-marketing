/**
 * Use-case pages (/use-cases/[slug], ADR-0046): one page per job, each
 * answering one search. Facts come from the product's built-in AI employees
 * (Xura-main src/server/seeds: Meera's playbooks and routines, Nora's
 * reviews, Ezra's decks, Kira's hiring app). No outcome numbers: Xura has no
 * published customer results yet, so examples are labelled as examples.
 */
import type { WalkStep } from "@/components/sections/shared/depth-sections";
import type { Answer, RelatedLink } from "@/components/sections/shared/content-blocks";

export type UseCase = {
  slug: string;
  /** Short name for menus, cards and breadcrumbs. */
  name: string;
  /** Who it's for, shown on the index card. */
  team: string;
  meta: { title: string; description: string };
  h1: string;
  sub: string;
  answer: Answer;
  why: { heading: string; paragraphs: readonly string[] };
  walk: { heading: string; lead: string; steps: readonly WalkStep[] };
  systems: readonly string[];
  approvals: readonly string[];
  example: { heading: string; body: readonly string[] };
  faq: readonly { q: string; a: string }[];
  related: readonly RelatedLink[];
};

export const USE_CASES: readonly UseCase[] = [
  {
    slug: "deviation-investigation",
    name: "Deviation investigation",
    team: "Pharma quality (QA)",
    meta: {
      title: "AI for Deviation Investigation in Pharma QA",
      description:
        "An AI employee drafts deviation and OOS investigations in your site SOP format, with precedents and root cause. QA reviews, decides and signs.",
    },
    h1: "AI deviation investigation, drafted for QA to sign",
    sub: "When a deviation or OOS is raised, Meera gathers the batch record, finds precedents and drafts the investigation in your site's format. QA decides and signs. She never does.",
    answer: {
      q: "What is AI deviation investigation?",
      a: "AI deviation investigation means an AI agent prepares the first draft of a deviation or OOS investigation: it pulls the batch record and test results, finds similar past deviations, proposes a likely root cause with evidence, and writes it in your SOP format. A QA reviewer edits, decides and signs it.",
    },
    why: {
      heading: "Why investigations take so long",
      paragraphs: [
        "The evidence for a deviation is never in one place. The batch record is in the MES or on paper, test results are in the LIMS, past deviations are in the QMS or an Excel register, and the SOP that says how to write it up is a PDF on SharePoint.",
        "So an investigator spends most of the time gathering, not thinking. Precedents get missed because nobody searches three years of history by hand, and the same root cause comes back because the link to last year's CAPA was never made.",
        "An AI employee does the gathering and the first draft. The judgement stays with QA.",
      ],
    },
    walk: {
      heading: "How a deviation moves through Xura",
      lead: "Every step reads your own records. Nothing is logged until QA approves it.",
      steps: [
        { tag: "Intake", title: "A deviation is raised", body: "Meera checks for new deviation, incident and OOS notifications every hour during working hours and picks up the new one.", reads: "QMS export or deviation register" },
        { tag: "Gather", title: "The evidence is pulled together", body: "The batch record, test results and equipment history for the affected batch are joined into one view.", reads: "MES / batch record, LIMS, equipment master", makes: "One view of the batch" },
        { tag: "Precedents", title: "Similar deviations are found", body: "Past deviations on the same product, equipment or area are matched, with their root causes and CAPAs.", reads: "Deviation and CAPA history", makes: "A list of precedents" },
        { tag: "Draft", title: "The investigation is drafted", body: "A draft in your site SOP format: description, impact assessment, likely root cause using your root-cause taxonomy, and proposed CAPA. Every statement links to its source.", makes: "A draft investigation with sources" },
        { tag: "Review", title: "QA reviews, edits and signs", body: "The draft lands in the QA channel. The reviewer edits what's wrong, decides the root cause and signs. Corrections are saved so the next draft follows them.", gate: true },
        { tag: "Follow-up", title: "Due dates are tracked", body: "The approved CAPA is added to the daily ageing digest, so nothing goes overdue unnoticed." },
      ],
    },
    systems: ["TrackWise, Caliber, AmpleLogic or an Excel register (exports)", "MES or paper batch records", "LIMS test results", "SOP index and templates on SharePoint", "WhatsApp, Slack or Teams for the QA channel"],
    approvals: ["Every intake is reviewed before it's logged", "Root cause and CAPA are decided by QA, never by Meera", "Nothing is sent outside Xura without approval", "Reviewer corrections are saved and reused"],
    example: {
      heading: "From report to signed investigation",
      body: [
        "An OOS result is reported on a tablet batch. Within the hour Meera posts a draft intake to the QA channel: the batch, the test, the two most similar deviations from the last three years on the same compression machine, and the CAPA raised last time.",
        "The draft investigation proposes a likely cause and lists what still needs checking on the floor. The QA reviewer confirms one check, rejects another, edits the impact assessment and signs. The CAPA goes on the ageing digest with its due date.",
      ],
    },
    faq: [
      { q: "Does the AI decide the root cause?", a: "No. Meera proposes a likely root cause with the evidence behind it. QA decides, edits and signs. She is built never to make the decision." },
      { q: "Will drafts follow our site's SOP format?", a: "Yes. Upload your SOP index and investigation templates, and drafts follow them. Reviewer corrections are saved and reused." },
      { q: "Which regulations does it cover?", a: "Drafts follow your SOPs, which reflect your obligations, such as revised Schedule M, 21 CFR 211.192 for OOS investigations, and ICH Q9 for risk assessment. Compliance stays with your QA team." },
      { q: "Do we need to replace our QMS?", a: "No. Xura reads exports or connects to the systems you already use, including TrackWise, Caliber, AmpleLogic or an Excel register." },
    ],
    related: [
      { href: "/use-cases/capa-tracking", label: "CAPA tracking and ageing", body: "Every open CAPA by owner and age, with overdue items chased." },
      { href: "/industries/pharma", label: "AI for pharma", body: "Batch, quality and compliance workflows for pharma teams." },
      { href: "/workflows", label: "Workflows", body: "See the Deviation to CAPA workflow step by step." },
    ],
  },
  {
    slug: "capa-tracking",
    name: "CAPA tracking and ageing",
    team: "Quality (pharma and manufacturing)",
    meta: {
      title: "AI CAPA Tracking: Ageing Digests and Overdue Nudges",
      description:
        "A daily digest of overdue and due-this-week deviations, CAPAs and change controls by owner, with drafted nudges you approve. Built for QA teams.",
    },
    h1: "CAPA tracking that chases itself, with your approval",
    sub: "Every morning, Meera lists the deviations, CAPAs and change controls that are overdue or due this week, grouped by owner, with a drafted nudge for each. You approve before anything is sent.",
    answer: {
      q: "What is AI CAPA tracking?",
      a: "AI CAPA tracking means an AI agent watches every open CAPA, deviation and change control, reports what is overdue or due soon by owner, flags repeat issues, and drafts reminders. A person approves each reminder before it goes out, and the quality head approves the monthly metrics.",
    },
    why: {
      heading: "Why CAPAs go overdue",
      paragraphs: [
        "CAPAs rarely go overdue because nobody cares. They go overdue because the list lives in a QMS export or a spreadsheet that someone has to open, filter and chase by hand, and that someone is also running investigations.",
        "Ageing reports are rebuilt every week, the monthly management review pack is rebuilt every month, and repeat deviations hide in plain sight because nobody has time to look across three years of data.",
      ],
    },
    walk: {
      heading: "What runs, and when",
      lead: "These are the routines Meera runs for quality teams. Each one can be switched on or off.",
      steps: [
        { tag: "Daily, 9:00", title: "Ageing digest", body: "Overdue, due in 7 days and due in 8–30 days, for CAPAs, deviations and change controls, grouped by owner and department. Items overdue more than 30 days and repeated extension requests are highlighted.", makes: "A digest in the QA channel" },
        { tag: "Daily", title: "Drafted nudges", body: "A short reminder for each owner with an overdue item, waiting for your approval.", gate: true },
        { tag: "Mondays, 9:30", title: "Deviation trend report", body: "Trends by product, equipment, area and root cause. Repeats and CAPAs that may not be working are flagged.", makes: "A trend report for QA sign-off" },
        { tag: "1st of the month", title: "Quality metrics pack", body: "Open and closed counts, median closure days, CAPAs closed on time, repeat-deviation rate and top root causes, with month-on-month change, drafted for the management review.", makes: "A draft metrics pack" },
        { tag: "Review", title: "The QA head approves the pack", body: "The pack is a draft until the QA head approves it.", gate: true },
      ],
    },
    systems: ["QMS exports: TrackWise, Caliber, AmpleLogic or Excel registers", "Change control and commitments trackers", "WhatsApp, Slack, Teams or email for nudges"],
    approvals: ["Every nudge to an owner waits for your OK", "Trend reports are signed off by QA before sharing", "The monthly pack is approved by the QA head", "Ageing is reported exactly as recorded; dates are never estimated"],
    example: {
      heading: "A typical morning",
      body: [
        "At 9:00 the QA channel gets the digest: a handful of CAPAs overdue, two of them past 30 days, one with a second extension request. Each owner has a drafted nudge.",
        "The QA head edits one nudge, approves the rest, and asks in the chat which area has the most repeat deviations this quarter. The answer comes back with links to the records.",
      ],
    },
    faq: [
      { q: "Can it send reminders automatically?", a: "Only with approval. Nudges are drafted and wait for a person. You can choose later which routines run on their own." },
      { q: "Does it work with an Excel CAPA register?", a: "Yes. Upload exports from your QMS or Excel registers in Data Sources and refresh them weekly, or connect directly where your system allows." },
      { q: "What goes into the monthly metrics pack?", a: "Open and closed counts, median closure days, CAPAs closed on time, repeat-deviation rate, OOS rate, top root-cause categories and overdue commitments, with month-on-month change." },
    ],
    related: [
      { href: "/use-cases/deviation-investigation", label: "Deviation investigation", body: "Drafted investigations with precedents, signed by QA." },
      { href: "/industries/manufacturing", label: "AI for manufacturing", body: "Production, quality and supply workflows." },
      { href: "/ai-employees", label: "AI employees", body: "Meet Meera and the rest of the team." },
    ],
  },
  {
    slug: "monthly-sales-review",
    name: "Monthly sales review",
    team: "Sales and leadership",
    meta: {
      title: "Automate the Monthly Sales Review with AI",
      description:
        "An AI employee pulls the month's numbers from your ERP, CRM and targets sheet and drafts the sales review with the reasons behind each movement.",
    },
    h1: "The monthly sales review, drafted on the first working day",
    sub: "Nora pulls the month's numbers from your ERP, CRM and targets spreadsheet, compares them to target and last month, and drafts the review with the reasons behind each movement. The sales head approves it.",
    answer: {
      q: "How do you automate a monthly sales review?",
      a: "Connect the systems the review uses, usually the ERP for invoiced sales, the CRM for pipeline and a spreadsheet for targets, and let an AI employee draft the review on a schedule: headline numbers, movers, reasons and a short commentary, each linked to its source, for the sales head to approve.",
    },
    why: {
      heading: "Why the review eats the first week of the month",
      paragraphs: [
        "The monthly review is the same work every month: export from the ERP, export from the CRM, reconcile both with the targets sheet, chase the regional managers for explanations, and build the same slides again.",
        "By the time it's ready, the month is a week old. The analysis that matters, why a region moved and what to do about it, gets the least time.",
      ],
    },
    walk: {
      heading: "How the review gets made",
      lead: "Runs on the first working day of the month, on your data.",
      steps: [
        { tag: "Pull", title: "Numbers are gathered", body: "Invoiced sales, orders and returns from the ERP; pipeline from the CRM; targets from your spreadsheet.", reads: "ERP, CRM, targets sheet" },
        { tag: "Compare", title: "Against target and last month", body: "Every region, product and customer group is compared to target and to the previous month, and the biggest movers are ranked." },
        { tag: "Explain", title: "Reasons are found", body: "For each big mover, Nora looks for the reason in the data: a large customer, a price change, a stock-out, a late shipment." , makes: "Movers with reasons and sources" },
        { tag: "Draft", title: "The review is written", body: "A one-page review with headline numbers, movers and a short commentary, in your format. Every number links to its source.", makes: "A draft review" },
        { tag: "Approve", title: "The sales head approves", body: "The review arrives on WhatsApp or Teams. The sales head edits and approves it before it goes to leadership.", gate: true },
      ],
    },
    systems: ["ERP: SAP, Oracle, Odoo, Zoho or Tally exports", "CRM: Salesforce, HubSpot or Zoho", "Targets in Excel or Google Sheets", "WhatsApp, Slack, Teams or email"],
    approvals: ["The sales head approves before it goes to leadership", "Every number links to its source", "Nothing is emailed without approval"],
    example: {
      heading: "A typical month-end",
      body: [
        "On the first working day, the sales head gets the draft on WhatsApp: the month against target, the three regions that moved most, and for each one the reason found in the data, such as a delayed shipment to a large distributor.",
        "They ask a follow-up question in the chat, edit one line of commentary and approve. Ezra turns the approved review into the leadership deck.",
      ],
    },
    faq: [
      { q: "Can it use our existing review format?", a: "Yes. Share last month's review and the draft follows the same structure." },
      { q: "What if our ERP can't connect directly?", a: "Uploaded exports work. Our team sets up the connection that suits your systems during the deployment." },
      { q: "Can it make the leadership deck too?", a: "Yes. Ezra turns the approved review into a branded deck with charts and speaker notes." },
    ],
    related: [
      { href: "/use-cases/leadership-decks", label: "Leadership decks", body: "The approved review, turned into the monthly deck." },
      { href: "/ai-employees", label: "AI employees", body: "Meet Nora, the Chief of Staff." },
      { href: "/integrations", label: "Integrations", body: "ERP, CRM and spreadsheets Xura connects to." },
    ],
  },
  {
    slug: "leadership-decks",
    name: "Leadership decks",
    team: "Leadership and strategy",
    meta: {
      title: "AI Leadership Decks: Monthly Packs Built From Your Data",
      description:
        "Turn the month's approved numbers into a branded leadership deck with charts and speaker notes. Same structure every month, approved before it's shared.",
    },
    h1: "The leadership deck, rebuilt every month without the rebuild",
    sub: "Ezra turns the month's approved numbers into the deck leadership reviews: the same structure every month, updated charts, and speaker notes for whoever presents.",
    answer: {
      q: "Can AI make a leadership deck from company data?",
      a: "Yes. An AI employee can take the month's approved reviews and dashboards, keep last month's deck structure, update every chart and number, write speaker notes, and apply your brand. The presenter reviews and approves the deck before it's shared.",
    },
    why: {
      heading: "Why the deck takes days",
      paragraphs: [
        "Most of the work in a monthly deck isn't thinking. It's copying numbers into charts, fixing chart colours, and checking that slide 12 matches slide 3.",
        "Because it's rebuilt by hand, it's late, and the numbers in it are already a week old when leadership sees them.",
      ],
    },
    walk: {
      heading: "How the deck gets made",
      lead: "Starts from numbers that have already been approved.",
      steps: [
        { tag: "Inputs", title: "Approved reviews and dashboards", body: "The month's approved sales review, operations numbers and dashboards.", reads: "Approved reviews, dashboards, last month's deck" },
        { tag: "Structure", title: "Same deck, new month", body: "Last month's structure is kept so leadership sees the same story in the same place." },
        { tag: "Build", title: "Charts, numbers and notes", body: "Every chart and number is updated, and speaker notes are written for the presenter.", makes: "A branded slide deck" },
        { tag: "Approve", title: "The presenter approves", body: "The presenter reviews, edits and approves before the deck is shared.", gate: true },
      ],
    },
    systems: ["Approved reviews and dashboards in Xura", "Your brand kit (colours and fonts)", "Share a link or download"],
    approvals: ["The presenter approves before sharing", "Numbers come only from approved reviews", "Every chart links to its query"],
    example: {
      heading: "A typical month",
      body: [
        "The day after the sales review is approved, the presenter gets a draft deck with the same twelve sections as last month, every chart updated and speaker notes for each slide. They rewrite two notes and approve it.",
      ],
    },
    faq: [
      { q: "Will it match our brand?", a: "Yes. Colours and fonts come from your brand kit." },
      { q: "Can we edit the deck?", a: "Yes. Ask for changes in chat, then share or download it." },
    ],
    related: [
      { href: "/use-cases/monthly-sales-review", label: "Monthly sales review", body: "Where the deck's numbers come from." },
      { href: "/ai-employees", label: "AI employees", body: "Meet Ezra and the team." },
      { href: "/platform", label: "Platform overview", body: "Decks, dashboards, research and briefs on one platform." },
    ],
  },
  {
    slug: "plant-performance-review",
    name: "Plant performance review",
    team: "Operations and plant heads",
    meta: {
      title: "AI Plant Performance Review: Daily OEE Briefs",
      description:
        "A morning brief on output, OEE, downtime and late orders by line, from your MES and ERP, plus the monthly plant review drafted for the plant head.",
    },
    h1: "Plant performance, in your pocket before the shift starts",
    sub: "Every weekday morning, Nora sends output, OEE and downtime by line and the orders at risk, from your MES and ERP. The monthly plant review is drafted for the plant head to approve.",
    answer: {
      q: "How can AI help with plant performance reviews?",
      a: "An AI employee can join MES, maintenance and ERP data every morning and send a short brief: output, OEE and downtime by line, the likely causes, and orders at risk. Monthly, it drafts the plant performance review with movements and reasons, for the plant head to approve.",
    },
    why: {
      heading: "Why plant numbers arrive late",
      paragraphs: [
        "Production data lives in the MES, maintenance in another system, orders in the ERP, and the reconciliation happens in Excel after the shift. OEE becomes a weekly ritual instead of a morning number.",
        "By the time downtime is explained, the same stoppage has happened again.",
      ],
    },
    walk: {
      heading: "What runs, and when",
      lead: "Read-only briefs; nothing is changed in your systems.",
      steps: [
        { tag: "Weekdays, 8:30", title: "Morning brief", body: "Output, OEE and downtime by line, and orders at risk, from your MES and ERP.", reads: "MES, ERP, maintenance log", makes: "A brief on WhatsApp" },
        { tag: "On demand", title: "Ask why", body: "Supervisors ask in the chat why a line was down, and get the answer with the records behind it." },
        { tag: "Weekdays, 16:00", title: "Follow-up check", body: "Overdue maintenance and supplier actions by owner, with drafted nudges.", gate: true },
        { tag: "Monthly", title: "Plant performance review", body: "Capacity, output, quality and late orders for the month, with movements and reasons, drafted for the plant head.", makes: "A draft review" },
      ],
    },
    systems: ["MES and SCADA exports", "SAP or another ERP", "Maintenance logs", "WhatsApp for supervisors"],
    approvals: ["Briefs are read-only", "Every nudge waits for your OK", "The plant head approves the monthly review"],
    example: {
      heading: "A typical morning",
      body: [
        "At 8:30 the plant head reads the brief on WhatsApp: one line below target overnight, the stoppage that caused it, and two orders now at risk. They ask which supplier the late part came from and forward the drafted follow-up after approving it.",
      ],
    },
    faq: [
      { q: "Do we need a data warehouse first?", a: "No. Xura reads MES and ERP exports or connects directly, and joins them in its knowledge graph." },
      { q: "Can operators use it?", a: "Yes. Supervisors and operators can ask questions on WhatsApp from the line." },
    ],
    related: [
      { href: "/industries/manufacturing", label: "AI for manufacturing", body: "Production, quality and supply workflows." },
      { href: "/use-cases/capa-tracking", label: "CAPA tracking", body: "Quality actions tracked by owner and age." },
      { href: "/integrations", label: "Integrations", body: "MES, ERP and the tools your team uses." },
    ],
  },
  {
    slug: "hiring-pipeline",
    name: "Hiring pipeline app",
    team: "HR and hiring managers",
    meta: {
      title: "AI Hiring Pipeline App: Drop-off, Interviews, Summaries",
      description:
        "A hiring pipeline app built on your data: where candidates drop off, this week's interviews and candidate summaries, run by an AI recruiting coordinator.",
    },
    h1: "A hiring pipeline app, run by an AI recruiting coordinator",
    sub: "Kira runs your hiring pipeline app: where candidates drop off, this week's interviews and a short summary of each candidate before the interview. Nothing reaches a candidate without approval.",
    answer: {
      q: "What does an AI recruiting coordinator do?",
      a: "An AI recruiting coordinator keeps the hiring pipeline current: it shows candidates by stage and where they drop off, lists this week's interviews, writes a short summary of each candidate before the interview, and drafts messages to interviewers and candidates for a person to approve.",
    },
    why: {
      heading: "Why hiring pipelines go stale",
      paragraphs: [
        "Applications sit in one place, the interview calendar in another, and feedback in people's inboxes. Nobody can say where candidates drop off without a spreadsheet.",
        "Interviewers walk in unprepared, and good candidates wait too long between stages.",
      ],
    },
    walk: {
      heading: "What the app and Kira do",
      lead: "The app is built in chat on your data; Kira keeps it moving.",
      steps: [
        { tag: "App", title: "Pipeline overview", body: "Active candidates, offers out and interviews in the next 7 days, each compared with last week, plus the drop-off funnel by stage.", makes: "The Overview page" },
        { tag: "Weekdays, 9:00", title: "Daily hiring brief", body: "Today's interviews, open roles and where candidates are stuck.", makes: "A brief for the hiring manager" },
        { tag: "Before each interview", title: "Candidate summary", body: "A short summary of the candidate for the interviewer.", reads: "Application, earlier feedback" },
        { tag: "Messages", title: "Drafted, then approved", body: "Feedback nudges to interviewers and messages to candidates are drafted and wait for the hiring manager.", gate: true },
      ],
    },
    systems: ["Applications (ATS export or form)", "Google Calendar or Outlook", "Interviewer feedback", "WhatsApp, Slack or Teams"],
    approvals: ["Nothing reaches a candidate without approval", "Only people you add can open the app", "Every change to the app is versioned"],
    example: {
      heading: "A typical week",
      body: [
        "On Monday the hiring manager opens the app and sees that most candidates stall between interview and offer. Kira's brief lists this week's interviews with a summary for each, and a drafted nudge to an interviewer who hasn't left feedback, waiting for approval.",
      ],
    },
    faq: [
      { q: "Do we need an ATS?", a: "No. The app can hold candidates itself, or read from your ATS export." },
      { q: "Can we change the app?", a: "Yes. Ask in chat, for example 'add a priority field', and every change is versioned." },
    ],
    related: [
      { href: "/apps", label: "Apps", body: "How apps are built by describing them." },
      { href: "/ai-employees", label: "AI employees", body: "Meet Kira and the team." },
      { href: "/security", label: "Security", body: "Access you control, every action logged." },
    ],
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
