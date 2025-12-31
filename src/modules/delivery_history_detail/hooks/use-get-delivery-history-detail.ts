"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignDeliveryHistoryById } from "../services/get-delivery-history-detail";
import { CampaignDeliveryHistoryDetail } from "../types/get-delivery-history-detail";

export function useCampaignDeliveryHistoryDetail(campaignDeliveryHistoryId: string) {
    const query = useQuery<CampaignDeliveryHistoryDetail | null>({
        queryKey: ["campaign-delivery-history-detail", campaignDeliveryHistoryId],
        queryFn: () =>
            getCampaignDeliveryHistoryById({
                campaign_delivery_history_id: campaignDeliveryHistoryId,
            }),
        enabled: !!campaignDeliveryHistoryId,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return {
        data: query.data ?? null,
        loading: query.isLoading,
        error: query.error instanceof Error ? query.error.message : null,
        refresh: query.refetch,
    };
}
