import { pageMetadata } from "@/utils/seo/generate-page-metadata";
import { DeploymentView } from "@/views/deployment";

export const metadata = pageMetadata({
  title: "AI Deployment: Our Team, Your Site, Live in 2 Weeks",
  description:
    "How a Xura deployment works: a 2-day bootcamp, our team on your site, live in about 2 weeks, in our cloud, your VPC or on premises.",
  path: "/deployment",
});

export default function DeploymentPage() {
  return <DeploymentView />;
}
