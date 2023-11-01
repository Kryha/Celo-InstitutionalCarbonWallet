import { DeploySafeTransactionBody } from "@/types";
import { getEthAdapter } from "./util/utils";
import Safe, { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";
import dbConnect from "@/lib/dbConnect";
import safe from "@/models/Safe";

export async function POST(req: Request): Promise<Response> {
  try {
    await dbConnect();

    const body = (await req.json()) as DeploySafeTransactionBody;

    const ethAdapter = getEthAdapter(body.pk);
    const signerAddress = await ethAdapter.getSignerAddress();

    const safeFactory = await SafeFactory.create({ ethAdapter });
    const safeAccountConfig: SafeAccountConfig = {
      owners: [signerAddress!],
      threshold: 1,
    };

    const saltNonce = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce });
    let enableModuleTx = await safeSdkOwner1.createEnableModuleTx(process.env.RBAC_MODULE_ADDRESS!);
    enableModuleTx = await safeSdkOwner1.signTransaction(enableModuleTx);

    const transaction = (await safeSdkOwner1.executeTransaction(enableModuleTx)).transactionResponse;

    const storedSafe = await safe.create<Safe>({
      name: body.name,
      owner: body.address,
      address: await safeSdkOwner1.getAddress(),
      creation: transaction?.timestamp || Date.now(),
    });

    return new Response(JSON.stringify(storedSafe));
  } catch (error: any) {
    return Response.json({}, { status: 500, statusText: "Something went wrong whilst creating a wallet." });
  }
}
