import { SafeMultisigTransactionResponse } from "@safe-global/safe-core-sdk-types";
import { getSafeService } from "../../../util/utils";
import { BigNumber } from "ethers";
import { safeExists } from "../../../util/safeExists";

export async function GET(req: Request, { params }: any, res: Response): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });
  const safeSdk = await getSafeService();

  const txs = await safeSdk.getMultisigTransactions(process.env.SAFE_ADDRESS!);

  const tokenBalance = txs.results.reduce((acc: BigNumber, tx: SafeMultisigTransactionResponse) => {
    return acc.add(BigNumber.from(tx.value));
  }, BigNumber.from(0));

  return new Response(JSON.stringify(tokenBalance.toString()));
}
