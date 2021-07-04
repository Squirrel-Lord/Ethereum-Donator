import React, { Component } from 'react'
import Web3 from 'web3'
import Donator from '../abis/Donator.json'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load initial DonationRequest contract data
    const donatorData = Donator.networks[networkId]
    if(donatorData) {
      const donator = new web3.eth.Contract(Donator.abi, donatorData.address)
      this.setState({ donator })
      let receiverName = await donator.methods.receiverName().call()
      this.setState({ receiverName: receiverName.toString() })
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

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      receiverName: 'Receiver Name',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        receiverName={this.state.receiverName}
        account={this.state.account}
      />
    }

    return (
      <div>
        Test
        {content}
      </div>
    );
  }
}

export default App;
