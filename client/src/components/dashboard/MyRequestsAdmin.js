import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/authActions";
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import NavbarAdmin from "../layout/NavbarAdmin";
import jwt_decode from "jwt-decode";


const MyRequest = props => (
    <tr>
    <td>{props.request.admin}</td>
    <td>{props.request.user}</td>
    <td>{props.request.pickup}</td>
    <td>{props.request.leftoff}</td>
    <td>{props.request.date.substring(0,10)}</td>
  </tr>
)

class MyRequestsAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/requests/')
    .then(response => {
      this.setState({requests: response.data})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  requestList() {
    return this.state.requests.map(currentRequest => {
      if (currentRequest.admin === jwt_decode(localStorage.getItem("jwtToken"))["email"]){
        return <MyRequest request = {currentRequest} key={currentRequest._id}/>;
      }
    })
  }

onLogoutClick = e => {

  e.preventDefault();
  this.props.logoutAdmin();
  setTimeout(() => {
    window.location.reload(false);
}, 1000);
}

  render() {
    return (
      
      <div>
        <NavbarAdmin />
      <div className="container">
      <div className="row">
          
          <h3 className="w-100 text-center" >My Requests</h3>
              <Table striped bordered hover variant="dark" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Admin</th>
                  <th>Username</th>
                  <th>Pick Up</th>
                  <th>Left Off</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                { this.requestList() }
              </tbody>
              </Table>
          
      </div>
      <div className="row">
      <div className="left-align" >
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue white-text accent-3"
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

MyRequestsAdmin.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logoutAdmin}
)(MyRequestsAdmin)