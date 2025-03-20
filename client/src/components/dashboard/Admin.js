import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addContact, clearProfile, listContact} from '../../actions/master';
import { loadUser } from '../../actions/auth';
import {Card, ListGroup, CardSubtitle, CardTitle, CardText, ListGroupItem, CardBody,
  Row, Col} from 'reactstrap';

import {
	DEPARTMENTS
} from "../../Constant";
import RDashItem from './RDashItem';

const Admin = ({
  auth: { user }, profile: {profile},  loadUser, addContact, listContact, clearProfile
}) => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '', 
    dept: DEPARTMENTS.filter(e => e.key.toString() === "1").map(e => e.label)[0], 
    mobile: '', email: '', exp: '', quali: '', posi: ''
});

const [displaySpecialInputs, toggleSpecialInputs] = useState(false);

const { name, dept, mobile, email, exp, quali, posi} = formData;


  const getalldoctors22 = async e => {
    e.preventDefault();     
    
    //console.log("Appln number : "+ formData.gappid);         
    
    await listContact(123);    

    //console.log(profile);
   
    
  };

  const onSubmit = async e => {
    e.preventDefault();  
    console.log("on submit");    

    const tobesent = {};    
    tobesent.name = formData.name;
    tobesent.email = formData.email;
    tobesent.exp = formData.exp;
    tobesent.mobile = formData.mobile;
    tobesent.quali = formData.quali;
    tobesent.posi = formData.posi;
    tobesent.dept = DEPARTMENTS.filter(e => e.label.toString() === formData.dept.toString()).map(e => e.key)[0];
      
      console.log(tobesent);
      addContact(tobesent); 
      
      clearProfile(navigate, 10);

      navigate("/login");
  };

  const onCancel = async e => {
    e.preventDefault();  
    alert("cancel");

    navigate("/home");
  }

  
  const cleardoctos = async e => {
    e.preventDefault();     
    
    //console.log("Appln number : "+ formData.gappid);         
   // alert("clearing profiles");
    clearProfile(navigate, 10);
    navigate("/login");
    
  };

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  
      return (
    <section className="container">
      {/* <h1 className="large text-primary">{user.tfcname}</h1> */}
      <div className=''>
      <h4> Add/ Remove Doctors </h4>
      <h4>
        <i className="fas fa-list" /> Administration System
      </h4>

      <h5 style={{textAlign: 'center', color: "navy", fontSize: "11pt", fontWeight: "bolder"}}> . </h5>

              

                <div className="form" style={{display: ""}}>
              
              
                <input type='submit' className='btn btn-primary' onClick={ e => getalldoctors22(e) } value="Show all Doctors"/>
                <input type='submit' className='btn btn-warning text-white' onClick={ e => cleardoctos(e) } value="Clear Display"/>         

                <input type='submit' className='btn btn-primary text-white'  onClick={() => toggleSpecialInputs(!displaySpecialInputs)} value="Add New  Doctor"/> 

                <div className="grid-4 my-1 p-3">  
                

                {profile && profile != undefined && profile.docs !== undefined  && profile.docs !== null && profile.docs.length > 0 ? (
                  
                  profile.docs.map((mydata, i) => (                                  
                    <RDashItem key={i} candprofile={mydata}/> 
                  ))        
                  
                ) : null }
    

                </div>

                {profile == null && displaySpecialInputs && 

                        <div className="grid-25">
                                
                        <div className="badge2 but-center">
                        <h4 style={{color: "black", fontWeight: "bold", textAlign: "center"}}> Add New Doctor </h4>
                        </div>

                        <form className="form" onSubmit={onSubmit} > 

                          <div className='form-group'>
                            
                            <input
                              id='name'
                              type='text'
                              name='name'
                              value={name}
                              onChange={onChange}
                              required
                              minLength='8'
                              placeholder='Doctor Name'

                            />
                          </div>   

                          <div className='form-group'>
                            
                            <input
                              id='quali'
                              type='text'
                              name='quali'
                              value={quali}
                              onChange={onChange}
                              required
                              minLength='4'
                              placeholder='Qualification'

                            />
                          </div>   

                         <div className='form-group'>
                            
                            <input
                              id='posi'
                              type='text'
                              name='posi'
                              value={posi}
                              onChange={onChange}
                              required
                              minLength='8'
                              placeholder='Designation'

                            />
                          </div> 
                          <div className='form-group'>

                          <select name="dept" value={dept} onChange={onChange}>
                                                  {DEPARTMENTS.map((ek) => (
                                                    <option key={ek.key}> {ek.label} </option>
                                                  ))}
                                                </select>
                          </div>

                          <div className='form-group'>
                            
                            <input
                              id='email'
                              type='email'
                              name='email'
                              value={email}
                              onChange={onChange}
                              required
                              minLength='8'
                              placeholder='Email Address'

                            />
                          </div>


                         

                          <div className='form-group'>
                            
                            <input
                              id='exp'
                              type='number'
                              name='exp'
                              value={exp}
                              onChange={onChange}
                              required
                              
                              placeholder='Total Experience in Years'
                            />
                          </div>

                          <div className='form-group'>
                            
                            <input
                              id='mobile'
                              type='number'
                              name='mobile'
                              value={mobile}
                              onChange={onChange}
                              required
                              minLength='10'
                              
                              placeholder='Mobile Number'
                            />
                          </div>

                          

                          <div className='row'>
                          <input 
                            type='submit'
                            value='Save'
                            className='form-control btn btn-primary'
                          />
                          
                          </div>
                          </form>

                    </div>

                  }


                </div>               

    
          </div>
    </section>
  );
};

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
  listContact: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile, 
});

export default connect(mapStateToProps, { loadUser, addContact, listContact , clearProfile})(
  Admin
);
