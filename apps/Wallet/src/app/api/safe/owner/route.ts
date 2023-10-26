import { AddressTransactionBody } from "@/types";
import { getSafe } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AddressTransactionBody;

  const safeSdk = await getSafe(process.env.OWNER_1_PRIVATE_KEY_GOERLI);

  let safeTransaction = await safeSdk.createAddOwnerTx({ ownerAddress: body.address });
  safeTransaction = await safeSdk.signTransaction(safeTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();
  console.log(receipt);
  return new Response(JSON.stringify(receipt));
}
