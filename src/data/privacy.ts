import { siteConfig } from "@/lib/site";

/**
 * Privacy policy content for `/privacy`.
 *
 * Structure follows the pattern of strong SaaS policies (Slack, Notion,
 * Linear, Intercom): an at-a-glance summary, a clear split between Customer
 * Data (processed for customers) and everything else, tables for what we
 * collect / why / how long, named service providers, and rights by region.
 *
 * Website facts match this repo: demo form → Google Apps Script / Google
 * Sheets (email saved at step 1), Calendly booking, Google Analytics 4 in
 * production, youtube-nocookie embeds. Statements about the product, AI
 * providers and retention are written as Xura's policy; keep them true as the
 * product changes (see decisions-log ADR-0030).
 */

export const PRIVACY_EFFECTIVE = "4 November 2026";

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface PrivacySection {
  id: string;
  heading: string;
  blocks: PrivacyBlock[];
}

const EMAIL = siteConfig.email;
const ENTITY = siteConfig.legalName;

export const PRIVACY_INTRO = `${ENTITY} ("Xura", "we", "us") builds AI employees that work with your company's data across the web app, WhatsApp, Slack and Teams. This policy explains what personal information we collect, how we use and share it, and the choices you have. It covers our website, the Xura product and our sales and support conversations.`;

