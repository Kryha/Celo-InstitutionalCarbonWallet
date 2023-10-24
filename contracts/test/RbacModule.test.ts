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

    const RbacModuleFactory = await ethers.getContractFactory("RbacModule");
    rbacModule = await RbacModuleFactory.deploy();
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

  // it("Delegate can successfully make a transfer", async function () {
  //   // Add delegate
  //   await rbacModule.addDelegate(delegateAddress);

  //   // Create a mock GnosisSafe address
  //   const mockGnosisSafeAddress = ethers.constants.AddressZero;

  //   // Get the initial balance of the mock GnosisSafe
  //   const initialBalance = await ethers.provider.getBalance(mockGnosisSafeAddress);
  //   const amount = ethers.utils.parseEther("1.0");

  //   // Delegate makes a transfer
  //   await rbacModule.executeTransfer(mockGnosisSafeAddress, ownerAddress, amount);

  //   // Get the final balance of the mock GnosisSafe
  //   const finalBalance = await ethers.provider.getBalance(mockGnosisSafeAddress);

  //   // Check if the balance increased as expected
  //   expect(finalBalance).to.equal(initialBalance.add(amount));
  // });

  it("Delegate cannot make a transfer without being added as a delegate", async function () {
    // Create a mock GnosisSafe address
    const mockGnosisSafeAddress = ethers.constants.AddressZero;

    // Get the initial balance of the mock GnosisSafe
    const initialBalance = await ethers.provider.getBalance(mockGnosisSafeAddress);
    const amount = ethers.utils.parseEther("1.0");

    // Attempt to make a transfer without being added as a delegate
    expect(await rbacModule.executeTransfer(mockGnosisSafeAddress, ownerAddress, amount)).to.be.reverted("msg.sender is not a delegate");

    // Get the final balance of the mock GnosisSafe (it should remain the same)
    const finalBalance = await ethers.provider.getBalance(mockGnosisSafeAddress);

    // // Check if the balance remained the same
    expect(finalBalance).to.equal(initialBalance);
  });
});
