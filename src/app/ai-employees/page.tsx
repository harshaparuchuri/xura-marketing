import { AI_EMPLOYEES } from "@/data/subpages";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { AiEmployeesView } from "@/views/subpages";

export const metadata = pageMetadata({ ...AI_EMPLOYEES.meta, path: AI_EMPLOYEES.path });

export default function AiEmployeesPage() {
  return <AiEmployeesView />;
}
