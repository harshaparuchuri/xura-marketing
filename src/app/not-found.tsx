import type { Metadata } from "next";
import Link from "next/link";

import { AiOrb } from "@/components/graphics/ai-orb";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { siteConfig } from "@/lib/site";
import { OrbDockSlot } from "@/components/graphics/orb-dock-slot";

/**
 * 404 page. Rendered for unmatched routes and `notFound()` calls; Next serves
 * it with a 404 status, so crawlers see a proper not-found response. The orb
 * plays the lost AI employee; links route back to the main entry points.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <main className="bg-band-sand-soft">
        <SiteNav />
        <section className="shell flex flex-col items-center py-24 text-center md:py-32">
          <OrbDockSlot id="not-found" size={88} />
          <p className="meta mt-8">404</p>
          <h1 className="display-serif mt-3 max-w-[20ch]">
            I looked everywhere.{" "}
            <span className="font-semibold italic">This page isn&apos;t here.</span>
          </h1>
          <p className="mt-5 max-w-[48ch] text-sm leading-relaxed text-muted">
            The link may be old, or the page has moved. Here&apos;s where most
            people were headed:
          </p>
          <nav aria-label="Popular pages" className="mt-8 flex flex-wrap justify-center gap-2.5">
            <Link href="/" className="pill">
              <span aria-hidden>▪</span> Back to home
            </Link>
            <Link href="/pricing" className="pill pill-ghost">
              Pricing
            </Link>
            <Link href="/industries" className="pill pill-ghost">
              Industries
            </Link>
            <Link href={siteConfig.signupUrl} className="pill pill-ghost">
              Get started for free
            </Link>
          </nav>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
