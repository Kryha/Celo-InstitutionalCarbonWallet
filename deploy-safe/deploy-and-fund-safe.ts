import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { RPC_URL_GOERLI, RPC_URL_ALFAJORES, txServiceUrl_GOERLI, txServiceUrl_ALFAJORES, etherscanUrl_GOERLI, safeAppUrl_GOERLI, fundSafeAmount, safeAmountUnitGoerli, safeThreshold, etherscanUrlTx_GOERLI, safeAppUrl_ALFAJORES, explorerUrlAddress_ALFAJORES, explorerUrlAddressTx_ALFAJORES } from './util/constants'
import { getEthersAdapter, getProvider, getSigner } from './util/safe-wrappers'
import { generateSaltNonce, writeToJson } from './util/update-config'

async function main() {

const provider = getProvider(RPC_URL_GOERLI)

const owner1Signer = getSigner(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider)
const owner2Signer = getSigner(process.env.OWNER_2_PRIVATE_KEY_GOERLI!, provider)
const owner3Signer = getSigner(process.env.OWNER_3_PRIVATE_KEY_GOERLI!, provider)

const ethAdapterOwner1 = getEthersAdapter(owner1Signer)

const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

const safeAccountConfig: SafeAccountConfig = {
  owners: [
    await owner1Signer.getAddress(),
    await owner2Signer.getAddress(),
    await owner3Signer.getAddress()
  ],
  threshold: safeThreshold,
}

const saltNonce = generateSaltNonce();

const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce })

const safeAddress = await safeSdkOwner1.getAddress()

const safeAddressData = { safeAddress: safeAddress };

await writeToJson(safeAddressData);

if (provider.connection.url === RPC_URL_GOERLI) {
  console.log('Your Safe has been deployed to GOERLI:')
  
  console.log(`GOERLI: ${etherscanUrl_GOERLI}/${safeAddress}`)
  console.log(`GOERLI: ${safeAppUrl_GOERLI}:${safeAddress}`)
} else if (provider.connection.url === RPC_URL_ALFAJORES) {
  console.log('Your Safe has been deployed to ALFAJORES:')
  
  console.log(`ALFAJORES: ${explorerUrlAddress_ALFAJORES}/${safeAddress}`)
  console.log(`ALFAJORES: ${safeAppUrl_ALFAJORES}:${safeAddress}`)
} else {
  console.log("RPC url does not match goerli or alfajores: ", provider.connection.url);
}


const safeAmount = ethers.utils.parseUnits(fundSafeAmount, safeAmountUnitGoerli).toHexString()

const transactionParameters = {
  to: safeAddress,
  value: safeAmount
}

const tx = await owner1Signer.sendTransaction(transactionParameters)

if (provider.connection.url === RPC_URL_GOERLI) {
  console.log('Fundraising GOERLI:')
  console.log(`Deposit Transaction GOERLI: ${etherscanUrlTx_GOERLI}/${tx.hash}`)
} else if (provider.connection.url === RPC_URL_ALFAJORES) {
  console.log('Fundraising ALFAJORES:')
  console.log(`Deposit Transaction ALFAJORES: ${explorerUrlAddressTx_ALFAJORES}/${tx.hash}`)
} else {
  console.log("RPC url does not match goerli or alfajores: ", provider.connection.url);
}

}

main();