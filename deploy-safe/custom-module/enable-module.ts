import { rbacModuleAddress_celo, RPC_URL_CELO } from "../util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "../util/safe-wrappers";
import { getSafeAddress } from "../util/update-config";
require("dotenv").config();

async function enableModule(moduleAddress: string) {
  // Set RPC URL here  (Goerli or Celo)
  const provider = getProvider(RPC_URL_CELO);

  const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_CELO!, provider);

  const ethAdapterOwner1 = getEthersAdapter(owner1Signer);

  const safeAddress = await getSafeAddress();

  const safeSdkOwner1 = await createSafe(ethAdapterOwner1, safeAddress);

  const currentListOfModules = await safeSdkOwner1.getModules();

  console.log("Current list of allowed modules: ", currentListOfModules);

  const safeTransaction = await safeSdkOwner1.createEnableModuleTx(moduleAddress);
  const txResponse = await safeSdkOwner1.executeTransaction(safeTransaction);
  await txResponse.transactionResponse?.wait();

  const updatedListOfModules = await safeSdkOwner1.getModules();

  console.log("Updated list of allowed modules: ", updatedListOfModules);
}

enableModule(rbacModuleAddress_celo);
