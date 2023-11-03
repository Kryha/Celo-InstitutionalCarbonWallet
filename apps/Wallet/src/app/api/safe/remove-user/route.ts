import { UserManagementTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getSafe, getSigner } from "../util/utils";
import { OWNER_1_PRIVATE_KEY_GOERLI, RBAC_MODULE_ADDRESS } from "@/constants";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as UserManagementTransactionBody;

  const safeSdk = await getSafe(OWNER_1_PRIVATE_KEY_GOERLI);

  const callData = await getRemoveUserCallData(body.pk, RBAC_MODULE_ADDRESS, body.address);

  if (!callData) {
    throw new Error("Could not generate call data");
  }

  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: RBAC_MODULE_ADDRESS,
    data: callData,
    value: ethAmount,
  };

  let removeDelegateTransaction = await safeSdk.createTransaction({ safeTransactionData });
  removeDelegateTransaction = await safeSdk.signTransaction(removeDelegateTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(removeDelegateTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  return new Response(JSON.stringify(receipt));
}

async function getRemoveUserCallData(pk: string, rbacModuleAddress: string, delegateAddress: string) {
  const signer = getSigner(pk);
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const tx = await rbac.populateTransaction.removeDelegate(delegateAddress);
  return tx.data;
}
