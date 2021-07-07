import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Web3 from 'web3'
import DonationRequest from '../abis/DonationRequest.json'

class DonationDetails extends Component {

ethConverter = 1000000000000000000

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

donate = (amount) => {
  this.setState({ state: window.ethereum.selectedAddress })
  let msgValue = window.web3.utils.toWei(amount.toString(), 'Ether')
  this.setState({ loading: true })
  this.state.donationRequest.methods.donate(amount).send(
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

receiveDonations = () => {
  this.setState({ state: window.ethereum.selectedAddress })
  this.setState({ loading: true })
  this.state.donationRequest.methods.receiveDonations().send(
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
    donate: {},
    account: '0x0',
    receiverName: 'Receiver Name',
    loading: true,
    totalDonations: 0,
    isReceiver: true
  }
}

getDonatedEther() {
    return (this.state.totalDonations / this.ethConverter).toString()
}

  render() {
    return (
      <Container maxWidth="xs">
        <br></br><label>Receiver: {this.state.receiverName}</label><br></br>
        <label>Donated Ether: {this.getDonatedEther()}</label><br></br>
      </Container>
    );
  }
}

export default DonationDetails;
