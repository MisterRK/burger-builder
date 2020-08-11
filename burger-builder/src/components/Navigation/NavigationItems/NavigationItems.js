import React from "react";
import classes from "./navigationItems.module.css";
import NavigationItem from './NavigationItem.js/NavigationItem'

const navigationItems = () => 
<ul className={classes.NavigationItems}>
  <NavigationItem link="/">Burger Builder</NavigationItem>
  <NavigationItem link="/orders">Orders</NavigationItem>
  <NavigationItem link="/auth">Authenticate</NavigationItem>
</ul>;

export default navigationItems;
