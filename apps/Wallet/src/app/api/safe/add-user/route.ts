import { AddUserTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { rbacModuleAddress } from "../util/constants";
import { getSafe, getSigner } from "../util/utils";
import { Rbac } from "../util/typechain/types/config/abis";
import rbac from "../util/typechain/abis/rbac.json";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AddUserTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);

  const callData = await getAddUserCallData(rbacModuleAddress, body.userAddress);

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

async function getAddUserCallData(allowanceModuleAddress: string, delegateAddress: string) {
  const signer = getSigner();
  const moduleContract = new ethers.Contract(allowanceModuleAddress, rbac, signer) as Rbac;
  const tx = await moduleContract.populateTransaction.addDelegate(delegateAddress);
  return tx.data;
}