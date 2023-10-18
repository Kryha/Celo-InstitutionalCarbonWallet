import { RemoveUserTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { allowanceModuleAddress } from "../util/constants";
import { getModuleABI, getSafe, getSigner } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as RemoveUserTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);

  const callData = await getRemoveUserCallData(allowanceModuleAddress, body.userAddress);

  if (!callData) {
    throw new Error("Could not generate call data");
  }

  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: allowanceModuleAddress,
    data: callData,
    value: ethAmount,
  };

  let removeDelegateTransaction = await safeSdk.createTransaction({ safeTransactionData });
  removeDelegateTransaction = await safeSdk.signTransaction(removeDelegateTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(removeDelegateTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  return new Response(JSON.stringify(receipt));
}

async function getRemoveUserCallData(allowanceModuleAddress: string, delegateAddress: string) {
  const signer = getSigner();
  const abi = await getModuleABI();
  const moduleContract = new ethers.Contract(allowanceModuleAddress, abi, signer);
  const tx = await moduleContract.populateTransaction.removeDelegate(delegateAddress, true);
  return tx.data;
}