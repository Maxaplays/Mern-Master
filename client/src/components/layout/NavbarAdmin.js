import React, {Component} from "react";
import {Link} from "react-router-dom";

class NavbarAdmin extends Component {
    render(){
        return(
            <div className="navbar-expand-lg" style={{height: "200px"}}>
                <nav className=" z-depth-0">
                    <div className="container-fluid nav-wrapper" style={{backgroundColor: "black"}}>
                        <ul className="navbar-nav" style={{backgroundColor: "black"}}>
                        <li className="navbar-item">
                            <Link to="/admin-dashboard" className="navbar-item">Dashboard</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/admin-myRequests" className="navbar-item">My Requests</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/admin-compareRequests" className="navbar-item">Compare</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/price" className="navbar-item">Price</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavbarAdmin;