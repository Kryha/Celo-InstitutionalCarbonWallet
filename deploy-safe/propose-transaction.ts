import SafeApiKit from "@safe-global/api-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { RPC_URL_GOERLI, safeAmountUnitGoerli, transferAmount, txDestination, txServiceUrl_GOERLI } from "./util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "./util/safe-wrappers";
import { getSafeAddress } from "./util/update-config";
require("dotenv").config();

async function main() {
  const provider = getProvider(RPC_URL_GOERLI);
  const signerOwner1 = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);
  const ethAdapterOwner1 = getEthersAdapter(signerOwner1);

  const safeAddress = await getSafeAddress();

  const safeSdkOwner1 = await createSafe(ethAdapterOwner1, safeAddress);

  const amount = ethers.utils.parseUnits(transferAmount, safeAmountUnitGoerli).toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: txDestination,
    data: "0x",
    value: amount,
  }; // send transaction

  // Create a Safe transaction with the provided parameters
  const safeTransaction = await safeSdkOwner1.createTransaction({ safeTransactionData });

  // Deterministic based on transaction parameters
  const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);

  // Sign transaction to verify that the transaction is coming from owner 1
  const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);

  const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_GOERLI, ethAdapter: ethAdapterOwner1 });

  await safeService.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: await signerOwner1.getAddress(),
    senderSignature: senderSignature.data,
  });

  const pendingTransactions = await safeService.getPendingTransactions(safeAddress);

  console.log("The number of pending transactions is: ", pendingTransactions.count);
  console.log("The txHash of the first pending transaction is: ", pendingTransactions.results[0].safeTxHash);
}

main();
