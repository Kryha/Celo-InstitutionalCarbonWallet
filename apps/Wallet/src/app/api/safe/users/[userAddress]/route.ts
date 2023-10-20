import { ethers } from "ethers";
import { NextRequest } from "next/server";
import { rbacModuleAddress } from "../../util/constants";
import rbac from "../../util/typechain/abis/rbac.json";
import { Rbac } from "../../util/typechain/types/config/abis";
import { getEtherscanSigner } from "../../util/utils";

export async function GET(req: NextRequest, { params }: any): Promise<Response> {
    const signer = getEtherscanSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!);
    const moduleContract = new ethers.Contract(rbacModuleAddress, rbac, signer) as Rbac;
    const safe = process.env.SAFE_ADDRESS!;
    const isUser = await moduleContract.isDelegate(safe, params.userAddress)
    
    return new Response(JSON.stringify(isUser));
  }
