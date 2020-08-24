import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../store/utility";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email Address",
				},
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
				value: "",
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
				value: "",
			},
		},
		isSignUp: true,
	};

	inputChangedHandler = (e, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: e.target.value,
				valid: checkValidity(e.target.value, this.state.validation),
				touched: true,
			}),
		});
		this.setState({ controls: updatedControls });
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchAuthMode = () => {
		this.setState((prevState) => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}
		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				touched={formElement.config.touched}
				shouldValidate={formElement.config.validation}
				invalid={!formElement.config.valid}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				value={formElement.config.value}
				elementConfig={formElement.config.elementConfig}
				elementType={formElement.config.elementType}
			/>
		));
		if (this.props.loading) {
			form = <Spinner />;
		}
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>this.props.error.message</p>;
		}
		let authRedirect = null;
		if (this.props.user) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		return (
			<div className={classes.AuthForm}>
				{authRedirect}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">
						{this.state.isSignUp ? "Sign Up" : "Sign In"}
					</Button>
				</form>
				<Button
					disabled={this.props.user ? true : false}
					clicked={this.switchAuthMode}
					btnType="Danger"
				>
					{this.state.isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
				</Button>
				<Button
					clicked={this.props.logout}
					disabled={this.props.user ? false : true}
					btnType="Danger"
				>
					Sign Out
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		user: state.auth.user,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		logout: () => dispatch(actions.logout()),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
