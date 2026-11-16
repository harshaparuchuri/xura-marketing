import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { AppsView } from "@/views/apps";

export const metadata = pageMetadata({
  title: "Xura Apps: Build Internal Apps by Describing Them",
  description:
    "Describe the app your team needs and Xura builds it on your data: records, pages, charts, Ask Xura inside, your brand and access. No code needed.",
  path: "/apps",
});

export default function AppsPage() {
  return <AppsView />;
}
