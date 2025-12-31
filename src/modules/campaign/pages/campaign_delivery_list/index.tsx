"use client";

import { CampaignDeliveryHistoriesProvider } from "./providers/get-campaign-delivery-histories-provider";
import { Campaign } from "./components/campaign";

interface CampaignPageClientProps {
  campaignId: string;
}

export const CampaignPage = ({ campaignId }: CampaignPageClientProps) => {
  return (
    <CampaignDeliveryHistoriesProvider campaignId={campaignId}>
      <Campaign campaignId={campaignId} />
    </CampaignDeliveryHistoriesProvider>
  );
};
