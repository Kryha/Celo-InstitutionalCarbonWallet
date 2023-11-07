/* eslint-disable import/no-default-export */
import hre, { ethers } from "hardhat";

import { ISafe__factory, RbacModule__factory } from "../../typechain-types";

import deploySafeProxy from "./deploy-safe-proxy";
import deploySingletons from "./deploy-singletons";
import execTransaction from "./exec-safe-transaction";

export default async function setup() {
  const [owner, alice, bob, deployer, relayer] = await hre.ethers.getSigners();
  const { provider } = hre.ethers;

  // deploy
  const { safeProxyFactoryAddress, safeMastercopyAddress, rbacModuleAddress } = await deploySingletons(deployer);

  const safeAddress = await deploySafeProxy(safeProxyFactoryAddress, safeMastercopyAddress, owner.address, deployer);
  const safe = ISafe__factory.connect(safeAddress, relayer);
  const rbacModule = RbacModule__factory.connect(rbacModuleAddress, relayer);

  const fundingAmount = ethers.parseEther("1000");

  // fund safe
  await deployer.sendTransaction({
    to: safeAddress,
    value: fundingAmount,
  });

  // enable rbac as module
  await execTransaction(safe, await safe.enableModule.populateTransaction(rbacModuleAddress), owner);

  return {
    // the deployed safe
    safe,
    // module
    rbacModule,
    // some signers
    owner,
    alice,
    bob,
    // provider
    provider,
  };
}
