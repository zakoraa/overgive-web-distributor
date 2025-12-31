"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export interface DistributorAssignment {
    id: string;
    notes: string;
}

export async function getDistributorAssignment(
    campaignId: string,
    distributorId: string
): Promise<DistributorAssignment | null> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("distributor_assignments")
        .select("id, notes")
        .eq("campaign_id", campaignId)
        .eq("distributor_id", distributorId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return {
        id: data.id,
        notes: data.notes ?? "",
    };
}
