"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignAssignment, GetCampaignAssignmentOptions } from "../types/campaign-assignment";

export async function getCampaignAssignments(
    options: GetCampaignAssignmentOptions = {}
) {
    const supabase = await supabaseServer();

    const {
        limit = 10,
        offset = 0,
        search = "",
    } = options;

    // ----------------------------------------------------
    // Ambil user login
    // ----------------------------------------------------
    // 1. Ambil auth user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User tidak terautentikasi");
    }

    // 2. Ambil user ID di table users
    const { data: userRow, error: userRowError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", user.id)
        .single();

    if (userRowError || !userRow) {
        throw new Error("User tidak ditemukan di table users");
    }

    // ----------------------------------------------------
    // Query utama: distributor_assignments → campaigns
    // ----------------------------------------------------
    let query = supabase
        .from("distributor_assignments")
        .select(
            `
      campaign:campaigns (
        id,
        title,
        imageUrl:image_url,
        endedAt:ended_at,
        created_at,
        category,
        latest_news:campaign_delivery_histories(count)
      )
    `
        )
        .eq("distributor_id", userRow.id)
        .is("deleted_at", null)
        .range(offset, offset + limit - 1);

    if (search.trim() !== "") {
        query = query.ilike("campaigns.title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
    }

    // ----------------------------------------------------
    // Mapping data
    // ----------------------------------------------------
    const mapped: CampaignAssignment[] = data
        .filter((row: any) => row.campaign !== null)
        .map((row: any) => {
            const c = row.campaign;

            const end = c.endedAt ? new Date(c.endedAt) : null;
            const now = new Date();

            const diff = end
                ? Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : 0;

            return {
                id: c.id,
                title: c.title,
                imageUrl: c.imageUrl,
                latestNewsCount: c.latest_news?.[0]?.count ?? 0,
                remainingDays: diff > 0 ? diff : 0,
            };
        });
    return mapped;
}
