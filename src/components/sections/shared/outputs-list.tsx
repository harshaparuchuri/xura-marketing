import Image from "next/image";

import { AskXuraPreview } from "@/components/graphics/ask-xura-preview";
import { HiringAppPreview } from "@/components/graphics/hiring-app-preview";
import { PulseInterviewPreview, PulseLivePreview, PulseReportPreview } from "@/components/graphics/pulse-preview";
import { HOME_OUTPUTS } from "@/data/home";

/**
 * OutputShot — fills the card's lower area with a product output. The crop's
 * top-left corner is pinned to the area's top-left and the crop's width spans
 * the area; the rest of the capture continues right and below, so the area is
 * always filled edge to edge (no gaps, no squeezed thumbnails).
 */
const OutputShot = ({ src, alt, crop, width = 2880, height = 1800 }: NonNullable<(typeof HOME_OUTPUTS)[number]["shot"]>) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    sizes="(min-width: 640px) 640px, 160vw"
    className="block h-auto max-w-none"
    style={{
      width: `${100 / crop.w}%`,
      marginLeft: `${(-crop.x / crop.w) * 100}%`,
      marginTop: `${((-crop.y * height) / (crop.w * width)) * 100}%`,
    }}
  />
);

/**
 * OutputsList — the shared "what Xura produces" rail cards, one per output
 * type (`HOME_OUTPUTS`): Answers and Apps are coded previews, the rest real
 * captures via `OutputShot`, bleeding off the card's right and bottom edges.
 * Used on the home page (`EmployeesGrid`) and /platform (`OutputsRail`);
 * the caller supplies the section, heading and `RailNav`.
 */
export const OutputsList = ({ id }: { id: string }) => (
  <ul id={id} className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-75rem)/2+2.5rem))] pb-4">
    {HOME_OUTPUTS.map((j) => (
      <li key={j.title} className="w-[82vw] shrink-0 snap-start sm:w-[26rem]">
        <article
          className="flex h-full flex-col overflow-hidden rounded-3xl bg-foreground bg-cover bg-bottom text-background"
          style={{ backgroundImage: "var(--field-1)" }}
        >
          <div className="p-7">
            <h3 className="text-2xl font-light tracking-tight">{j.title}</h3>
            <p className="mt-1 text-sm text-background/70">{j.byline}</p>
          </div>
          <div className="mt-auto pl-7">
            <div className="h-60 overflow-hidden rounded-tl-2xl bg-background shadow-product">
              {j.shot ? (
                <OutputShot {...j.shot} />
              ) : j.preview === "chat" ? (
                <AskXuraPreview />
              ) : j.preview === "pulse-report" ? (
                <PulseReportPreview className="rounded-none shadow-none" />
              ) : j.preview === "persona" ? (
                <PulseInterviewPreview className="rounded-none shadow-none" />
              ) : j.preview === "pulse" ? (
                /* Pulse: the coded live run, drawn wide and scaled down to the card. */
                <div aria-hidden className="w-[200%] origin-top-left scale-50">
                  <PulseLivePreview className="rounded-none shadow-none" />
                </div>
              ) : (
                /* Apps: the coded app replica, drawn at desktop width and scaled down to the card. */
                <div aria-hidden className="w-[200%] origin-top-left scale-50">
                  <HiringAppPreview />
                </div>
              )}
            </div>
          </div>
        </article>
      </li>
    ))}
  </ul>
);
