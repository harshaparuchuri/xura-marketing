import { Inview } from "@/components/animation/springs/in-view";
import { SpringTrigger } from "@/components/animation/springs/spring-trigger";
import { ShotCrop } from "@/components/common/shot-crop";
import { ArcField } from "@/components/graphics/arc-field";

/**
 * Outputs — finished work, not chat replies. A stage shows one prompt fanning
 * out into all five real outputs (infographic, dashboard, deck, research, brief):
 * cropped product shots that spread apart as the section scrolls through.
 * Captions sit below the stage; the eyebrow names all five output types.
 */
type Card = {
  key: string;
  src: string;
  alt: string;
  crop: { x: number; y: number; w: number; h: number };
  /** Resting placement inside the fan (percent of stage width). */
  position: string;
  from: { x: string; rotate: number; y: number };
  to: { x: string; rotate: number; y: number };
};

const CARDS: Card[] = [
  {
    key: "infographic",
    src: "/assets/product/out-infographic.png",
    alt: "A Xura infographic headed Q4 Plant Performance Leaders with a headline number and a capacity chart",
    crop: { x: 0.21, y: 0.17, w: 0.58, h: 0.56 },
    position: "left-[3%] top-[26%] w-[24%] z-0",
    from: { x: "8rem", rotate: -3, y: 40 },
    to: { x: "0rem", rotate: -11, y: 0 },
  },
  {
    key: "brief",
    src: "/assets/product/out-brief.png",
    alt: "A Xura executive brief with a bottom-line summary, key figures and findings",
    crop: { x: 0.18, y: 0.1, w: 0.64, h: 0.64 },
    position: "right-[3%] top-[24%] w-[24%] z-0",
    from: { x: "-8rem", rotate: 3, y: 40 },
    to: { x: "0rem", rotate: 11, y: 0 },
  },
  {
    key: "dashboard",
    src: "/assets/product/dashboard.png",
    alt: "A Xura dashboard chart of headcount by department",
    crop: { x: 0.07, y: 0.69, w: 0.91, h: 0.31 },
    position: "left-[12%] top-[62%] w-[34%] z-10",
    from: { x: "5rem", rotate: -1, y: 30 },
    to: { x: "0rem", rotate: -5, y: 0 },
  },
  {
    key: "research",
    src: "/assets/product/out-research.png",
    alt: "A Xura deep-research report title page with 87 citations from 30 sources",
    crop: { x: 0.21, y: 0.09, w: 0.58, h: 0.38 },
    position: "right-[12%] top-[58%] w-[30%] z-10",
    from: { x: "-5rem", rotate: 1, y: 30 },
    to: { x: "0rem", rotate: 5, y: 0 },
  },
  {
    key: "deck",
    src: "/assets/product/out-deck.png",
    alt: "A Xura-generated slide titled Task Completion Rate by Team",
    crop: { x: 0.157, y: 0.218, w: 0.64, h: 0.58 },
    position: "left-1/2 top-[24%] w-[46%] -translate-x-1/2 z-20",
    from: { x: "0rem", rotate: 0, y: 50 },
    to: { x: "0rem", rotate: 0, y: -10 },
  },
];

const CAPTIONS: { title: string; body: string }[] = [
  {
    title: "Live dashboards",
    body: "Ask in plain language; get charts, metrics and an AI summary that stays current as your data changes.",
  },
  {
    title: "Presentation-ready decks",
    body: "Generated from a prompt, edited slide by slide with AI, exported to .pptx or PDF.",
  },
  {
    title: "Cited deep research",
    body: "Multi-source reports grounded in your company profile, every claim cited. Download as Word.",
  },
  {
    title: "One-page infographics",
    body: "A headline number, the chart behind it and the context, laid out to share. Export as PNG or PDF.",
  },
  {
    title: "Executive briefs",
    body: "The bottom line, the figures and what to do next, on one page. Export as DOCX or PDF.",
  },
];

export const Outputs = () => (
  <section id="outputs" className="bg-background py-20 md:py-28">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="meta"
        >
          Dashboards · Slides · Research · Infographics · Briefs
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mx-auto mt-3 max-w-[20ch] text-balance"
        >
          Finished work,{" "}
          <span className="font-semibold">not just answers</span>
        </Inview>
        <Inview
          tag="p"
          mode="once"
          delayIn={140}
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mx-auto mt-5 max-w-[58ch] text-sm leading-relaxed text-muted"
        >
          One prompt turns into something you can hand to the board: a live
          dashboard, a deck, a cited report, a one-page infographic, or an
          executive brief with actions.
        </Inview>
      </div>

      {/* Stage */}
      <Inview
        mode="once"
        delayIn={160}
        from={{ opacity: 0, y: 32 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 160, friction: 30 }}
        className="grain relative isolate mx-auto mt-14 aspect-[4/5] max-w-6xl overflow-hidden rounded-3xl bg-brand-ink sm:aspect-[16/9]"
      >
        <ArcField className="pointer-events-none absolute inset-0 -z-10 size-full text-white/10" />

        {/* The prompt that produced them */}
        <div className="absolute left-1/2 top-[7%] z-30 w-[86%] max-w-xl -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-2xl bg-background py-2 pl-4 pr-2 shadow-product">
            <span className="flex-1 truncate text-xs text-foreground sm:text-sm">
              Prepare the Q3 delivery review for the board
            </span>
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                <path
                  d="M12 19V5M5 12l7-7 7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {CARDS.map((card) => (
          <div key={card.key} className={`absolute ${card.position}`}>
            <SpringTrigger
              start="top bottom"
              end="center center"
              from={card.from}
              to={card.to}
            >
              <ShotCrop
                src={card.src}
                alt={card.alt}
                crop={card.crop}
                className="rounded-xl shadow-product ring-1 ring-white/20"
              />
            </SpringTrigger>
          </div>
        ))}
      </Inview>

      <ul className="mx-auto mt-10 grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {CAPTIONS.map((c, i) => (
          <Inview
            key={c.title}
            tag="li"
            mode="once"
            delayIn={i * 80}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="border-t border-line pt-4"
          >
            <h3 className="text-sm font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted">{c.body}</p>
          </Inview>
        ))}
      </ul>
    </div>
  </section>
);
