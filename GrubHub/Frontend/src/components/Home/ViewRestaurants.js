import React, { Component } from "react";
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import ViewRestaurantsData from "../Extra/ViewRestaurantsData"

class BuyerHome extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            itemname: "",
            cuisine: "",
            items: [],
            // description: "",
            // price: "",
            // sectionid: this.props.match.params.sectionid,
            // imagePath: "http://localhost:3001/profilepics/d.jpeg",
            // itemimage: "",
            authFlag: false
        };
        //Bind the handlers to this class
        this.itemnameChangeHandler = this.itemnameChangeHandler.bind(this);
        // this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        //this.submitSearch = this.submitSearch.bind(this);
    }

    selectChangeHandler = e => {
        this.setState({
            cuisine: e.target.value

        });
        console.log(" change 0]" + this.state.cuisine)
    };


    itemnameChangeHandler = e => {
        this.setState({
            itemname: e.target.value
        });
    };

    componentDidMount() {
        console.log("Cuisine " + this.state.cuisine)
        axios.get('http://localhost:3001/viewrestaurants', {
            params: {
                itemname: this.props.match.params.itemname,
                cuisine: this.state.cuisine
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


    submitFilter = e => {
        window.location.reload();
    };

    render() {
        let details = this.state.items.map(item => {
            return (
                <tr>
                    <ViewRestaurantsData key={Math.random} data={item}></ViewRestaurantsData>
                </tr>
                // <tr key="index">
                //     <td>{book.BookID}</td>
                //     <td>{book.Title}</td>
                //     <td>{book.Author}</td>
                //     <td>{book.Status}</td>
                //     <input type="button" onClick={this.viewButton(index)} value="view details"></input>
                // </tr>
            )
        })

        let options = this.state.items.map((data) =>
            <option
                key={data.cuisine}
                value={data.cuisine}
            >
                {data.cuisine}
            </option>
        );

        return (

            <div>
                {/* {redirectVar} */}
                <div class="container">
                    <h2>List of All Restaurants</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Restaurant Name</th>
                                <th>Cuisine</th>
                                <th>Action</th>
                                {/* <th>Person Address</th>
                                <th>Order Status</th>
                                <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>




                    <br />

                    <div className="rw">
                        <select name="customSearch" className="custom-search-select" onChange={this.selectChangeHandler}>
                            <option>Select Cuisine</option>
                            {options}
                        </select>
                        <button className="btn btn-primary" style={{ marginLeft: "1%" }} onClick={this.submitFilter}>Filter</button>
                    </div>


                </div>

            </div>
        );
    }
}


export default BuyerHome;
