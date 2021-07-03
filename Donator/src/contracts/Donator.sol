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
    address[] donatorAddresses;
    mapping (address => bool) public donatorAcceptances;

    constructor() public {
        receiverAddress = msg.sender;
        receiverName = "Contract Creator";
        totalDonations = 0;
        minimumDonation = 1;
    }
    
    modifier donatorsAccept {
        bool majorityAccepts = false;
        uint acceptCount = 0;
        for (uint i = 0; i < donatorAddresses.length; i++)
        {
            if (donatorAcceptances[donatorAddresses[i]])
            {
                acceptCount++;
            }
        }
        require (acceptCount >= donatorAddresses.length / 2,
                "Error: At least half of the donators must first accept the receiver's request");
        _;
    }

    function () external payable {}

    function setReceiver(address payable  _receiverAddress, string memory _receiverName) public {
        require(msg.sender == receiverAddress, "Error: You must be the current receiver to set the receiving address.");
        receiverAddress = _receiverAddress;
        receiverName = _receiverName;
    }
    
    function donate() public payable {
        address(this).transfer(msg.value * 1000000000000000000);
        //TODO: send ETH to smart contract, not directly to receiver address
        totalDonations += msg.value;
    }
    
    function approveReceiverRequest() public {
        donatorAcceptances[msg.sender] = true;
    }
    
    /**
     * This function lets the receiverAddress acquire the donations stored in the smart contract.
    */
    function receiveDonations() public payable donatorsAccept {
        receiverAddress.transfer(totalDonations * 1000000000000000000);
    }
}
