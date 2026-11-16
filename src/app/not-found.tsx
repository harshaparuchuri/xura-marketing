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

/**
 * GitHub Pages serves this file for every unknown URL and has no server-side
 * redirects, so this runs before paint and sends known cases on:
 * - retired routes (`MOVED`) → their replacement;
 * - a trailing slash (`/platform/`) → the same path without it (Pages only
 *   serves `platform.html` at `/platform`).
 * `location.replace` keeps the dead URL out of the back-button history.
 */
const MOVED: Record<string, string> = {
  "/pricing": "/bootcamp",
};

const redirectScript = `(function(){
var m=${JSON.stringify(MOVED)},l=location,p=l.pathname,t=p.length>1?p.replace(/\\/+$/,''):p;
var to=m[t]||(t!==p?t:null);
if(to)l.replace(to+l.search+l.hash);
})();`;

export default function NotFound() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <main className="bg-band-sand-soft">
        <SiteNav />
        <section className="shell flex flex-col items-center py-24 text-center md:py-32">
          <OrbDockSlot id="not-found" size={88} />
          <p className="meta mt-8">404</p>
          <h1 className="display-light mt-3 max-w-[20ch]">
            I looked everywhere.{" "}
            <span className="text-muted">This page isn&apos;t here.</span>
          </h1>
          <p className="mt-5 max-w-[48ch] text-sm leading-relaxed text-muted">
            The link may be old, or the page has moved. Here&apos;s where most
            people were headed:
          </p>
          <nav aria-label="Popular pages" className="mt-8 flex flex-wrap justify-center gap-2.5">
            <Link href="/" className="pill">
              <span aria-hidden>▪</span> Back to home
            </Link>
            <Link href="/industries" className="pill pill-ghost">
              Industries
            </Link>
            <Link href={siteConfig.demoUrl} className="pill pill-ghost">
              Book a bootcamp
            </Link>
          </nav>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
