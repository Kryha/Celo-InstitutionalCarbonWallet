import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

const config: HardhatUserConfig = {
  solidity: "0.7.6",
};

// eslint-disable-next-line import/no-default-export
export default config;
