"use client";

import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { Label } from "../text/label";
import Image from "next/image";

interface CampaignVerticalCardProps {
  image?: string;
  title?: string;
  latestNewsCount?: number;
  remainingDays?: number | null;
  onClickUrl?: string;
}

export const CampaignVerticalCard = ({
  image = "/icons/ic-overgive-logo.svg",
  title = "Judul Kampanye",
  latestNewsCount = 0,
  remainingDays = null,
  onClickUrl = "/",
}: CampaignVerticalCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(onClickUrl)}
      className="hover:bg-hover mt-3 flex h-full max-w-52 cursor-pointer flex-col transition-colors duration-300"
    >
      <Image
        src={image}
        height={60}
        width={250}
        alt="campaign-image"
        className="h-32 min-w-full rounded-t-2xl object-cover"
      />

      <div className="m-3 flex flex-col justify-between space-y-2 h-full">
        <Label
          size="md"
          className="cursor-pointer text-start font-bold"
          text={title}
        />

        <div className="flex flex-col items-start justify-start space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"/icons/ic-latest-news.svg"}
              alt={"latest-news-icon"}
              height={20}
              width={20}
            />
          </div>
          <p className="text-center text-xs font-bold">
            {latestNewsCount} Kabar Ditambahkan
          </p>
        </div>

        {(remainingDays || remainingDays !== 0) ? (
          <p className="mt-auto self-end text-end text-[11px]">
            {remainingDays} Hari Lagi
          </p>
        ):<div></div>}
      </div>
    </Card>
  );
};
