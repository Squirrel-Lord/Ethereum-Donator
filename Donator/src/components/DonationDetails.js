import React, { Component } from 'react'
import Container from '@material-ui/core/Container';

class DonationDetails extends Component {

ethConverter = 1000000000000000000

getDonatedEther() {
    return this.props.totalDonations.toString() / this.ethConverter
}

  render() {
    return (
      <Container maxWidth="xs">
        <br></br><label>Receiver: {this.props.receiverName}</label><br></br>
        <label>Donated Ether: {this.getDonatedEther()}</label><br></br>
      </Container>
    );
  }
}

export default DonationDetails;