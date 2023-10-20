# Institutional CC Wallet: Design decisions

### Introduction

This document serves to document why certain design decisions were made during the development of the Institutional CC Wallet project for Prezenti.

### Goerli testnet instead of Alfajores testnet

We have decided to primarily develop on the Goerli testnet instead of the Celo (Alfajores) testnet.
This decision has primarily been undertaken due to the lack of support from Safe (a critical technology and SDK used in our project) for the Alfajores testnet. (https://docs.safe.global/safe-smart-account/safe-smart-account)

We make use of the Safe transaction service API (https://docs.safe.global/safe-core-aa-sdk/api-kit) in order to track, propose, confirm and execute transactions to and from our deployed institutional smart contract accounts, known as Safes. 

Unfortunately, Safe does not provide us with an API to do this on Alfajores. Therefore, we would be forced to use an older, forked version of Safe if we wanted to deploy on Alfajores. The data shape and endpoint calls made to interact with this API would be different than what is expected by the Celo Mainnet. More information on this lack of support can be found on the official Celo developer discussion forum (https://forum.celo.org/t/multisig-native-safe-launch-migration-guidance/5705).

As such, for development purposes, we are deploying our contracts on the Ethereum Goerli testnet using this transaction service (https://safe-transaction-goerli.safe.global/). Our final version will then make use of the Celo mainnet supported transaction service API (https://safe-transaction-celo.safe.global/).


