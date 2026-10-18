import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { PricingView } from "@/views/pricing";

export const metadata = pageMetadata({
  title: "Pricing: AI employees from $50 per user",
  description:
    "Start free with a one-week pilot and 100 credits. Starter $50 and Growth $100 per user a month; credits work across dashboards, decks and research.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingView />;
}
