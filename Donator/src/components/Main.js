import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div className="text-center">
        <br></br><label>Receiver: {this.props.receiverName}</label><br></br>
        <label>Donated Ether: {this.props.totalDonations}</label><br></br>
        <input type="text" id="donationAmount"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                this.props.donate()
              }}>Donate</button><br></br><br></br>
        <input type="text" id="newReceiverAddress"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                this.props.setReceiver()
              }}>Set Receiver</button><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                this.props.receiveDonations()
              }}>Receive Donations</button>
      </div>
    );
  }
}

export default Main;
