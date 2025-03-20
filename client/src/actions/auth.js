import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_ALLCANDS
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};


export const changepass = (formData, navigate) => async dispatch => {
  const config = {
      headers: {
          'Content-type': 'application/json'            
      }
  }

  //const body = JSON.stringify(formData);
 
  try {
      console.log("dispatched");
      console.log(formData);

      if(formData.password !== formData.password2)
        dispatch(setAlert("Passwords dont match", 'danger'));
      else {
      const res = await axios.post('/api/users/changepass', formData, config);
      //console.log("Returned from db");
      console.log(res.data);      

      navigate("/home");
      dispatch(setAlert("Password changed Successfully", 'success'));
      
      }



  } catch (err) {

      const errors = err.response.data.errors;

      if(errors) {
          errors.forEach(error => {
              dispatch(setAlert(error.msg, 'danger'));
          });
      }
  }
};


//register



export const register = (formData) => async dispatch => {
  const config = {
      headers: {
          'Content-type': 'application/json'            
      }
  }

  //const body = JSON.stringify(formData);
 
  try {
      console.log("dispatched");
      const res = await axios.post('/api/users/reg', formData, config);
      console.log("Returned from db");
      
      dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
      });

      dispatch(setAlert("Registration Successful. Kindly login using your email address", 'success'));

      dispatch(loadUser());

  } catch (err) {
    console.log("Error");
      console.log(err.response.status);
      const errors = err.response.data.errors;

      if(errors) {
          errors.forEach(error => {
              dispatch(setAlert(error.msg, 'danger'));
          });
      }
      dispatch({
          type: REGISTER_FAIL
      });
  }
};


// Login User
export const login = (username, password, ltype) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ username, password, ltype });
  
    try {
      const res = await axios.post('/api/auth', body, config);

      console.log(res.data);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
      
    } catch (err) {
      console.log(err.response.status);
      const errors = err.response.data.errors;
      
      if(errors) {
        errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'));
        });
    }
    dispatch({
        type: LOGIN_FAIL
    });
      
    }
  };
  
  // Logout / Clear Profile
  export const logout = () => dispatch => {
    //dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: CLEAR_ALLCANDS });
  };
  