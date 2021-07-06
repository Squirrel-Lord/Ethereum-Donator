import React, { Component } from 'react'
import Container from '@material-ui/core/Container';

class Donate extends Component {

  render() {
    return (
      <Container maxWidth="xs">
        <input type="text" id="donationAmount"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                let amount = document.getElementById("donationAmount").value.toString()
                this.props.donate(amount)
              }}>Donate</button><br></br><br></br>
      </Container>
    );
  }
}

export default Donate;
