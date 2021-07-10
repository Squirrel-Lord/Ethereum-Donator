import React, { Component } from 'react'
import Web3 from 'web3'
import DonationRequest from '../abis/DonationRequest.json'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

  constructor(props) {
    super(props)
    this.state = {
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
      <div>
        <Container className="details-container">
          <Row className="details-row">
            <Col >
              <h1>Receiver: {this.state.receiverName}</h1>
            </Col>
          </Row>
          <Row className="details-row">
            <Col className="details-col">
              <h1>Donated Ether: {this.getDonatedEther()}</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default DonationDetails;
