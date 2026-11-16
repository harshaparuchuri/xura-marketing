import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { TrialView } from "@/views/trial";

export const metadata = pageMetadata({
  title: "Book a 2-day AI bootcamp on your own data",
  description:
    "Book a 2-day bootcamp: Xura's team puts an AI employee to work on your own data and plans your go-live.",
  path: "/trial",
});

export default function TrialPage() {
  return <TrialView />;
}
