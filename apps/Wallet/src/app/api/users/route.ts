import dbConnect from "@/lib/dbConnect";
import user, { User } from "@/models/User";
import { User as IUser } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: Request, res: Response): Promise<Response> {
  await dbConnect();

  const body = (await req.json()) as IUser;
  const userResponse = await user.create<User>(body);

  return new Response(JSON.stringify(userResponse));
}

export async function GET(req: NextRequest): Promise<Response> {
  await dbConnect();

  const role = req.nextUrl.searchParams.getAll("role");
  const users = await user.find<User>({ role: { $in: role } });

  return new Response(JSON.stringify(users));
}

export async function PUT(req: Request, res: Response): Promise<Response> {
  await dbConnect();

  const body = (await req.json()) as Partial<IUser>;
  const userResponse = await user.findOneAndUpdate<Users>({ publicKey: body.publicKey }, body);

  return new Response(JSON.stringify(userResponse));
}
