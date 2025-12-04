"use client";
import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { useRouter } from "next/navigation";

export const CampaignDelivaryCard = () => {
  const route = useRouter();
  return (
    <Card
      onClick={() => route.push(`/campaign/73c4ee94-321c-4840-9104-f6fa0509c377/create/`)}
      className="hover:bg-hover cursor-pointer rounded-lg p-3 transition-colors duration-300 md:rounded-2xl"
    >
      <Title size="sm" text="Bantuan Untuk Sumatra" />
      <p className="line-clamp-2 text-sm text-gray-500">
        Kampanye donasi Bantuan untuk Sumatra bertujuan menggalang dukungan bagi
        masyarakat yang terdampak bencana di wilayah Sumatra. Melalui kampanye
        ini, dana yang terkumpul akan disalurkan untuk kebutuhan mendesak
        seperti makanan, obat-obatan, perlengkapan darurat, serta bantuan
        pemulihan jangka panjang. Partisipasi setiap donatur sangat berarti
        untuk membantu warga kembali bangkit dan membangun kehidupan yang lebih
        aman dan stabil.
      </p>
      <p className="mt-3 text-sm">
        Dibuat pada: <span className="font-semibold"> 12 Oktober 2025</span>
      </p>
    </Card>
  );
};
