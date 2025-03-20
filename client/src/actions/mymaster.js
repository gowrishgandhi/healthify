import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_APPLNS, GET_PROFILE2, CLEAR_PROFILE3, GET_PROFILE22
     
} from './types';

//Create or Update Profile


export const updfile = (formData, history) => async dispatch => {
    try {

        //dispatch(setAlert("Processing...", 'danger'));

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        //console.log(formData);
        //console.log("Received from Client" + formData.vflag);
        var res = null;
        
            res = await axios.post('api/upload/upload', formData, config);

        //console.log("dispatched updatecv for " + formData._aid);
        //console.log(formData);


        
        dispatch(setAlert(res.data.msg, 'primary'));

        //dispatch({
        //    type: GET_PROFILE,
        //    payload: res.data
        //});

        //dispatch( setAlert(formData.vflag === 'vcomplete' ? 'Completed Successfully' : 
          //      (formData.vflag === 'toupdate' ? 'Sent for Updation' : 
            //    (formData.vflag === 'present' ? 'Marked Present' : null)), 'primary'));
        
        //clearApplication();

        //console.log("Got after db");
        //console.log(res.data);
        //if(!edit) {        
        //}

    } catch (err) {

        console.log("Catch");


        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
};



export const listAll = (appId) => async dispatch => {
    try {        

        
        const res = await axios.get(`/api/upload/list/${appId}`);   

        console.log("result of list of docs");
        //if(!res && !res.data && !res.data.Contents) {
        console.log(res.data.Contents);

        dispatch({
            type: GET_PROFILE2,
            payload: res.data.Contents
        });        

    } catch (err) {

        console.log("Catch");

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
    
};


export const listAll2 = (appId, gid) => async dispatch => {
    try {        


        console.log("new mymaster");
        var cstr = appId + "_" + gid;

        const res = await axios.get(`/api/upload/list/${cstr}`);   

        console.log("result of list of docs");
        if(!res && !res.data && !res.data.Contents) {
        console.log(res.data.Contents);

        dispatch({
            type: GET_PROFILE22,
            payload: res.data.Contents
        });        
    }
    else {
        dispatch({
            type: GET_PROFILE22,
            payload: null 
        });        
    }


    } catch (err) {

        console.log("Catch");

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
};


export const delCert = (formData) => async dispatch => {
    try {

        console.log("Pass ", formData);

        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        const res = await axios.post(`/api/upload/delete`, formData, config);   

        console.log("deleted " + res.data );

        dispatch(setAlert("Deleting file... Pls Wait ", "success "));
        

    } catch (err) {

        console.log("Catch");

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
};




export const openCert = (appId) => async dispatch => {
    try {

        if(appId !== undefined) {

        console.log("Passing  " + appId);

        const res = await axios.get(`/api/upload/open/${appId}`);      

        console.log("list from db " + res.data );

        dispatch({
            type: GET_APPLNS,
            payload: res.data
        });        

    }


    } catch (err) {

        console.log("Catch");

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
};

