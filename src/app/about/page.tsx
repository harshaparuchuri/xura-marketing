import { ABOUT } from "@/data/about";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { AboutView } from "@/views/about";

export const metadata = pageMetadata({
  title: ABOUT.meta.title,
  description: ABOUT.meta.description,
  path: ABOUT.path,
});

export default function AboutPage() {
  return <AboutView />;
}
