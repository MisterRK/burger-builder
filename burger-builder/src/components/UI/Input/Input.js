import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
	let inputElement = null;
	//switch statement to determine the element we will use in an input and relying on you to pass the right props
	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
         break;
      case "select":
         inputElement = (
            <select 
            className={classes.InputElement} 
            value={props.value}>
               {props.elementConfig.options.map(option => (
                  <option value={option.value}>
                     {option.displayValue}
                  </option>
               ))}
            </select>
         );
         break;
		default:
			inputElement = (
				<input
					className={classes.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;
