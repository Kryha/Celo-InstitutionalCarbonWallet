import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { pageSize, start } from "../util/constants";
import { getCeloProvider } from "../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
    const provider = getCeloProvider();
    const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS_CELO!;
    const rbac = Rbac__factory.connect(rbacModuleAddress, provider);
    const safe = process.env.SAFE_ADDRESS_CELO!;
    const users = await rbac.getDelegates(safe, start, pageSize);

    return new Response(JSON.stringify(users));
  }
