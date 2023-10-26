import { createTransaction } from "../util/utils";
import { SafeTransactionBody } from "@/types";

export async function POST(req: Request, res: Response): Promise<Response> {
  const body = (await req.json()) as SafeTransactionBody;
  const txReceipt = await createTransaction(body);

  return new Response(JSON.stringify(txReceipt));
}
