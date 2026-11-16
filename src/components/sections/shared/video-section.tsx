import { VideoTour } from "@/components/common/video-tour";
import { HazeField } from "@/components/graphics/haze-field";
import { Reveal, SectionHead } from "@/components/sections/home/reveal";

/**
 * The product tour video (from the live site), as a section: heading + the
 * click-to-load YouTube embed with VideoObject JSON-LD. Used on /platform and
 * /ai-employees.
 */
export const PRODUCT_TOUR = {
  videoId: "8tkNY0mJBss",
  title: "Xura AI: Meet your AI team",
  description:
    "A 1:38 tour of Xura's AI employees: they connect to your systems, answer from your own data, explain the reason behind the number and draft the next step for your approval.",
  uploadDate: "2026-10-14T12:33:05-07:00",
  duration: "PT1M38S",
  /** Visible "what you'll see" list — crawlable text for the video's content. */
  highlights: [
    "Xura's AI employees connecting to your ERP, CRM and spreadsheets",
    "Answers drawn from your own data, not the open web",
    "The reason behind each number, explained",
    "The next step drafted and held for your approval",
  ],
} as const;

export const VideoSection = ({
  id,
  label,
  heading,
  lead,
  variant = 0,
  structuredData = true,
}: {
  id: string;
  label: string;
  heading: string;
  lead?: string;
  variant?: 0 | 1 | 2;
  /** Emit VideoObject JSON-LD — true on /platform only (one watch page). */
  structuredData?: boolean;
}) => (
  <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={variant} />
    <div className="shell">
      <SectionHead id={id} label={label} heading={heading} lead={lead} center />
      <Reveal className="mx-auto mt-12 max-w-[46rem]">
        <VideoTour
          videoId={PRODUCT_TOUR.videoId}
          title={PRODUCT_TOUR.title}
          description={PRODUCT_TOUR.description}
          uploadDate={PRODUCT_TOUR.uploadDate}
          duration={PRODUCT_TOUR.duration}
          structuredData={structuredData}
        />
      </Reveal>
      <Reveal delay={40} className="mx-auto mt-8 max-w-[46rem]">
        <h3 className="text-sm font-medium text-muted">In this video</h3>
        <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm text-muted sm:grid-cols-2">
          {PRODUCT_TOUR.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
