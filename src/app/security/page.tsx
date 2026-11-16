import { SECURITY } from "@/data/subpages";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { SecurityView } from "@/views/subpages";

export const metadata = pageMetadata({ ...SECURITY.meta, path: SECURITY.path });

export default function SecurityPage() {
  return <SecurityView />;
}
