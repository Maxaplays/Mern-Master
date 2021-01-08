import axios from 'axios';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarAdmin from "../layout/NavbarAdmin";
import { logoutAdmin } from "../../actions/authActions";
import Table from 'react-bootstrap/Table'

const Requests = props => (
    <tr>
    <td>{props.request.name}</td>
    <td>{props.request.value}</td>
  </tr>
)

class Price extends Component{

    constructor(props) {
        super(props);

        this.state = {
            requests: [],
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
        let repet = new Map();
        this.state.requests.forEach((element) => {
            if(element.admin && element.price){
                
                if(repet.has(element.admin)){
                    let aux = repet.get(element.admin)
                    repet.delete(element.admin)
                    repet.set(element.admin, aux+element.price)
                    
                }else {
                    repet.set(element.admin, element.price)
                }
            }
            
        })
        const  result = Array.from(repet).map(([name, value]) => ({name, value}))
        result.sort((a,b) => b["value"]-a["value"])
        result.sort()
        return result.map(current => {
            return<Requests request={current}/>
        })

      }

    onLogoutClick = e => {

        e.preventDefault();
        this.props.logoutAdmin();
        setTimeout(() => {
          window.location.reload(false);
      }, 1000);
    }

    render(){
        return(
            <div>
                <NavbarAdmin/>
                <div className="container">
                    <div className="row">
                        
                        <h3>Price</h3>
                            <Table responsive>
                            <thead className="thead-light">
                                <tr>
                                <th>Admin</th>
                                <th>Price Accomulated</th>
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
        )
    }
}

Price.propTypes = {
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    {logoutAdmin}
  )(Price)