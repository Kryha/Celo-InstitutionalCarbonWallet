import { getSafeService } from "./utils";
import { NextApiRequest } from "next";

export type NextApiRequestWithSafe = NextApiRequest & { safeAddress: string };

export async function safeExists(safeAddress: string): Promise<Boolean> {
  try {
    const safeSdk = await getSafeService();
    await safeSdk.getSafeCreationInfo(safeAddress);
    return true;
  } catch (error: any) {
    return false;
  }
}
