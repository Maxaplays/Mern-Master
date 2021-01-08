import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import jwt_decode from "jwt-decode";
import NavbarUser from "../layout/NavbarUser";
import Select from 'react-select'



export default class createRequest extends Component{
    constructor(props) {
        super(props);


        


        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePickUp = this.onChangePickUp.bind(this);
        this.onChangeLeftOff = this.onChangeLeftOff.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeCalidad = this.onChangeCalidad.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          user: jwt_decode(localStorage.getItem("jwtToken"))["email"],
          pickup: '',
          leftoff: '',
          type: true,
          price: 2,
          date: new Date(),
          calidad: '',
          users: []
        }
      }
      
    
      onChangeUser(e) {
        this.setState({
          user: e.target.value
        })
      }
    
      onChangePickUp(e) {
        this.setState({
          pickup: e.target.value
        })
      }
    
      onChangeLeftOff(e) {
        this.setState({
          leftoff: e.target.value
        })
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        })
      } 
      onChangeCalidad(calidad) {
        this.setState({
          calidad: calidad["value"]
          
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
          calidad: this.state.calidad
        }
        
        console.log(request);
    
        axios.post('http://localhost:5000/api/requests/add', request)
          .then(res => console.log(res.data));

        window.location = '/dashboard';
    
      }
    render(){
      const options = [
        { value: 'bueno', label: 'bueno' },
        { value: 'muy bueno', label: 'muy bueno' },
        { value: 'normal', label: 'normal' }
      ]
        return(
          <div>
            <NavbarUser/>
            <div className="container">
                <h3>Create New Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <input
                        disabled="disabled"  
                        type="text"
                        required
                        className="form-control"
                        value={this.state.user}
                        onChange={this.onChangeUser}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Pick Up: </label>
                    <input  
                        type="text"
                        required
                        className="form-control"
                        value={this.state.pickup}
                        onChange={this.onChangePickUp}
                        />
                    </div>
                    <div className="form-group">
                    <label>Left Off: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.leftoff}
                        onChange={this.onChangeLeftOff}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        minDate={new Date()}
                        />
                    </div>
                    <div>
                    <Select options={options} onChange ={this.onChangeCalidad}/>
                    
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Create Request" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
        )
    }
}
