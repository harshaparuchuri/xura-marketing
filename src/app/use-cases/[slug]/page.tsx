import { notFound } from "next/navigation";

import { USE_CASES, getUseCase } from "@/data/use-cases";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { UseCaseView } from "@/views/content-pages";

export const generateStaticParams = () => USE_CASES.map((u) => ({ slug: u.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) return {};
  return pageMetadata({ ...u.meta, path: `/use-cases/${u.slug}` });
};

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getUseCase(slug)) notFound();
  return <UseCaseView slug={slug} />;
}
