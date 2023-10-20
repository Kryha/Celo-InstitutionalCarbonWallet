import { getSafeService } from "../../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
  const safeSdk = await getSafeService();

  const txs = await safeSdk.getMultisigTransactions(process.env.SAFE_ADDRESS!);

  const history = txs.results;
  return new Response(JSON.stringify(history));
}
