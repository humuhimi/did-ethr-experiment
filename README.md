# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It includes a sample contract, its corresponding test, and a Hardhat Ignition module for deploying the contract.

## Setup

1. Clone the repository:
   ```shell
   git clone <repository-url>
   cd did-ethr-experiment
   ```

2. Install dependencies:
   ```shell
   npm install
   ```

3. Start Ganache (local Ethereum network):
   ```shell
   npx ganache
   ```

## Deployment

To deploy the `DIDRegistry` contract using Hardhat Ignition on the Ganache network, run:
```shell
npx hardhat ignition deploy ./ignition/modules/DIDRegistry.ts --network ganache
```

## Testing

To run the tests, use the following command:
```shell
npx hardhat test
```

For detailed gas usage reports during tests, run:
```shell
REPORT_GAS=true npx hardhat test
```

## Additional Commands

- List all available Hardhat tasks:
  ```shell
  npx hardhat help
  ```

- Start a local Hardhat node:
  ```shell
  npx hardhat node
  ```

- Deploy the `Lock` contract:
  ```shell
  npx hardhat ignition deploy ./ignition/modules/Lock.ts
  ```

## DID Ethr Testing Nuances

The `DIDRegistry` contract is designed for registering and managing DIDs (Decentralized Identifiers). Using Ganache for local testing allows you to verify the contract's behavior before deploying it to a live network. It is recommended to add test cases to validate functionalities such as DID registration, updates, and deletions.