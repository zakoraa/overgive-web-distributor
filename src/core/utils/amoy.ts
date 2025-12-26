const AMOY_BASE_URL = "https://amoy.polygonscan.com";

export const txLink = (txHash?: string) =>
  txHash ? `${AMOY_BASE_URL}/tx/${txHash}` : "#";