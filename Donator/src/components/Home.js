import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Home.css'

class Home extends Component {

  render() {
    return (
      <div>
        <Container className="home-container">
          <Row className="app-description-row">
            <Col className="header">
            <h1>Ethereum Donator</h1>
            </Col>
          </Row>
          <Row className="app-description-row">
            <Col className="app-description-col">
              Ethereum Donator lets anyone donate Ether to an instance
              of a Donation Request smart contract. When the Donation Request
              is initially deployed, the receiver of the funds is set to the
              deploying address. The current receiver can update
              the Donation Request to point to a new receiver. To prevent
              fraudulent information, the receiver cannot donate to
              the Donation Request. After the receiver chooses to
              receive donations, the smart contract becomes inactive, meaning
              it no longer accepts donations.
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
