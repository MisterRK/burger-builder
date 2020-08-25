import React from "react";
import classes from "./navigationItem.module.css";
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink 
    activeClassName={classes.active} 
    exact={props.exact} to={props.link}>{props.children}</NavLink>
  </li>
);

export default navigationItem;
