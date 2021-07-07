import React, { Component } from 'react'
import Web3 from 'web3'
import DonationRequest from '../abis/DonationRequest.json'
import Main from './Main'
import DonationDetails from './DonationDetails'
import Donate from './Donate'
import SetReceiver from './SetReceiver'
import ReceiveDonations from './ReceiveDonations'
import './App.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

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
        <Container maxWidth="xs">
          <BrowserRouter>
          <AppBar position="static">
            <Tabs value={0}>
              <Tab label="HOME" component={Link} to="/home" />
              <Tab label="DONATION DETAILS" component={Link} to={{pathname:"/donation-details", 
                state: {
                  receiverName: this.state.receiverName, 
                  totalDonations: this.state.totalDonations
                  }}}/>
            </Tabs>
          </AppBar>

          <Switch>
            <Route path="/home" component={Main} />
            <Route path="/donation-details" component={DonationDetails} />
            <Route path="/set-new-receiver" component={SetReceiver} />
            <Route path="/receive-donations" component={ReceiveDonations} />
            <Route path="/donate" component={ReceiveDonations} />
          </Switch>
          </BrowserRouter>
        </Container>
    }

    return (
      <div className="text-center">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></link>
        Ethereum Donator
        {content}
      </div>
    );
  }
}

export default App;
