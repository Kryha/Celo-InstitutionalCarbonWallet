import { ETHERSCAN_ID, NEXT_PUBLIC_CELO_MAINNET, RPC_URL, SAFE_ADDRESS, TRANSACTION_SERVICE_URL } from "@/constants";
import { SafeTransactionBody } from "@/types";
import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { network } from "./constants";

function getCeloProvider() {  
  return new CeloProvider(RPC_URL);
}

async function getCeloSigner(pk: string) {  
  const provider = getCeloProvider();
  await provider.ready;
  return new CeloWallet(pk, provider);
}

function getEtherscanProvider() {  
  return ethers.getDefaultProvider(network, {
    etherscan: ETHERSCAN_ID,
  });
}

/**
 * Use this signer when making calls to the deployed Safe using the SDK
 * @param pk 
 * @returns signer object using the default RPC_URL
 */
function getSafeSigner(pk: string) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  return new ethers.Wallet(pk, provider);
}

/**
 * Use this signer when making calls to the deployed RBAC module
 * @param pk 
 * @returns signer object using an Etherscan provider
 */
function getEtherscanSigner(pk: string) {
  const provider = getEtherscanProvider();
  return new ethers.Wallet(pk, provider);
}

export function getProvider(etherscan?: boolean) {
  if(NEXT_PUBLIC_CELO_MAINNET === "true") {
    return getCeloProvider();
  } else {
    if(etherscan){
      return getEtherscanProvider();
    } else {
      return new ethers.providers.JsonRpcProvider(RPC_URL);
    }
  }
}

export async function getSigner(pk: string, etherscan?: boolean) {
  if(NEXT_PUBLIC_CELO_MAINNET === "true") {
    return await getCeloSigner(pk);
  } else {
    if(etherscan){
      return getEtherscanSigner(pk);
    } else {
      return getSafeSigner(pk);
    }
  }
}

async function getEthAdapter(pk?: string): Promise<EthersAdapter> {
  const provider = getProvider();
  let signer;
  if (pk) {
    signer = await getSigner(pk);
  }

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer ?? provider,
  });

  return ethAdapter;
}

export async function getSafeService(): Promise<SafeApiKit> {
  const ethAdapter = await getEthAdapter();
  const txServiceUrl = TRANSACTION_SERVICE_URL;
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
  return safeService;
}

export async function getSafe(pk?: string): Promise<Safe> {
  const ethAdapter = await getEthAdapter(pk);
  const safeSdk = await Safe.create({ ethAdapter, safeAddress: SAFE_ADDRESS });

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
