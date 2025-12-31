"use server"

import { generateCampaignDeliveryHash } from "@/modules/campaign/pages/create_delivery_report/utils/generate-campaign-delivery-hash";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { saveCampaignDeliveryToBlockchain } from "@/modules/campaign/pages/create_delivery_report/services/save-campaign-delivery-to-blockchain";
interface CreateCampaignDeliveryHistoryInput {
    campaign_id: string;
    title: string;
    note?: string;
    created_by: string;
}

export async function createCampaignDeliveryHistory(
    input: CreateCampaignDeliveryHistoryInput
) {
    const delivery_hash = generateCampaignDeliveryHash(input);

    const blockchainResult =
        await saveCampaignDeliveryToBlockchain(
            input.campaign_id,
            input.title,
            input.note ?? "",
            delivery_hash,
            Math.floor(Date.now() / 1000)
        );

    const blockchain_tx_hash = blockchainResult.txHash ?? null;

    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("campaign_delivery_histories")
        .insert([
            {
                campaign_id: input.campaign_id,
                title: input.title,
                note: input.note ?? null,
                created_by: input.created_by,
                delivery_hash,
                blockchain_tx_hash,
            },
        ])
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return {
        data,
        blockchain_tx_hash,
    };
}