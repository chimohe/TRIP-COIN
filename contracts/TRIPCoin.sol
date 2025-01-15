// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TRIPCoin is ERC20, Ownable {
    // Constructor to set token name and symbol
    constructor(uint256 initialSupply) ERC20("TRIP Coin", "$TRIP") {
        _mint(msg.sender, initialSupply);
    }

    // Mint new tokens (only owner can mint)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burn tokens from a specific account (only owner can burn)
    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}
