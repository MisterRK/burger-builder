import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

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

	checkValidity(value, rules) {
		console.log("value, rules", value, rules);
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		// console.log("isValid", isValid)
		return isValid;
	};

	inputChangedHandler = (e, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: e.target.value,
				valid: this.checkValidity(
					e.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};
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
		if(this.props.loading){
			form = <Spinner/>
		}
		let errorMessage = null;
		if(this.props.error){
			errorMessage = (
				<p>this.props.error.message</p>
			)
		}
		return (
			<div className={classes.AuthForm}>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">
						{this.state.isSignUp ? "Sign Up" : "Sign In"}
					</Button>
				</form>
				<Button clicked={this.switchAuthMode} btnType="Danger">
					{this.state.isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		 error: state.auth.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
