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
  const token = "0x0000000000000000000000000000000000000000";
  const allowanceAmount = "1111111111111111111111";
  const resetTimeMin = "11111";
  const resetBaseMin = "11111";
  const tx = await moduleContract.populateTransaction.setAllowance(delegateAddress, token, allowanceAmount, resetTimeMin, resetBaseMin);
  //console.log("data", tx.data);
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
  // use ethers for data construction
  const safeTransactionData: SafeTransactionDataPartial = {
    to: destination,
    //data: "0xbeaeb388000000000000000000000000f39Fd6e51aad88F6F4ce6aB8827279cffFb92266000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c3bc3a4a2f75c71c70000000000000000000000000000000000000000000000000000000000002b670000000000000000000000000000000000000000000000000000000000002b67", // figure out how to pass arg to this call data
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
