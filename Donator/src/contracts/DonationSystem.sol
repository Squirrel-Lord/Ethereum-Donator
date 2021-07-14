/**
 * This smart contract allows users to donate ether through donate(). 
 * The receiving address of the donations is set to message sender
 * when the contract is deployed. Only the receiving address can
 * choose to accept donations through receiveDonations() or change
 * the current receivng address. Once donations are received, the
 * contract is made inactive.
*/

pragma solidity ^0.5.16;

contract DonationSystem {
    
    uint constant public ethConverter = 1000000000000000000;
    address payable private receiverAddress;
    string public receiverName;
    uint public totalDonations;
    bool public donationsReceived;

    constructor() public {
        receiverAddress = msg.sender;
        receiverName = "Contract Creator";
        totalDonations = 0;
        donationsReceived = false;
    }

    modifier active {
        require(!donationsReceived, "Error: The donation contract is inactive. Please deploy a new donation request.");
        _;
    }
    
    modifier isReceiver {
        require(msg.sender == receiverAddress, "Error: Only the receiver may initiate donation receivance.");
        _;
    }
    
    modifier isNotReceiver {
        require(msg.sender != receiverAddress, "Error: The receiver may not donate to the contract.");
        _;
    }

    function () external payable {}

    /**
     * This function updates the receiverAddress.
    */
    function setReceiver(address payable  _receiverAddress, string memory _receiverName) public active {
        require(msg.sender == receiverAddress, "Error: You must be the current receiver to set the receiving address.");
        receiverAddress = _receiverAddress;
        receiverName = _receiverName;
    }
    
    /**
     * This function allows users to donate ether to the contract.
    */
    function donate(uint amount) public payable active isNotReceiver{
        
        address(this).transfer(amount * ethConverter);
        totalDonations += msg.value;
    }
    
    /**
     * This function lets the receiverAddress acquire the donations stored in the smart contract.
    */
    function receiveDonations() public payable active isReceiver {
        receiverAddress.transfer(address(this).balance);
        donationsReceived = true;
    }
}

contract DonationWarehouse {
    mapping (string => address) private donationSystemAddresses;
    
    constructor() public { }
    
    function storeDonation(address donationAddress, string memory ipfsHash) public {
        donationSystemAddresses[ipfsHash] = donationAddress;
    }
    
    function getDonationAddressByHash(string memory ipfsHash) public view returns (address) {
        return donationSystemAddresses[ipfsHash];
    }
}