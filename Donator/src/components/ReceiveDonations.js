import React, { Component } from 'react'
import Container from '@material-ui/core/Container';

class ReceiveDonations extends Component {

  render() {
    return (
      <Container maxWidth="xs">
        <button onClick={(event) => {
                event.preventDefault()
                this.props.receiveDonations()
              }}>Receive Donations</button>
      </Container>
    );
  }
}

export default ReceiveDonations;
