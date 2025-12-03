"use client";

import { useRouter } from "next/navigation";
import { Label } from "../text/label";
import { Card } from "../ui/card";
import Image from "next/image";

interface CampaignHorizontalCardProps {
  image?: string;
  title?: string;
  latestNewsCount?: number;
  remainingDays?: number | null;
  onClickUrl?: string;
}

export const CampaignHorizontalCard = ({
  image = "/icons/ic-overgive-logo.svg",
  title = "Judul Kampanye",
  latestNewsCount = 0,
  remainingDays = null,
  onClickUrl = "/campaign",
}: CampaignHorizontalCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(onClickUrl)}
      className="hover:bg-hover md:rounded-2xl rounded-lg flex h-fit cursor-pointer transition-colors duration-300"
    >
      <Image
        src={image}
        height={100}
        width={200}
        alt="campaign-image"
        className="min-h-full w-[100px] md:rounded-s-2xl rounded-s-lg  object-cover lg:w-[200px]"
      />

      <div className="mx-2 my-1 flex w-full flex-col justify-between md:mx-3 md:my-3">
        <Label size="md" className="cursor-pointer text-start" text={title} />

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

        {(remainingDays || remainingDays !== 0) && (
          <p className="mt-3 text-end text-[11px]">{remainingDays} Hari Lagi</p>
        )}
      </div>
    </Card>
  );
};
