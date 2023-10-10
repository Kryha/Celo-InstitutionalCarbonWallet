import { getSafeService } from "../../utils";

export async function GET(req: Request, res: Response): Promise<Response> {
  const safeSdk = await getSafeService();

  const txs = safeSdk.getAllTransactions(process.env.SAFE_ADDRESS!);

  const history = (await txs).results;
  return new Response(JSON.stringify(history));
}
