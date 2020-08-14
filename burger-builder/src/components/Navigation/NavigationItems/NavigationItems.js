import React, {useEffect, useState} from "react";
import classes from "./navigationItems.module.css";
import NavigationItem from './NavigationItem.js/NavigationItem'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    </ul>
  )
}

export default NavigationItems;
