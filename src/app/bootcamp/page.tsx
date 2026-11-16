import { BOOTCAMP } from "@/data/subpages";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { BootcampView } from "@/views/subpages";

export const metadata = pageMetadata({ ...BOOTCAMP.meta, path: BOOTCAMP.path });

export default function BootcampPage() {
  return <BootcampView />;
}
