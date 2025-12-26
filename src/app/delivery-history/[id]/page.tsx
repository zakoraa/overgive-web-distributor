import { DeliveryHistoryDetail } from "@/modules/delivery_history_detail";
import { CampaignDeliveryHistoryDetailProvider } from "@/modules/delivery_history_detail/providers/get-delivery-history-detail-provider";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <CampaignDeliveryHistoryDetailProvider deliveryHistoryId={id}>
      <DeliveryHistoryDetail />
    </CampaignDeliveryHistoryDetailProvider>
  );
}
