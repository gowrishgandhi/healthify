import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUser } from '../../actions/auth';

const Dashboard = ({ 
  auth: { user }, history, loadUser
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if(user === null || user === undefined)
      loadUser();         
  }, [loadUser]);

  useEffect(() => {

  if(user != undefined && user !== null && user.ltype !== undefined && user.ltype.toString() === "C")
      {
        navigate("/admin");
      } 
      
    if(user != undefined && user !== null && user.ltype !== undefined && user.ltype.toString() === "P")
    {
      navigate("/home");
    } 

    if(user != undefined && user !== null && user.ltype !== undefined && user.ltype.toString() === "D")
      {
        navigate("/dhome");
      } 
    }, []);

  return user && ( 
      user.ltype !== null && user.ltype !== undefined && user.ltype.toString() === "C" ?
        <Navigate to="/admin" /> :      

        (user.ltype !== null && user.ltype !== undefined && user.ltype.toString() === "P" ?
         <Navigate to="/home" /> :

          user.ltype !== null && user.ltype !== undefined && user.ltype.toString() === "D" &&
         <Navigate to="/dhome" />
        
         
        ) 
    
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Dashboard);
