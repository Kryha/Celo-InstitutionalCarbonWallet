import { safeExists } from "../../util/safeExists";
import { createTransaction } from "../../util/utils";
import { SafeAddressParams, SafeTransactionBody } from "@/types";

export async function POST(req: Request, { params }: SafeAddressParams): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  const body = (await req.json()) as SafeTransactionBody;
  const txReceipt = await createTransaction({ ...body, safeAddress: params.safeAddress });

  return new Response(JSON.stringify(txReceipt));
}
