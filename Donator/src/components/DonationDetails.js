import React, { Component } from 'react'
import Web3 from 'web3'
import DonationSystem from '../abis/DonationSystem.json'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Donate from './Donate.js'
import SetReceiver from './SetReceiver'
import ReceiveDonations from './ReceiveDonations'
import './DonationDetails.css'

class DonationDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      totalDonations: 0,
      isReceiver: true,
      receiverName: 'Receiver not grabbed from contract'
    }
  }

  ethConverter = 1000000000000000000

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    this.setState({ account: window.ethereum.selectedAddress })

    const networkId = await web3.eth.net.getId()

    const donationSystemData = DonationSystem.networks[networkId]
    if (donationSystemData) {
      const donationSystem = new web3.eth.Contract(DonationSystem.abi, donationSystemData.address)
      this.setState({ donationSystem })

      let receiverName = await donationSystem.methods.receiverName().call()
      let totalDonations = await donationSystem.methods.totalDonations().call()

      this.setState({
        receiverName: receiverName.toString(),
        totalDonations: totalDonations
      })
    } else {
      window.alert('DonationSystem contract not deployed to detected network.')
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

  getDonatedEther() {
    return (this.state.totalDonations / this.ethConverter).toString()
  }

  render() {
    return (
      <div>
        <Container className="details-container">
          <Row className="details-row">
            <Col className="details-col">
              <h1>Receiver: {this.state.receiverName}</h1>
            </Col>
          </Row>
          <Row className="details-row">
            <Col className="details-col">
              <h1>Donated Ether: {this.getDonatedEther()}</h1>
            </Col>
          </Row>
        </Container>

        <Donate account={this.state.account}></Donate>

        <SetReceiver></SetReceiver>

        <ReceiveDonations></ReceiveDonations>
      </div>
    );
  }
}

export default DonationDetails;
