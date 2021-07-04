import React, { Component } from 'react'

class Main extends Component {

  /*
  * Check if user address is receiver
  */
  getButtonText() {
    if (this.props.isReceiver)
      return 'Receive Donations'
    else
      return 'Donate'
  }

  render() {
    return (
      <div className="text-center">
        <label>This is a test of the Main component.</label><br></br>
        <label>Receiver Name: {this.props.receiverName}</label><br></br>
        <label>Donated Ether: {this.props.totalDonations}</label><br></br>
        <button>{this.getButtonText()}</button>
      </div>
    );
  }
}

export default Main;
