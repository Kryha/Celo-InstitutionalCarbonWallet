import { AddressTransactionBody } from "@/types";
import { Rbac__factory } from "../../../../../../types/typechain/types/config/abis";
import { getEtherscanProvider } from "../../../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
  const body = (await req.json()) as AddressTransactionBody;
  const provider = getEtherscanProvider();
  const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;
  const rbac = Rbac__factory.connect(rbacModuleAddress, provider);
  const safe = process.env.SAFE_ADDRESS!;
  const isUser = await rbac.isDelegate(safe, body.address);

  return new Response(JSON.stringify(isUser));
}
