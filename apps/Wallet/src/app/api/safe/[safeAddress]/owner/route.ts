import { SafeAddressParams, UserManagementTransactionBody } from "@/types";
import { getSafe } from "../../util/utils";
import { safeExists } from "../../util/safeExists";

export async function POST(req: Request, { params }: SafeAddressParams): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  const body = (await req.json()) as UserManagementTransactionBody;

  const safeSdk = await getSafe(params.safeAddress, body.pk);

  let safeTransaction = await safeSdk.createAddOwnerTx({ ownerAddress: body.address });
  safeTransaction = await safeSdk.signTransaction(safeTransaction);

  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);

  const receipt = await executeTxResponse.transactionResponse?.wait();
  console.log(receipt);
  return new Response(JSON.stringify(receipt));
}
