import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE, ATTACH_PROFILE

} from './types';

//Create or Update Profile

export const savecomments = (formData, navigate) => async (dispatch) => {
    try {
      const res = await axios.put('/api/admin/addcomments', formData);
  
      dispatch({
         type: CLEAR_PROFILE,         
       });
  
      dispatch(setAlert('Comments Added', 'success'));
  
      navigate('/admin');
      
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  

export const getalldoctors = () => async dispatch => {
    try {
    const res = await axios.get(`/api/admin/getdoctors/${123}`);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.msg
      });
    }
  };


  export const addnewdoctor = (username) => async dispatch => {
    try {
  
    console.log("Invoking mapping");
    console.log(username);
  
  
    const res = await axios.get(`/api/admin/chmapping/${username}`);
  
      //console.log("received reply ");
      console.log(res);
  
  
   
      console.log("completed");
    
      
    } 
    
    catch (err) {
  
        console.log("Catch");
        
        //dispatch(setAlert(err.response.data.msg, 'danger'));
        
        /*console.log(err.response.data);
        const errors = err.response.data;
  
        if(errors) {
            errors.forEach(error => dispatch(setAlert(errors, 'danger')));
        }*/
  
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
  
    }
  };


  
  export const runmbamcaseats = (username) => async dispatch => {
    try {
  
    console.log("Invoking mapping");
    console.log(username);
  
  
    const res = await axios.get(`/api/admin/chmappingmbamca/${username}`);
  
      //console.log("received reply ");
      console.log(res);
  
  
   
      console.log("completed");
    
      
    } 
    
    catch (err) {
  
        console.log("Catch");
        
        //dispatch(setAlert(err.response.data.msg, 'danger'));
        
        /*console.log(err.response.data);
        const errors = err.response.data;
  
        if(errors) {
            errors.forEach(error => dispatch(setAlert(errors, 'danger')));
        }*/
  
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
  
    }
  };

  
  export const runchoicesseats = (username) => async dispatch => {
    try {
  
    console.log("Invoking mapping");
    console.log(username);
  
  
    const res = await axios.get(`/api/admin/chmappingseats/${username}`);
  
      //console.log("received reply ");
      console.log(res);
  
  
   
      console.log("completed");
    
      
    } 
    
    catch (err) {
  
        console.log("Catch");
        
        //dispatch(setAlert(err.response.data.msg, 'danger'));
        
        /*console.log(err.response.data);
        const errors = err.response.data;
  
        if(errors) {
            errors.forEach(error => dispatch(setAlert(errors, 'danger')));
        }*/
  
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
  
    }
  };

  
  export const runaddseats = (username) => async dispatch => {
    try {
  
    console.log("Invoking mapping");
    console.log(username);
  
  
    const res = await axios.get(`/api/admin/addseats/${username}`);
  
      //console.log("received reply ");
      console.log(res);
  
  
   
      console.log("completed");
    
      
    } 
    
    catch (err) {
  
        console.log("Catch");
        
        //dispatch(setAlert(err.response.data.msg, 'danger'));
        
        /*console.log(err.response.data);
        const errors = err.response.data;
  
        if(errors) {
            errors.forEach(error => dispatch(setAlert(errors, 'danger')));
        }*/
  
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
  
    }
  };