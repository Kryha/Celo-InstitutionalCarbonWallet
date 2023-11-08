import { SAFE_ADDRESS_CELO } from "@/constants";
import { getSafeService } from "../../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
  const safeSdk = await getSafeService();

  const txs = await safeSdk.getModuleTransactions(SAFE_ADDRESS_CELO);

  const history = txs.results;

  return new Response(JSON.stringify(history));
}
