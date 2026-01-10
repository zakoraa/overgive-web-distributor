"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export interface CreateCampaignDeliveryHistoryPayload {
  campaign_id: string;
  title: string;
  note?: string;
  created_by: string;
}

export interface CreateCampaignDeliveryHistoryResponse {
  success: boolean;
  data: any;
  blockchain_tx_hash?: string | null;
}

export async function createCampaignDeliveryHistoryClient(
  payload: CreateCampaignDeliveryHistoryPayload
): Promise<CreateCampaignDeliveryHistoryResponse> {
  const url = await absoluteUrl(
    "/api/campaign-delivery-histories/create"
  );

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    console.log("ERRORO: ", res)

    throw new Error(json.error || "Gagal membuat delivery history");
  }

  return json;
}
