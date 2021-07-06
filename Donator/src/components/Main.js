import React, { Component } from 'react'

class Main extends Component {

  ethConverter = 1000000000000000000

  getDonatedEther() {
    return this.props.totalDonations.toString() / this.ethConverter
  }

  render() {
    return (
      <div className="text-center">
        <br></br><label>Receiver: {this.props.receiverName}</label><br></br>
        <label>Donated Ether: {this.getDonatedEther()}</label><br></br>
        <input type="text" id="donationAmount"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                let amount = document.getElementById("donationAmount").value.toString()
                this.props.donate(amount)
              }}>Donate</button><br></br><br></br>
        <input type="text" id="newReceiverAddress" defaultValue="address"></input><br></br>
        <input type="text" id="newReceiverName" defaultValue="name"></input><br></br>
        <button onClick={(event) => {
                event.preventDefault()
                let address = document.getElementById("newReceiverAddress").value.toString()
                let name = document.getElementById("newReceiverName").value.toString()
                this.props.setReceiver(address, name)
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
