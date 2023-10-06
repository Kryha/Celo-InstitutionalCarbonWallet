// GOERLI

import { CHAIN_NAMESPACES } from "@web3auth/base";

export const chainId = "0x5"
export const RPC_URL = "https://rpc.ankr.com/eth_goerli"; // check this url and that it matches the one in deploy safe
export const displayName = "Goerli Testnet"
export const blockExplorer = "https://goerli.etherscan.io"
export const ticker = "ETH"
export const tickerName = "Ethereum"
export const clientId = "BGh7VYnwzTP39lyDmA5YgMPT6T1ckFUfQx6mtPkYnslsLxHq4KhQBBTKaKbWaoX2UWE-jP4d2eUcVQ-F5lYmI9E";


export const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId,
    rpcTarget: RPC_URL,
    displayName,
    blockExplorer,
    ticker,
    tickerName
}

export const adapterSettings = {
    whiteLabel: {
    appName: "Institutional Carbon Credits Wallet",
    logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
    logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
    mode: "dark", // whether to enable dark mode. defaultValue: false
  },
}