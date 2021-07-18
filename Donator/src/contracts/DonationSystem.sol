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

    constructor() public { }
    
    function () external payable {}
    
    /**
     * This function allows users to donate ether to the contract.
    */
    function donate(uint amount) public payable {
        address(this).transfer(amount);
    }
    
    /**
     * This function lets the receiverAddress acquire the donations stored in the smart contract.
    */
    function receiveDonations(address payable receiverAddress) public payable {
        receiverAddress.transfer(address(this).balance);
    }
}

contract DonationWarehouse {
    mapping (address => string) private donationHashes;
    
    constructor() public { }
    
    function storeDonation(address donationAddress, string memory ipfsHash) public {
        donationHashes[donationAddress] = ipfsHash;
    }
    
    function getDonationHashByAddress(address donationAddress) public view returns (string memory) {
        return donationHashes[donationAddress];
    }
}