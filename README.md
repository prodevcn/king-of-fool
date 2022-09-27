# King of Fools

## Description

Users can deposit in case of having a balance of 1.5x of the previous deposit.

```
1. At first, contract has 0 balance.
2. First user deposit specific amount of Eth.
3. The next user deposit 1.5x prevDeposit (Eth) and this will be transferred to previous king. Then this user becomes king of fools.
...
```

## Installation

Please setup node modules.

```sh
# Install npm modules for truffle
$ cd truffle
$ npm install
```

```sh
# Install npm modules for client
$ cd client
$ npm install
```

Compile and migrate contract to goerli testnet

```sh
$ cd truffle
$ truffle compile
$ truffle migrate --network goerli
```

Start the react dev server.

```sh
$ cd client
$ npm start
  Starting the development server...
```
