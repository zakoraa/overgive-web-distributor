import { CampaignPage } from "@/modules/campaign/pages/campaign_delivery_list";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <CampaignPage campaignId={id} />;
}
