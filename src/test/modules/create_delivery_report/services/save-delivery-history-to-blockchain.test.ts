import { saveCampaignDeliveryToBlockchain } from "@/modules/campaign/pages/create_delivery_report/services/save-campaign-delivery-to-blockchain";
import { ethers } from "ethers";

// ================= SKRIPSI =================
jest.mock("ethers", () => {
  const original = jest.requireActual("ethers");

  return {
    ...original,
    ethers: {
      ...original.ethers,
      JsonRpcProvider: jest.fn(),
      Wallet: jest.fn(),
      Contract: jest.fn(),
    },
  };
});

describe("Unit Test saveCampaignDeliveryToBlockchain", () => {
  beforeEach(() => {
    process.env.CONTRACT_RPC = "http://rpc";
    process.env.CONTRACT_PRIVATE_KEY = "private-key";
    process.env.CONTRACT_ADDRESS = "0xcontract";
  });

  // ================= TERPAKAI =================
  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil menyimpan campaign delivery ke blockchain", async () => {
    const mockWait = jest.fn().mockResolvedValue({
      hash: "0xtx",
      blockNumber: 123,
      gasUsed: BigInt(21000),
    });

    (ethers.Contract as jest.Mock).mockImplementation(() => ({
      storeCampaignDelivery: jest.fn().mockResolvedValue({
        wait: mockWait,
      }),
    }));

    const result = await saveCampaignDeliveryToBlockchain(
      "campaign-1",
      "abcdef",
      1700000000
    );

    expect(result.txHash).toBe("0xtx");
    expect(result.blockNumber).toBe(123);
    expect(result.gasUsed).toBe("21000");
  });

  // =================== ERROR PATH ===================
  it("Error Path: gagal jika env blockchain tidak lengkap", async () => {
    delete process.env.CONTRACT_RPC;

    await expect(
      saveCampaignDeliveryToBlockchain(
        "campaign-1",
        "abcdef",
        1700000000
      )
    ).rejects.toThrow("Missing blockchain env variables");
  });

  it("Error Path: gagal kirim tx ke blockchain", async () => {
    (ethers.Contract as jest.Mock).mockImplementation(() => ({
      storeCampaignDelivery: jest.fn().mockRejectedValue(
        new Error("Blockchain transaction failed")
      ),
    }));

    // Karena di fungsi asli, error ini akan melempar exception,
    // jadi kita bisa tangkap dengan try-catch atau expect rejects
    await expect(
      saveCampaignDeliveryToBlockchain(
        "campaign-1",
        "abcdef",
        1700000000
      )
    ).rejects.toThrow("Blockchain transaction failed");
  });

  // ================= TERPAKAI =================
  // ================== ERROR PATH – DATA TIDAK VALID ===================
  it("Error Path: gagal jika data campaign tidak valid (campaignId kosong)", async () => {
    await expect(
      saveCampaignDeliveryToBlockchain(
        "", // campaignId kosong
        "abcdef",
        1700000000
      )
    ).rejects.toThrow("Invalid campaign data"); // perlu validasi di fungsi
  });

  it("Error Path: gagal jika data campaign tidak valid (deliveryHash kosong)", async () => {
    await expect(
      saveCampaignDeliveryToBlockchain(
        "campaign-1",
        "", // deliveryHash kosong
        1700000000
      )
    ).rejects.toThrow("Invalid campaign data"); // perlu validasi di fungsi
  });
});
