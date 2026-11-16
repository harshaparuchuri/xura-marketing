import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { UseCasesIndexView } from "@/views/content-pages";

export const metadata = pageMetadata({
  title: "AI Use Cases for Operations, Sales, Quality and IT",
  description:
    "Deviation investigation, CAPA tracking, monthly sales reviews, leadership decks, plant reviews and hiring: the jobs Xura's AI employees take on.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return <UseCasesIndexView />;
}
