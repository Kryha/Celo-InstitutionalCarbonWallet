import { ExecuteUserTransactionBody } from "@/types";
import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { getSigner } from "../util/utils";
import { RBAC_MODULE_ADDRESS, SAFE_ADDRESS } from "@/constants";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as ExecuteUserTransactionBody;

  const signer = await getSigner(body.pk, true);
  const rbac = Rbac__factory.connect(RBAC_MODULE_ADDRESS, signer);
  const to = body.destination;
  const amount = ethers.utils.parseUnits(body.amount, "ether").toString();
  const tx = await rbac.executeTransfer(SAFE_ADDRESS, to, amount);

  await tx.wait();

  return new Response(JSON.stringify(tx.hash));
}
