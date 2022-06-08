require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"]
        }
      }
    },
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOY_PRIVATE_KEY_TESTNET]
          : [],
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY_MAINNET !== undefined
          ? [process.env.DEPLOY_PRIVATE_KEY_MAINNET]
          : [],
    }
  },
};
