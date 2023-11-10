let SAFE_ADDRESS: string;
let TRANSACTION_SERVICE_URL: string;
let RBAC_MODULE_ADDRESS: string;
let RPC_URL: string;
let OWNER_1_PRIVATE_KEY: string;

if (process.env.NEXT_PUBLIC_CELO_MAINNET === "true") {
  SAFE_ADDRESS = process.env.SAFE_ADDRESS_CELO || "";
  TRANSACTION_SERVICE_URL = process.env.TRANSACTION_SERVICE_URL_CELO || "https://safe-transaction-celo.safe.global/";
  RBAC_MODULE_ADDRESS = process.env.RBAC_MODULE_ADDRESS_CELO || "0x9f942a6a0bd923e9382739dEf661F068d93F6457";
  RPC_URL = process.env.RPC_URL_CELO || "https://forno.celo.org";
  OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY_CELO || "";
} else {
  SAFE_ADDRESS = process.env.SAFE_ADDRESS_GOERLI || "";
  TRANSACTION_SERVICE_URL = process.env.TRANSACTION_SERVICE_URL_GOERLI || "https://safe-transaction-goerli.safe.global";
  RBAC_MODULE_ADDRESS = process.env.RBAC_MODULE_ADDRESS_GOERLI || "0xfc3c71d00d522f8a2537523b22f54405011257ff";
  RPC_URL = process.env.RPC_URL_GOERLI || "https://eth-goerli.public.blastapi.io";
  OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY_GOERLI || "";
}

export { SAFE_ADDRESS, TRANSACTION_SERVICE_URL, RBAC_MODULE_ADDRESS, RPC_URL, OWNER_1_PRIVATE_KEY };

export const NEXT_PUBLIC_CELO_MAINNET = process.env.NEXT_PUBLIC_CELO_MAINNET || ""
export const WEB3AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "" 
export const MONGODB_URI = process.env.MONGODB_URI || ""
export const ETHERSCAN_ID = process.env.ETHERSCAN_ID || ""
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Kryha";
