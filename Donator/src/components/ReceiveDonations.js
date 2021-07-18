import React, { Component } from 'react'
import DonationSystem from '../abis/DonationSystem.json'
import { Button } from 'react-bootstrap'

class ReceiveDonations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      receiverAddress: null,
      account: '0x0',
      contract: null,
      ipfsHash: null,
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    this.setState({ account: window.ethereum.selectedAddress })

    const networkId = await web3.eth.net.getId()

    const donationSystemData = DonationSystem.networks[networkId]
    if (donationSystemData) {
      const donationSystem = new web3.eth.Contract(DonationSystem.abi, donationSystemData.address)
      this.setState({ contract: donationSystem })
    } 
    else {
      window.alert('DonationSystem contract not deployed to detected network.')
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  receiveDonations = () => {
    this.setState({ state: window.ethereum.selectedAddress })
    this.setState({ loading: true })
    this.state.donationSystem.methods.receiveDonations().send(
      { from: this.state.account },
      (error, result) => {
        if (error)
          console.log(error)
        else
          console.log(result)
      })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div>
        <Button onClick={(event) => {
                event.preventDefault()
                this.receiveDonations()
              }}>Receive Donations</Button>
      </div>
    );
  }
}

export default ReceiveDonations;
