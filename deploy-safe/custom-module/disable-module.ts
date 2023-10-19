import { rbacModuleAddress, RPC_URL_GOERLI } from "../util/constants";
import { createSafe, getEthersAdapter, getProvider, getSigner } from "../util/safe-wrappers";
import { getSafeAddress } from "../util/update-config";
require("dotenv").config();

async function enableModule(moduleAddress: string) {
  // Set RPC URL here  (Goerli or Alfajores)
  const provider = getProvider(RPC_URL_GOERLI);

  const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);

  const ethAdapterOwner1 = getEthersAdapter(owner1Signer);

  const safeAddress = await getSafeAddress();

  const safeSdkOwner1 = await createSafe(ethAdapterOwner1, safeAddress);

  const currentListOfModules = await safeSdkOwner1.getModules();

  console.log("Current list of allowed modules: ", currentListOfModules);

  const safeTransaction = await safeSdkOwner1.createDisableModuleTx(moduleAddress);
  const txResponse = await safeSdkOwner1.executeTransaction(safeTransaction);
  await txResponse.transactionResponse?.wait();

  const updatedListOfModules = await safeSdkOwner1.getModules();

  console.log("Updated list of allowed modules: ", updatedListOfModules);
}

enableModule(rbacModuleAddress);
