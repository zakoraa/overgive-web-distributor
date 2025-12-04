import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { Line } from "@/core/components/ui/line";
import SearchInput from "@/core/components/ui/search/search-input";
import { CampaignDelivaryCard } from "./components/campaign-delivery-card";
import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { PlusIcon } from "lucide-react";

export const Campaign = () => {
  return (
    <div className="relative pb-20">
      <Card className="m-auto p-6 lg:max-w-[50%]">
        <Title text="Kabar Terbaru Kampanye" />
        <Line />
        <div className="mt-5 mb-3 flex items-center justify-between gap-10">
          <SearchInput placeholder="Cari judul..." />
        </div>

        <CampaignDelivaryCard />
      </Card>

      <Card className="fixed inset-x-0 bottom-0 mx-auto flex w-full items-center justify-center rounded-b-none bg-white px-6 py-4 lg:max-w-[50%]">
        <AppButtonSm
          text="Tambah Kabar"
          icon={<PlusIcon />}
          className="h-14 w-full!"
        />
      </Card>
    </div>
  );
};
