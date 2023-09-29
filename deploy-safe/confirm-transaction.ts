import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { RPC_URL_ALFAJORES, txServiceUrl_ALFAJORES, safeAddress, RPC_URL_GOERLI, txServiceUrl_GOERLI } from './constants'
import { createSafe, getEthersAdapter, getProvider, getSigner } from './util'

async function main() {
    const provider = getProvider(RPC_URL_GOERLI)
    const owner2Signer = getSigner(process.env.OWNER_2_PRIVATE_KEY_GOERLI!, provider)
    const ethAdapterOwner2 = getEthersAdapter(owner2Signer);
    const safeSdkOwner2 = await createSafe(ethAdapterOwner2, safeAddress);
    
    const safeService = new SafeApiKit({ txServiceUrl: txServiceUrl_GOERLI, ethAdapter: ethAdapterOwner2 })
      
    const pendingTransactions = await safeService.getPendingTransactions(safeAddress)
    console.log("pending", pendingTransactions);
      
    const transaction = pendingTransactions.results[0]
    const safeTxHash = transaction.safeTxHash
  
    const signature = await safeSdkOwner2.signTransactionHash(safeTxHash)
    const response = await safeService.confirmTransaction(safeTxHash, signature.data)
    console.log("response", response);
  
    const signerAddress = await owner2Signer.getAddress()
    console.log('Added a new signature to transaction with safeTxGas:', safeTxHash)
    console.log('- Signer:', signerAddress)
    console.log('- Signer signature:', response.signature)
  }
  
  main();