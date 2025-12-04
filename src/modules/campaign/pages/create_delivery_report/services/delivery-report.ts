"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function submitDeliveryReportAction(formData: {
    title: string;
    note: string;
    userId: string;
}) {
    try {
        const url = await absoluteUrl("/api/campaign/create")
        const reportId = crypto.randomUUID();

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reportId,
                title: formData.title,
                note: formData.note,
                userId: formData.userId,
            }),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || "Gagal mengirim laporan ke blockchain");
        }

        const data = await res.json();
        return { success: true, data };
    } catch (err: any) {
        return {
            success: false,
            error: err.message || "Terjadi kesalahan",
        };
    }
}
