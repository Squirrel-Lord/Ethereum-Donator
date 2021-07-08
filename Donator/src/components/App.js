import React, { Component } from 'react'
import Web3 from 'web3'
import DonationRequest from '../abis/DonationRequest.json'
import Main from './Main'
import DonationDetails from './DonationDetails'
import Donate from './Donate'
import SetReceiver from './SetReceiver'
import ReceiveDonations from './ReceiveDonations'
import './App.css'
import { Link, Switch, Route } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

class App extends Component {

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

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content =
        <div>
          <Navbar bg="dark" variant={"dark"} expand="lg">
            <Navbar.Brand href="#home">Ethereum Donator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/donation-details">Donation Details</Nav.Link>
                <Nav.Link as={Link} to="/donate">Donate</Nav.Link>
                <Nav.Link as={Link} to="/set-new-receiver">Set New Receiver</Nav.Link>
                <Nav.Link as={Link} to="/receive-donations">Receive Donations</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/home" component={Main} />
            <Route path="/donation-details" component={DonationDetails} />
            <Route path="/donate" component={Donate} />
            <Route path="/set-new-receiver" component={SetReceiver} />
            <Route path="/receive-donations" component={ReceiveDonations} />
          </Switch>
        </div>
    }

    return (
      <div className="text-center">
        {content}
      </div>
    );
  }
}

export default App;
