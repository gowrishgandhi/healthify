import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Button, Card } from "antd";

const Login = ({ login, loggedIn }) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "", ltype: "P"
	});

	const { username, password, ltype } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("authenticated value: " + loggedIn);
		//alert(username);
		//alert(ltype);
		login(username, password, ltype);
	};

	if (loggedIn) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<Fragment>
			
				<Card className="container22" title="Admin / Doctor / Patient Login">
					<div className="w-[500px]">
						<form className="form" onSubmit={(e) => onSubmit(e)}>
							<div className="m-0">
								<input
									type="text"
									className="rounded-lg p-2"
									placeholder="Type email address"
									name="username"
									value={username}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="password"
									placeholder="Type Password"
									className="rounded-lg p-2"
									name="password"
									value={password}
									onChange={(e) => onChange(e)}
									minLength="6"
								/>
							</div>
							<div className="form-group">   
                            <label className="form-text" style={{color: "crimson"}} htmlFor="bfil">
                            Login Type
                              </label>   
                              <select name="ltype" value={ltype} onChange = {e => onChange(e)} style={{width: "100%"}}>                                         
                              <option id="1" value="P">Patient</option>
							  <option  id="2" value="D">Doctor</option>
							  <option  id="3" value="P">Admin</option>
                              </select>
                   			 </div>    
							<Button type="primary" className="mt-2" size="large">
								<input
									type="submit"
									// className="my-2 btn btn-primary"
									// style={{ backgroundColor: "cornflowerblue" }}
									value="Login"
								/>
							</Button>
						</form>
					</div>
				</Card>
		
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = function (state) {
	return {
		loggedIn: state.auth.isAuthenticated
	};
};

/*const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
*/

export default connect(mapStateToProps, { login })(Login);
