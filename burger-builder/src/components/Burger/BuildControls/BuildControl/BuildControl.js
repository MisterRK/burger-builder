import React from 'react';
import classes from './buildControl.module.css'
const buildControl = (props) =>(
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button 
    disabled={props.disabled}
    className={classes.Less} 
    onClick={props.removeIngredient}> - </button>
    <button 
    className={classes.More} 
    onClick={props.addIngredient}> + </button>
  </div>
);

export default buildControl
