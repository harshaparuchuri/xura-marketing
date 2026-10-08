import Image from "next/image";

/**
 * ShotCrop — shows one region of a product screenshot, so a section can
 * feature the composer or a KPI row instead of a whole browser window.
 * `crop` is in fractions of the source image (0–1). The wrapper takes the
 * crop's aspect ratio; the image is scaled and offset inside it.
 */
type Crop = { x: number; y: number; w: number; h: number };

type ShotCropProps = {
  src: string;
  alt: string;
  crop: Crop;
  /** Source dimensions — captures in `public/assets/product/` are 2880×1800. */
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
};

export const ShotCrop = ({
  src,
  alt,
  crop,
  width = 2880,
  height = 1800,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}: ShotCropProps) => (
  <div
    className={`relative overflow-hidden ${className}`}
    style={{ aspectRatio: `${crop.w * width} / ${crop.h * height}` }}
  >
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className="absolute max-w-none"
      style={{
        width: `${100 / crop.w}%`,
        height: "auto",
        left: `${(-crop.x / crop.w) * 100}%`,
        top: `${(-crop.y / crop.h) * 100}%`,
      }}
    />
  </div>
);
