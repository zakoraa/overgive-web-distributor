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
        Buat laporan penyaluran donasi baru dengan lengkap dan akurat, agar
        seluruh penggunaan dana tercatat dengan transparan dan dapat
        dipertanggungjawabkan. <br />
        <span className="font-bold text-red-600">
          Perhatian: Laporan ini tersimpan permanen di blockchain dan tidak
          dapat diubah atau dihapus.
        </span>
      </p>

      <Line />
      <CreateDeliveryReportForm campaignId={campaignId} />
    </main>
  );
};
