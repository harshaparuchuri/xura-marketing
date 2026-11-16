import { INTEGRATIONS } from "@/data/subpages";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { IntegrationsView } from "@/views/subpages";

export const metadata = pageMetadata({ ...INTEGRATIONS.meta, path: INTEGRATIONS.path });

export default function IntegrationsPage() {
  return <IntegrationsView />;
}
