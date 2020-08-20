import React from "react";
import classes from "./navigationItems.module.css";
import NavigationItem from './NavigationItem.js/NavigationItem'
import { connect } from 'react-redux'

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.user ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
      {props.user? <NavigationItem link='/logout'>Logout</NavigationItem> : <NavigationItem link="/auth">Login</NavigationItem>}
      
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(NavigationItems);
