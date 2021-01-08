import axios from 'axios';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarAdmin from "../layout/NavbarAdmin";
import { logoutAdmin } from "../../actions/authActions";
import Table from 'react-bootstrap/Table'
import DatePicker from 'react-datepicker';
import Alert from 'react-bootstrap/Alert'
import Select from 'react-select'

const Requests = props => (
    <tr>
    <td>{props.request.name}</td>
    <td>{props.request.value}</td>
  </tr>
)

class CompareRequests extends Component{

    constructor(props) {
        super(props);

        this.onChangeDateBegin = this.onChangeDateBegin.bind(this);
        this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
        this.checkDate = this.checkDate.bind(this);
        this.onChangeCalidad = this.onChangeCalidad.bind(this);
        this.requestListCalidad = this.requestListCalidad.bind(this);

        this.state = {
            requests: [],
            filteredRequests: [],
            dateBegin: new Date(),
            dateEnd: new Date(),
            tupu: '',
            calidad: ''
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
            if(element.admin){
                
                if(repet.has(element.admin)){
                    let aux = repet.get(element.admin)
                    repet.delete(element.admin)
                    repet.set(element.admin, aux+1)
                    
                }else {
                    repet.set(element.admin, 1)
                }
            }
            
        })
        const  result = Array.from(repet).map(([name, value]) => ({name, value}))
        return result.map(current => {
            return<Requests request={current}/>
        })

      }

      requestFilteredList() {
        let repet = new Map();
        this.state.filteredRequests.forEach((element) => {
            if(element.admin){
                
                if(repet.has(element.admin)){
                    let aux = repet.get(element.admin)
                    repet.delete(element.admin)
                    repet.set(element.admin, aux+1)
                    
                }else {
                    repet.set(element.admin, 1)
                }
            }
            
        })
        const  result = Array.from(repet).map(([name, value]) => ({name, value}))
        let cunt = 0
        result.forEach(element => {
            if(element.value>cunt){
                cunt = parseInt(element.value)
                this.state.tupu = "Admin: "+ element.name + " has the most requests with "+element.value + "# requests."
            }
        })
        return result.map(current => {
            return<Requests request={current}/>
        })

      }

      requestListCalidad() {
        let repet = new Map();
        console.log(this.state.requests)
        this.state.requests.forEach((element) => {
            console.log(element)
            if(element.admin && element.calidad == this.state.calidad){
                
                if(repet.has(element.admin)){
                    let aux = repet.get(element.admin)
                    repet.delete(element.admin)
                    repet.set(element.admin, aux+1)
                    
                }else {
                    repet.set(element.admin, 1)
                }
            }
            
        })
        const  result = Array.from(repet).map(([name, value]) => ({name, value}))
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

    onChangeDateBegin(date){
        if(date>this.state.dateEnd){
            window.alert("Please select valid date");
        }else{
            this.setState({
                dateBegin: date
            })
        }
    }

    onChangeDateEnd(date){
        if(date<this.state.dateBegin){
            window.alert("Please select valid date");
        }else{
            this.setState({
                dateEnd: date
            })
        }
    }

    checkDate(e){
        this.state.filteredRequests = []
        e.preventDefault();
        const hasAdmin = [];
        this.state.requests.map(currentRequest => {
            if (currentRequest.admin){
                hasAdmin.push(currentRequest)
            }
        })
        
        hasAdmin.map(currentRequest => {
            if(Date.parse(this.state.dateBegin)<Date.parse(currentRequest.date) &&
            Date.parse(this.state.dateEnd)>Date.parse(currentRequest.date)){
                this.state.filteredRequests.push(currentRequest)
            }

        })
        this.requestFilteredList();
        this.forceUpdate();

    }

    onChangeCalidad(calidad){
        this.setState({
            calidad: calidad["value"]
        })
        console.log(this.state.calidad)
    }

    render(){
        const options = [
            { value: 'bueno', label: 'bueno' },
            { value: 'muy bueno', label: 'muy bueno' },
            { value: 'normal', label: 'normal' }
          ]
        return(
            <div>
                <NavbarAdmin/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5>From: </h5>
                            <DatePicker
                                selected={this.state.dateBegin}
                                onChange={this.onChangeDateBegin}
                            />
                        </div>
                        <div className="col">
                            <h5>To: </h5>
                            <DatePicker
                                selected={this.state.dateEnd}
                                onChange={this.onChangeDateEnd}
                            />
                        </div>

                        <div className="w-100"></div>
                        <div className="col">
                            <button 
                                className="btn btn-primary"
                                onClick={this.checkDate}
                            >Filter</button>
                        </div>

                    </div>
                    <div className = "row">
                    <div className="col">
                            <Select options={options} onChange={this.onChangeCalidad}/>
                        
                        </div>
                        <div className="col">
                            <button 
                                className="btn btn-primary"
                                onClick={this.requestListCalidad}
                            >Filter Calidad</button>
                        </div>
                    </div>
                    <div className="row">
                        <Alert style={this.state.tupu ? {} : { display: 'none' }} variant="success">{this.state.tupu}</Alert>
                    </div>
                    <div className="row">
                        
                        <h3>Filtered Requests</h3>
                            <Table responsive>
                            <thead className="thead-light">
                                <tr>
                                <th>Admin</th>
                                <th>N° Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.requestFilteredList() }
                            </tbody>
                            </Table>
                    </div>
                    <div className="row">
                        
                        <h3>Total Requests Table</h3>
                            <Table responsive>
                            <thead className="thead-light">
                                <tr>
                                <th>Admin</th>
                                <th>N° Requests</th>
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

CompareRequests.propTypes = {
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    {logoutAdmin}
  )(CompareRequests)