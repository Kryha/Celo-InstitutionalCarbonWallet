import { safeExists } from "../../../util/safeExists";
import { getSafeService } from "../../../util/utils";

export async function GET(req: Request, { params }: any): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  const safeSdk = await getSafeService();

  const txs = await safeSdk.getModuleTransactions(params.safeAddress);

  const history = txs.results;
  return new Response(JSON.stringify(history));
}
