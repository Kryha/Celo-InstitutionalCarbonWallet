import { UserManagementTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getCeloSigner, getSafe } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as UserManagementTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_CELO);
  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS_CELO!;

  const callData = await getAddUserCallData(body.pk, rbacModuleAddress, body.address);

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
  console.log("receipt", receipt);
  
  return new Response(JSON.stringify(receipt));
}

async function getAddUserCallData(pk: string, rbacModuleAddress: string, delegateAddress: string) {
  const signer = await getCeloSigner(pk);
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const tx = await rbac.populateTransaction.addDelegate(delegateAddress);
  return tx.data;
}