import { notFound } from "next/navigation";

import { IndustryView } from "@/views/industry";
import { INDUSTRIES, getIndustry } from "@/data/industries";

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
  return {
    title: `Xura for ${industry.label}`,
    description: industry.subhead,
  };
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
