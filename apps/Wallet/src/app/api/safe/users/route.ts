import { RBAC_MODULE_ADDRESS_CELO, SAFE_ADDRESS_CELO } from "@/constants";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { pageSize, start } from "../util/constants";
import { getCeloProvider } from "../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
    const provider = getCeloProvider();
    const rbac = Rbac__factory.connect(RBAC_MODULE_ADDRESS_CELO, provider);
    const users = await rbac.getDelegates(SAFE_ADDRESS_CELO, start, pageSize);

    return new Response(JSON.stringify(users));
  }
