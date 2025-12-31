"use client";

import { useQuery } from "@tanstack/react-query";
import { DistributorAssignment, getDistributorAssignment } from "../services/get-campaign-assignment-by-id";

export function useDistributorAssignment(campaignId: string, distributorId: string) {
    const query = useQuery<DistributorAssignment | null>({
        queryKey: ["distributor-assignment", campaignId, distributorId],
        queryFn: () => getDistributorAssignment(campaignId, distributorId),
        enabled: !!campaignId && !!distributorId,
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
