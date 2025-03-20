import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { changepass } from "../../actions/auth";
import { clearProfile } from "../../actions/master";
import { Button, Card, Tag } from "antd";

const CPass = ({
	auth: { user },
	profile: { profile },
	history,
	changepass,
	clearProfile
}) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		password: "",
		password2: ""
	});

	const { password, password2 } = formData;

	const goNext = () => {
		clearProfile(navigate, "0");
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		//name: e.target.value to change name alone
		//console.log(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const tobeSent = {};
		tobeSent.password = formData.password;
		tobeSent.password2 = formData.password2;
		if(user.ltype && user.ltype === "D")
			tobeSent.username = user.email;
		else
			tobeSent.username = user.username;
		tobeSent.ltype = user.ltype;		

		await changepass(tobeSent, navigate);
	};

	/* const goNext = () => {
    clearProfile(history, "1");
  };*/

	return (
		<div className="flex items-center bg-slate-50 justify-center">
			<section className="w-[50%]">
				<div className="container">
					<form className="form">
						<Card className="bordered bordered-2 border-black">
							<label className="but-center p-0 text-lg">
								{"Welcome "}
								{user && user.name} 
							</label>
						</Card>

						<Tag color="purple" className="my-2 font-bold  but-center text-xl">
							Change Password
						</Tag>

						<Card className="bordered bordered-2 border-black">
							<div className="form-group">
								<label className="label" htmlFor="password">
									Enter new Password
								</label>
								<input
									id="password"
									type="password"
									name="password"
									value={password}
									onChange={onChange}
									required
									minLength="6"
								/>
							</div>
							<div className="form-group">
								<label className="label" htmlFor="password2">
									Confirm new Password
								</label>
								<input
									id="password2"
									type="password"
									name="password2"
									value={password2}
									onChange={onChange}
									required
									minLength="6"
								/>
							</div>
						</Card>
					</form>
					<br />
					<Button type="primary" size="large" onClick={onSubmit}>
						Save
					</Button>
					<Button className="ml-2" size="large" onClick={goNext}>
						Go Back
					</Button>
				</div>
			</section>
		</div>
	);
};

CPass.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	changepass: PropTypes.func.isRequired,
	clearProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { changepass, clearProfile })(CPass);
