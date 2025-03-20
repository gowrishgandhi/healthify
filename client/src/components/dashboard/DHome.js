import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listdoctorsapp} from "../../actions/master";
import { DEPARTMENTS } from "../../Constant";
import { loadUser } from "../../actions/auth";
import { Alert, Button, Card } from "antd";

const DHome = ({
    auth: { user },
    profile: { profile },
  
    listdoctorsapp

}) => {
    const navigate = useNavigate();	

    const [formData, setFormData] = useState({
        doa: '', pname: '', dname:'', slot: '', desc: ""
      });

    const { doa, pname, dname, slot, desc } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    // const handleRow = async (i) => {
    //     const tobesent = {};
    //     //tobesent.dname = profile.docs.filter(e=>e._id === i).map(e => e.name)[0];
    //     tobesent.demail = profile.docs.filter(e=>e._id === i).map(e => e.email)[0];
    //     tobesent.doa = formData.doa;
    //     tobesent.desc = formData.desc;
    //     tobesent.pemail = user.username;		
    //     //alert(tobesent.email);		
    //     console.log(tobesent);
    //     await bookAppointment(tobesent);        
        
    //   }

    
    const checkDoctorsapp = async() => {
        // get the doctors list
        //alert("gtp");
        await listdoctorsapp(user.email); 
    };

    // const checkAppointments = async() => {
    //     // get the doctors list
    //     //alert("gtp");
    //     await listapp(user.username); 
    // };
    

      
      const doctorsapps = profile !== null && profile !== undefined && profile.apps !== undefined && profile.apps.map((doc) => (
        <tr key={doc._id}>	
        <td>{doc.doa}</td>      	
        <td>{doc.pname} </td>      
        <td>{doc.desc}</td>      
        <td>{doc.pemail} </td>     		  				      
        </tr>
    ));

    return (
        <div className="container22">
            <Card className="w-[80%] shadow-md">
                {/* <h1 className="large text-primary">{user.tfcname}</h1> */}
                <div className="">
                    <Alert
                        message={
                            <div>
                                <h4 className="font-semibold text-lg">
                                    Doctor Management System
                                </h4>
                                <h4 className="text-md">
                                    Welcome -- {user && user.name} 
                                </h4>
                            </div>
                        }
                    />

                    <div className="profile-top mt-6">
                        <table className="table" style={{ border: "1px ridge", fontWeight: "bold", color: "navy" }}>
                            <thead>
                                <tr>
                                    <th>Step</th>
                                    <th>Description</th>
                                    
                                    <th>Options</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tr>
                                <td>1</td>
                                <td> Check Appointments </td>
                                
                                <td>
                                    {" "}
                                    <Button onClick={checkDoctorsapp}>
                                        Click Here
                                    </Button>{" "}
                                </td>
                            </tr>                           
                            
                            
                        </table>
                    </div>
                </div>
            </Card>

            
            {profile !== null && profile !== undefined && profile.apps !== null && profile.apps !== undefined &&
                <>	
                <table className="table">
                        <thead>
                        <tr>
                            
                            <th className="hide-sm">Date</th>							
                            <th className="hide-sm">Patient Name</th>
                            <th className="hide-sm">Description</th>
                            <th className="hide-sm">Email ID</th>
                            
                        </tr>
                        </thead>
                        <tbody>							
                            {doctorsapps}
                        </tbody>
                    </table>
                </>
            }   

             
                
        </div>

        
    );
};

DHome.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
   
    loadUser: PropTypes.func.isRequired,
    listdoctorsapp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {
    
    loadUser, listdoctorsapp
    
})(DHome);
