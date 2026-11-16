import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { PlatformView } from "@/views/platform";

export const metadata = pageMetadata({
  title: "The Xura Platform: AI Employees, Workflows & Apps",
  description:
    "AI employees, agentic workflows and custom apps on one platform: a live knowledge graph over your systems, approvals in WhatsApp, Slack and Teams.",
  path: "/platform",
});

export default function PlatformPage() {
  return <PlatformView />;
}
