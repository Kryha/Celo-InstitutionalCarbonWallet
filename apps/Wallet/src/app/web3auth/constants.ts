// GOERLI

import { CHAIN_NAMESPACES } from "@web3auth/base";

export const GOERLI_CHAIND_ID = "0x5"
export const GOERLI_RPC_URL = "https://rpc.ankr.com/eth_goerli"; // check this url and that it matches the one in deploy safe
export const GOERLI_DISPLAY_NAME = "Goerli Testnet"
export const GOERLI_BLOCK_EXPLORER = "https://goerli.etherscan.io"
export const GOERLI_TICKER = "ETH"
export const GOERLI_TICKER_NAME = "Ethereum"

export const GOERLI_CHAIN_CONFIG = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: GOERLI_CHAIND_ID,
    rpcTarget: GOERLI_RPC_URL,
    displayName: GOERLI_DISPLAY_NAME,
    blockExplorer: GOERLI_BLOCK_EXPLORER,
    ticker: GOERLI_TICKER,
    tickerName: GOERLI_TICKER_NAME
}

export const ADAPTER_SETTINGS = {
    whiteLabel: {
    appName: "Institutional Carbon Credits Wallet",
    logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
    logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
    mode: "dark", // whether to enable dark mode. defaultValue: false
  },
}