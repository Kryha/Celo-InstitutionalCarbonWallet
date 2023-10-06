import SafeApiKit from "@safe-global/api-kit";
import { RPC_URL_GOERLI, txServiceUrl_GOERLI } from "./util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "./util/safe-wrappers";
import { getSafeAddress } from "./util/update-config";
require("dotenv").config();

async function main() {
  const provider = getProvider(RPC_URL_GOERLI);
  const owner2Signer = getSigner(process.env.OWNER_2_PRIVATE_KEY_GOERLI!, provider);
  const ethAdapterOwner2 = getEthersAdapter(owner2Signer);
  const safeAddress = await getSafeAddress();
  const safeSdkOwner2 = await createSafe(ethAdapterOwner2, safeAddress);

  const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_GOERLI, ethAdapter: ethAdapterOwner2 });

  const pendingTransactions = await safeService.getPendingTransactions(safeAddress);

  const transaction = pendingTransactions.results[0];
  const safeTxHash = transaction.safeTxHash;

  const signature = await safeSdkOwner2.signTransactionHash(safeTxHash);
  const response = await safeService.confirmTransaction(safeTxHash, signature.data);

  const signerAddress = await owner2Signer.getAddress();
  console.log("Added a new signature to transaction with safeTxGas:", safeTxHash);
  console.log("Signer: ", signerAddress);
  console.log("Signer signature: ", response.signature);
}

main();
