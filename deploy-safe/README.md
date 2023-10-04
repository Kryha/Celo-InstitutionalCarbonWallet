# deploy-safe

This directory includes scripts for:
1. Deploying and funding a multisig safe
2. Proposing transactions to the deployed safe
3. Confirming pending transactions to deployed safe
4. Executing transfers from that safe

### Prerequisite

1. Make sure you have a .env file with funded accounts (check Slack) in the top level project directory 
2. Make sure that .env file is sourced (might need to run `source .env`) from the top level directory

### Deploying a safe

1. If you want to deploy to Georli (current default) make sure the RPC URL is for the Goerli testnet when setting the provider
2. If you want to deploy to Alfajores (Celo testnet) make sure the RPC URL is for the Alfajores testnet when setting the provider
3. Run `npx ts-node deploy-safe/deploy-and-fund-safe.ts` from the top level dir

### Proposing transactions

1. Make sure the txServiceUrl and RPC URL point to the chain on which you deployed your safe (and are the same ones), this can be found in the `util/constants.ts` file. This should be checked for confirming and executing transactions also.
2. Run `npx ts-node deploy-safe/propose-transaction.ts`

### Confirming transactions
1. Run `npx ts-node deploy-safe/confirm-transaction.ts`

### Executing transactions
1. Run `npx ts-node deploy-safe/execute-transaction.ts`
