import React, { Component } from "react";
import "../App.css";

class InputTb extends Component {
  state = {};
  render() {
    return <div className="input">{this.props.children}</div>;
  }
}

export default InputTb;
