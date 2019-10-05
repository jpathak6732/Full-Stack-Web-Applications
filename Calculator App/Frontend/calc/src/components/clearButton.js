import React, { Component } from "react";

class ClearButton extends Component {
  state = {};
  render() {
    return (
      <div
        className="clr-btn"
        onClick={() => this.props.clearButtonClicked(this.props.children)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ClearButton;
