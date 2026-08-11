import Image from "next/image";
import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";

/**
 * WhatsApp / mobility band — dedicated section that elevates the primary
 * message: Xura lives where your team already does — WhatsApp, on their phone,
 * on the move. Two-up: message-thread mockup on the left, benefit list right.
 */
const POINTS: { title: string; body: string }[] = [
  {
    title: "Ask from anywhere",
    body: "In a taxi, between meetings, on the factory floor. Send a message, get a decision-ready answer.",
  },
  {
    title: "Mobile web or WhatsApp, your call",
    body: "Open the web app in any phone browser, or chat with Xura in WhatsApp. Same graph, same answers, zero install.",
  },
  {
    title: "Answers, not dashboards",
    body: "Charts render in-line. Summaries in plain language. Next-step actions one tap away.",
  },
  {
    title: "Enterprise-grade, pocket-sized",
    body: "Row-level permissions and audit trails follow every message. Secure by default.",
  },
];

export const WhatsApp = () => (
  <section
    id="whatsapp"
    className="relative isolate overflow-hidden bg-band-mist py-20 md:py-28"
  >
    <div className="shell">
      <div className="mx-auto max-w-4xl text-center">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="meta"
        >
          Mobile web · WhatsApp · On the go
        </Inview>
        <Inview
          tag="h2"
          mode="once"
          delayIn={70}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-serif mx-auto mt-3 max-w-[16ch] sm:max-w-2xl lg:max-w-none"
        >
          Your business intelligence,{" "}
          <span className="font-semibold">wherever you are</span>
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
          Xura is mobile-first and portable. Open the web app from any phone
          browser, or message it inside the WhatsApp your team already lives
          in. Same knowledge graph, same answer, whichever surface you pick
          up first.
        </Inview>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Inview
          mode="once"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 170, friction: 28 }}
          className="relative mx-auto w-full max-w-lg"
          data-slot="whatsapp-thread"
        >
          <Image
            src="/whatsapp-mockup-v2.png"
            alt="Three phone screens showing Xura on WhatsApp, the mobile web sign-in, and a dark analytics dashboard"
            width={1685}
            height={1342}
            unoptimized
            className="h-auto w-full drop-shadow-[0_18px_36px_rgba(15,23,42,0.18)]"
            priority
          />
        </Inview>

        <ul>
          {POINTS.map((point, i) => (
            <Inview
              key={point.title}
              tag="li"
              mode="once"
              delayIn={i * 80}
              from={{ opacity: 0, y: 16 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="border-t border-line py-5 first:border-t-0 first:pt-0"
            >
              <h3 className="text-sm font-semibold">{point.title}</h3>
              <p className="mt-1.5 max-w-[50ch] text-sm text-muted">
                {point.body}
              </p>
            </Inview>
          ))}

          <Inview
            mode="once"
            delayIn={360}
            from={{ opacity: 0, y: 14 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 27 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            <Link href="/trial" className="pill">
              <span aria-hidden>▪</span> Try the web app
            </Link>
          </Inview>
        </ul>
      </div>
    </div>
  </section>
);
