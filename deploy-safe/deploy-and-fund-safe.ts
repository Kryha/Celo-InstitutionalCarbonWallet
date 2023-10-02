import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { RPC_URL_GOERLI, RPC_URL_ALFAJORES, txServiceUrl_GOERLI, txServiceUrl_ALFAJORES, etherscanUrl_GOERLI, safeAppUrl_GOERLI, fundSafeAmount, safeAmountUnitGoerli, safeThreshold } from './util/constants'
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

console.log('Your Safe has been deployed:')

console.log(`${etherscanUrl_GOERLI}/${safeAddress}`)
console.log(`${safeAppUrl_GOERLI}:${safeAddress}`)

const safeAmount = ethers.utils.parseUnits(fundSafeAmount, safeAmountUnitGoerli).toHexString()

const transactionParameters = {
  to: safeAddress,
  value: safeAmount
}

const tx = await owner1Signer.sendTransaction(transactionParameters)

console.log('Fundraising.')
console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
}

main();