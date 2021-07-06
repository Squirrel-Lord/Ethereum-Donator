import React, { Component } from 'react'
import Container from '@material-ui/core/Container';

class Main extends Component {

  render() {
    return (
      <Container maxWidth="xs">
        <input type="text" id="newReceiverAddress" defaultValue="address"></input><br></br>
        <input type="text" id="newReceiverName" defaultValue="name"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                let address = document.getElementById("newReceiverAddress").value.toString()
                let name = document.getElementById("newReceiverName").value.toString()
                this.props.setReceiver(address, name)
              }}>Set Receiver</button><br></br>
      </Container>
    );
  }
}

export default Main;
