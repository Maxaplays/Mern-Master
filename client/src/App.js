import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AdminLogin from "./components/auth/AdminLogin";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard"
import createRequest from "./components/dashboard/createRequest";
import editRequest from "./components/dashboard/editRequest";
import PrivateRouteAdmin from "./components/private-route/PrivateRouteAdmin";
import AcceptRequest from "./components/dashboard/acceptRequest";
import MyRequestsAdmin from "./components/dashboard/MyRequestsAdmin";
import CompareRequests from "./components/dashboard/compareRequests"

import "./App.css";
import Price from "./components/dashboard/Price";





// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login-admin" component={AdminLogin}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/createRequest" component={createRequest} />
              <PrivateRoute exact path="/edit/:id" component={editRequest} />
            </Switch>
            <Switch>
              <PrivateRouteAdmin exact path="/admin-dashboard" component = {AdminDashboard}/>
              <PrivateRouteAdmin exact path="/admin-accept/:id" component = {AcceptRequest}/>
              <PrivateRouteAdmin exact path="/admin-myRequests" component = {MyRequestsAdmin}/>
              <PrivateRouteAdmin exact path="/admin-compareRequests" component = {CompareRequests}/>
              <PrivateRouteAdmin exact path="/price" component = {Price}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
