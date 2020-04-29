# Truffle-example
Deploying an Ethereum smart contract,  running smart contract unit tests written both with Javascript and solidity using the truffle framework

## Deploying Smart contract
 - specify your network of choice in the `truffle.config` file. See the examples there already.
 If you want to test, you can make use of the genache network provided, all you would have to do is download the ganache GUI application and start it
 - In the terminal on the root of this application, run `truffle migrate --network <specify your network name here as provided in the config file>`
 - To run the unit tests, run this on the terminal, `truffle test --network <specify test network here>`