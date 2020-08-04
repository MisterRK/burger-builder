import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
			},
			street: {
				elementType: "text",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
				value: "",
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP CODE",
				},
				value: "",
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				value: "",
			},
			email: {
				elementType: "email",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail",
				},
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
			},
		},
		loading: false,
	};

  inputChangedHandler = (e, formElementId) => {
    const updatedOrderForm = {...this.state.orderForm}
    const updatedOrderFormElement =  {...updatedOrderForm[formElementId]}
    updatedOrderFormElement.value = e.target.value
    updatedOrderForm[formElementId] = updatedOrderFormElement
    this.setState({orderForm: updatedOrderForm})
  } 

	orderHandler = (e) => {
		e.preventDefault();
    this.setState({ loading: true });
    const customerData = {}
    for( let formElementId in this.state.orderForm){
      customerData[formElementId] = this.state.orderForm[formElementId].value
    }
		const order = {
			ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: customerData
		};
		console.log(order);
		axios
			.post("/orders.json", order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch((error) => this.setState({ loading: false }));
	};

	render() {
    console.log(this.state.orderForm)
    const formElementsArray = []
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    console.log(formElementsArray)
		let form = (
			<form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
        <Input 
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        key={formElement.config.id}
        value={formElement.config.value}
        elementConfig={formElement.config.elementConfig}
        elementType={formElement.config.elementType} />
        ))}
				<Button clicked={this.orderHandler} btnType="Success">
					Place Order
				</Button>
			</form>
		);
		if (this.state.loading) {
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
export default ContactData;
