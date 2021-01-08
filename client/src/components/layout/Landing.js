import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {  
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  
  render() {
    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div className="col center-align">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                SignUp
              </Link>
              </div>
        
            <div className="col center-align">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
              >
                Log In
              </Link>
              </div>
          </div>
          <div>
            <div className="col s12 center-align">
              <Link className="waves-effect waves-light hoverable"
                to="/login-admin"
              >
                  Log in as Admin
              </Link>
            </div>
          </div>
      </div>
    );
  }
}

export default Landing;
