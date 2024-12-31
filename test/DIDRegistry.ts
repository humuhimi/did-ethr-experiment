import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers.js";
import { expect } from "chai";
import hre from "hardhat";

describe("DIDRegistry", function () {
  async function deployDIDRegistryFixture() {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();
    const DIDRegistry = await hre.ethers.deployContract("DIDRegistry");
    await DIDRegistry.waitForDeployment();

    return { DIDRegistry, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should deploy the contract", async function () {
      const { DIDRegistry } = await loadFixture(deployDIDRegistryFixture);
      expect(DIDRegistry.target).to.be.properAddress;
    });
  });

  describe("registerDID", function () {
    it("Should register a DID for the sender", async function () {
      const { DIDRegistry, owner } = await loadFixture(deployDIDRegistryFixture);
      const did = "example-did";

      await DIDRegistry.registerDID(did);
      const registeredDID = await DIDRegistry.getDID(owner.address);

      expect(registeredDID).to.equal(did);
    });

    it("Should emit DIDRegistered event", async function () {
      const { DIDRegistry, owner } = await loadFixture(deployDIDRegistryFixture);
      const did = "example-did";

      await expect(DIDRegistry.registerDID(did))
        .to.emit(DIDRegistry, "DIDRegistered")
        .withArgs(owner.address, did);
    });

    // NOTE: 機能としてないためコメントアウト
    // it("Should revert if DID is already registered", async function () {
    //   const { DIDRegistry, owner } = await loadFixture(deployDIDRegistryFixture);
    //   const did = "example-did";

    //   await DIDRegistry.registerDID(did);

    //   await expect(DIDRegistry.registerDID(did))
    //     .to.be.revertedWith("DID already registered");
    // });
  });

  describe("getDID", function () {
    it("Should return the correct DID for an address", async function () {
      const { DIDRegistry, owner } = await loadFixture(deployDIDRegistryFixture);
      const did = "example-did";

      await DIDRegistry.registerDID(did);
      const registeredDID = await DIDRegistry.getDID(owner.address);

      expect(registeredDID).to.equal(did);
    });

    it("Should return an empty string for an address without a DID", async function () {
      const { DIDRegistry, addr1 } = await loadFixture(deployDIDRegistryFixture);
      const registeredDID = await DIDRegistry.getDID(addr1.address);

      expect(registeredDID).to.equal("");
    });
  });
});