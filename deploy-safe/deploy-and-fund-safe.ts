import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { RPC_URL_GOERLI, RPC_URL_ALFAJORES, txServiceUrl_GOERLI, txServiceUrl_ALFAJORES, etherscanUrl_GOERLI, safeAppUrl_GOERLI } from './constants'

async function main() {

// use my functions from here
const provider = new ethers.providers.JsonRpcProvider(RPC_URL_GOERLI)

// Initialize signers
const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY_GOERLI!, provider)
const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY_GOERLI!, provider)
const owner3Signer = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY_GOERLI!, provider)


const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer
})
// till here

const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

const safeAccountConfig: SafeAccountConfig = {
  owners: [
    await owner1Signer.getAddress(),
    await owner2Signer.getAddress(),
    await owner3Signer.getAddress()
  ],
  threshold: 2,
}

const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce: "124" })

const safeAddress = await safeSdkOwner1.getAddress()

console.log('Your Safe has been deployed:')

console.log(`${etherscanUrl_GOERLI}/${safeAddress}`)
console.log(`${safeAppUrl_GOERLI}:${safeAddress}`)

const safeAmount = ethers.utils.parseUnits('0.03', 'ether').toHexString() // fund safe

const transactionParameters = {
  to: safeAddress,
  value: safeAmount
}

const tx = await owner1Signer.sendTransaction(transactionParameters)

console.log('Fundraising.')
console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
// until here most probably

// Any address can be used. In this example you will use vitalik.eth
// const destination = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
// const amount = ethers.utils.parseUnits('0.005', 'ether').toString()

// const safeTransactionData: SafeTransactionDataPartial = {
//   to: destination,
//   data: '0x',
//   value: amount
// } // send transaction

// // Create a Safe transaction with the provided parameters
// const safeTransaction = await safeSdkOwner1.createTransaction({ safeTransactionData })

// // Deterministic based on transaction parameters
// const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction)

// // Sign transaction to verify that the transaction is coming from owner 1
// const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash)
// console.log("ss", senderSignature);

// const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_ALFAJORES, ethAdapter: ethAdapterOwner1 })

// const hash = await safeService.proposeTransaction({
//   safeAddress,
//   safeTransactionData: safeTransaction.data,
//   safeTxHash,
//   senderAddress: await owner1Signer.getAddress(),
//   senderSignature: senderSignature.data,
// })
// console.log("hash", hash);

// const pendingTransactions = await safeService.getPendingTransactions(safeAddress)
// console.log("pending transactions", pendingTransactions);
}

main();