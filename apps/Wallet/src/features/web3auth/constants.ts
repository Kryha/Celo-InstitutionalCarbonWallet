// GOERLI

import { ChainNamespaceType, CHAIN_NAMESPACES } from "@web3auth/base";

const GOERLI_CHAIND_ID = "0x5"
const GOERLI_RPC_URL = "https://rpc.ankr.com/eth_goerli";
const GOERLI_DISPLAY_NAME = "Goerli Testnet"
const GOERLI_BLOCK_EXPLORER = "https://goerli.etherscan.io"
const GOERLI_TICKER = "ETH"
const GOERLI_TICKER_NAME = "Ethereum"

// CELO

const CELO_CHAIND_ID = "0xa4ec"
const CELO_RPC_URL = "https://forno.celo.org";
const CELO_DISPLAY_NAME = "CELO Mainnet"
const CELO_BLOCK_EXPLORER = "https://celoscan.io"
const CELO_TICKER = "CELO"
const CELO_TICKER_NAME = "CELO"

type ChainConfig = {
  chainNamespace: ChainNamespaceType;
  chainId: string;
  rpcTarget: string;
  displayName: string;
  blockExplorer: string;
  ticker: string;
  tickerName: string;
};

let CHAIN_CONFIG: ChainConfig;

const GOERLI_CHAIN_CONFIG = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: GOERLI_CHAIND_ID,
  rpcTarget: GOERLI_RPC_URL,
  displayName: GOERLI_DISPLAY_NAME,
  blockExplorer: GOERLI_BLOCK_EXPLORER,
  ticker: GOERLI_TICKER,
  tickerName: GOERLI_TICKER_NAME
}

const CELO_CHAIN_CONFIG = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: CELO_CHAIND_ID,
  rpcTarget: CELO_RPC_URL,
  displayName: CELO_DISPLAY_NAME,
  blockExplorer: CELO_BLOCK_EXPLORER,
  ticker: CELO_TICKER,
  tickerName: CELO_TICKER_NAME
}

if (process.env.NEXT_PUBLIC_CELO_MAINNET === "true") {
  CHAIN_CONFIG = CELO_CHAIN_CONFIG;
} else {
  CHAIN_CONFIG = GOERLI_CHAIN_CONFIG;
}

export { CHAIN_CONFIG };

export const ADAPTER_SETTINGS = {
    whiteLabel: {
    appName: "Institutional Carbon Credits Wallet",
    logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
    logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
    mode: "dark", // whether to enable dark mode. defaultValue: false
  },
}