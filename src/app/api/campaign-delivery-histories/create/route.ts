import { createCampaignDeliveryHistory } from "@/modules/campaign/pages/create_delivery_report/services/create-campaign-delivery-history";
import { NextResponse } from "next/server";

interface CreateCampaignDeliveryHistoryRequest {
  campaign_id: string;
  title: string;
  note?: string;
  created_by: string; // users.id
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

