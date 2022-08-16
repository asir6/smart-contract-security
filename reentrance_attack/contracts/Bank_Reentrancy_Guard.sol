//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IBank.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Bank_Reentrancy_Guard is IBank, ReentrancyGuard {
    mapping(address => uint256) balances;
    bool locked = false;

    constructor() payable {}

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external nonReentrant {
        require(balances[msg.sender] > 0, "insufficient balance");

        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "failed to send ether");

        balances[msg.sender] = 0;
    }
}
