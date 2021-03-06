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
				placeholder: "Your Name",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				value: "",
			},
			address: {
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				value: "",
			},
			zipCode: {
					type: "text",
					placeholder: "ZIP CODE",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
				value: "",
			},
			email: {
				validation: {
					required: true,
				},
				touched: false,
				valid: false,
				value: "",
			},
			deliveryMethod: {
				validation: {},
				valid: true,
				value: "fastest",
			},
		},
		formIsValid: false,
		loading: false,
	};

	// state = {
	// 	orderform: {
	// 		name: {
	// 			value: "",
	// 			isValid: false,

	// 		},
	// 		address:"",
	// 		zipCode: "",
	// 		email: "",
	// 		deliveryMethod: "Fastest"
	// 	},
	// 	formIsValid: false,
	// }

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
		console.log(formElementsArray)
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					
					<Input
						key={formElement.id}
						touched={formElement.config.touched}
						shouldValidate={formElement.config.validation}
						invalid={!formElement.config.valid}
						changed={(event) =>
							this.inputChangedHandler(event, formElement.id)
						}
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
				<form>
					<h4>Enter Your Order Details Below</h4>
					<input className={classes.Input} type="text" placeholder="Your Name" name="name" value={this.state.name.value}/>
					<input className={classes.Input} type="text" placeholder='Address' name="address" value={this.state.address.value}/>
					<input className={classes.Input} type="text" placeholder='Zip Code' name="zipCode" value={this.state.zipCode.value}/>
					<input className={classes.Input} type="text" placeholder='Your Email' name="email" value={this.state.email.value}/>
					<label className={classes.Label}>Delivery Method</label>
					<select name="deliveryMethod">
						<option value="Fastes">Fastest</option>
						<option value="Cheapest">Cheapest</option>
					</select>
					<Button disabled={!this.state.formIsValid} clicked={this.orderHandler} btnType="Success">Place Order</Button>
				</form>
				{/* {form} */}
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
