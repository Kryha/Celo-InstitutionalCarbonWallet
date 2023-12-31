import SafeApiKit from "@safe-global/api-kit";
import { ethers } from "ethers";
import { RPC_URL_GOERLI, safeAmountUnitGoerli, txServiceUrl_GOERLI } from "./util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "./util/safe-wrappers";
import { getSafeAddress } from "./util/update-config";
require("dotenv").config();

async function main() {
  const provider = getProvider(RPC_URL_GOERLI);

  const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);

  const ethAdapterOwner1 = getEthersAdapter(owner1Signer);

  const safeAddress = await getSafeAddress();

  const safeSdkOwner1 = await createSafe(ethAdapterOwner1, safeAddress);

  const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_GOERLI, ethAdapter: ethAdapterOwner1 });

  const pendingTransactions = await safeService.getPendingTransactions(safeAddress);

  const transaction = pendingTransactions.results[0];
  const safeTxHash = transaction.safeTxHash;

  const safeTransaction = await safeService.getTransaction(safeTxHash);
  const isTxExecutable = await safeSdkOwner1.isValidTransaction(safeTransaction);

  console.log("Is the transaction executable: ", isTxExecutable);

  const executeTxResponse = await safeSdkOwner1.executeTransaction(safeTransaction);
  const receipt = await executeTxResponse.transactionResponse?.wait();

  if (receipt) {
    console.log("Transaction executed:");
    console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`);

    const afterBalance = await safeSdkOwner1.getBalance();

    console.log(`The final balance of the Safe: ${ethers.utils.formatUnits(afterBalance, safeAmountUnitGoerli)} ETH`);
  } else {
    console.log("The transaction could not be executed");
  }
}

main();
