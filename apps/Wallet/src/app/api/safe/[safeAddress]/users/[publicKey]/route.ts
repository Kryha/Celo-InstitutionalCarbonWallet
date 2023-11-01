import dbConnect from "@/lib/dbConnect";
import user, { User } from "@/models/User";
import { safeExists } from "../../../util/safeExists";

export async function GET(req: Request, { params }: any): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  await dbConnect();

  const usr = await user.findOne<User>({ publicKey: params.publicKey, safeAddress: params.safeAddress });

  return new Response(JSON.stringify(usr));
}
