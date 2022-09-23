require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const infuraProjectId = process.env.INFURA_KEY || "";
const adminPrivKey = process.env.ADMIN_PRIV || "";

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(
          adminPrivKey,
          `https://goerli.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 5,
      chain_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    // private: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    //   network_id: 2111,   // This network is yours, in the cloud.
    //   production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  mocha: {
    timeout: 100000,
  },

  compilers: {
    solc: {
      version: "0.8.14",
      docker: false,
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: "byzantium",
      },
    },
  },

  db: {
    enabled: false,
    host: "127.0.0.1",
    adapter: {
      name: "sqlite",
      settings: {
        directory: ".db",
      },
    },
  },
};
