// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract KingOfTheFools {
    mapping(address => uint256) pendingWithdrawal;
    mapping(address => uint256) foolToPay;

    bool private firstRegistered;
    address payable public kingOfFools;

    event BecomeKingOfFools();

    constructor() {
        firstRegistered = false;
    }

    function currentKingOfFools() public view returns (address) {
        return kingOfFools;
    }

    function getMostPay() public view returns (uint256) {
        return foolToPay[kingOfFools];
    }

    function becomeKing()
        public
        checkSufficient(msg.sender)
        payable
        returns (bool)
    {
        
    }

    modifier checkSufficient(address _caller) {
        require(
            _caller.balance > (foolToPay[kingOfFools] * 3) / 2,
            "In sufficient balance"
        );
        _;
    }
}
