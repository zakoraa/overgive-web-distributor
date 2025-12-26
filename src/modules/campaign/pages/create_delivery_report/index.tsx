import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { CreateDeliveryReportForm } from "./components/create-delivery-report-form";

interface CreateDeliveryReportProps {
  campaignId: string;
}

export const CreateDeliveryReport = ({
  campaignId,
}: CreateDeliveryReportProps) => {
  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Tambah Laporan Pengiriman" />
      <p className="text-sm text-gray-500">
       Buat penugasan baru untuk distributor agar mereka dapat menjalankan
        kampanye dengan jelas dan terstruktur. Isi informasi penting seperti
        distributor yang ditugaskan dan catatan tambahan untuk memastikan
        koordinasi yang tepat.
      </p>
      <Line />
      <CreateDeliveryReportForm campaignId={campaignId} />
    </main>
  );
};
