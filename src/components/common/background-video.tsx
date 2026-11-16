"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

import { useInViewport } from "@/hooks/use-in-viewport";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Phone / desktop posters as one <picture> (Next's art-direction pattern), so
 * each device downloads only its own poster. Two `priority` <Image>s would
 * preload both on every device.
 */
const ArtDirectedPoster = ({ poster, mobilePoster, alt }: { poster: string; mobilePoster: string; alt: string }) => {
  // LCP image: load eagerly at high priority (getImageProps defaults to lazy).
  const common = { alt, fill: true, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: poster });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: mobilePoster });
  return (
    <picture>
      {/* 48rem = Tailwind `md`, matching the video's own breakpoint. */}
      <source media="(min-width: 48rem)" srcSet={desktopSrcSet} />
      <source srcSet={mobileSrcSet} />
      <img {...img} alt={alt} className="object-cover" />
    </picture>
  );
};

/**
 * BackgroundVideo — a full-bleed, muted, looping background video
 * (visual reference: wonderful.ai's video hero). The poster shows first.
 * Wide screens play `src`; phones play `mobileSrc` (a light portrait cut,
 * ~1.5 MB) when given. The video mounts only after the page has loaded, and
 * never for reduced-motion users, Data Saver, or 2G/slow-2G connections —
 * they keep the poster. Pauses while off screen. Decorative: the poster
 * carries the alt text, the video is aria-hidden.
 */
export const BackgroundVideo = ({
  src,
  poster,
  mobileSrc,
  mobilePoster,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  mobileSrc?: string;
  mobilePoster?: string;
  alt: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInViewport(ref, "0px");
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const slow = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");

    const pick = () => {
      if (reduced.matches || slow) return setSource(null);
      setSource(wide.matches ? src : (mobileSrc ?? null));
    };
    // Wait for the page to finish loading so the video never delays first paint.
    const start = () => {
      pick();
      wide.addEventListener("change", pick);
      reduced.addEventListener("change", pick);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      wide.removeEventListener("change", pick);
      reduced.removeEventListener("change", pick);
    };
  }, [src, mobileSrc]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) void v.play().catch(() => undefined);
    else v.pause();
  }, [inView, source]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden bg-foreground ${className}`}>
      {mobilePoster ? (
        <ArtDirectedPoster poster={poster} mobilePoster={mobilePoster} alt={alt} />
      ) : (
        <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
      )}
      {source ? (
        <video
          key={source}
          ref={videoRef}
          aria-hidden
          src={source}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
};
