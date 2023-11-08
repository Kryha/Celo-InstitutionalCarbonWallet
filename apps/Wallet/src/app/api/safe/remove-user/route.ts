import { RBAC_MODULE_ADDRESS } from "@/constants";
import { UserManagementTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getSigner, getSafe } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as UserManagementTransactionBody;

  const safeSdk = await getSafe(body.pk);

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
  const signer = await getSigner(pk);
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const tx = await rbac.populateTransaction.removeDelegate(delegateAddress);
  return tx.data;
}
