import { ethers } from "ethers";
import { Rbac__factory } from "../../../../types/typechain/types/config/abis";
import { pageSize, start } from "../util/constants";

export async function GET(req: Request, res: Response): Promise<Response> {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
    const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;
    const rbac = Rbac__factory.connect(rbacModuleAddress, provider);
    const safe = process.env.SAFE_ADDRESS!;
    const users = await rbac.getDelegates(safe, start, pageSize);

    return new Response(JSON.stringify(users));
  }
