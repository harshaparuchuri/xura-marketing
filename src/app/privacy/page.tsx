import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { PrivacyView } from "@/views/privacy";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Xurian Labs LLP collects, uses, shares and protects personal data on the Xura website and product, and the choices you have.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyView />;
}
