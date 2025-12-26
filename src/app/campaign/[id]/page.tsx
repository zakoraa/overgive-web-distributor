"use client";

import { Campaign } from "@/modules/campaign/pages/campaign_delivery_list";
import { CampaignDeliveryHistoriesProvider } from "@/modules/campaign/pages/campaign_delivery_list/providers/get-campaign-delivery-histories-provider";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <CampaignDeliveryHistoriesProvider campaignId={id}>
      <Campaign campaignId={id} />;
    </CampaignDeliveryHistoriesProvider>
  );
}
