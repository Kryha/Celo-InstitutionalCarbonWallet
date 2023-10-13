import SafeApiKit, { TokenInfoListResponse, TokenInfoResponse } from "@safe-global/api-kit";
import { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import {
  RPC_URL_ALFAJORES,
  RPC_URL_GOERLI,
  etherscanUrlTx_GOERLI,
  etherscanUrl_GOERLI,
  explorerUrlAddressTx_ALFAJORES,
  explorerUrlAddress_ALFAJORES,
  fundSafeAmount,
  safeAmountUnitGoerli,
  safeAppUrl_ALFAJORES,
  safeAppUrl_GOERLI,
  safeThreshold,
  txServiceUrl_GOERLI,
} from "../util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "../util/safe-wrappers";
import { generateSaltNonce, getSafeAddress, writeToJson } from "../util/update-config";
require("dotenv").config();

async function main() {
  // Set RPC URL here  (Goerli or Alfajores)
  const provider = getProvider(RPC_URL_GOERLI);

  const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);

  const ethAdapterOwner1 = getEthersAdapter(owner1Signer);

  const safeAddress = await getSafeAddress();

  const safeSdkOwner1 = await createSafe(ethAdapterOwner1, safeAddress);

  const listOfModules = await safeSdkOwner1.getModules();

  const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_GOERLI, ethAdapter: ethAdapterOwner1 });

  console.log("listOfModules", listOfModules);

  //   const safeTransaction = await safeSdkOwner1.createEnableModuleTx("0xE936FA91524e416348D0120fE1cDd228B1413791");
  //   const txResponse = await safeSdkOwner1.executeTransaction(safeTransaction);
  //   const wait = await txResponse.transactionResponse?.wait();
  //   console.log("txResponse", txResponse);
  //   console.log("wait", wait);

  //   const listOfModules2 = await safeSdkOwner1.getModules();

  //   console.log("listOfModules2", listOfModules2);

  const tokens: TokenInfoListResponse = await safeService.getTokenList();
  console.log("tokens", tokens);
  
}

main();
