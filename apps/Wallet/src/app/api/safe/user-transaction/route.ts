import { ExecuteUserTransactionBody } from "@/types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getEtherscanSigner } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as ExecuteUserTransactionBody;

  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;
  const signer = getEtherscanSigner(body.pk);
  const rbac = Rbac__factory.connect(rbacModuleAddress, signer);
  const safe = process.env.SAFE_ADDRESS!;
  const to = body.destination;
  const amount = ethers.utils.parseUnits(body.amount, "ether").toString();
  const tx = await rbac.executeTransfer(safe, to, amount);

  await tx.wait();

  return new Response(JSON.stringify(tx.hash));
}
