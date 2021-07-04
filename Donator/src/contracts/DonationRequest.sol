/**
 * This smart contract allows users to donate ether through donate(). 
 * The receiving address of the donations is set to message sender
 * when the contract is deployed. Only the receiving address can
 * choose to accept donations through receiveDonations() or change
 * the current receivng address. Once donations are received, the
 * contract is made inactive.
*/

pragma solidity ^0.5.16;

contract DonationRequest {
    uint constant public ethConverter = 1000000000000000000;
    address payable private receiverAddress;
    bool public isReceiver;
    string public receiverName;
    uint public totalDonations;
    bool public donationsReceived;

    constructor() public {
        receiverAddress = msg.sender;
        receiverName = "Contract Creator";
        totalDonations = 0;
        donationsReceived = false;
    }

    function () external payable {}

    /**
     * This function updates the receiverAddress.
    */
    function setReceiver(address payable  _receiverAddress, string memory _receiverName) public {
        require(donationsReceived, "Error: The donation contract is inactive. Please deploy a new donation request.");
        require(msg.sender == receiverAddress, "Error: You must be the current receiver to set the receiving address.");
        receiverAddress = _receiverAddress;
        receiverName = _receiverName;
    }
    
    /**
     * This function returns true if the message sender is the address of the receiver
     * and false otherwise.
    */
    function addressIsReceiver() public view returns (bool) {
        return(msg.sender == receiverAddress);
    }
    
    /**
     * This function allows users to donate ether to the contract.
    */
    function donate() public payable {
        address(this).transfer(msg.value * ethConverter);
        totalDonations += msg.value;
    }
    
    /**
     * This function lets the receiverAddress acquire the donations stored in the smart contract.
    */
    function receiveDonations() public payable {
        receiverAddress.transfer(totalDonations * ethConverter);
        donationsReceived = true;
    }
}