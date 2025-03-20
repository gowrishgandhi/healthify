import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getstatusall, listContact, bookAppointment, listapp} from "../../actions/master";
import { DEPARTMENTS } from "../../Constant";
import { loadUser } from "../../actions/auth";
import { Alert, Button, Card } from "antd";

const Home = ({
	auth: { user },
	profile: { profile },
	listContact,
	loadUser, bookAppointment, listapp

}) => {
	const navigate = useNavigate();	

	const [formData, setFormData] = useState({
		doa: '', pname: '', dname:'', slot: '', desc: ""
	  });

	const { doa, pname, dname, slot, desc } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleRow = async (i) => {
		const tobesent = {};
		//tobesent.dname = profile.docs.filter(e=>e._id === i).map(e => e.name)[0];
		tobesent.demail = profile.docs.filter(e=>e._id === i).map(e => e.email)[0];
		tobesent.doa = formData.doa;
		tobesent.desc = formData.desc;
		tobesent.pemail = user.username;		
		//alert(tobesent.email);		
		console.log(tobesent);
		await bookAppointment(tobesent);        
		
	  }

	
	const checkDoctors = async() => {
		// get the doctors list
		//alert("gtp");
		await listContact(123); 
	};

	const checkAppointments = async() => {
		// get the doctors list
		//alert("gtp");
		await listapp(user.username); 
	};
	

	const doctorslist = profile !== null && profile !== undefined && profile.docs !== undefined && profile.docs.map((doc) => (
		<tr key={doc._id}>
			<td>{DEPARTMENTS.filter(e => e.key.toString() === doc.dept.toString()).map(e => e.label)[0]}</td>   
		<td>{doc.name}</td>      
		<td>{doc.quali}</td>      
		<td>{doc.posi}</td>      
		<td>{doc.exp}</td>   
		
      
      	<td> <button className="btn btn-dark" onClick={i => handleRow(doc._id)} > Book </button> </td>      
      
		</tr>
  	));

	
	  const doctorsapps = profile !== null && profile !== undefined && profile.apps !== undefined && profile.apps.map((doc) => (
		<tr key={doc._id}>	
		<td>{doc.doa}</td>      	
		<td>{doc.dname} , {DEPARTMENTS.filter(e => e.key.toString() === doc.dept.toString()).map(e => e.label)[0]} </td>      
		<td>{doc.desc}</td>      		  				      
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
									Patient Management System
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
								<td> Book an Appointment </td>
								
								<td>
									{" "}
									<Button onClick={checkDoctors}>
										Click Here
									</Button>{" "}
								</td>
							</tr>
							<tr>
								<td>2</td>
								<td> Find your Appointment </td>
								
								<td>
									{" "}
									<Button onClick={checkAppointments}>
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
							<th className="hide-sm">Doctor Name / Department</th>
							<th className="hide-sm">Description</th>
							
						</tr>
						</thead>
						<tbody>							
							{doctorsapps}
						</tbody>
					</table>
				</>
      		}   

			{profile !== null && profile !== undefined && profile.docs !== null && profile.docs !== undefined &&
				<>		
				<div className="my-2 profile-form"> To Book an Appointment, Kindly Fill the following Details </div>			
				<form className="form">
				<div className="form-group">
				<label style={{color: "darkred"}}>Briefly explain your problem*</label>
				<textarea
					name="desc"
					cols="40"
					rows="3"
					placeholder="Describe your problem"
					value={desc}
					onChange={onChange}
					required = {true}
				/>				
				</div>
				 				
				<div className="form-group">
				<label style={{color: "darkred"}}>Date of Appointment*</label>
				<input type="date"  style={{color: "darkblue", fontWeight: "bold"}}                 
							onChange={ onChange }        
							name="doa"                                                    
							value={doa}     
							id = "doa"                     
				/>          
				</div> 

				</form>
				<label style={{color: "darkred"}}>Select the Doctor and Click Book*</label>
					<table className="table">
						<thead>
						<tr>
							
							<th className="hide-sm">Department</th>
							<th className="hide-sm">Doctor Name</th>
							<th className="hide-sm">Qualification</th>
							<th className="hide-sm">Designation</th>
							<th className="hide-sm">Years of Experience</th>     
							<th className="hide-sm">Select</th>               
							
						</tr>
						</thead>
						<tbody>							
							{doctorslist}
						</tbody>
					</table>
				</>
      		}      
				
		</div>

		
	);
};

Home.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	listContact: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
	bookAppointment: PropTypes.func.isRequired,
	listapp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, {
	
	loadUser, listContact, bookAppointment, listapp
	
})(Home);
