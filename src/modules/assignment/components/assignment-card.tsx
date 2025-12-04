import { CampaignHorizontalCard } from "@/core/components/donation_campaign_card/campaign-horizontal-card";
import { CampaignVerticalCard } from "@/core/components/donation_campaign_card/campaign-vertical-card";
import { CampaignAssignment } from "../types/campaign-assignment";

export const AssignmentCard = ({
  item,
}: {
  item: CampaignAssignment;
}) => {
  return (
    <>
      {/* Mobile → Horizontal */}
      <div className="block sm:hidden">
        <CampaignHorizontalCard
          image={item.imageUrl}
          title={item.title}
          latestNewsCount={item.latestNewsCount}
          remainingDays={item.remainingDays}
          onClickUrl={`/campaign/${item.id}`}
        />
      </div>

      {/* Tablet & Desktop → Vertical */}
      <div className="hidden sm:block">
        <CampaignVerticalCard
          image={item.imageUrl}
          title={item.title}
          latestNewsCount={item.latestNewsCount}
          remainingDays={item.remainingDays}
          onClickUrl={`/campaign/${item.id}`}
        />
      </div>
    </>
  );
};
