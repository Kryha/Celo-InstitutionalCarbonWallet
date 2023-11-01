import { GOERLI_FUND_GAS_AMOUNT } from "@/features/safe-ownership/constants";
import { FundUserTransactionBody } from "@/types/safe-transaction";
import { createTransaction } from "../../util/utils";
import { SafeAddressParams } from "@/types";
import { safeExists } from "../../util/safeExists";

export async function POST(req: Request, { params }: SafeAddressParams): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  let body = (await req.json()) as FundUserTransactionBody;
  const pk = process.env.OWNER_1_PRIVATE_KEY_GOERLI!;
  const destination = body.destination;
  const sendBody = {
    destination,
    pk,
    amount: GOERLI_FUND_GAS_AMOUNT,
  };
  const txReceipt = await createTransaction(params.safeAddress, sendBody);

  return new Response(JSON.stringify(txReceipt));
}
