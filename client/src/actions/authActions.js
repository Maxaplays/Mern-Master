import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";


import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING,
   ADMIN_LOADING, SET_CURRENT_ADMIN } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const listuser  = user => {
  return axios
    .post("/api/users/listuser", user)
    .then(res => {
       return res.data;
    })
    .catch(err =>{
      console.log(err);
    }
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};





// Login - get admin token
export const loginAdmin = adminData => dispatch => {
  axios
    .post("/api/admins/login", adminData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get admin data
      const decoded = jwt_decode(token);
      // Set current admin
      dispatch(setCurrentAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const listadmin  = admin => {
  return axios
    .post("/api/admins/listadmin", admin)
    .then(res => {
       return res.data;
    })
    .catch(err =>{
      console.log(err);
    }
    );
};

// Set logged in admin
export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};

// Admin loading
export const setAdminLoading = () => {
  return {
    type: ADMIN_LOADING
  };
};

// Log admin out
export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current admin to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentAdmin({}));
};

// Dashboard Data
// export const Dload_data = (SearchName, history) => dispatch => {
//   axios
//     .post("/api/users/loaddata", SearchName)
//     .then(res => history.push("/dashboard"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };