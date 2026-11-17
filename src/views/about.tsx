import { PhotoFill } from "@/components/common/photo-fill";
import { TeamSection } from "@/components/sections/about/team-section";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";
import { AnswerBlock, EssaySection } from "@/components/sections/shared/content-blocks";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { ABOUT, ABOUT_ANSWER, ABOUT_ESSAY, ABOUT_TEAM } from "@/data/about";
import { siteConfig } from "@/lib/site";

/**
 * About view (/about) — who Xura is: hero → answer block (AEO) → how we work
 * (essay + principles) → workplace photo → team → office → closing band. Server Component.
 */
export const AboutView = () => {
  const { address } = siteConfig;
  return (
    <div className="palette-amber">
      <main>
        <PageHero id="about-h1" title={ABOUT.h1} sub={ABOUT.sub} path={ABOUT.path} name={ABOUT.name} variant={1} />
        <AnswerBlock id="about-answer" {...ABOUT_ANSWER} />
        <EssaySection id="about-how" essay={ABOUT_ESSAY} variant={2} />
        <figure className="shell pb-8">
          <Reveal className="relative mx-auto aspect-[3/2] max-w-[68rem] overflow-hidden rounded-3xl md:aspect-[21/9]">
            <PhotoFill
              src="/assets/photos/about-workplace.webp"
              alt="A team working together in a bright, modern office"
              sizes="(min-width: 1120px) 68rem, 100vw"
              focus={{ x: "50%", y: "40%" }}
            />
          </Reveal>
          <figcaption className="mx-auto mt-4 max-w-[68rem] text-center text-sm text-muted">
            We work alongside your team on site, and remain your partner long after launch.
          </figcaption>
        </figure>
        <TeamSection id="about-team" team={ABOUT_TEAM} />
        <section aria-labelledby="about-office" className="py-20 md:py-24">
          <div className="shell">
            <SectionHead id="about-office" label="Our office" heading={`${address.locality}, ${address.country}`} center />
            <Reveal tag="address" delay={60} className="mx-auto mt-6 max-w-[40ch] text-center text-base not-italic leading-relaxed text-muted md:text-lg">
              {siteConfig.legalName}
              <br />
              {address.locality}, {address.region} {address.postalCode}, {address.country}
              <br />
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-foreground underline underline-offset-4">
                {siteConfig.email}
              </a>
            </Reveal>
          </div>
        </section>
        <CtaBand id="about-cta" heading="Meet your AI team now." sub="Start with a 2-day bootcamp. See it live in 2 weeks." />
      </main>
      <SiteFooter />
    </div>
  );
};
