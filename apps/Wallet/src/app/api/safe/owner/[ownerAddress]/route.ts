import { NextRequest } from "next/server";
import { getSafe } from "../../util/utils";

export async function GET(req: NextRequest, { params }: any): Promise<Response> {
  const safeSdk = await getSafe();

  const isOwner = await safeSdk.isOwner(params.ownerAddress);
  return new Response(JSON.stringify(isOwner));
}
