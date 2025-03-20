import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import tnimage from "../../img/doc.png";
import { Alert, Button, Card } from "antd";
import { CaretRightOutlined, LoginOutlined } from "@ant-design/icons";

const Landing = ({ isAuthenticated }) => {
	const navigate = useNavigate();

	if (isAuthenticated) {
		navigate("/dashboard");
	}

	return (
		<div className="w-full bg-gray-50 h-[calc(100vh-60px)] items-center justify-center flex flex-col">
			<Card className="mt-10">
				<div className="flex flex-col items-center justify-center">
					<img className="h-20 w-20" src={tnimage} alt="" />
					<h2 className="font-semibold text-2xl mt-4">
						E-Healthify
					</h2>
					<h3 className="text-lg">One stop solution for your health</h3>
					<Link to={"/login"}>
						<Button
							type="primary"
							icon={<LoginOutlined />}
							className="mt-4"
							size="large"
						>
							Click to Login
						</Button>
					</Link>
					<Link to={"/register"}>
						<Button
							type="primary"
							icon={<LoginOutlined />}
							className="mt-4"
							size="large"
						>
							Register 
						</Button>
					</Link>
					<Alert
						className="mt-4"
						description={
							<div>
								<li className="">
									{" "}
									<CaretRightOutlined />
									Kindly register as new patient
								</li>
								<li className="">
									{" "}
									<CaretRightOutlined />
									Login and check doctors
								</li>
								<li className="">
									{" "}
									<CaretRightOutlined />
									Make appointment {" "}
								</li>
								<li className="">
									{" "}
									<CaretRightOutlined />
									Confirm appointment {" "}
								</li>
								<li className="">
									{" "}
									<CaretRightOutlined />
									Get consultation from doctor {" "}
								</li>
							</div>
						}
						message={<div className="underline font-medium">INSTRUCTIONS</div>}
					></Alert>
				</div>
			</Card>

			
		</div>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
