import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
	const authLinks = (
		<ul className="flex items-center justify-between w-[350px] mr-10">
			
				<ul>
					<Link to="/cpass">
						<span className="text-white bg-blue-500" style={{ fontSize: "11pt", padding: "5px" }}>
							Change Password
						</span>
					</Link>
				</ul>
			
			<ul>
				<Button type="primary">
				<Link to="/dashboard">
						<span className="font-medium">Home</span>
					</Link>
				</Button>
			</ul>
			<ul>
				<Button type="primary">
					<a onClick={logout} href="/">
						<span className="font-medium">Logout</span>
					</a>
				</Button>
			</ul>
		</ul>
	);

	const guestLinks = (
		<ul className="w-[350px] mr-4 text-center text-black">
			<Link className="text-black font-medium" to="/login">
				<Button type="primary" icon={<LoginOutlined />}>
					Login
				</Button>
			</Link>
			<> {"  "} </>
			<Link className="text-black font-medium" to="/register">
				<Button type="primary" icon={<LoginOutlined />}>
					Register
				</Button>
			</Link>
		</ul>
	);

	const coordLinks = (
		<ul>
			
			<Button type="primary">
					<a onClick={logout} href="/">
						<span className="font-medium">Reports</span>
					</a>
				</Button>
				{"  "}
			<Button type="primary">
					<a onClick={logout} href="/">
						<span className="font-medium">Logout</span>
					</a>
				</Button>
		</ul>
	);

	return (
		<nav className="w-full bg-white items-center justify-between shadow-xl flex h-[60px]">
			<ul className="w-[350px] ml-4 text-black">
				<Link className="text-black  text-lg font-semibold" to="/">
					Industrial Training Project
				</Link>
			</ul>
			<ul>
				<Link className="text-black font-semibold" to="/">
					E-HealthCare System
				</Link>
			</ul>

			{!loading && (
				<Fragment>
					{isAuthenticated
						? user !== null && user.ltype !== null && user.ltype === "C"
							? coordLinks
							: authLinks
						: guestLinks}
				</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
