import { AddressTransactionBody } from "@/types";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getSafe, getEtherscanSigner } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AddressTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);
  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;

  const callData = await getRemoveUserCallData(rbacModuleAddress, body.address);

  if (!callData) {
    throw new Error("Could not generate call data");
  }

  const ethAmount = ethers.utils.parseUnits("0", "ether").toString();

  const safeTransactionData: SafeTransactionDataPartial = {
    to: rbacModuleAddress,
    data: callData,
    value: ethAmount,
  };

  let removeDelegateTransaction = await safeSdk.createTransaction({ safeTransactionData });
  removeDelegateTransaction = await safeSdk.signTransaction(removeDelegateTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(removeDelegateTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();

  return new Response(JSON.stringify(receipt));
}

async function getRemoveUserCallData(rbacModuleAddress: string, delegateAddress: string) {
  const signer = getEtherscanSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!);
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const tx = await rbac.populateTransaction.removeDelegate(delegateAddress);
  return tx.data;
}