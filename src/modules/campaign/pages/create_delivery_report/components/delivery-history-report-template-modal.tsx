import { useEffect, useState } from "react";
import { Modal } from "@/core/components/ui/modal/modal"; // sesuaikan path
import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { CopyIcon } from "lucide-react";

export const DeliveryHistoryReportTemplateModal = () => {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Template HTML (untuk disalin)
  const templateHTML = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="font-weight:bold;">1. Rincian Penggunaan Dana Bersih</h2>
      <ul>
        <li><strong>[Kebutuhan/Item 1]:</strong> Rp [Jumlah]</li>
        <li><strong>[Kebutuhan/Item 2]:</strong> Rp [Jumlah]</li>
        <li><strong>[Kebutuhan/Item 3]:</strong> Rp [Jumlah]</li>
      </ul>
      <br/>
      <h2 style="font-weight:bold;">2. Dokumentasi Kegiatan</h2>
      <p>Ceritakan kegiatan beserta kronologi dan hasilnya, sertakan foto sebagai dokumentasi.</p>
      <br/>

      <p style="text-align: right; margin-top: 40px;">Dibuat oleh: [Nama Distributor] <br> Tanggal: [Isi Tanggal]</p>
    </div>
  `;

  const exampleHTML = `
<div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">
  <h2 style="font-weight:bold;">1. Rincian Penggunaan Dana Bersih</h2>
  <ul>
    <li><strong>Paket Sembako:</strong> Rp 5.000.000</li>
    <li><strong>Obat-obatan:</strong> Rp 2.500.000</li>
    <li><strong>Perlengkapan Medis Darurat:</strong> Rp 3.000.000</li>
  </ul>
  <br/>

  <h2 style="font-weight:bold;">2. Dokumentasi Kegiatan</h2>

  <p>Pada pagi hari tanggal 5 Januari 2026, tim relawan berkumpul di titik koordinasi utama di Gaza. Kegiatan dimulai dengan briefing singkat mengenai lokasi distribusi dan alur penyaluran paket sembako. Setiap relawan diberikan tugas spesifik agar proses distribusi dapat berjalan cepat dan efisien. Paket sembako yang terdiri dari beras, minyak, gula, dan makanan pokok lainnya disusun rapi untuk memudahkan pendistribusian ke 100 keluarga terdampak. Suasana penuh semangat terlihat saat relawan mulai membawa paket-paket tersebut menuju rumah-rumah penerima. </p>
  <img src="/images/example-1.webp" alt="Distribusi Sembako" style="margin:10px 0; width:100%; max-width:400px;" />

  <p>Di siang hari, tim melanjutkan kegiatan dengan penyaluran obat-obatan dan perlengkapan medis ke klinik darurat setempat. Setiap obat dan peralatan medis diperiksa secara teliti agar sesuai kebutuhan pasien. Para relawan juga memberikan edukasi singkat kepada tenaga kesehatan lokal mengenai penggunaan obat-obatan yang disalurkan. Selama proses ini, tim tetap menjaga protokol kesehatan, memakai masker dan menjaga jarak aman. Kegiatan ini menjadi momen penting karena mampu membantu banyak pasien yang membutuhkan perawatan segera. </p>
  <img src="/images/example-2.webp" alt="Distribusi Obat-obatan" style="margin:10px 0; width:100%; max-width:400px;" />

  <p>Pada sore harinya, dokumentasi kegiatan dilakukan dengan mencatat kronologi distribusi, mengumpulkan foto, dan menulis catatan penting tentang respons masyarakat dan kebutuhan tambahan. Narasi ini dibuat sebagai bahan laporan transparansi penggunaan dana donasi, sekaligus evaluasi kegiatan agar program selanjutnya lebih optimal. Seluruh kegiatan berjalan lancar tanpa kendala signifikan, dan antusiasme penerima bantuan sangat tinggi. Foto-foto yang diambil menjadi bukti nyata bahwa bantuan sampai ke tangan yang membutuhkan, serta memperkuat kepercayaan donatur terhadap transparansi program.</p>
  <br/>

  <p style="text-align: right; margin-top: 40px;">Dibuat oleh: Maulana <br> Tanggal: 5 Januari 2026</p>
</div>
`;

  // Salin template ke clipboard
  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([templateHTML], { type: "text/html" }),
          "text/plain": new Blob([templateHTML.replace(/<[^>]+>/g, "")], {
            type: "text/plain",
          }),
        }),
      ]);
      setToastMessage("Template berhasil disalin ke clipboard!");
    } catch (err) {
      console.error(err);
      setToastMessage("Gagal menyalin template.");
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timeout = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toastMessage]);

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-800 md:flex-row md:items-center md:justify-between md:space-y-0">
          <p className="md:mr-4">Isi laporan wajib mengikuti template.</p>
          <div className="flex flex-wrap gap-2">
            <AppButtonSm
              text="Lihat Template"
              className="text-xs hover:opacity-70"
              onClick={() => setIsTemplateOpen(true)}
            />
            <AppButtonSm
              text="Lihat Contoh Laporan"
              className="bg-blue-400! text-xs hover:opacity-70"
              onClick={() => setIsExampleOpen(true)}
            />
            <AppButtonSm
              text="Salin Template"
              icon={<CopyIcon className="h-4 w-4" />}
              className="bg-green-500! text-xs hover:opacity-70"
              onClick={handleCopyTemplate}
            />
          </div>
        </div>
      </div>

      {/* Modal Template */}
      <Modal
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        className="md:min-w-[90%]"
      >
        <h3 className="mb-4 text-lg font-semibold">
          Template Laporan Penyaluran Donasi
        </h3>
        <div className="max-h-[70vh] overflow-auto">
          <div
            className="prose max-w-full px-3"
            dangerouslySetInnerHTML={{ __html: templateHTML }}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <AppButtonSm
            text="Salin Template"
            className="w-full"
            onClick={handleCopyTemplate}
          />
          <AppButtonSm
            text="Tutup"
            className="w-full bg-red-400 hover:opacity-70"
            onClick={() => setIsTemplateOpen(false)}
          />
        </div>
      </Modal>

      {/* Modal Contoh */}
      <Modal
        isOpen={isExampleOpen}
        onClose={() => setIsExampleOpen(false)}
        className="md:min-w-[90%]"
      >
        <h3 className="mb-4 text-lg font-semibold">
          Contoh Laporan Penyaluran Donasi
        </h3>
        <div className="max-h-[70vh] overflow-auto">
          <div
            className="prose max-w-full px-3"
            dangerouslySetInnerHTML={{ __html: exampleHTML }}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <AppButtonSm
            text="Tutup"
            className="w-full bg-red-400 hover:opacity-70"
            onClick={() => setIsExampleOpen(false)}
          />
        </div>
      </Modal>

      {/* Toast */}
      {toastMessage && (
        <div className="animate-fadeIn bg-primary fixed top-5 left-5 z-50 rounded px-4 py-2 text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </>
  );
};
