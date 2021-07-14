import React, { Component } from 'react'
import Home from './Home'
import DonationDetails from './DonationDetails'
import RequestDonation from './RequestDonation'
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
              <Nav.Link as={Link} to="/request-donation">Request Donation</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/donation-details" component={DonationDetails} />
          <Route path="/request-donation" component={RequestDonation} />
        </Switch>
      </div>
    );
  }
}

export default App;
