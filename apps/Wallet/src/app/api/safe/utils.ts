import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { SafeTransactionBody } from "@/types";

function getEthAdapter(pk?: string): EthersAdapter {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  let signer;
  if (pk) {
    signer = new ethers.Wallet(pk, provider);
  }

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer ?? provider,
  });

  return ethAdapter;
}

export async function getSafeService(): Promise<SafeApiKit> {
  const ethAdapter = getEthAdapter();
  const txServiceUrl = process.env.TRANSACTION_SERVICE_URL!;
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
  return safeService;
}

export async function createTransaction(body: SafeTransactionBody): Promise<ethers.ContractReceipt | undefined> {
  const { pk, amount, destination } = body;
  const ethAdapter = getEthAdapter(pk);
  const safeSdk = await Safe.create({ ethAdapter, safeAddress: process.env.SAFE_ADDRESS! });
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
