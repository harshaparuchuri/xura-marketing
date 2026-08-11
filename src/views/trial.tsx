import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { TrialForm } from "@/components/sections/trial-form";

/**
 * Free-trial view. Server Component wrapper around the client `TrialForm`.
 * Two-column band on desktop: pitch + trust markers on the left, form on the
 * right. Submissions post to `/api/trial`, which forwards to the configured
 * Google Apps Script Web App.
 */
export const TrialView = () => (
  <>
    <main>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[38rem]"
          style={{
            background:
              "linear-gradient(180deg, var(--duo-soft) 0%, var(--duo-wash) 30%, var(--background) 70%)",
          }}
        />
        <div className="relative z-10">
          <SiteNav />
          <div className="shell py-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-12">
              {/* Headline block — left col row 1 on desktop, first on mobile. */}
              <div className="lg:col-start-1 lg:row-start-1">
                <Spring
                  tag="p"
                  mode="once"
                  from={{ opacity: 0, y: 14 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 180, friction: 27 }}
                  className="meta"
                >
                  Start free trial
                </Spring>
                <Spring
                  tag="h1"
                  mode="once"
                  delayIn={80}
                  from={{ opacity: 0, y: 22 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 175, friction: 28 }}
                  className="display-serif mt-3 max-w-[18ch] text-3xl sm:text-4xl md:text-5xl"
                >
                  Try Xura on your data,{" "}
                  <span className="font-semibold italic">in minutes.</span>
                </Spring>
                <Spring
                  tag="p"
                  mode="once"
                  delayIn={160}
                  from={{ opacity: 0, y: 18 }}
                  to={{ opacity: 1, y: 0 }}
                  config={{ tension: 175, friction: 28 }}
                  className="mt-5 max-w-[52ch] text-sm leading-relaxed text-muted"
                >
                  Tell us where your data lives and how your team already works.
                  We will set up a private workspace, connect a starter sample
                  of your systems, and share a live Xura on WhatsApp and the
                  web so you can ask real questions against real numbers.
                </Spring>
              </div>

              {/* Form panel — right col spanning both rows on desktop; sits
                  second on mobile so users see it before the trust cards. */}
              <Inview
                mode="once"
                from={{ opacity: 0, y: 22 }}
                to={{ opacity: 1, y: 0 }}
                config={{ tension: 170, friction: 28 }}
                className="rounded-sm border border-line bg-background p-6 shadow-[0_18px_36px_rgba(15,23,42,0.06)] md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1"
              >
                <h2 className="text-base font-semibold tracking-tight">
                  Get your workspace
                </h2>
                <p className="mt-1.5 text-xs text-muted">
                  We will only use these details to set up your trial.
                </p>
                <div className="mt-5">
                  <TrialForm />
                </div>
              </Inview>

              {/* Trust markers — left col row 2 on desktop, last on mobile. */}
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:mt-0">
                {TRUST.map((point, i) => (
                  <Inview
                    key={point.title}
                    tag="li"
                    mode="once"
                    delayIn={i * 70}
                    from={{ opacity: 0, y: 14 }}
                    to={{ opacity: 1, y: 0 }}
                    config={{ tension: 180, friction: 27 }}
                    className="rounded-sm border border-line bg-background/60 p-4"
                  >
                    <p className="text-sm font-semibold">{point.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {point.body}
                    </p>
                  </Inview>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
);

const TRUST: { title: string; body: string }[] = [
  {
    title: "Your data stays yours",
    body: "Row-level permissions and an audit trail on every message. Nothing trains a public model.",
  },
  {
    title: "Live in your stack in a day",
    body: "MCP and 50+ native connectors. No ETL to build, no schema to map by hand.",
  },
  {
    title: "Ask on the surface you already use",
    body: "WhatsApp for the field, the web app when you are at a desk. Same graph, same answer.",
  },
  {
    title: "No credit card, no lock-in",
    body: "Walk away any time. Export your workspace or bring it back later.",
  },
];
