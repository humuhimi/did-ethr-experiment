// @see https://github.com/uport-project/ethr-did-registry/blob/master/scripts/deploy.ts

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EthereumDIDRegistryModule = buildModule("EthereumDIDRegistryModule", (m) => {
  const ethereumDIDRegistry = m.contract("EthereumDIDRegistry");
  return { ethereumDIDRegistry };
});

export default EthereumDIDRegistryModule;