import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { IndustriesIndexView } from "@/views/industries-index";

export const metadata = pageMetadata({
  title: "AI employees for your industry",
  description:
    "Xura's AI employees for pharma, SaaS, fintech, healthcare and manufacturing: routines that brief you, explain the numbers and draft the next step.",
  path: "/industries",
});

export default function Page() {
  return <IndustriesIndexView />;
}
