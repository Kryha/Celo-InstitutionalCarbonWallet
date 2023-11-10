# deploy-safe

This directory includes scripts for:
1. Deploying and funding a multisig safe
2. Proposing transactions to the deployed safe
3. Confirming pending transactions to deployed safe
4. Executing transfers from that safe

### Prerequisite

1. Make sure you have a .env file with funded accounts in the top level project directory. We recommend using the GOERLI testnet or any other network supported by Safe, which you can check here https://docs.safe.global/safe-core-api/available-services. 
2. Make sure that .env file is sourced (might need to run `source .env`) from the top level directory. 

### Deploying a safe

1. If you want to deploy to Georli (current default) make sure the RPC URL is for the Goerli testnet when setting the provider
2. If you want to deploy to Celo mainnet make sure the RPC URL is for the Celo mainnet when setting the provider
3. Run `npx ts-node deploy-safe/deploy-and-fund-safe.ts` from the top level dir

### Proposing transactions

1. Make sure the txServiceUrl and RPC URL point to the chain on which you deployed your safe (and are the same ones), this can be found in the `util/constants.ts` file. This should be checked for confirming and executing transactions also.
2. Run `npx ts-node deploy-safe/propose-transaction.ts`

### Confirming transactions
1. Run `npx ts-node deploy-safe/confirm-transaction.ts`

### Executing transactions
1. Run `npx ts-node deploy-safe/execute-transaction.ts`

### Enabling a module
1. If you want to use the custom module found in [contracts/](../contracts/) deploy it on the same network where you deployed your safe. You can use Remix to do this.
2. To enable a module simply run the `enable-module` script found in [custom-module/enable-module](custom-module/enable-module.ts).
