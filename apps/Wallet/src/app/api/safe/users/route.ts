import { ethers } from "ethers";
import { start, pageSize } from "../util/constants";
import { getEtherscanSigner } from "../util/utils";
import { Rbac } from "../util/typechain/types/config/abis";
import rbac from "../util/typechain/abis/rbac.json";

export async function GET(req: Request, res: Response): Promise<Response> {
    const signer = getEtherscanSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!);
    const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;
    const moduleContract = new ethers.Contract(rbacModuleAddress, rbac, signer) as Rbac;
    const safe = process.env.SAFE_ADDRESS!;
    const users = await moduleContract.getDelegates(safe, start, pageSize);
    
    return new Response(JSON.stringify(users));
  }
