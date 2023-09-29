import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { RPC_URL_ALFAJORES, txServiceUrl_ALFAJORES, safeAddress } from './constants'

async function main() {
  console.log("START");
    
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL_ALFAJORES)
    
  // Initialize signers
  const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY_ALFAJORES!, provider)
  const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY_ALFAJORES!, provider)
  const owner3Signer = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY_ALFAJORES!, provider)
    
  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
  })
    
  const ethAdapterOwner2 = new EthersAdapter({
      ethers,
      signerOrProvider: owner2Signer
    })

  const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_ALFAJORES, ethAdapter: ethAdapterOwner2 })
  console.log("service", safeService);
    
  const pendingTransactions = await safeService.getPendingTransactions("0xaDb8c57063F8E9B9a5fCD03B32d1c77CCFE9dF48")
  console.log("pending", pendingTransactions);
    
  const transaction = pendingTransactions.results[0]
  const safeTxHash = transaction.safeTxHash

  const safeSdkOwner2 = await Safe.create({
    ethAdapter: ethAdapterOwner2,
    safeAddress: "0xaDb8c57063F8E9B9a5fCD03B32d1c77CCFE9dF48"
  })

  const safeSdkOwner1 = await Safe.create({
    ethAdapter: ethAdapterOwner1,
    safeAddress: "0xaDb8c57063F8E9B9a5fCD03B32d1c77CCFE9dF48"
  })

const signature = await safeSdkOwner2.signTransactionHash(safeTxHash)
const response = await safeService.confirmTransaction(safeTxHash, signature.data)
console.log("response", response);

const safeTransaction = await safeService.getTransaction(safeTxHash)
console.log("safetx", safeTransaction);
const isTxExecutable = await safeSdkOwner1.isValidTransaction(safeTransaction)
console.log("is", isTxExecutable);

const funds = await safeSdkOwner1.getBalance();
console.log("funds", funds);

const executeTxResponse = await safeSdkOwner1.executeTransaction(safeTransaction)
console.log("ex", executeTxResponse);

const receipt = await executeTxResponse.transactionResponse?.wait() 
console.log("rec", receipt);


if (receipt) {
    
    console.log('Transaction executed:')
    console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`)
    
    const afterBalance = await safeSdkOwner1.getBalance()
    
    console.log(`The final balance of the Safe: ${ethers.utils.formatUnits(afterBalance, 'ether')} ETH`)
    
} else {
    console.log("fail");
    
}

}

main();