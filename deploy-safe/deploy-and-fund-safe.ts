import { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import {
  etherscanUrlTx_GOERLI,
  etherscanUrl_GOERLI,
  explorerUrlAddressTx_CELO,
  explorerUrlAddress_CELO,
  fundSafeAmount,
  RPC_URL_CELO,
  RPC_URL_GOERLI,
  safeAmountUnitGoerli,
  safeAppUrl_CELO,
  safeAppUrl_GOERLI,
  safeThreshold
} from "./util/constants";
import { getEthersAdapter, getProvider, getSigner } from "./util/safe-wrappers";
import { generateSaltNonce, writeToJson } from "./util/update-config";
require("dotenv").config();

async function main() {
  // Set RPC URL here  (Goerli or Celo)
  const provider = getProvider(RPC_URL_GOERLI);

  const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);

  const ethAdapterOwner1 = getEthersAdapter(owner1Signer);

  const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });

  const safeAccountConfig: SafeAccountConfig = {
    owners: [await owner1Signer.getAddress()],
    threshold: safeThreshold,
  };

  const saltNonce = generateSaltNonce();

  const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce });

  const safeAddress = await safeSdkOwner1.getAddress();

  const safeAddressData = { safeAddress: safeAddress };

  await writeToJson(safeAddressData);

  if (provider.connection.url === RPC_URL_GOERLI) {
    console.log("Your Safe has been deployed to GOERLI:");

    console.log(`GOERLI: ${etherscanUrl_GOERLI}/${safeAddress}`);
    console.log(`GOERLI: ${safeAppUrl_GOERLI}:${safeAddress}`);
  } else if (provider.connection.url === RPC_URL_CELO) {
    console.log("Your Safe has been deployed to CELO:");

    console.log(`CELO: ${explorerUrlAddress_CELO}/${safeAddress}`);
    console.log(`CELO: ${safeAppUrl_CELO}:${safeAddress}`);
  } else {
    console.log("RPC url does not match goerli or celo: ", provider.connection.url);
  }

  const safeAmount = ethers.utils.parseUnits(fundSafeAmount, safeAmountUnitGoerli).toHexString();

  const transactionParameters = {
    to: safeAddress,
    value: safeAmount,
  };

  const tx = await owner1Signer.sendTransaction(transactionParameters);

  if (provider.connection.url === RPC_URL_GOERLI) {
    console.log("Fundraising GOERLI:");
    console.log(`Deposit Transaction GOERLI: ${etherscanUrlTx_GOERLI}/${tx.hash}`);
  } else if (provider.connection.url === RPC_URL_CELO) {
    console.log("Fundraising CELO:");
    console.log(`Deposit Transaction CELO: ${explorerUrlAddressTx_CELO}/${tx.hash}`);
  } else {
    console.log("RPC url does not match goerli or celo: ", provider.connection.url);
  }
}

main();
