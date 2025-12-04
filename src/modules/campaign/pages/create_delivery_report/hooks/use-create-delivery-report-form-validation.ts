import { useState } from "react";

export const useCreateReportValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: any) => {
    const newErrors: Record<string, string> = {};

    // —— VALIDASI BERDASARKAN FIELD YANG ADA DI FORM ——
    if (!formData.title) {
      newErrors.title = "Judul laporan wajib diisi.";
    }

    // richtext bisa mengandung <p></p>, jadi perlu dibersihkan dulu
    const cleanedNote =
      typeof formData.note === "string"
        ? formData.note.replace(/<[^>]*>/g, "").trim()
        : formData.note;

    if (!cleanedNote) {
      newErrors.note = "Isi laporan pengiriman wajib diisi.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validate,
    clearErrors,
  };
};
