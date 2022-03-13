pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WZYToken is ERC20,Ownable{

  constructor() ERC20("Wuzy Token", "WZY") {}

  //动态增发币
  function mint(uint256 supply) public onlyOwner{
      _mint(msg.sender, supply);
  }

}
