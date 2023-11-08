import { AddressTransactionBody } from "@/types";
import { Rbac__factory } from "../../../../../types/typechain/types/config/abis";
import { getCeloProvider } from "../../util/utils";
import { getEtherscanProvider } from "../../util/utils";
import { RBAC_MODULE_ADDRESS_CELO, SAFE_ADDRESS_CELO } from "@/constants";

export async function GET(req: Request, res: Response): Promise<Response> {
    const body = (await req.json()) as AddressTransactionBody;
    const provider = getCeloProvider();
    const rbac = Rbac__factory.connect(RBAC_MODULE_ADDRESS_CELO, provider);
    const isUser = await rbac.isDelegate(SAFE_ADDRESS_CELO, body.address)
    
    return new Response(JSON.stringify(isUser));
  }
