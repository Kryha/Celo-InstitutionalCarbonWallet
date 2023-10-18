import { SetAllowanceTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { allowanceAmount, allowanceModuleAddress, resetBaseMin, resetTimeMin, token } from "../util/constants";
import { getModuleABI, getSafe, getSigner } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as SetAllowanceTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);

  const callData = await getSetAllowanceCallData(allowanceModuleAddress, body.userAddress);

  if (!callData) {
    throw new Error("Could not generate call data");
  }

  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: allowanceModuleAddress,
    data: callData,
    value: ethAmount,
  };

  let setAllowanceTransaction = await safeSdk.createTransaction({ safeTransactionData });
  setAllowanceTransaction = await safeSdk.signTransaction(setAllowanceTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(setAllowanceTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  return new Response(JSON.stringify(receipt));
}

async function getSetAllowanceCallData(allowanceModuleAddress: string, delegateAddress: string) {
    const signer = getSigner();
    const abi = await getModuleABI();
    const moduleContract = new ethers.Contract(allowanceModuleAddress, abi, signer);
    const tx = await moduleContract.populateTransaction.setAllowance(delegateAddress, token, allowanceAmount, resetTimeMin, resetBaseMin);
    return tx.data;
}