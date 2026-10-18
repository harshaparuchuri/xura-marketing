import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { TrialView } from "@/views/trial";

export const metadata = pageMetadata({
  title: "Book a demo of Xura's AI employees",
  description:
    "Book a 30-minute walkthrough of Xura's AI employees on your own use case: answers from your data, the reason behind the numbers, and approval-gated actions.",
  path: "/trial",
});

export default function TrialPage() {
  return <TrialView />;
}
