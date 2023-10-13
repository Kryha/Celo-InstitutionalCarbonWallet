import { SafeTransactionData, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { RPC_URL_GOERLI } from "../util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "../util/safe-wrappers";
import { generateSaltNonce, getSafeAddress } from "../util/update-config";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
require("dotenv").config();

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

export async function getSafe(pk?: string): Promise<Safe> {
  const ethAdapter = getEthAdapter(pk);
  const safeSdk = await Safe.create({ ethAdapter, safeAddress: process.env.SAFE_ADDRESS! });

  return safeSdk;
}

async function main() {
  // Set RPC URL here  (Goerli or Alfajores)
  const provider = getProvider(RPC_URL_GOERLI);

  const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);

  const ethAdapterOwner1 = getEthersAdapter(owner1Signer);

  const safeAddress = await getSafeAddress();

  const safeSdkOwner1 = await createSafe(ethAdapterOwner1, safeAddress);

  const listOfModules = await safeSdkOwner1.getModules();

  console.log("listOfModules", listOfModules);
  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();
  const ethAmount2 = ethers.utils.parseUnits("0.001", "ether").toString();
  const gasPrice = ethers.utils.parseUnits("0.002", "ether").toString();
  const saltNonce = generateSaltNonce();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: "0xE936FA91524e416348D0120fE1cDd228B1413791",
    data: "0xe71bdf410000000000000000000000003bf4cd5345a11e3a4157d558d814c411cd491cff", // figure out how to pass arg to this call data
    value: ethAmount,
    gasPrice: gasPrice,
    //nonce: Number(saltNonce),
  };

  const safeTransactionData2: SafeTransactionDataPartial = {
    to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    data: "0x", // figure out how to pass arg to this call data
    value: ethAmount2,
    gasPrice: gasPrice,
    //nonce: Number(saltNonce),
  };

  let addDelegateTransaction = await safeSdkOwner1.createTransaction({ safeTransactionData: safeTransactionData2 });
  addDelegateTransaction = await safeSdkOwner1.signTransaction(addDelegateTransaction);

  const executeTxResponse = await safeSdkOwner1.executeTransaction(addDelegateTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  console.log("receipt", receipt);

  //   const safeTransaction = await safeSdkOwner1.createEnableModuleTx("0xE936FA91524e416348D0120fE1cDd228B1413791");
  //   const txResponse = await safeSdkOwner1.executeTransaction(safeTransaction);
  //   const wait = await txResponse.transactionResponse?.wait();
  //   console.log("txResponse", txResponse);
  //   console.log("wait", wait);

  //   const listOfModules2 = await safeSdkOwner1.getModules();

  //   console.log("listOfModules2", listOfModules2);
}

main();
