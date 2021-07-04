const DonationRequest = artifacts.require('DonationRequest')

module.exports = async function(deployer) {
  await deployer.deploy(DonationRequest)
  const donationRequest = await DonationRequest.deployed()
}
