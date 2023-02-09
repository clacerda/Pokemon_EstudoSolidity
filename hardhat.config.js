require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.URL,
      accounts: process.env.ACCOUNTS,
    },
  },
};
 