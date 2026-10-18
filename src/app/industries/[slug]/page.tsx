import { notFound } from "next/navigation";

import { IndustryView } from "@/views/industry";
import { INDUSTRIES, getIndustry } from "@/data/industries";
import { pageMetadata } from "@/utils/seo/generate-page-metadata";

export const generateStaticParams = () =>
  INDUSTRIES.map((i) => ({ slug: i.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: `AI employees for ${industry.label}`,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}`,
  });
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getIndustry(slug)) notFound();
  return <IndustryView slug={slug} />;
}
