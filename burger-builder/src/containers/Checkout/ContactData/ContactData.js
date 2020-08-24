import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../components/hoc/withErrorHandler/WithErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from '../../../store/utility'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				value: "",
			},
			street: {
				elementType: "text",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				value: "",
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP CODE",
				},
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
				value: "",
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				validation: {
					required: true,
				},
				touched: false,
				valid: false,
				value: "",
			},
			email: {
				elementType: "email",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail",
				},
				validation: {
					required: true,
				},
				touched: false,
				valid: false,
				value: "",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				validation: {},
				valid: true,
				value: "fastest",
			},
		},
		formIsValid: false,
		loading: false,
	};

	inputChangedHandler = (e, formElementId) => {
		const updatedOrderFormElement = updateObject(this.state.orderForm[formElementId],{
			value:e.target.value,
			valid: checkValidity(e.target.value, this.state.orderForm[formElementId].validation),
			touched: true
		}) 
		const updatedOrderForm = updateObject(this.state.orderForm, { [formElementId]: updatedOrderFormElement })
		updatedOrderForm[formElementId] = updatedOrderFormElement;

		let formIsValid = true;
		for (let input in updatedOrderForm) {
			formIsValid = updatedOrderForm[input].valid && formIsValid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	

	orderHandler = (e) => {
		e.preventDefault();
		const customerData = {};
		for (let formElementId in this.state.orderForm) {
			customerData[formElementId] = this.state.orderForm[
				formElementId
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: customerData,
			userId: this.props.userId
		};
		this.props.onOrderBurger(order);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						touched={formElement.config.touched}
						shouldValidate={formElement.config.validation}
						invalid={!formElement.config.valid}
						changed={(event) =>
							this.inputChangedHandler(event, formElement.id)
						}
						key={formElement.config.id}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						elementType={formElement.config.elementType}
					/>
				))}
				<Button
					disabled={!this.state.formIsValid}
					clicked={this.orderHandler}
					btnType="Success"
				>
					Place Order
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		userId: state.auth.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
