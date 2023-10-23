import { AddressTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getSafe, getSigner } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AddressTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);
  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;

  const callData = await getAddUserCallData(rbacModuleAddress, body.address);

  if (!callData) {
    throw new Error("Could not generate call data");
  }

  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: rbacModuleAddress,
    data: callData,
    value: ethAmount,
  };

  let addDelegateTransaction = await safeSdk.createTransaction({ safeTransactionData });
  addDelegateTransaction = await safeSdk.signTransaction(addDelegateTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(addDelegateTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  return new Response(JSON.stringify(receipt));
}

async function getAddUserCallData(rbacModuleAddress: string, delegateAddress: string) {
  const signer = getSigner();
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const tx = await rbac.populateTransaction.addDelegate(delegateAddress);
  return tx.data;
}