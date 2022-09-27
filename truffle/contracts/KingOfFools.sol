// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract KingOfFools {
    bool private isFirstDeposit;

    address payable private king;
    address payable[] private fools;

    mapping(address => uint256) deposits;
    mapping(address => uint256) withdraws;

    event BecomeKing(address indexed fool, uint256 deposit);

    constructor() {
        isFirstDeposit = true;
        king = payable(msg.sender);
        deposits[king] = 0;
    }

    function getKing() public view returns (address) {
        return king;
    }

    function getDepositOfKing() public view returns (uint256) {
        return deposits[king];
    }

    function getRequiredDeposit() public view returns (uint256) {
        return (deposits[king] * 3) / 2;
    }

    function getFools() public view returns (address[] memory) {
        address[] memory addresses;
        for (uint256 i = 0; i < fools.length; i++) {
            addresses[i] = fools[i];
        }
        return addresses;
    }

    function checkFirstDeposit() public view returns (bool) {
        return isFirstDeposit;
    }

    function getDepositHistory(address _addr) public view returns (uint256) {
        return deposits[_addr];
    }

    function getWithdrawHistory(address _addr) public view returns (uint256) {
        return withdraws[_addr];
    }

    function becomeKing() public payable checkSufficient(msg.value) {
        if (isFirstDeposit == true) {
            isFirstDeposit = false;
        } else {
            (bool sent, ) = king.call{value: msg.value}("");
            require(sent, "Failed to send Ether");
            withdraws[king] = msg.value;
        }
        fools.push(payable(msg.sender));
        deposits[msg.sender] = msg.value;
        king = payable(msg.sender);
        emit BecomeKing(msg.sender, msg.value);
    }

    modifier checkSufficient(uint256 deposit) {
        if (isFirstDeposit == true) {
            require(deposit > 0, "Deposit must be more than 0");
            _;
        } else {
            require(deposit >= (deposits[king] * 3) / 2, "Insufficient deposit");
            _;
        }
    }
}
