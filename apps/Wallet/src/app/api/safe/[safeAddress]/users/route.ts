import dbConnect from "@/lib/dbConnect";
import user, { User } from "@/models/User";
import { User as IUser, SafeAddressParams } from "@/types";
import { NextRequest } from "next/server";
import { safeExists } from "../../util/safeExists";

export async function POST(req: Request, { params }: SafeAddressParams): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  await dbConnect();

  const body = (await req.json()) as IUser;
  const userResponse = await user.create<User>({ ...body, safeAddress: params.safeAddress });

  return new Response(JSON.stringify(userResponse));
}

export async function GET(req: NextRequest, { params }: SafeAddressParams): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  await dbConnect();

  const role = req.nextUrl.searchParams.getAll("role");
  const users = await user.find<User>({ safeAddress: params.safeAddress, role: { $in: role } });

  return new Response(JSON.stringify(users));
}

export async function PUT(req: Request, { params }: SafeAddressParams): Promise<Response> {
  const exists = await safeExists(params.safeAddress);
  if (!exists) return Response.json({}, { status: 404, statusText: "Safe not found." });

  await dbConnect();

  const body = (await req.json()) as Partial<IUser>;
  const userResponse = await user.findOneAndUpdate<User>({ publicKey: body.publicKey }, body);

  return new Response(JSON.stringify(userResponse));
}
