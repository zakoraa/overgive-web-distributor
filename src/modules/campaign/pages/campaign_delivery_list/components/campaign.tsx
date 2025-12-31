"use client";

import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { Card } from "@/core/components/ui/card";
import { Line } from "@/core/components/ui/line";
import SearchInput from "@/core/components/ui/search/search-input";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCampaignDeliveryHistoriesContext } from "../providers/get-campaign-delivery-histories-provider";
import { CampaignDelivaryCard } from "./campaign-delivery-card-list";
import { DeliveryHistoryNotes } from "./campaign-delivery-notes";
import { Title } from "@/core/components/text/title";

interface CampaignProps {
  campaignId: string;
}

export const Campaign = ({ campaignId }: CampaignProps) => {
  const router = useRouter();

  const { search, setSearch } = useCampaignDeliveryHistoriesContext();
  return (
    <div className="relative pb-30">
      <Card className="m-auto mb-3 rounded-t-none p-6 lg:max-w-[50%]">
        <Title text="Kabar Terbaru Kampanye" />
        <Line />
        <div className="mt-5 mb-3 flex items-center justify-between gap-10">
          <SearchInput
            placeholder="Cari judul..."
            value={search}
            onChange={setSearch}
          />
        </div>

        <CampaignDelivaryCard />
      </Card>
      <DeliveryHistoryNotes campaignId={campaignId} />
      <Card className="fixed inset-x-0 bottom-0 mx-auto flex w-full items-center justify-center rounded-b-none bg-white px-6 py-4 lg:max-w-[50%]">
        <AppButtonSm
          onClick={() => router.push(`/campaign/${campaignId}/create`)}
          text="Tambah Kabar"
          icon={<PlusIcon />}
          className="h-14 w-full!"
        />
      </Card>
    </div>
  );
};
