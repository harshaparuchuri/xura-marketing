"use client";

import { useSearchParams } from "next/navigation";

/**
 * Heading + intro for the booking form on /trial. Visitors arriving from a
 * "Talk to us" CTA (`/trial?talk`, see components/common/cta-pair.tsx) see a
 * softer heading; everyone else sees the bootcamp one. Same form either way.
 *
 * Reads the query string, so under static export it must render inside a
 * `<Suspense>` whose fallback is the default (bootcamp) copy — that is what
 * the exported HTML and crawlers get.
 */
export const BootcampIntro = () => (
  <>
    <h2 id="demo-form-heading" className="display-light-md">
      Book a <span className="whitespace-nowrap">2-day</span> bootcamp
    </h2>
    <p className="mt-3 text-sm text-muted">
      Tell us about your company and we&apos;ll plan your two days. Bring the
      person who owns the process you want to start with.
    </p>
  </>
);

export const TrialIntro = () => {
  const talk = useSearchParams().has("talk");
  if (!talk) return <BootcampIntro />;
  return (
    <>
      <h2 id="demo-form-heading" className="display-light-md">
        Talk to our team
      </h2>
      <p className="mt-3 text-sm text-muted">
        Tell us about your company and pick a time for a 30-minute call. We&apos;ll
        look at where AI could help, and whether a 2-day bootcamp is the right
        first step.
      </p>
    </>
  );
};
