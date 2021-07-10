import React, { Component } from 'react'
import Web3 from 'web3'
import DonationRequest from '../abis/DonationRequest.json'

class Main extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    this.setState({ account: window.ethereum.selectedAddress })

    const networkId = await web3.eth.net.getId()

    // Load initial DonationRequest contract data
    const donationRequestData = DonationRequest.networks[networkId]
    if (donationRequestData) {
      const donationRequest = new web3.eth.Contract(DonationRequest.abi, donationRequestData.address)
      this.setState({ donationRequest })

      let receiverName = await donationRequest.methods.receiverName().call()
      let totalDonations = await donationRequest.methods.totalDonations().call()

      this.setState({
        receiverName: receiverName.toString(),
        totalDonations: totalDonations
      })
    } else {
      window.alert('DonationRequest contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  setReceiver = (address, name) => {
    this.setState({ state: window.ethereum.selectedAddress })
    this.setState({ loading: true })
    this.state.donationRequest.methods.setReceiver(address, name).send(
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

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  render() {
    return (
      <div>
        <input type="text" id="newReceiverAddress" defaultValue="address"></input><br></br>
        <input type="text" id="newReceiverName" defaultValue="name"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                let address = document.getElementById("newReceiverAddress").value.toString()
                let name = document.getElementById("newReceiverName").value.toString()
                this.setReceiver(address, name)
              }}>Set Receiver</button><br></br>
      </div>
    );
  }
}

export default Main;
