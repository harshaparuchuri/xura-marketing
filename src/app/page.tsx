import type { Metadata } from "next";

import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { HomeView } from "@/views/home";

// The root layout's title template doesn't apply to its own segment, so the
// home sets an absolute title that carries the brand.
const base = pageMetadata({
  title: "AI Transformation, Built for Your Business",
  description:
    "AI transformation for pharma and manufacturing teams. Our team finds the work AI should do and custom-builds the apps and workflows. See it live in 2 weeks.",
  path: "/",
});

export const metadata: Metadata = {
  ...base,
  title: "AI Transformation, Built for Your Business | Xura AI",
};

export default function Home() {
  return <HomeView />;
}
