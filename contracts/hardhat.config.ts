import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        // for the rbac contract
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: false,
          },
        },
      },
      {
        // for tests
        version: "0.8.19",
      },
    ],
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
