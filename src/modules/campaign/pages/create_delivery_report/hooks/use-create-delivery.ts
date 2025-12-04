import { useState } from "react";
import { submitDeliveryReportAction } from "../services/delivery-report";

export function useDeliveryReport() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<any>(null);

    async function submit(form: {
        title: string;
        note: string;
        userId: string;
    }) {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const res = await submitDeliveryReportAction(form);

        if (!res.success) {
            setError(res.error);
            setLoading(false);
            return null;
        }

        setSuccess(res.data);
        setLoading(false);
        return res.data;
    }

    return {
        loading,
        error,
        success,
        submit,
    };
}
