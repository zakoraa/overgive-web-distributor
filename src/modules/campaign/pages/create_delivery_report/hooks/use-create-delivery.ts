import { useState } from "react";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import { useCreateCampaignDeliveryHistory } from "./use-create-campaign-delivery-history";

export function useDeliveryReport() {
    const { user } = useGetCurrentUserContext();
    const { createDeliveryHistory } =
        useCreateCampaignDeliveryHistory();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submit = async (formData: {
        title: string;
        note: string;
    },
        campaign_id: string
    ) => {
        if (!user) {
            throw new Error("User belum login");
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const payload = {
                campaign_id: campaign_id,
                title: formData.title,
                note: formData.note,
                created_by: user.id,
            };
            console.log("PAYLOAD: ", payload)

            await createDeliveryHistory(payload);

            setSuccess(true);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        submit,
        loading,
        error,
        success,
    };
}
