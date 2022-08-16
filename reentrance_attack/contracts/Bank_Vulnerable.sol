//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IBank.sol";

contract Bank_Vulnerable is IBank {
    mapping(address => uint256) balances;

    constructor() payable {}

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "insufficient balance");

        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "failed to send ether");

        balances[msg.sender] = 0;
    }
}
