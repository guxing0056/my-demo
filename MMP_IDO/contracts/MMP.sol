// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MMP is ERC20 {
  constructor(address owner) ERC20("MemeLaunchpad", "MMP") {
    uint256 decimals = decimals();
    _mint(owner, 100000000000 * (10**decimals));
  }
}
