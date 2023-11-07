import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import execSafeTransaction from "./test-helpers/exec-safe-transaction";
import setup from "./test-helpers/setup";

describe("RbacModule", function () {
  it("Add delegate", async function () {
    const { safe, rbacModule, owner, alice } = await loadFixture(setup);
    await execSafeTransaction(safe, await rbacModule.addDelegate.populateTransaction(alice.address), owner);

    const isDelegate = await rbacModule.isDelegate(safe.getAddress(), alice.getAddress());
    expect(isDelegate).to.be.true;
  });

  it("Remove delegate", async function () {
    const { safe, rbacModule, owner, alice } = await loadFixture(setup);
    await execSafeTransaction(safe, await rbacModule.addDelegate.populateTransaction(alice.address), owner);

    const isDelegate = await rbacModule.isDelegate(safe.getAddress(), alice.getAddress());
    expect(isDelegate).to.be.true;

    await execSafeTransaction(safe, await rbacModule.removeDelegate.populateTransaction(alice.address), owner);

    const isDelegateFalsy = await rbacModule.isDelegate(safe.getAddress(), alice.getAddress());
    expect(isDelegateFalsy).to.be.false;
  });

  it("Delegate can call transfer", async function () {
    const { safe, rbacModule, owner, alice, bob, provider } = await loadFixture(setup);
    await execSafeTransaction(safe, await rbacModule.addDelegate.populateTransaction(alice.address), owner);

    const isDelegate = await rbacModule.isDelegate(safe.getAddress(), alice.getAddress());
    expect(isDelegate).to.be.true;

    const initialSafeBalance = await provider.getBalance(safe);
    const initialBobBalance = await provider.getBalance(bob);
    const amount = ethers.parseEther("500");

    await rbacModule.connect(alice).executeTransfer(safe.getAddress(), bob.getAddress(), amount);

    const finalSafeBalance = await provider.getBalance(safe);
    const finalBobBalance = await provider.getBalance(bob);

    expect(finalSafeBalance.toString()).to.equal((initialSafeBalance - amount).toString());
    expect(finalBobBalance.toString()).to.equal((initialBobBalance + amount).toString());
  });

  it("Delegate cannot make a transfer without being added as a delegate", async function () {
    const { safe, rbacModule, alice, bob } = await loadFixture(setup);

    const amount = ethers.parseEther("1.0");

    await expect(rbacModule.connect(alice).executeTransfer(safe.getAddress(), bob.getAddress(), amount)).to.be.revertedWith(
      "msg.sender is not a delegate"
    );
  });
});
