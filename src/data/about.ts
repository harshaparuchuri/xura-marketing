import type { Answer, Essay } from "@/components/sections/shared/content-blocks";

/**
 * /about content. Team facts come from the owner's sales deck (speaker notes
 * and team slide); company facts mirror the home FAQ and llms.txt.
 */
export const ABOUT = {
  path: "/about",
  name: "About",
  meta: {
    title: "About Xura: The AI Deployment Team in Hyderabad",
    description:
      "Xura is an AI company in Hyderabad. Our deployment team builds AI employees, workflows and apps for pharma and manufacturing teams in India and Southeast Asia.",
  },
  h1: "We make AI work inside your business",
  sub: "Xura is an AI company based in Hyderabad. Our deployment team finds the work that needs attention and builds AI employees, workflows and apps on the Xura platform.",
} as const;

export const ABOUT_ANSWER: Answer = {
  q: "What is Xura?",
  a: "Xura (Xurian Labs LLP) is an AI company based in Hyderabad, India. Its deployment team works on site with operations, sales, quality and IT teams in pharma and manufacturing companies across India and Southeast Asia, and custom-builds AI employees, agentic workflows and apps on the Xura platform. Customers approve every output.",
};

export const ABOUT_ESSAY: Essay = {
  label: "How we work",
  heading: "Software alone doesn’t change how work gets done.",
  paragraphs: [
    "Most companies already have the tools. What they don’t have is someone to find the work worth changing, connect it to their systems and keep improving it over time. That is the job our deployment team does.",
    "We start with one job, usually a review or a report that is rebuilt by hand every cycle, and have it live on your data in about two weeks. Then we add the next one, reusing what is already connected.",
  ],
  principlesHeading: "What we hold ourselves to",
  principles: [
    { title: "One job at a time", body: "Start where the work is stuck, prove it on your data, then grow." },
    { title: "You approve every output", body: "Nothing is sent or changed until a person says yes." },
    { title: "Your data stays where it lives", body: "Queries run in your systems; no raw data is copied out." },
    { title: "A team, not just software", body: "Our team works with you on site, through go-live." },
  ],
};

export type BuiltAtLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Stacked (multi-line) mark: shown taller so its text matches one-line wordmarks. */
  stacked?: boolean;
};

/**
 * Team section without individual people (owner 2026-11-18): the combined
 * experience line and the logos of companies the team has built at.
 * Logos are monochrome PNG→WebP from the sales deck, shown at 32px tall;
 * `width`/`height` are the files' intrinsic size (aspect ratio for next/image).
 */
export const ABOUT_TEAM: {
  label: string;
  heading: string;
  lead: string;
  builtAt: { label: string; logos: readonly BuiltAtLogo[] };
} = {
  label: "The team",
  heading: "Built by a team with 30+ years in AI and enterprise software",
  lead: "Our founders built and scaled enterprise products before starting Xura, at companies including these.",
  builtAt: {
    label: "Where we’ve built",
    logos: [
      { name: "ADP", src: "/assets/logos/adp.webp", width: 264, height: 120 },
      { name: "IBM", src: "/assets/logos/ibm.webp", width: 321, height: 120 },
      { name: "CA Technologies", src: "/assets/logos/ca-technologies.webp", width: 144, height: 120 },
      { name: "Virtusa (formerly Polaris Financial Technology)", src: "/assets/logos/virtusa.svg", width: 323, height: 63 },
      { name: "Microsoft", src: "/assets/logos/microsoft.webp", width: 562, height: 120 },
      { name: "Practo", src: "/assets/logos/practo.webp", width: 525, height: 120 },
      { name: "iGate", src: "/assets/logos/igate.webp", width: 288, height: 120 },
      { name: "Townhall", src: "/assets/logos/townhall.webp", width: 811, height: 120 },
      { name: "Head Digital Works (A23)", src: "/assets/logos/head-digital-works.webp", width: 86, height: 57, stacked: true },
    ],
  },
};
