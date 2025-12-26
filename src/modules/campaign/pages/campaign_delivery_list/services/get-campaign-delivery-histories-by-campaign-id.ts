"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxByHash } from "@/core/services/get-transaction-by-tx-hash";

interface GetCampaignDeliveryHistoriesParams {
    campaign_id: string;
    search?: string;
}

export async function getCampaignDeliveryHistories({
    campaign_id,
    search,
}: GetCampaignDeliveryHistoriesParams) {
    const supabase = await supabaseServer();

    let query = supabase
        .from("campaign_delivery_histories")
        .select("*")
        .eq("campaign_id", campaign_id)
        .order("created_at", { ascending: false });

    if (search && search.trim() !== "") {
        query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        return [];
    }

    // ⛓️ Ambil data blockchain (PARALLEL, bukan loop biasa)
    const results = await Promise.all(
        data.map(async (item) => {
            if (!item.blockchain_tx_hash) {
                return {
                    ...item,
                    blockchain: null,
                };
            }

            try {
                const blockchain = await getTxByHash(
                    item.blockchain_tx_hash
                );

                return {
                    ...item,
                    blockchain,
                };
            } catch {
                return {
                    ...item,
                    blockchain: null,
                };
            }
        })
    );

    return results;
}
