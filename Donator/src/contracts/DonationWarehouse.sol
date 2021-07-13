pragma solidity ^0.5.16;

contract DonationWarehouse {
    mapping (address => string) private donationRequestAddresses;
    
    constructor() public { }
    
    function uploadDonationRequest(address donationAddress, string memory ipfsHash) public {
        donationRequestAddresses[donationAddress] = ipfsHash;
    }
    
    function getDonationHashByAddress(address donationAddress) public view returns (string memory) {
        return donationRequestAddresses[donationAddress];
    }
}