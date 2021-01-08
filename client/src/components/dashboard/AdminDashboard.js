import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/authActions";
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import NavbarAdmin from "../layout/NavbarAdmin";

import { Link } from 'react-router-dom';

const Request = props => (
  <tr>
    <td>{props.request.user}</td>
    <td>{props.request.pickup}</td>
    <td>{props.request.leftoff}</td>
    <td>{props.request.date.substring(0,10)}</td>
    <td>
      <Link to={"/admin-accept/"+props.request._id} className="btn btn-primary">Accept</Link>
    </td>
  </tr>
)


class AdminDashboard extends Component {
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
      if (!currentRequest.admin){
        return<Request request={currentRequest} deleteRequest={this.deleteRequest} key={currentRequest._id}/>;
      }
    })

  }
  onLogoutClick = e => {
    
    e.preventDefault();
    this.props.logoutAdmin()
    setTimeout(() => {
        window.location.reload(false);
    }, 1000);
    
  };

  render() {

    return (
      
      <div>
      <NavbarAdmin/>
      <div className="container ">
      <div className="row">
          
          <h3 className="w-100 text-center" >View Requests</h3>
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
      <div className="row">
      <div className="landing-copy left-align" >
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

AdminDashboard.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutAdmin }
)(AdminDashboard);
