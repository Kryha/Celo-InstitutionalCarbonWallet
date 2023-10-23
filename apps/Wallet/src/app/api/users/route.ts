import dbConnect from "@/lib/dbConnect";
import user, { Users } from "@/models/User";
import { User as IUser } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: Request, res: Response): Promise<Response> {
  await dbConnect();

  const body = (await req.json()) as IUser;
  const userResponse = await user.create<Users>(body);

  return new Response(JSON.stringify(userResponse));
}

export async function GET(req: NextRequest): Promise<Response> {
  await dbConnect();

  const role = req.nextUrl.searchParams.getAll("role");
  const users = await user.find<Users>({ role: { $in: role } });

  return new Response(JSON.stringify(users));
}
