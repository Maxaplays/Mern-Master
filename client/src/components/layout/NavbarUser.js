import React, {Component} from "react";
import { Link } from "react-router-dom";


class NavbarUser extends Component {
    render(){
        return(
            
            <div className="navbar-expand-lg" style={{height: "130px"}}>




                <nav className=" z-depth-0">
                    <div className="container-fluid nav-wrapper" style={{backgroundColor: "black"}}>
                        <ul className="navbar-nav" style={{backgroundColor: "black"}}>
                        <li className="navbar-item">
                            <Link to="/createRequest" className="navbar-item">Start Request</Link>

                        </li>
                        <li className="navbar-item">
                            <Link to="/dashboard" className="navbar-item">Dashboard</Link>

                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavbarUser;