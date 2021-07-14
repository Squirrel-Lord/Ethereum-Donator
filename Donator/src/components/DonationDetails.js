import React, { Component } from 'react'
import Web3 from 'web3'
import DonationSystem from '../abis/DonationSystem.json'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { InputGroup, FormControl, Button }  from 'react-bootstrap'
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

  setReceiver = (address, name) => {
    this.setState({ state: window.ethereum.selectedAddress })
    this.setState({ loading: true })
    this.state.donationSystem.methods.setReceiver(address, name).send(
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

        <div>
          <InputGroup className="mb-3 donation-screen">
            <FormControl
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
      </div>
    );
  }
}

export default DonationDetails;
