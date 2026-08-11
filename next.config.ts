import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages. `yarn build` writes the whole site
  // to `out/`. Trade-offs vs. Vercel/SSR (see ADR-0022):
  //   - no server routes, no middleware, no ISR
  //   - `next/image` optimisation is disabled (`unoptimized: true` below);
  //     source images serve as-is, so pre-compress heavy assets
  //   - `/industries/[slug]` needs a `generateStaticParams` — already wired.
  output: "export",

  // Drop the `X-Powered-By: Next.js` response header.
  poweredByHeader: false,

  // Hide the floating "N" dev indicator (bottom-left). Dev-only overlay
  // never ships to production, but the badge itself is noisy in-browser
  // during development.
  devIndicators: false,

  compiler: {
    // Strip `console.*` from production bundles, keeping error/warn for
    // monitoring. Left on in dev so logs stay available.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    // `output: "export"` disables the on-the-fly image optimiser; every
    // `next/image` source ships as-is. Pre-compress large images at source.
    unoptimized: true,
  },

  // React Compiler (automatic memoisation) is an opt-in performance win.
  // It requires the `babel-plugin-react-compiler` dev dependency and routes
  // the build through Babel — enable once installed:
  // reactCompiler: true,
};

export default nextConfig;
