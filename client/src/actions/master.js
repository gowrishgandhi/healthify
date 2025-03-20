import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE, ATTACH_PROFILE, SET_DBCALL, RESET_DBCALL

} from './types';

//Create or Update Profile

export const clearProfile = (navigate, step) => async dispatch => {
  try {
  dispatch({
    type: CLEAR_PROFILE,
    payload: null
  });

  console.log("clearning");
  
  navigate("/admin");  
  // if(step === "1")
  //   navigate("/contact");
  // else if(step === "2")
  //   navigate("/bank");
  // else if(step === "3")
  //   navigate("/course");
  // else if(step === "4")
  //   navigate("/facility");
  // else if(step === "5")
  //   navigate("/download");
  // else
  //   navigate("/home");
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



// Update Contact
export const updateContact = (formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/master/update${formData._id}`,
        formData,
        config
      );

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


export const addContact = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'            
        }
    }    
   // const body = JSON.stringify(formData);
   console.log("got");
   
    try {
  
      dispatch(setAlert("Please wait. Details will be Added.", 'danger'));

          const res2 = await axios.post('/api/master/create', formData, config);
          //console.log("Returned from db");
          //console.log(res2.data);
    
          dispatch(setAlert("Details Saved Successfully", 'primary'));
    
          dispatch({
                type: CLEAR_PROFILE,
                payload: res2.data
            });
          
          
  
    } catch (err) {
  
        console.log("Catch");
        
       // dispatch(setAlert(err.response.data.msg, 'danger'));
        
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


export const listContact = username => async dispatch => {
    try {

    //console.log("Invoking get profile by ID");
    console.log(username);

      const res = await axios.get(`/api/master/getdoctors/${username}`);

      //console.log("received reply ");
      //console.log(res);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });      
      
      //console.log(res.data);
      //console.log("Invoking get profile by ID");
      //const res2 = await axios.get(`/api/master/cor/log/${appId}`);
  
      //dispatch({
      //  type: LOG_PROFILE,
      //  payload: res2.data
      //});      

      
      
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


export const bookAppointment = (formData) => async dispatch => {
  const config = {
      headers: {
          'Content-type': 'application/json'            
      }
  }    
 // const body = JSON.stringify(formData);
 console.log("got");
 
  try {

    dispatch(setAlert("Please wait. Your Appointment will be booked.", 'danger'));

        const res2 = await axios.post('/api/master/bookapp', formData, config);
        //console.log("Returned from db");
        //console.log(res2.data);
  
        dispatch(setAlert("Details Saved Successfully", 'primary'));
  
        dispatch({
              type: CLEAR_PROFILE,
              payload: res2.data
          });
        
        

  } catch (err) {

      console.log("Catch");
      
     // dispatch(setAlert(err.response.data.msg, 'danger'));
      
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


export const listapp = username => async dispatch => {
  try {

  //console.log("Invoking get profile by ID");
  console.log(username);

    const res = await axios.get(`/api/master/getappoints/${username}`);

    //console.log("received reply ");
    //console.log(res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });      
    
    //console.log(res.data);
    //console.log("Invoking get profile by ID");
    //const res2 = await axios.get(`/api/master/cor/log/${appId}`);

    //dispatch({
    //  type: LOG_PROFILE,
    //  payload: res2.data
    //});      

    
    
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


export const listdoctorsapp = username => async dispatch => {
  try {

  //console.log("Invoking get profile by ID");
  console.log(username);

    const res = await axios.get(`/api/master/getappointsdoctor/${username}`);

    //console.log("received reply ");
    //console.log(res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });      
    
    //console.log(res.data);
    //console.log("Invoking get profile by ID");
    //const res2 = await axios.get(`/api/master/cor/log/${appId}`);

    //dispatch({
    //  type: LOG_PROFILE,
    //  payload: res2.data
    //});      

    
    
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
