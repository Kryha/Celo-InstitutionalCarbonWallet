import { NextRequest } from "next/server";
import { getSafe } from "../../../util/utils";
import { safeExists } from "../../../util/safeExists";

export async function GET(req: NextRequest, { params }: any): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  const safeSdk = await getSafe(params.safeAddress);

  const isOwner = await safeSdk.isOwner(params.ownerAddress);
  return new Response(JSON.stringify(isOwner));
}
