import { GOERLI_FUND_GAS_AMOUNT } from "@/features/safe-ownership/constants";
import { FundUserTransactionBody } from "@/types/safe-transaction";
import { createTransaction } from "../util/utils";
import { OWNER_1_PRIVATE_KEY_GOERLI_CELO } from "@/constants";

export async function POST(req: Request, res: Response): Promise<Response> {
  let body = (await req.json()) as FundUserTransactionBody;
  const pk = OWNER_1_PRIVATE_KEY_GOERLI_CELO;
  const destination = body.destination;
  const sendBody = {
    destination,
    pk,
    amount: GOERLI_FUND_GAS_AMOUNT,
  };
  const txReceipt = await createTransaction(sendBody);

  return new Response(JSON.stringify(txReceipt));
}
