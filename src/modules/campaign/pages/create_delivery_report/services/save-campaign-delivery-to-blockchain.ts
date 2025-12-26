import { ethers } from "ethers";
import { CAMPAIGN_DELIVERY_ABI } from "../lib/abi/campaign-delivery-histories-abi";

export async function saveCampaignDeliveryToBlockchain(
  campaignId: string,
  title: string,
  note: string,
  deliveryHash: string,
  confirmedAt: number
): Promise<{
  txHash: string;
  blockNumber: number;
  gasUsed: string;
}> {
  if (
    !process.env.CONTRACT_RPC ||
    !process.env.CONTRACT_PRIVATE_KEY ||
    !process.env.CONTRACT_ADDRESS
  ) {
    throw new Error("Missing blockchain env variables");
  }

  const provider = new ethers.JsonRpcProvider(
    process.env.CONTRACT_RPC
  );
  const wallet = new ethers.Wallet(
    process.env.CONTRACT_PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    CAMPAIGN_DELIVERY_ABI,
    wallet
  );

  const deliveryHashBytes32 = "0x" + deliveryHash;

  const tx = await contract.storeCampaignDelivery(
    campaignId,
    title,
    note,
    deliveryHashBytes32,
    BigInt(confirmedAt)
  );

  const receipt = await tx.wait();

  return {
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
  };
}
