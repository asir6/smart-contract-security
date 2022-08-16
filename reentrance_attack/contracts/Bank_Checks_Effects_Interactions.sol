//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IBank.sol";

contract Bank_Checks_Effects_Interactions is IBank {
    mapping(address => uint256) balances;

    constructor() payable {}

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        //Check
        require(balances[msg.sender] > 0, "insufficient balance");

        //Effect
        balances[msg.sender] = 0;

        //Interact
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "failed to send ether");
    }
}
