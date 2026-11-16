import { FlowField } from "@/components/graphics/flow-field";
import { ApprovalFeed } from "@/components/sections/home/approval-feed";
import { Reveal } from "@/components/sections/home/reveal";
import { HOME_STATEMENT } from "@/data/home";

/**
 * Statement — dark band: a short two-line statement and kicker on the left,
 * the live ApprovalFeed on the right (work drafted from the customer's
 * systems, waiting for a person). Xura's own visual: approval-gated work.
 */
export const Statement = () => (
  <section aria-labelledby="statement-heading" className="relative isolate overflow-hidden py-24 text-background md:py-32">
    <FlowField tone="dark" variant={1} />
    <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
      <div>
        <Reveal tag="p" className="text-sm font-medium text-background/60">{HOME_STATEMENT.label}</Reveal>
        <Reveal tag="h2" delay={40} className="display-light-md mt-4 max-w-[20ch]">
          <span id="statement-heading">{HOME_STATEMENT.heading}</span>
        </Reveal>
        <Reveal tag="p" delay={80} className="mt-6 max-w-[40ch] text-base leading-relaxed text-background/70 md:text-lg">
          {HOME_STATEMENT.kicker}
        </Reveal>
        <Reveal delay={120} className="mt-9">
          <a href="#how-we-deploy" className="pill pill-inverse pill-lg">
            See how we deploy
          </a>
        </Reveal>
      </div>
      <Reveal delay={100} className="rounded-3xl bg-background/5 p-4 ring-1 ring-background/10 md:p-6">
        <p className="mb-4 flex items-center gap-2 px-1 text-xs text-background/60">
          <span aria-hidden className="size-1.5 rounded-full bg-background" />
          Waiting for your approval
        </p>
        <ApprovalFeed />
      </Reveal>
    </div>
  </section>
);
