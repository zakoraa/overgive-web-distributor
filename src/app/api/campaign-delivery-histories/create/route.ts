import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { saveCampaignDeliveryToBlockchain } from "@/modules/campaign/pages/create_delivery_report/services/save-campaign-delivery-to-blockchain";
import { generateCampaignDeliveryHash } from "@/modules/campaign/pages/create_delivery_report/utils/generate-campaign-delivery-hash";

interface CreateCampaignDeliveryHistoryRequest {
  campaign_id: string;
  title: string;
  note?: string;
  created_by: string; // users.id
}


interface CreateCampaignDeliveryHistoryInput {
  campaign_id: string;
  title: string;
  note?: string;
  created_by: string;
}

export async function createCampaignDeliveryHistory(
  input: CreateCampaignDeliveryHistoryInput
) {
  // 1️⃣ generate delivery hash dari seluruh data
  const delivery_hash = generateCampaignDeliveryHash(input);

  // 2️⃣ simpan ke blockchain
  const blockchainResult =
    await saveCampaignDeliveryToBlockchain(
      input.campaign_id,
      input.title,
      input.note ?? "",
      delivery_hash,
      Math.floor(Date.now() / 1000)
    );

  const blockchain_tx_hash = blockchainResult.txHash ?? null;

  // 3️⃣ simpan ke Supabase
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


export async function POST(req: Request) {
  try {
    const body =
      (await req.json()) as CreateCampaignDeliveryHistoryRequest;
      

    if (!body.campaign_id || !body.title || !body.created_by) {
      return NextResponse.json(
        { error: "campaign_id, title, dan created_by wajib diisi" },
        { status: 400 }
      );
    }

    const result = await createCampaignDeliveryHistory(body);

    return NextResponse.json({
      success: true,
      data: result.data,
      blockchain_tx_hash: result.blockchain_tx_hash,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

