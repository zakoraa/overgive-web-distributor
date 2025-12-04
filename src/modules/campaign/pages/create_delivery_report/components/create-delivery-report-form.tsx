"use client";

import { useState } from "react";
import { AppButton } from "@/core/components/ui/button/app-button";
import AppRichTextEditor from "@/core/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useGetUsers } from "@/core/hooks/use-get-users";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import router from "next/router";
import { AppInput } from "@/core/components/ui/input/app-input";
import { useCreateReportValidation } from "../hooks/use-create-delivery-report-form-validation";

export const CreateDeliveryReportForm = () => {
  //   const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const { errors, validate } = useCreateReportValidation();

  const { user } = useGetCurrentUserContext();
  const {
    users,
    isLoading: userLoading,
    hasMore,
    loadMore,
    search,
    setSearch,
  } = useGetUsers();

  const [formData, setFormData] = useState<any>({
    title: "",
    note: "",
  });

  const handleSubmitConfirm = async () => {
    setModalOpen(false);
    if (!user) {
      console.error("User belum login atau belum tersedia");
      setModalInfoData({
        title: "Gagal!",
        message: "User belum tersedia, silakan login ulang.",
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
      return;
    }
    try {
      //   await createAssignment({
      //     assigned_by: user.id,
      //     title: formData.title,
      //     campaign_id: formData.campaign_id,
      //     note: formData.note || null,
      //   });

      setModalInfoData({
        title: "Berhasil!",
        message:
          "Laporan pengiriman berhasil ditambahkan. Laporan tidak dapat diedit.",
        imageUrl: "/svgs/success.svg",
      });

      setModalInfoOpen(true);

      setFormData({
        title: "",
        note: "",
      });
    } catch (err) {
      console.log("ERROR CREATE DISTRI: ", err);
      setModalInfoData({
        title: "Gagal!",
        message: "Terjadi kesalahan, laporan tidak dapat ditambahkan.",
        imageUrl: "/svgs/failed.svg",
      });

      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);

    if (modalInfoData.title === "Berhasil!") {
      router.push("/?tab=assign-distributor");
    }
  };

  return (
    <>
      <form
        className="space-y-4 pb-20"
        onSubmit={(e) => {
          e.preventDefault();

          const validationErrors = validate(formData);
          if (Object.keys(validationErrors).length > 0) return;

          setModalOpen(true);
        }}
      >
        <AppInput
          name="title"
          required
          className="lg:max-w-[50%]"
          label="Judul Laporan"
          error={errors.title}
          hint="Masukkan judul laporan"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: any) => ({
              ...prev,
              title: event.target.value,
            }))
          }
        />

        <AppRichTextEditor
          required
          error={errors.note}
          label="Isi Laporan Pengiriman"
          name="note"
          placeholder="Tambahkan isi laporan pengiriman..."
          onChange={(val) => setFormData({ ...formData, note: val })}
        />

        <AppButton
          type="submit"
          text="Tambah Laporan Pengiriman"
          className="w-full!"
        />
      </form>

      <ModalInfo
        isOpen={modalInfoOpen}
        onClose={handleCloseInfoModal}
        title={modalInfoData.title}
        message={modalInfoData.message}
        imageUrl={modalInfoData.imageUrl}
      />

      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSubmitConfirm}
        title="Konfirmasi Laporan"
        description="Apakah kamu yakin ingin menambahkan laporan pengiriman?"
        confirmText="Ya, Tambahkan"
        cancelText="Batal"
      />
    </>
  );
};
