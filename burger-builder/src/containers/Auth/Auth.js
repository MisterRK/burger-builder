import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from './auth.module.css'

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
         const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/
         isValid = pattern.test(value) && isValid
      }

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		// console.log("isValid", isValid)
		return isValid;
   }
   inputChangedHandler = (e, controlName) => {
		const updatedControls = {
         ...this.state.controls,
         [controlName]: {
            ...this.state.controls[controlName],
            value: e.target.value,
            valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
            touched: true
         }
      }
      this.setState({controls: updatedControls})
   };
	render() {
      console.log(this.state)
      const formElementsArray = []
      for(let key in this.state.controls){
         formElementsArray.push({
            id: key,
            config: this.state.controls[key]
         })
      }
      const form = formElementsArray.map(formElement => (
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
         ))
         return (
            <div className={classes.AuthForm}>
				<form>
               {form}
               <Button btnType='success'>Submit</Button>
            </form>
			</div>
		);
	}
}

export default Auth;
