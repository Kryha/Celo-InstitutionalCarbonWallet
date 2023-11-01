import { UserManagementTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../../types/typechain/types/config/abis";
import { getSafe, getSigner } from "../../util/utils";
import { safeExists } from "../../util/safeExists";

export async function POST(req: Request, { params }: any): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  const body = (await req.json()) as UserManagementTransactionBody;

  const safeSdk = await getSafe(params.safeAddress, body.pk);
  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;

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

  return new Response(JSON.stringify(receipt));
}

async function getAddUserCallData(pk: string, rbacModuleAddress: string, delegateAddress: string) {
  const signer = getSigner(pk);
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const tx = await rbac.populateTransaction.addDelegate(delegateAddress);
  return tx.data;
}
