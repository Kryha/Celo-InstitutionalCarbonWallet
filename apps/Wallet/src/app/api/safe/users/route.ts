import { RBAC_MODULE_ADDRESS, SAFE_ADDRESS } from "@/constants";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { pageSize, start } from "../util/constants";
import { getProvider } from "../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
    const provider = getProvider(true);
    const rbac = Rbac__factory.connect(RBAC_MODULE_ADDRESS, provider);
    const users = await rbac.getDelegates(SAFE_ADDRESS, start, pageSize);

    return new Response(JSON.stringify(users));
  }
