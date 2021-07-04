import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div className="text-center">
        <label>This is a test of the Main component.</label><br></br>
        <label>Receiver Name: {this.props.receiverName}</label><br></br>
        <label>Donated Ether: {this.props.totalDonations}</label>
      </div>
    );
  }
}

export default Main;
