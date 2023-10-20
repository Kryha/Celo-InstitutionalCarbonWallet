import { ExecuteUserTransactionBody } from "@/types";
import { ethers } from "ethers";
import { getEtherscanSigner } from "../util/utils";
import { Rbac } from "../util/typechain/types/config/abis";
import rbac from "../util/typechain/abis/rbac.json";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as ExecuteUserTransactionBody;

  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;
  const signer = getEtherscanSigner(body.pk);
  const moduleContract = new ethers.Contract(rbacModuleAddress, rbac, signer) as Rbac;
  const safe = process.env.SAFE_ADDRESS!;
  const to = body.destination;
  const amount = body.amount;
  const tx = await moduleContract.executeTransfer(safe, to, amount);

  await tx.wait();

  return new Response(JSON.stringify(tx.hash));
}
