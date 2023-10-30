import { SafeMultisigTransactionResponse } from "@safe-global/safe-core-sdk-types";
import { getSafeService } from "../../util/utils";
import { BigNumber } from "ethers";

export async function GET(req: Request, res: Response): Promise<Response> {
  const safeSdk = await getSafeService();

  const txs = await safeSdk.getMultisigTransactions(process.env.SAFE_ADDRESS_CELO!);

  const tokenBalance = txs.results.reduce((acc: BigNumber, tx: SafeMultisigTransactionResponse) => {
    return acc.add(BigNumber.from(tx.value));
  }, BigNumber.from(0));


  return new Response(JSON.stringify(tokenBalance.toString()));
}
