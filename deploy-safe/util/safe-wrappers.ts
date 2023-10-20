import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

export function getProvider(RPC_URL: string) {
  return new ethers.providers.JsonRpcProvider(RPC_URL);
}

export function getSigner(privateKey: string, provider: ethers.providers.JsonRpcProvider) {
  return new ethers.Wallet(privateKey, provider);
}

export function getEthersAdapter(signer: ethers.Wallet) {
  return new EthersAdapter({ ethers, signerOrProvider: signer });
}

export async function createSafe(ethAdapter: EthersAdapter, safeAddress: string) {
  return await Safe.create({ ethAdapter, safeAddress });
}
