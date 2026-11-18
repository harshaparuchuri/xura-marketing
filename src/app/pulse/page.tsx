import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { PulseView } from "@/views/pulse";

export const metadata = pageMetadata({
  title: "Xura Pulse: Test Messages, Decks and Campaigns on Synthetic Audiences",
  description:
    "Run a message, sales deck, campaign or price past up to 200 simulated people at once. A/B test before launch and interview any persona one to one.",
  path: "/pulse",
});

export default function PulsePage() {
  return <PulseView />;
}
