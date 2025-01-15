const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TRIPCoin", function () {
    let TRIPCoin;
    let tripCoin;
    let owner;
    let addr1;
    let addr2;
    let initialSupply;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        TRIPCoin = await ethers.getContractFactory("TRIPCoin");
        initialSupply = ethers.utils.parseUnits("1000000", 18);
        tripCoin = await TRIPCoin.deploy(initialSupply);
    });

    it("should deploy the token and set the correct initial supply", async function () {
        const balance = await tripCoin.balanceOf(owner.address);
        expect(balance).to.equal(initialSupply);
    });

    it("should allow the owner to mint new tokens", async function () {
        const mintAmount = ethers.utils.parseUnits("1000", 18);
        await tripCoin.mint(addr1.address, mintAmount);
        const balance = await tripCoin.balanceOf(addr1.address);
        expect(balance).to.equal(mintAmount);
    });

    it("should allow the owner to burn tokens", async function () {
        const burnAmount = ethers.utils.parseUnits("500", 18);
        await tripCoin.burn(owner.address, burnAmount);
        const balance = await tripCoin.balanceOf(owner.address);
        expect(balance).to.equal(initialSupply.sub(burnAmount));
    });

    it("should fail if non-owner tries to mint tokens", async function () {
        const mintAmount = ethers.utils.parseUnits("1000", 18);
        await expect(tripCoin.connect(addr1).mint(addr2.address, mintAmount)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should fail if non-owner tries to burn tokens", async function () {
        const burnAmount = ethers.utils.parseUnits("500", 18);
        await expect(tripCoin.connect(addr1).burn(owner.address, burnAmount)).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
