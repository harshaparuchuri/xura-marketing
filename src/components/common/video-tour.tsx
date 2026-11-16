"use client";

import Image from "next/image";
import { useState } from "react";

import { siteConfig } from "@/lib/site";

/**
 * VideoTour — click-to-load YouTube embed. Renders only a thumbnail and a play
 * button until clicked, so the ~500 KB YouTube player never loads with the
 * page. Uses the privacy-enhanced youtube-nocookie domain. Ships its own
 * VideoObject JSON-LD so the video can appear in search results.
 */
type Props = {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT1M38S. */
  duration: string;
  /**
   * Emit VideoObject JSON-LD. Mark the video up on ONE page only (its main
   * watch page) so Google doesn't split signals between duplicates.
   */
  structuredData?: boolean;
  className?: string;
};

export const VideoTour = ({ videoId, title, description, uploadDate, duration, structuredData = true, className = "" }: Props) => {
  const [playing, setPlaying] = useState(false);
  // maxresdefault doesn't exist for every upload; hqdefault always does.
  const [thumbQuality, setThumbQuality] = useState<"maxresdefault" | "hqdefault">("maxresdefault");
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/${thumbQuality}.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    ],
    uploadDate,
    duration,
    inLanguage: "en",
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    contentUrl: watchUrl,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    // Lets Google generate "key moments" from the video itself.
    potentialAction: {
      "@type": "SeekToAction",
      target: `${watchUrl}&t={seek_to_second_number}`,
      "startOffset-input": "required name=seek_to_second_number",
    },
  };

  return (
    <figure
      className={`relative aspect-video overflow-hidden rounded-2xl bg-foreground shadow-product ${className}`}
    >
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={thumbnail}
            alt={`Video thumbnail: ${title}`}
            onError={() => setThumbQuality("hqdefault")}
            fill sizes="(min-width: 1024px) 60rem, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-foreground/20 transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:bg-foreground/10" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-product transition-transform duration-[var(--duration-fast)] ease-entrance group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </span>
        </button>
      )}
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
};
