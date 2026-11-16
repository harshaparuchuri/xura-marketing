import { siteConfig } from "@/lib/site";

/** `?talk` on the booking form: softer heading there, and GA4 `cta: "talk"`. */
export const TALK_URL = `${siteConfig.demoUrl}?talk`;

/**
 * CtaPair — the site's main call to action, one pill (owner 2026-11-16: no
 * secondary text link). Both routes open the same booking form (`/trial`),
 * which ends in a 30-minute call either way.
 *
 * - `lead="talk"` (default): "Talk to us →". The site-wide primary CTA.
 * - `lead="bootcamp"`: "Book a 2-day bootcamp →". Only where the section is
 *   about the bootcamp itself (the /bootcamp page).
 *
 * GA4 tells them apart by
 * the URL (`classifyLink` in lib/analytics.ts): `cta: "demo"` (bootcamp, the
 * existing value, kept for report continuity) or `cta: "talk"`.
 */
export const CtaPair = ({
  lead = "talk",
  bootcampLabel = "Book a 2-day bootcamp",
}: {
  lead?: "bootcamp" | "talk";
  /** Override the bootcamp pill label (e.g. the home page's own wording). */
  bootcampLabel?: string;
}) => {
  const primary =
    lead === "talk"
      ? { href: TALK_URL, label: "Talk to us" }
      : { href: siteConfig.demoUrl, label: bootcampLabel };

  return (
    <a href={primary.href} className="pill pill-inverse pill-lg">
      {primary.label} <span aria-hidden>→</span>
    </a>
  );
};
