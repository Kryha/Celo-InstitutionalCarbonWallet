import { IsUserTransactionBody } from "@/types";
import { ethers } from "ethers";
import rbac from "../../util/typechain/abis/rbac.json";
import { Rbac } from "../../util/typechain/types/config/abis";
import { getEtherscanSigner } from "../../util/utils";

export async function GET(req: Request, res: Response): Promise<Response> {
    const body = (await req.json()) as IsUserTransactionBody;
    const signer = getEtherscanSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!);
    const rbacModuleAddress = process.env.RBAC_MODULE_ADDRESS!;
    const moduleContract = new ethers.Contract(rbacModuleAddress, rbac, signer) as Rbac;
    const safe = process.env.SAFE_ADDRESS!;
    const isUser = await moduleContract.isDelegate(safe, body.userAddress)
    
    return new Response(JSON.stringify(isUser));
  }
