import { PricingView } from "@/views/pricing";

export const metadata = {
  title: "Pricing",
  description:
    "Simple plans for teams of every size. Start with a free one-week pilot on your own data, then scale to Slack, Teams, WhatsApp and the web.",
};

export default function PricingPage() {
  return <PricingView />;
}
