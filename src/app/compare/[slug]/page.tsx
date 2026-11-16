import { notFound } from "next/navigation";

import { COMPARE_PAGES, getComparePage } from "@/data/compare";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { CompareView } from "@/views/content-pages";

export const generateStaticParams = () => COMPARE_PAGES.map((c) => ({ slug: c.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const c = getComparePage(slug);
  if (!c) return {};
  return pageMetadata({ ...c.meta, path: `/compare/${c.slug}` });
};

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getComparePage(slug)) notFound();
  return <CompareView slug={slug} />;
}
