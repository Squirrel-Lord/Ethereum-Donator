import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div>
        <label>This is a test of the Main component.</label><br></br>
        <label>Receiver Name: {this.props.receiverName}</label>
      </div>
    );
  }
}

export default Main;
