import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from './logo.module.css'
const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="My Burger App" />
  </div>
);

export default logo;
