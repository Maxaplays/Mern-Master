import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import NavbarUser from "../layout/NavbarUser"

export default class EditRequest extends Component {
    constructor(props) {
      super(props);
  
      this.onChangeUser = this.onChangeUser.bind(this);
      this.onChangePickUp = this.onChangePickUp.bind(this);
      this.onChangeLeftOff = this.onChangeLeftOff.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        user: '',
        pickup: '',
        leftoff: '',
        date: new Date(),
        users: []
      
      }
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/api/requests/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            user: response.data.user,
            pickup: response.data.pickup,
            leftoff: response.data.leftoff,
            date: new Date(response.data.date)
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
  
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
  
    onSubmit(e) {
      e.preventDefault();
  
      const request = {
        user: this.state.user,
        pickup: this.state.pickup,
        leftoff: this.state.leftoff,
        date: this.state.date
      }
  
      console.log(request);
  
      axios.post('http://localhost:5000/api/requests/update/' + this.props.match.params.id, request)
        .then(res => console.log(res.data));
  
      window.location = '/dashboard';
    }
  
    render() {
      return (
      <div>
        <NavbarUser/>
        <div className="container">
          <h3>Edit Request</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>User: </label>  
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.user}
                  onChange={this.onChangeUser}
                  />
            </div>
            <div className="form-group"> 
              <label>Pick up: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.pickup}
                  onChange={this.onChangePickUp}
                  />
            </div>
            <div className="form-group">
              <label>Left off: </label>
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
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Edit Request" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
      )
    }
  }