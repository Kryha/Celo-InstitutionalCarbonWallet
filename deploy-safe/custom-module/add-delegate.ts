import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import fs from "fs";
import { RPC_URL_GOERLI, txServiceUrl_GOERLI } from "../util/constants";
import { getSafeAddress } from "../util/update-config";
require("dotenv").config();

export async function getABI(): Promise<any> {
  const filePath = "./deploy-safe/util/abi.json";
  const data = await fs.promises.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

function getEthAdapter(pk?: string): EthersAdapter {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL_GOERLI);

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

function getSigner() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL_GOERLI);
  return new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);
}

export async function getSafeService(): Promise<SafeApiKit> {
  const ethAdapter = getEthAdapter();
  const txServiceUrl = txServiceUrl_GOERLI;
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
  return safeService;
}

export async function getSafe(pk?: string): Promise<Safe> {
  const safeAddress = await getSafeAddress();
  const ethAdapter = getEthAdapter(pk);
  const safeSdk = await Safe.create({ ethAdapter, safeAddress });

  return safeSdk;
}

async function getCallData(allowanceModuleAddress: string, delegateAddress: string) {
  const signer = getSigner();
  const abi = await getABI();
  const moduleContract = new ethers.Contract(allowanceModuleAddress, abi, signer);
  const tx = await moduleContract.populateTransaction.addDelegate(delegateAddress);
  return tx.data;
}

async function main(delegateAddress: string) {
  const pk = process.env.OWNER_1_PRIVATE_KEY_GOERLI!;
  const destination = "0xE936FA91524e416348D0120fE1cDd228B1413791";
  const safeSdk = await getSafe(pk);
  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();

  const callData = await getCallData(destination, delegateAddress);

  if (!callData) {
    return;
  }

  const safeTransactionData: SafeTransactionDataPartial = {
    to: destination,
    data: callData,
    value: ethAmount,
  };

  let addDelegateTransaction = await safeSdk.createTransaction({ safeTransactionData });
  addDelegateTransaction = await safeSdk.signTransaction(addDelegateTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(addDelegateTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  console.log("receipt", receipt);
}

const delegateAddress = "0x54a126a62D6180780cC08A2aeF54952A26ECFCd4";

main(delegateAddress);
