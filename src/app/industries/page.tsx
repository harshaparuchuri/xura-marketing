import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { IndustriesIndexView } from "@/views/industries-index";

export const metadata = pageMetadata({
  title: "AI transformation for your industry",
  description:
    "AI transformation for pharma, SaaS, fintech, healthcare and manufacturing: our team finds the work and custom-builds the apps and workflows to do it.",
  path: "/industries",
});

export default function Page() {
  return <IndustriesIndexView />;
}
