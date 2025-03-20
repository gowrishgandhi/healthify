import React, {useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register, logout} from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

import {Card} from 'antd';

import PropTypes from 'prop-types';

const Register2 = ({ setAlert, register, isAuthenticated, logout }) => {

    const [formData, setFormData] = useState({
      username: '',     
      password: '',
      password2: '', age: '', name: '', bg: '', city: '', ltype: "P", mobile: ""
    });

    const navigate = useNavigate();

    const { username, age, password, password2, name, bg, city, ltype, mobile } = formData;


     if(isAuthenticated) {
      navigate("/login");
     } 

    const onSubmit = async e => {
      e.preventDefault();  
      console.log("on submit");    

      if(formData.password !== formData.password2)
        alert("Passwords dont match");
      else {
        console.log(formData);
        register(formData);  
        navigate("/");
        // if(isAuthenticated)    
        //   navigate("/dashboard");        
      }
    };
    
    
    const onChange = e => {
      setFormData({ ...formData, [e.target.name] : e.target.value });  
      //name: e.target.value to change name alone
      //console.log(e.target.value);
    }

    return(
      <Card className='container22 text-orange-400' title="Register as New Patient">
      <div className='' style={{fontWeight: "bolder"}}>
     
        <h1> Kindly Enter Patient Details </h1>
     
      <form className="form" onSubmit={onSubmit}>   

        <div className='form-group'>
          
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
            minLength='8'
            placeholder='Patient Name'

          />
        </div>   

        <div className='form-group'>
          
          <input
            id='username'
            type='email'
            name='username'
            value={username}
            onChange={onChange}
            required
            minLength='8'
            placeholder='Email address'

          />
        </div>


        <div className='form-group'>
          
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
            placeholder='type your password'
          />
        </div>
        <div className='form-group'>
          
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
            placeholder='re-enter your password'
          />
        </div>

        <div className='form-group'>
          
          <input
            id='age'
            type='number'
            name='age'
            value={age}
            onChange={onChange}
            required
            
            placeholder='Age'
          />
        </div>

        <div className='form-group'>
          
          <input
            id='bg'
            type='text'
            name='bg'
            value={bg}
            onChange={onChange}
            required
            
            placeholder='Blood Group'
          />
        </div>

        <div className='form-group'>
          
          <input
            id='city'
            type='text'
            name='city'
            value={city}
            onChange={onChange}
            required
            
            placeholder='City'
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
          value='Submit'
          className='form-control btn btn-primary'
        />
        <input 
          type='cancel'
          value='Cancel'
          className='form-control btn btn-white'
        />
      </div>
     
      </form>
    </div>
    </Card>
    )
};

Register2.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps, 
  {setAlert, register, logout}
) (Register2); 