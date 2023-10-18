import { ExecuteUserTransactionBody } from "@/types";
import { ethers } from "ethers";
import { allowanceModuleAddress, payment, paymentToken, signature, token } from "../util/constants";
import { getEtherscanSigner, getModuleABI } from "../util/utils";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as ExecuteUserTransactionBody;

  const signer = getEtherscanSigner(body.pk);
  const abi = await getModuleABI();
  const moduleContract = new ethers.Contract(allowanceModuleAddress, abi, signer);
  const safe = process.env.SAFE_ADDRESS!;
  const to = body.destination;
  const amount = body.amount;
  const delegate = body.userAddress;
  const tx = await moduleContract.executeAllowanceTransfer(safe, token, to, amount, paymentToken, payment, delegate, signature);

  await tx.wait();

  return new Response(JSON.stringify(tx.hash));
}
