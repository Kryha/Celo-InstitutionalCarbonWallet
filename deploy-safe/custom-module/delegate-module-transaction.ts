import SafeApiKit from "@safe-global/api-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import fs from "fs";
import { RPC_URL_GOERLI, txServiceUrl_GOERLI } from "../util/constants";
import { getSafeAddress } from "../util/update-config";
require("dotenv").config();

export async function getABI(): Promise<any> {
  const filePath = "./deploy-safe/util/abi.json";
  const data = await fs.promises.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

function getSigner() {
  const provider = ethers.getDefaultProvider("goerli", {
    etherscan: "9QA7YFDY8APXCMB32IU6KUEA6F83HH6VPZ",
  });
  // const provider = new ethers.providers.JsonRpcProvider(RPC_URL_GOERLI);
  return new ethers.Wallet(process.env.delegatePk!, provider);
}

async function executeAllowanceTransfer(allowanceModuleAddress: string, delegateAddress: string) {
  const signer = getSigner();
  const abi = await getABI();
  const moduleContract = new ethers.Contract(allowanceModuleAddress, abi, signer);
  const safe = "0x1f29deFa8a6472f65e1c86cD8E449cd37c521A41";
  const token = "0x0000000000000000000000000000000000000000";
  const to = "0xfBC93d17E251b35C7eB3D220F368A7aC9521fb37";
  const amount = "4411111111311111";
  const paymentToken = "0x0000000000000000000000000000000000000000";
  const payment = "0";
  const delegate = delegateAddress;
  const signature = "0x";
  const tx = await moduleContract.executeAllowanceTransfer(safe, token, to, amount, paymentToken, payment, delegate, signature);

  await tx.wait();
  return tx;
}

async function main(delegateAddress: string) {
  const destination = "0xE936FA91524e416348D0120fE1cDd228B1413791";

  const tx = await executeAllowanceTransfer(destination, delegateAddress);
  console.log("tx", tx);
}

const delegateAddress = "0x54a126a62D6180780cC08A2aeF54952A26ECFCd4";

main(delegateAddress);
