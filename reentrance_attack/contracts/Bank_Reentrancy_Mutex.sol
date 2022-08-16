//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IBank.sol";

contract Bank_Reentrancy_Mutex is IBank {
    mapping(address => uint256) balances;
    bool locked = false;

    constructor() payable {}

    modifier noReentrant() {
        require(!locked, "no re-entrancy allowed");
        locked = true;
        _;
        locked = false;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external noReentrant {
        require(balances[msg.sender] > 0, "insufficient balance");

        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "failed to send ether");

        balances[msg.sender] = 0;
    }
}
