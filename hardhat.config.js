require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.2",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // RPC URL for Ganache
    },
  },
};