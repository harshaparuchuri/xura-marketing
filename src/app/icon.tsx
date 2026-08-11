import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * App icon (favicon) — reuses the Xura logo asset with a rounded corner so the
 * browser-tab icon matches the in-app rail mark. Rendered at request/build time
 * via `next/og`'s ImageResponse; the source PNG is inlined as a data URI so no
 * network fetch happens.
 */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
// Required for `output: "export"` — bake the icon into the build output.
export const dynamic = "force-static";

export default function Icon() {
  const buf = readFileSync(
    join(process.cwd(), "public/assets/xura-logo.png"),
  );
  const src = `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={64} height={64} alt="" />
      </div>
    ),
    { ...size },
  );
}
