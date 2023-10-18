import { ethers } from "ethers";
import fs from "fs";
import { allowanceModuleAddress } from "../util/constants";

const filePath = "./deploy-safe/util/abi.json";

function getProvider() {
  return new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
}

const provider = ethers.getDefaultProvider("goerli", {
  etherscan: "9QA7YFDY8APXCMB32IU6KUEA6F83HH6VPZ",
});

export async function readFromJson(): Promise<any> {
  const data = await fs.promises.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

async function main() {
  const abi = await readFromJson();

  const provider = ethers.getDefaultProvider("goerli", {
    etherscan: "9QA7YFDY8APXCMB32IU6KUEA6F83HH6VPZ",
  });

  const signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider);

  const moduleContract = new ethers.Contract(allowanceModuleAddress, abi, signer);

  //   const tx = await moduleContract.getDelegates("0x1f29deFa8a6472f65e1c86cD8E449cd37c521A41", 0, 100);

  //   console.log("tx", tx);

  //   const tx2 = await moduleContract.getTokenAllowance(
  //     "0x1f29deFa8a6472f65e1c86cD8E449cd37c521A41",
  //     "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //     "0x0000000000000000000000000000000000000000"
  //   );

  //   console.log("tx2", tx2);

  // const tx3 = await moduleContract.populateTransaction.addDelegate("0xBA6A9c4Efa9012e6f4D17361ba1febBb9f3E80D8");

  // console.log("tx3data", tx3);

  const tx3 = await moduleContract.addDelegate("0xBA6A9c4Efa9012e6f4D17361ba1febBb9f3E80D8");

  await tx3.wait();
  console.log("tx3data", tx3);

}

// console.log(etherscanUrlTx_GOERLI);

main();

// const API_KEY = process.env.API_KEY;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// // provider - Alchemy
// const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// // signer - you
// const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// // contract instance
// const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// async function main() {
//     const message = await helloWorldContract.message();
//     console.log("The message is: " + message);

//     console.log("Updating the message...");
//     const tx = await helloWorldContract.update("this is the new message");
//     await tx.wait();

//     const newMessage = await helloWorldContract.message();
//     console.log("The new message is: " + newMessage);
// }

// main();
