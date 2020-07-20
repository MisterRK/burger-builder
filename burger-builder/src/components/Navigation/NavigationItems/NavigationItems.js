import React from "react";
import classes from "./navigationItems.module.css";
import NavigationItem from './NavigationItem.js/NavigationItem'

const navigationItems = () => 
<ul className={classes.NavigationItems}>
  <NavigationItem link="/" active>Burger Builder</NavigationItem>
  <NavigationItem link="/">Checkout</NavigationItem>
</ul>;

export default navigationItems;
