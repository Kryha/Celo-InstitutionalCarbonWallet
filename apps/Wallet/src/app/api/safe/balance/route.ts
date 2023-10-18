import { getSafe } from "../utils";

export async function GET(req: Request, res: Response): Promise<Response> {
  const safeSdk = await getSafe();

  const safeBalance = (await safeSdk.getBalance()).toString(); // using string to circumvent possible number range errors

  return new Response(JSON.stringify(safeBalance));
}
