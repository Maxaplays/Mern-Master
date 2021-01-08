import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jwt_decode from "jwt-decode";
import NavbarAdmin from "../layout/NavbarAdmin";
import { Link } from "react-router-dom";

export default class AcceptRequest extends Component{

    constructor(props) {
        super(props);

        this.onSubmit =  this.onSubmit.bind(this);
    
        this.state = {
          user: '',
          pickup: '',
          leftoff: '',
          price: 2,
          date: new Date(),
          admin: '',
        
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/requests/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            user: response.data.user,
            pickup: response.data.pickup,
            leftoff: response.data.leftoff,
            date: new Date(response.data.date),
            admin: jwt_decode(localStorage.getItem("jwtToken"))["email"]
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
    }



      onSubmit(e) {
        e.preventDefault();


        const request = {
          user: this.state.user,
          pickup: this.state.pickup,
          leftoff: this.state.leftoff,
          price: this.state.price,
          date: this.state.date,
          admin: this.state.admin
        }
    
    
        axios.post('http://localhost:5000/api/requests/update/' + this.props.match.params.id, request)
          .then(res => console.log(res.data));
    
        window.location = '/admin-dashboard';
      }

    render() {
        console.log(this.state.user);
    return (
    <div>
        <NavbarAdmin/>
        <div className="container">
        <h3>Edit Request</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>User: </label>  
            <input  type="text"
                required
                className="form-control"
                value={this.state.user}
                disabled = "disabled"
                />
            </div>
            <div className="form-group">
                <label>Admin: </label>
                <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.admin}
                    disabled = "disabled"
                />
            </div>
            <div className="form-group"> 
            <label>Pick up: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.pickup}
                disabled = "disabled"
                />
            </div>
            <div className="form-group">
            <label>Left off: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.leftoff}
                disabled = "disabled"
                />
            </div>
            <div className="form-group">
            <label>Date: </label>
            <div>
                <DatePicker
                selected={this.state.date}
                disabled = "disabled"
                />
            </div>
            </div>
    
            <div className="form-group">
            <input type="submit" value="Accept Request" className="btn btn-primary" />
            
            </div>
            <Link to="/admin-dashboard" className="btn btn-primary red"> Cancel </Link>
        </form>
        </div>
    </div>
    )
    }
}

