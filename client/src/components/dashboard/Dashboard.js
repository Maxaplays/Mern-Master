import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import jwt_decode from "jwt-decode";
import NavbarUser from "../layout/NavbarUser";



import { Link } from 'react-router-dom';

const Request = props => (
  <tr>
    <td>{props.request.user}</td>
    <td>{props.request.pickup}</td>
    <td>{props.request.leftoff}</td>
    <td>{props.request.date.substring(0,10)}</td>
    <td>
      <Link className="btn btn-primary" to={"/edit/"+props.request._id}>edit</Link> | <a className="btn btn-primary" href="#" onClick={() => { props.deleteRequest(props.request._id) }}>delete</a>
    </td>
  </tr>
)


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.deleteRequest = this.deleteRequest.bind(this)

    this.state = {requests: []};
    

    }
  componentDidMount() {
    axios.get('http://localhost:5000/api/requests/')
    .then(response => {
      this.setState({ requests: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  };

  deleteRequest(id) {
    axios.delete('http://localhost:5000/api/requests/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      requests: this.state.requests.filter(el => el._id !== id)
    })
  }

  requestList() {
    return this.state.requests.map(currentRequest => {
      if (currentRequest.user === jwt_decode(localStorage.getItem("jwtToken"))["email"]){
        return<Request request={currentRequest} deleteRequest={this.deleteRequest} key={currentRequest._id}/>;
      }
      
    })

  }
  onLogoutClick = e => {
    
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      
      <div>
        <NavbarUser />
      <div className="container">
      <div className="row">
          
        <h3 className="w-100 text-center">Logged Taxi Demands</h3>
        <div className="w-100 p-3" style={{overflow: "auto"}}>
            <Table striped bordered hover variant="dark" responsive>
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Pick Up</th>
                <th>Left Off</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.requestList() }
            </tbody>
            </Table>
        
      </div>
      </div>
      <div className="row">
      <div className="container left-align" >
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>
      </div>
    </div>
    </div>
    </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
