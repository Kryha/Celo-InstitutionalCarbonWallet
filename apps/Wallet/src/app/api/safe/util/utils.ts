import { SafeTransactionBody } from "@/types";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { network } from "./constants";
import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";

export function getCeloProvider() {  
  return new CeloProvider(process.env.RPC_URL_CELO!);
}

export async function getCeloSigner(pk: string) {  
  const provider = getCeloProvider();
  await provider.ready;
  return new CeloWallet(pk, provider);
}

export function getEtherscanProvider() {  
  return ethers.getDefaultProvider(network, {
    etherscan: process.env.ETHERSCAN_ID!,
  });
}

/**
 * Use this signer when making calls to the deployed Safe using the SDK
 * @param pk 
 * @returns signer object using the default RPC_URL
 */
export function getSigner(pk: string) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
  return new ethers.Wallet(pk, provider);
}

/**
 * Use this signer when making calls to the deployed RBAC module
 * @param pk 
 * @returns signer object using an Etherscan provider
 */
export function getEtherscanSigner(pk: string) {
  const provider = getEtherscanProvider();
  return new ethers.Wallet(pk, provider);
}

async function getEthAdapter(pk?: string): Promise<EthersAdapter> {
  const provider = getCeloProvider();
  let signer;
  if (pk) {
    signer = await getCeloSigner(pk);
  }

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer ?? provider,
  });

  return ethAdapter;
}

export async function getSafeService(): Promise<SafeApiKit> {
  const ethAdapter = await getEthAdapter();
  const txServiceUrl = process.env.TRANSACTION_SERVICE_URL_CELO!;
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
  return safeService;
}

export async function getSafe(pk?: string): Promise<Safe> {
  const ethAdapter = await getEthAdapter(pk);
  const safeSdk = await Safe.create({ ethAdapter, safeAddress: process.env.SAFE_ADDRESS_CELO! });

  return safeSdk;
}

export async function createTransaction(body: SafeTransactionBody): Promise<ethers.ContractReceipt | undefined> {
  const { pk, amount, destination } = body;
  const safeSdk = await getSafe(pk);
  const ethAmount = ethers.utils.parseUnits(amount, "ether").toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: destination,
    data: "0x",
    value: ethAmount,
  };

  let safeTransaction = await safeSdk.createTransaction({ safeTransactionData });
  safeTransaction = await safeSdk.signTransaction(safeTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  return receipt;
}
