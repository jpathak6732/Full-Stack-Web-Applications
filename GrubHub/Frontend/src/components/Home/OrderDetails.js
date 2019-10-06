import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import OrderData from "../Extra/OrderData"

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            status: "",
            authFlag: false
        }
        this.cancelbutton = this.cancelbutton.bind(this);
        this.gotohome = this.gotohome.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/orderitemdetails', {
            params: {
                orderid: this.props.match.params.bookid
            }
        })
            .then((response) => {
                console.log("Received response")
                //update the state with the response data
                this.setState({
                    items: this.state.items.concat(response.data)
                });
            });
    }

    handleDropdown = e => {
        this.setState({
            status: e.target.value
        });
    };

    cancelbutton = e => {

        e.preventDefault();
        const data = {
            orderid: this.props.match.params.bookid
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post("http://localhost:3001/cancelorder", data).then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                window.location.replace("/ownerhome");
                this.setState({
                    authFlag: true
                })

            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    gotohome = e => {

        e.preventDefault();
        window.location.replace("/ownerhome")
    };

    render() {
        console.log("params " + this.props.match.params)
        //iterate over books to create a table row
        let details = this.state.items.map(item => {
            return (
                <tr>
                    <td>{item.orderid}</td>
                    <td>{item.itemname}</td>
                    <td>{item.itemquantity}</td>
                    <td>{item.itemprice}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        // let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        return (
            <div>
                {/* {redirectVar} */}
                <div class="container">
                    <h2>Details of the order</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Order id</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>


                    <h2>Change Order Status</h2>
                    <br />
                    <select class="form-control" onChange={this.handleDropdown}>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    <br />
                    <button className="btn btn-primary">Change Status!</button>
                    <input
                        type="button"
                        onClick={this.cancelbutton}
                        class="fadeIn fourth"
                        value="Cancel Order"
                    />

                    <input
                        type="button"
                        onClick={this.gotohome}
                        class="fadeIn fourth"
                        value="Go to Home"
                    />
                </div>

            </div>

        )
    }
}
//export Home Component
export default OrderDetails;