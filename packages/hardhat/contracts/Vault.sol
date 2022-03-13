pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault is Ownable{

  IERC20 wzyToken; 

  mapping(address => uint256) public userDeposit;

  event Deposit(address indexed user, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);

  constructor(address tokenAddress) {wzyToken = IERC20(tokenAddress);}

  function deposit(uint256 amount) public {
    require(wzyToken.balanceOf(msg.sender)>=amount,"you don't have enough wzy token");
    wzyToken.transferFrom(address(msg.sender),address(this),amount);
    userDeposit[msg.sender] += amount;
    emit Deposit(msg.sender, amount);
  }

  function withdraw(uint256 amount) public {
    require(userDeposit[msg.sender]>=amount,"you don't have these amount wzy token deposit");
    wzyToken.transfer(address(msg.sender), amount);
    userDeposit[msg.sender] -= amount;
    emit Withdraw(msg.sender, amount);
  }

}
