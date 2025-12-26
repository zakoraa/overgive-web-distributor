import { CreateDeliveryReport } from "@/modules/campaign/pages/create_delivery_report";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <CreateDeliveryReport campaignId={id} />;
}
