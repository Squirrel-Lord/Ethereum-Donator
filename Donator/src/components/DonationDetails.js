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
      totalDonations: 0,
      receiverName: 'Receiver not grabbed from contract'
    }
  }

  ethConverter = 1000000000000000000

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
