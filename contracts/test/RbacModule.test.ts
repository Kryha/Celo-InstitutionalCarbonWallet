import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { RbacModule } from "../typechain-types";

describe("RbacModule", function () {
  let rbacModule: RbacModule;
  let owner: HardhatEthersSigner;
  let delegate: HardhatEthersSigner;
  let ownerAddress: string;
  let delegateAddress: string;

  before(async function () {
    [owner, delegate] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();

    delegateAddress = await delegate.getAddress();

    rbacModule = await ethers.deployContract("RbacModule");
  });

  it("Add delegate", async function () {
    await rbacModule.addDelegate(delegateAddress);

    const isDelegate = await rbacModule.isDelegate(ownerAddress, delegateAddress);
    expect(isDelegate).to.be.true;
  });

  it("Remove delegate", async function () {
    await rbacModule.addDelegate(delegateAddress);

    await rbacModule.removeDelegate(delegateAddress);

    const isDelegate = await rbacModule.isDelegate(ownerAddress, delegateAddress);
    expect(isDelegate).to.be.false;
  });

  it("Delegate can call transfer", async function () {
    await rbacModule.connect(owner).addDelegate(delegateAddress);

    const mockDestination = "0x0000000000000000000000000000000000000000";

    const amount = ethers.parseEther("1.0");

    await expect(rbacModule.connect(delegate).executeTransfer(ownerAddress, mockDestination, amount)).to.be.revertedWithoutReason();
  });

  it("Delegate cannot make a transfer without being added as a delegate", async function () {
    const mockDestination = "0x0000000000000000000000000000000000000000";

    const amount = ethers.parseEther("1.0");

    await expect(rbacModule.executeTransfer(ownerAddress, mockDestination, amount)).to.be.revertedWith("msg.sender is not a delegate");
  });
});
