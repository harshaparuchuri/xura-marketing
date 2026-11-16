import { TRANSFORMATION } from "@/data/subpages";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { TransformationView } from "@/views/subpages";

export const metadata = pageMetadata({ ...TRANSFORMATION.meta, path: TRANSFORMATION.path });

export default function AiTransformationPage() {
  return <TransformationView />;
}
