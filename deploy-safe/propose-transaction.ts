import SafeApiKit from "@safe-global/api-kit";
import { SafeSignature, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
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

  const listOfModules = await safeSdkOwner1.getModules();

  console.log("listOfModules", listOfModules);
  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();
  const ethAmount2 = ethers.utils.parseUnits("0.001", "ether").toString();
  const gasPrice = ethers.utils.parseUnits("0.002", "ether").toString();

  // safe transaction set allowance
  const safeTransactionData: SafeTransactionDataPartial = {
    to: "0xE936FA91524e416348D0120fE1cDd228B1413791",
    data: "0xbeaeb3880000000000000000000000003bf4cd5345a11e3a4157d558d814c411cd491cff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c3bc3a4a2f75c71c70000000000000000000000000000000000000000000000000000000000002b670000000000000000000000000000000000000000000000000000000000002b67", // figure out how to pass arg to this call data
    value: ethAmount,
    //gasPrice: gasPrice,
    //nonce: Number(saltNonce),
  };

  // safe transaction add delegate
  // const safeTransactionData: SafeTransactionDataPartial = {
  //   to: "0xE936FA91524e416348D0120fE1cDd228B1413791",
  //   data: "0xe71bdf410000000000000000000000003bf4cd5345a11e3a4157d558d814c411cd491cff", // figure out how to pass arg to this call data
  //   value: ethAmount,
  //   //gasPrice: gasPrice,
  //   //nonce: Number(saltNonce),
  // };

  // const safeTransactionData: SafeTransactionDataPartial = {
  //   to: txDestination,
  //   data: "0x",
  //   value: amount,
  // }; // send transaction

  // Create a Safe transaction with the provided parameters
  const safeTransaction = await safeSdkOwner1.createTransaction({ safeTransactionData });

  // Deterministic based on transaction parameters
  const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);

  // Sign transaction to verify that the transaction is coming from owner 1
  const senderSignature: SafeSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);

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
