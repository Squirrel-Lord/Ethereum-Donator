import React, { Component } from 'react'
import Web3 from 'web3'
import DonationSystem from '../abis/DonationSystem.json'
import { InputGroup, FormControl, Button, Container }  from 'react-bootstrap'
import './DonationDetails.css'

class Donate extends Component {

  constructor(props) {
    super(props)
    this.state = {
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

  donate = (amount) => {
    this.setState({ state: window.ethereum.selectedAddress })
    let msgValue = window.web3.utils.toWei(amount.toString(), 'Ether')
    this.setState({ loading: true })
    this.state.donationSystem.methods.donate(amount).send(
      {
        from: this.state.account,
        value: msgValue
      },
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
        <InputGroup className="mb-3 donation-screen">
          <FormControl id="donationAmount"
            placeholder="Amount of Ether"
            aria-label="Amount of Ether"
          />
          <InputGroup.Append>
            <Button 
              onClick={(event) => {
                event.preventDefault()
                let amount = document.getElementById("donationAmount").value.toString()
                this.donate(amount)
              }}>Donate</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default Donate;
