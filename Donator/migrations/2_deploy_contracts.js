const Donator = artifacts.require('Donator')

module.exports = async function(deployer) {
  await deployer.deploy(Donator)
  const donator = await Donator.deployed()
}
