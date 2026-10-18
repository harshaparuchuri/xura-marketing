import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { siteConfig } from "@/lib/site";

/**
 * Closing CTA — a cool mist band with one centred question, a channel-neutral
 * subline, and a primary pill plus a ghost link back to How it works.
 * Deliberately quiet: the reference saves its loudest surface for the footer.
 */
export const ClosingCta = () => (
  <section id="cta" className="bg-band-mist py-20 md:py-24">
    <div className="shell text-center">
      <Inview
        tag="h2"
        mode="once"
        from={{ opacity: 0, y: 18 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="display-serif mx-auto max-w-[28ch]"
      >
        Your newest hire.{" "}
        <span className="font-semibold italic">Ready on day one.</span>
      </Inview>
      <Inview
        tag="p"
        mode="once"
        delayIn={60}
        from={{ opacity: 0, y: 14 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-muted"
      >
        Connect a sample of your data, put an AI employee to work, and get
        your first answer on WhatsApp, Slack, Teams or the web in minutes.
      </Inview>

      <Inview
        mode="once"
        delayIn={90}
        from={{ opacity: 0, y: 14 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 180, friction: 27 }}
        className="mt-7 flex flex-wrap justify-center gap-2.5"
      >
        <a href={siteConfig.demoUrl} className="pill">
          Book a demo <span aria-hidden>→</span>
        </a>
        <a href={siteConfig.signupUrl} className="pill pill-ghost">
          Get started for free
        </a>
      </Inview>
    </div>
  </section>
);
