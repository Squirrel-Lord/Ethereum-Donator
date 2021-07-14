import React, { Component } from 'react'
import Web3 from 'web3'
import DonationSystem from '../abis/DonationSystem.json'
import Home from './Home'
import DonationDetails from './DonationDetails'
import Donate from './Donate'
import SetReceiver from './SetReceiver'
import ReceiveDonations from './ReceiveDonations'
import './App.css'
import { Link, Switch, Route } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

class App extends Component {

  render() {
    return (
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
          <Route path="/home" component={Home} />
          <Route path="/donation-details" component={DonationDetails} />
          <Route path="/donate" component={Donate} />
          <Route path="/set-new-receiver" component={SetReceiver} />
          <Route path="/receive-donations" component={ReceiveDonations} />
        </Switch>
      </div>
    );
  }
}

export default App;
