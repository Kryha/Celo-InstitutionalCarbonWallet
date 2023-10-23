# Institutional Carbon Wallet

Institutional Wallet proof of concept for trading carbon credits. Built using the Safe Core SDK to make use of latest Account Abstraction features https://docs.safe.global/safe-core-aa-sdk/safe-apps.

# Dev dependencies

1. Yarn https://yarnpkg.com/ (tested with version 1.22.19)
2. Node https://nodejs.org/en (tested with version 18.13.0)

# Running the project

1. Run ```yarn``` from the project root to install the node modules.
2. Deploy a funded Safe by following the instructions in the ```deploy-safe``` directory README, found in [deploy-safe/README.md](deploy-safe/README.md).
3. Once you have a funded Safe change into the ```apps/Wallet``` directory and run ```yarn``` to install dependencies.
4. Create a ```.env``` file with the necessary data, check the example in [apps/Wallet/.env.example](apps/Wallet/.env.example).
5. Run ```yarn dev``` from ```apps/Wallet```, app should run on ```http://localhost:3000```

# Features

1. Allows users to log into a shared institutional smart contract account using Google SSO.
2. Allows users to make transactions from that institutional wallet.