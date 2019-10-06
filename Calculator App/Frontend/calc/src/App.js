import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Button from "./components/button";
import ClearButton from "./components/clearButton";
import Input from "./components/inputTb";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  addToTextbox = val => {
    this.setState({
      input: this.state.input + val
    });
  };

  addZeroToTextbox = val => {
    if (this.state.input !== "") {
      this.setState({
        input: this.state.input + val
      });
    }
  };

  clearAll = () => {
    this.setState({
      input: ""
    });
  };

  submitEqualTo = e => {
    var headers = new Headers();
    const data = {
      input: this.state.input
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log(data)
    axios.post("http://localhost:3001/calculate", data).then(response => {

      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log(response.data);
        this.setState({
          input: response.data.calculatedString,
          authFlag: true
        });
      } else {
        alert("Invalid input!");
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <Input>{this.state.input}</Input>
          </div>
          <div className="row">
            <Button buttonClicked={this.addToTextbox}>7</Button>
            <Button buttonClicked={this.addToTextbox}>8</Button>
            <Button buttonClicked={this.addToTextbox}>9</Button>
            <Button buttonClicked={this.addToTextbox}>/</Button>
          </div>
          <div className="row">
            <Button buttonClicked={this.addToTextbox}>4</Button>
            <Button buttonClicked={this.addToTextbox}>5</Button>
            <Button buttonClicked={this.addToTextbox}>6</Button>
            <Button buttonClicked={this.addToTextbox}>*</Button>
          </div>
          <div className="row">
            <Button buttonClicked={this.addToTextbox}>1</Button>
            <Button buttonClicked={this.addToTextbox}>2</Button>
            <Button buttonClicked={this.addToTextbox}>3</Button>
            <Button buttonClicked={this.addToTextbox}>+</Button>
          </div>
          <div className="row">
            <Button buttonClicked={this.addToTextbox}>.</Button>
            <Button buttonClicked={this.addZeroToTextbox}>0</Button>
            <Button buttonClicked={this.submitEqualTo}>=</Button>
            <Button buttonClicked={this.addToTextbox}>-</Button>
          </div>
          <div className="row">
            <ClearButton clearButtonClicked={this.clearAll}>CLEAR</ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
