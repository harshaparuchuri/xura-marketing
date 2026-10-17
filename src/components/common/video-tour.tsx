"use client";

import Image from "next/image";
import { useState } from "react";

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
  className?: string;
};

export const VideoTour = ({ videoId, title, description, uploadDate, duration, className = "" }: Props) => {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl: [thumbnail],
    uploadDate,
    duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };

  return (
    <figure
      className={`relative aspect-video overflow-hidden rounded-2xl bg-brand-ink shadow-product ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 60rem, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-brand-ink/20 transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:bg-brand-ink/10" />
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
