import dbConnect from "@/lib/dbConnect";
import user, { User } from "@/models/User";

export async function GET(req: Request, { params }: any): Promise<Response> {
  await dbConnect();

  const usr = await user.findOne<User>({ publicKey: params.publicKey });

  return new Response(JSON.stringify(usr));
}
