# Institutional CC Wallet: Design decisions

### Introduction

This document serves to document why certain design decisions were made during the development of the Institutional CC Wallet project for Prezenti.

### Goerli testnet instead of Alfajores testnet

We have decided to primarily develop on the Goerli testnet instead of the Celo (Alfajores) testnet.
This decision has primarily been undertaken due to the lack of support from Safe (a critical technology and SDK used in our project) for the Alfajores testnet. (https://docs.safe.global/safe-smart-account/safe-smart-account)

We make use of the Safe transaction service API (https://docs.safe.global/safe-core-aa-sdk/api-kit) in order to track, propose, confirm and execute transactions to and from our deployed institutional smart contract accounts, known as Safes. 

Unfortunately, Safe does not provide us with an API to do this on Alfajores. Therefore, we would be forced to use an older, forked version of Safe if we wanted to deploy on Alfajores. The data shape and endpoint calls made to interact with this API would be different than what is expected by the Celo Mainnet. More information on this lack of support can be found on the official Celo developer discussion forum (https://forum.celo.org/t/multisig-native-safe-launch-migration-guidance/5705).

As such, for development purposes, we are deploying our contracts on the Ethereum Goerli testnet using this transaction service (https://safe-transaction-goerli.safe.global/). Our final version will then make use of the Celo mainnet supported transaction service API (https://safe-transaction-celo.safe.global/).

### Role Based Access Control Module

We have decided to implement Role Based Access Control (RBAC) as a Safe Module https://docs.safe.global/safe-smart-account/modules. This is a seperate smart contract which needs to be deployed on a seperate address.

Modules can be added and removed from a Safe by running the scripts found in [deploy-safe/custom-module](deploy-safe/custom-module). As such, to enable a module it already needs to be deployed.

Our RBAC module allows for admin functionality in an institutional smart contract wallet. Admins (Safe owners) can add and remove users (traders) to and from the module. Being added to the module allows traders to make transactions from the shared wallet. We have kept this module simple, so at this point traders do not have any spending limits. The actual smart contract module code can be found in the [contracts/](contracts) directory.
