const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const TRIPCoin = await hre.ethers.getContractFactory("TRIPCoin");
    const initialSupply = hre.ethers.utils.parseUnits("1000000", 18); // 1 million tokens with 18 decimals
    const tripCoin = await TRIPCoin.deploy(initialSupply);

    console.log("TRIPCoin deployed to:", tripCoin.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
