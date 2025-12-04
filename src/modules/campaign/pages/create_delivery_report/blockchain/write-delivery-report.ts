import { createWalletClient, http } from "viem";
import { polygonAmoy } from "viem/chains";
import type { Abi } from "viem";

export const writeDeliveryReport = async ({
    privateKey,
    contractAddress,
    abi,
    reportId,
    title,
    note,
    distributorId,
}: {
    privateKey: `0x${string}`;
    contractAddress: `0x${string}`;
    abi: Abi;
    reportId: string;    // unique id dari laporan
    title: string;
    note: string;
    distributorId: string; // user.id
}) => {
    const wallet = createWalletClient({
        account: privateKey,
        chain: polygonAmoy,
        transport: http("https://rpc-amoy.polygon.technology"),
    });

    return await wallet.writeContract({
        address: contractAddress,
        abi,
        functionName: "storeDeliveryReport",
        args: [reportId, title, note, distributorId],
    });
};
