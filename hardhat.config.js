require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.0",
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    networks: {
        hardhat: {},
        ropsten: {
            url: "https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        },
    },
};
