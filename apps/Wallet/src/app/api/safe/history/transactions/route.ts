import { getSafeService } from "../../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
  const safeSdk = await getSafeService();

  const txs = await safeSdk.getModuleTransactions(process.env.SAFE_ADDRESS!);

  const history = txs.results;

    console.log("check", history[0]);

  return new Response(JSON.stringify(history));
}
