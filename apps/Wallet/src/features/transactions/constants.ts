import { CHAIN_CONFIG } from "../web3auth";

export const NCT_TOKEN_PRICE = 0.0008;

export const EXCHANGE_TRANSFER_LIST = [
  {
    label: "Carbon Trade eXchange",
    network: CHAIN_CONFIG.tickerName,
    value: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    tokens: [
      {
        name: "NCT",
        price: NCT_TOKEN_PRICE,
        currency: CHAIN_CONFIG.ticker,
      },
    ],
  },
  {
    label: "AirCarbon Exchange",
    network: CHAIN_CONFIG.tickerName,
    value: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    tokens: [
      {
        name: "NCT",
        price: NCT_TOKEN_PRICE,
        currency: CHAIN_CONFIG.ticker,
      },
    ],
  },
  {
    label: "Xpansiv",
    network: CHAIN_CONFIG.tickerName,
    value: "0x3bF4CD5345a11E3a4157d558D814c411cd491CfF",
    tokens: [
      {
        name: "NCT",
        price: NCT_TOKEN_PRICE,
        currency: CHAIN_CONFIG.ticker,
      },
    ],
  },
];
