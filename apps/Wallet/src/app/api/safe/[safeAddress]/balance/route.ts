import { safeExists } from "@/app/api/safe/util/safeExists";
import { getSafe } from "../../util/utils";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, { params }: any, res: Response): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  const safeSdk = await getSafe(params.safeAddress);

  const safeBalance = (await safeSdk.getBalance()).toString(); // using string to circumvent possible number range errors

  return new Response(JSON.stringify(safeBalance));
}
