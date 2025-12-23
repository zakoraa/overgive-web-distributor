import { CampaignCategory } from "@/core/types/campaign";

export interface CampaignAssignment {
  id: string;
  title: string;
  imageUrl: string;
  latestNewsCount: number;
  remainingDays: number;
}

export interface GetCampaignAssignmentOptions {
  limit?: number;
  offset?: number;
  search?: string
  category?: CampaignCategory;
  sort?: "newest" | "oldest" | "remaining_days";
}