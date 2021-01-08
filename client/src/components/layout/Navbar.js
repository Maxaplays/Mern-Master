import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-expand-lg" style={{height: "130px", backgroundColor: "#1A1A1A"}}>
        <nav className=" z-depth-0" >
          <div className="container-fluid nav-wrapper white">
            <Link style={{backgroundColor: "#1A1A1A", color: "#FFFFFF"}}
              to="/"
              className="col s5 brand-logo center "
            >
              HomePage
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