/** The short version, shown as cards above the full policy. */
export const PRIVACY_GLANCE: { title: string; body: string }[] = [
  {
    title: "Your company's data stays yours",
    body: "Data you connect or upload is processed only to do the work you ask for, under your instructions and your admin's controls.",
  },
  {
    title: "No training on your data",
    body: "We don't use Customer Data to train AI models, and our AI providers can't use it to train theirs.",
  },
  {
    title: "We don't sell personal information",
    body: "Not to advertisers, data brokers or anyone else.",
  },
  {
    title: "You're in control",
    body: `Ask us to access, correct or delete your information at any time by writing to ${EMAIL}.`,
  },
];

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "two-kinds",
    heading: "Customer Data and other information",
    blocks: [
      {
        type: "p",
        text: "We handle two kinds of information differently.",
      },
      {
        type: "list",
        items: [
          "Customer Data is the content a customer's workspace brings to Xura: data from connected tools (for example a CRM, data warehouse, Drive or inbox), uploaded files, prompts and messages to AI employees, and the outputs Xura creates. The customer controls this data and decides how it's used. We process it on the customer's behalf, as their processor, under our customer terms.",
          "Other Information is everything else we collect to run our business: website visits, demo requests, account and billing details, and support conversations. For this, we decide how it's used and are responsible for it under this policy.",
        ],
      },
      {
        type: "p",
        text: "If you use Xura through your employer, your employer's admins control your workspace and its Customer Data. Questions about that data are best sent to them first.",
      },
    ],
  },
  {
    id: "collect",
    heading: "Information we collect",
    blocks: [
      {
        type: "table",
        head: ["Source", "What we collect"],
        rows: [
          [
            "Demo requests on our website",
            "Work email, name, job title, company, and optionally your mobile number (with country code) and primary use case, plus the page and time of the request. We save your email as soon as you continue past the first step, so we can follow up even if you don't finish the form.",
          ],
          [
            "Meeting bookings",
            "If you book a call, Calendly collects your name, email and chosen time and tells us a booking was made.",
          ],
          [
            "Your Xura account",
            "Name, work email, company, role, sign-in details and workspace settings.",
          ],
          [
            "Using Xura",
            "Customer Data (see above), plus usage information such as features used, credits spent, and timestamps, and technical logs such as IP address, device and browser type, and error reports.",
          ],
          [
            "WhatsApp, Slack and Teams",
            "When you message Xura on these channels, the messages you exchange with Xura and the identifiers the platform shares with us, such as your phone number on WhatsApp or your user ID on Slack and Teams.",
          ],
          [
            "Payments",
            "Billing contact, plan, invoices and payment status. Card details are handled by our payment processor; we don't store full card numbers.",
          ],
          [
            "Website analytics",
            "Pages viewed, referring site, approximate location (city level), device and browser details, collected by Google Analytics through cookies.",
          ],
          [
            "Talking to us",
            "Anything you send us by email, chat or call, including support requests and feedback.",
          ],
        ],
      },
    ],
  },
  {
    id: "use",
    heading: "How we use information",
    blocks: [
      {
        type: "table",
        head: ["Purpose", "Why we're allowed to"],
        rows: [
          ["Providing Xura: running AI employees, answering questions, creating outputs and delivering them on the channels you choose", "To perform our contract with you or your employer"],
          ["Responding to demo requests, scheduling calls and following up about Xura", "Your consent, and our legitimate interest in replying to people who contact us"],
          ["Securing Xura: preventing fraud and abuse, and investigating incidents", "Our legitimate interest in keeping Xura and its users safe, and legal obligations"],
          ["Support, service announcements and billing", "To perform our contract"],
          ["Understanding how our website and product are used so we can improve them", "Our legitimate interest, and your consent to analytics cookies where required"],
          ["Marketing emails about Xura", "Your consent or our legitimate interest; you can unsubscribe at any time"],
          ["Meeting legal, tax and accounting obligations", "Legal obligation"],
        ],
      },
      {
        type: "p",
        text: "Customer Data is used only to provide Xura to the customer, to keep it secure, and to give support the customer asks for. We don't use it for marketing or advertising.",
      },
    ],
  },
  {
    id: "ai",
    heading: "How Xura's AI handles your data",
    blocks: [
      {
        type: "list",
        items: [
          "To answer a question or complete a task, Xura sends the relevant prompts and data to the AI model providers that power it. Providers process this data only to return a result to us.",
          "We don't use Customer Data to train AI models, and our agreements with AI providers don't allow them to train on it.",
          "AI employees work within the access your workspace grants. They read only the sources and tools that have been connected and allowed.",
          "Actions that change something outside Xura, such as sending a message or updating a record, wait for a person to approve them unless your admins have chosen to let a specific flow run on its own.",
          "AI can make mistakes. Outputs show their sources so you can check them before acting.",
        ],
      },
    ],
  },
  {
    id: "channels",
    heading: "WhatsApp, Slack and Teams",
    blocks: [
      {
        type: "p",
        text: "When you use Xura inside a messaging app, that app's provider (Meta for WhatsApp, Slack, or Microsoft for Teams) also processes your messages under its own privacy policy and terms. Messages stay in that app's history according to its settings, even after Xura has finished with them. Only connect Xura to channels where sharing work data is allowed by your organisation.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    blocks: [
      {
        type: "list",
        items: [
          "Google Analytics uses cookies to tell us how people find and use our website. If you visit from the EU, UK or another European country, it loads only after you choose “Allow all” on our cookie banner; with “Allow necessary” it doesn't load and sets no cookies. Elsewhere it's on by default, and you can switch it off with the Cookie settings link in our website footer. It reports aggregated statistics; we don't use it to identify you.",
          "Product videos are embedded from YouTube's privacy-enhanced domain (youtube-nocookie.com), which doesn't set tracking cookies until you play a video.",
          "When you book a call, Calendly's scheduler loads in the page and uses its own cookies.",
        ],
      },
      {
        type: "p",
        text: "You can block or delete cookies in your browser settings, or install Google's Analytics opt-out browser add-on. We don't use advertising or cross-site tracking cookies.",
      },
    ],
  },
  {
    id: "share",
    heading: "Who we share information with",
    blocks: [
      {
        type: "p",
        text: "We don't sell personal information or share it for advertising. We share it only with:",
      },
      {
        type: "table",
        head: ["Who", "Why"],
        rows: [
          ["Cloud hosting and infrastructure providers", "To run the Xura product and store data securely"],
          ["AI model providers", "To process prompts and generate answers and outputs"],
          ["Google (Workspace, Sheets, Analytics, YouTube)", "Email, storing demo requests, website analytics and video embeds"],
          ["Calendly", "Scheduling calls"],
          ["Meta (WhatsApp), Slack, Microsoft (Teams)", "Delivering Xura on the messaging channels you choose"],
          ["Payment processor", "Billing and payments"],
          ["Professional advisers", "Legal, accounting and audit services, under confidentiality"],
        ],
      },
      {
        type: "p",
        text: `Our service providers may only use information to provide their services to us. For the current list of providers that process Customer Data, write to ${EMAIL}.`,
      },
      {
        type: "p",
        text: "We may also share information if the law requires it, to protect the rights and safety of our users or the public, or as part of a merger, acquisition or sale of assets, in which case this policy continues to apply to it.",
      },
    ],
  },
  {
    id: "transfers",
    heading: "Where information is processed",
    blocks: [
      {
        type: "p",
        text: "Xura is run from India, and our service providers operate in other countries, including the United States. Wherever information is processed, we protect it as described in this policy and, where the law requires, use recognised safeguards for international transfers such as the European Commission's Standard Contractual Clauses.",
      },
    ],
  },
  {
    id: "retention",
    heading: "How long we keep information",
    blocks: [
      {
        type: "table",
        head: ["Information", "How long"],
        rows: [
          ["Customer Data", "For as long as the customer's workspace is active. When a source is disconnected or a workspace is closed, the related data is deleted from active systems, and from backups as they cycle."],
          ["Demo requests and sales conversations", "Until you ask us to delete them, or once they're no longer relevant to a conversation with you"],
          ["Account and billing records", "While the account is active, and afterwards for as long as tax and accounting laws require"],
          ["Website analytics", "14 months in Google Analytics"],
          ["Security logs", "As long as needed to keep Xura secure and investigate incidents"],
        ],
      },
    ],
  },
  {
    id: "security",
    heading: "Security",
    blocks: [
      {
        type: "p",
        text: "We protect information with technical and organisational measures that include encryption in transit, access limited to people who need it to do their job, separation between customer workspaces, and logging of activity in the product. No method of transmission or storage is completely secure, so we can't guarantee absolute security. If a breach affects your personal information, we'll notify you and the relevant authorities as the law requires.",
      },
      {
        type: "p",
        text: `To report a security issue, email ${EMAIL}.`,
      },
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    blocks: [
      {
        type: "p",
        text: `Wherever you live, you can ask us to tell you what personal information we hold about you, correct it, delete it, or stop sending you marketing. Email ${EMAIL} from the address linked to your information. We'll confirm your identity, then respond within 30 days. If your information is part of a workspace's Customer Data, we'll pass your request to that customer and help them answer it.`,
      },
      {
        type: "list",
        items: [
          "India: under the Digital Personal Data Protection Act, 2023, you can access a summary of your data and how it's processed, correct, complete, update or erase it, withdraw consent at any time, nominate someone to exercise your rights if you can't, and raise a grievance with us. If we don't resolve it, you can complain to the Data Protection Board of India.",
          "European Economic Area, United Kingdom and Switzerland: you also have the right to data portability, to object to or restrict processing based on legitimate interests, and to complain to your local data protection authority.",
          "United States: depending on your state, you may have rights to know, delete and correct your information and to opt out of its sale or sharing. We don't sell or share personal information as those laws define it, and we won't treat you differently for exercising your rights.",
        ],
      },
    ],
  },
  {
    id: "grievance",
    heading: "Grievance Officer",
    blocks: [
      {
        type: "p",
        text: `In line with Indian law, questions or complaints about how we handle personal information can be sent to our Grievance Officer at ${EMAIL}, with "Privacy" in the subject line. We'll acknowledge your complaint and aim to resolve it within 30 days.`,
      },
    ],
  },
  {
    id: "children",
    heading: "Children",
    blocks: [
      {
        type: "p",
        text: "Xura is a business product for people aged 18 and over. We don't knowingly collect personal information from children. If you believe a child has given us their information, contact us and we'll delete it.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We'll update this policy as Xura changes and show the new effective date at the top. If a change is significant, we'll tell customers by email or in the product before it takes effect.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    blocks: [
      {
        type: "p",
        text: `${ENTITY}, India. Email ${EMAIL} for anything about privacy, your data or this policy.`,
      },
    ],
  },
];
