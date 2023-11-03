import { AddressTransactionBody } from "@/types";
import { Rbac__factory } from "../../../../../types/typechain/types/config/abis";
import { getEtherscanProvider } from "../../util/utils";
import { RBAC_MODULE_ADDRESS, SAFE_ADDRESS } from "@/constants";

export async function GET(req: Request, res: Response): Promise<Response> {
    const body = (await req.json()) as AddressTransactionBody;
    const provider = getEtherscanProvider();
    const rbac = Rbac__factory.connect(RBAC_MODULE_ADDRESS, provider);
    const isUser = await rbac.isDelegate(SAFE_ADDRESS, body.address);
    
    return new Response(JSON.stringify(isUser));
  }
