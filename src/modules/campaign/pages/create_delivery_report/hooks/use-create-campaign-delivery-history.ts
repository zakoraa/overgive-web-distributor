"use client";

import { useState } from "react";
import { createCampaignDeliveryHistoryClient, CreateCampaignDeliveryHistoryPayload } from "../services/create-campaign-delivery-history";


export function useCreateCampaignDeliveryHistory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createDeliveryHistory = async (
        payload: CreateCampaignDeliveryHistoryPayload
    ) => {
        setLoading(true);
        setError(null);

        try {
            return await createCampaignDeliveryHistoryClient(payload);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        createDeliveryHistory,
        loading,
        error,
    };
}
