import { getSafeService } from "./utils";
import { NextApiRequest } from "next";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<String, Boolean>({
  max: 500,
  updateAgeOnGet: true,
});

export async function safeExists(safeAddress: string): Promise<Boolean> {
  const cachedResult = cache.get(safeAddress);
  if (cachedResult) return cachedResult;

  try {
    const safeSdk = await getSafeService();
    await safeSdk.getSafeCreationInfo(safeAddress);
    cache.set(safeAddress, true);
    return true;
  } catch (error: any) {
    return false;
  }
}
