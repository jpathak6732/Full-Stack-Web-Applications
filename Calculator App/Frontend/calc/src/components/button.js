import React, { Component } from "react";
import "../App.css";

class Button extends Component {
  isOperator = val => {
    return !isNaN(val) || val === "." || val === "=";
  };
  state = {};
  render() {
    return (
      <div
        className={`btn ${
          this.isOperator(this.props.children) ? "" : "operator"
        }`}
        onClick={() => this.props.buttonClicked(this.props.children)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
