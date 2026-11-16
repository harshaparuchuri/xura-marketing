import { WORKFLOWS } from "@/data/subpages";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { WorkflowsView } from "@/views/subpages";

export const metadata = pageMetadata({ ...WORKFLOWS.meta, path: WORKFLOWS.path });

export default function WorkflowsPage() {
  return <WorkflowsView />;
}
