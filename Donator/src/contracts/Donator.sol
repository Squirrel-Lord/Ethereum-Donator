/**
 * This smart contract allows addresses to donate ether to a designated address.
 * The receiving address is changeable, but only the receiving address can
 * choose to accept donations.
*/

pragma solidity ^0.5.16;

contract Donator {
    address payable receiverAddress;
    string public receiverName;
    uint public totalDonations;
    uint public minimumDonation;

    constructor() public {
        receiverAddress = msg.sender;
        receiverName = "Contract Creator";
        totalDonations = 0;
        minimumDonation = 1;
    }

    function () external payable {}

    function setReceiver(address payable  _receiverAddress, string memory _receiverName) public {
        require(msg.sender == receiverAddress, "Error: You must be the current receiver to set the receiving address.");
        receiverAddress = _receiverAddress;
        receiverName = _receiverName;
    }
    
    function donate() public payable {
        receiverAddress.transfer(msg.value * 1000000000000000000);
        totalDonations += msg.value;
    }
}