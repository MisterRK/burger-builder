import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./buildControls.module.css";

const controls = [
  { label: "Lettuce", type: "lettuce" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    {controls.map((control) => (
      <BuildControl
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        key={control.label}
        label={control.label}
        disabled={props.disabled[control.type]}
      />
    ))}
      <button 
      onClick={props.ordered}
      className={classes.OrderButton}
      disabled={!props.purchaseable}>{props.isAuth? "ORDER NOW" : "SIGN IN TO ORDER"}</button>
  </div>
);

export default BuildControls;
