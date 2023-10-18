import { SafeTransactionBody } from "@/types/safe-transaction";
import { createTransaction } from "../util/utils";


export async function POST(req: Request, res: Response): Promise<Response> {
  const body = (await req.json()) as SafeTransactionBody;
  const txReceipt = await createTransaction(body);

  return new Response(JSON.stringify(txReceipt));
}
