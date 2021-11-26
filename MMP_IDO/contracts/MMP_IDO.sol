// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MMP_IDO {
  mapping(address => bool) private whitelist;

  mapping(address => uint256) private deposited;

  mapping(address => uint256) private claimed;

  uint256 private deposited_amount;

  bool private deposit_open = false;
  bool private claim_open = false;

  IERC20 public usdc;
  IERC20 public mmp;
  address public owner;

  // supply 300 million MMP
  uint256 private supply = 30000000000000000000000000000;

  // usdc default deposit 500U
  uint256 private default_deposit = 500000000000000000000;
  // whitelist usdc max deposit 2000 U
  uint256 private whitelist_deposit = 2000000000000000000000;

  event ContractCreated(
    address mmp_address,
    address usdc_address,
    address owner_address
  );

  event Deposited(address sender, uint256 amount);
  event Claimed(address sender, uint256 amount);

  constructor(
    address mmp_address,
    address usdc_address,
    address owner_address
  ) {
    usdc = IERC20(usdc_address);
    mmp = IERC20(mmp_address);

    owner = owner_address;

    emit ContractCreated(mmp_address, usdc_address, owner_address);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "caller is not owner");
    _;
  }

  modifier onlyDepositOpen() {
    require(deposit_open == true, "deposit is not open");
    _;
  }

  modifier onlyClaimOpen() {
    require(claim_open == true, "claim is not open");
    _;
  }

  function deposit(uint256 deposit_amount) public onlyDepositOpen {
    uint256 limit_deposit_amount = whitelist[msg.sender]
      ? whitelist_deposit
      : default_deposit;
    uint256 max_deposit_amount = limit_deposit_amount - deposited[msg.sender];
    require(
      max_deposit_amount > 0 && deposit_amount <= max_deposit_amount,
      "limit deposit amount"
    );

    usdc.transferFrom(msg.sender, address(this), deposit_amount);

    deposited[msg.sender] += deposit_amount;

    deposited_amount += deposit_amount;

    emit Deposited(msg.sender, deposit_amount);
  }

  function claim() public onlyClaimOpen {
    uint256 claim_amount = claimAmount();
    uint256 claimed_amount = claimed[msg.sender];
    uint256 final_amount = claim_amount > claimed_amount
      ? claim_amount - claimed_amount
      : 0;

    require(final_amount > 0, "no claim balance");

    mmp.transfer(msg.sender, final_amount);

    claimed[msg.sender] = claim_amount;

    emit Claimed(msg.sender, final_amount);
  }

  function totalDepositedAmount() public view returns (uint256) {
    return deposited_amount;
  }

  function depositedAmount(address account) public view returns (uint256) {
    return deposited[account];
  }

  function claimAmount() public view returns (uint256) {
    uint256 current_price = price();
    if (current_price > 0) {
      uint256 claim_amount = ((deposited[msg.sender] * (10**18)) /
        current_price);

      return claim_amount;
    }

    return 0;
  }

  function price() public view returns (uint256) {
    uint256 final_price = (deposited_amount * (10**18)) / supply;

    return final_price > 0 ? final_price + 1 : 0;
  }

  function withdrawUSDC(address account) public onlyOwner {
    uint256 final_amount = usdc.balanceOf(account);
    require(final_amount > 0, "No balance to withdraw");

    usdc.transfer(account, final_amount);
  }

  function withdrawMMP(address account) public onlyOwner {
    uint256 final_amount = mmp.balanceOf(account);
    require(final_amount > 0, "No balance to withdraw");

    mmp.transfer(account, final_amount);
  }

  function setWhitelist(address[] memory addresses) public onlyOwner {
    for (uint256 i = 0; i < addresses.length; i++) {
      whitelist[addresses[i]] = true;
    }
  }

  function isWhitelisted() public view returns (bool) {
    return whitelist[msg.sender];
  }

  function toggleDepositOpen() public onlyOwner {
    deposit_open = !deposit_open;
  }

  function isDepositOpen() public view returns (bool) {
    return deposit_open;
  }

  function toggleClaimOpen() public onlyOwner {
    claim_open = !claim_open;
  }

  function isClaimOpen() public view returns (bool) {
    return claim_open;
  }
}
