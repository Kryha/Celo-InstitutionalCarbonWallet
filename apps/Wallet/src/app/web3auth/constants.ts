// GOERLI

import { CHAIN_NAMESPACES } from "@web3auth/base";

export const chainId = "0x5"
export const RPC_URL_GOERLI = "https://rpc.ankr.com/eth_goerli"; // check this url and that it matches the one in deploy safe
export const displayName_GOERLI = "Goerli Testnet"
export const blockExplorer_GOERLI = "https://goerli.etherscan.io"
export const ticker_GOERLI = "ETH"
export const tickerName_GOERLI = "Ethereum"

export const chainConfig_GOERLI = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId,
    rpcTarget: RPC_URL_GOERLI,
    displayName: displayName_GOERLI,
    blockExplorer: blockExplorer_GOERLI,
    ticker: ticker_GOERLI,
    tickerName: tickerName_GOERLI
}

export const adapterSettings = {
    whiteLabel: {
    appName: "Institutional Carbon Credits Wallet",
    logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
    logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
    mode: "dark", // whether to enable dark mode. defaultValue: false
  },
}