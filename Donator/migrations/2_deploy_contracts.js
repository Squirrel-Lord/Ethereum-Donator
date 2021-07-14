const DonationSystem = artifacts.require('DonationSystem')

module.exports = async function(deployer) {
  await deployer.deploy(DonationSystem)
  const donationSystem = await DonationSystem.deployed()
}
