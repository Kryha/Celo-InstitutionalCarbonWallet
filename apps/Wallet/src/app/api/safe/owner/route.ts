import { AddOwnerTransactionBody } from "@/types";
import { getSafe } from "../utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AddOwnerTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);

  let safeTransaction = await safeSdk.createAddOwnerTx({ ownerAddress: body.ownerAddress });
  safeTransaction = await safeSdk.signTransaction(safeTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();
  console.log(receipt);
  return new Response(JSON.stringify(receipt));
}
