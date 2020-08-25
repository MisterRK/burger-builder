import React from "react";
import classes from "./navigationItems.module.css";
import NavigationItem from "./NavigationItem.js/NavigationItem";

const NavigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/">Burger Builder</NavigationItem>
			{props.user ? (
				<NavigationItem link="/orders">Orders</NavigationItem>
			) : null}
			{props.user ? (
				<NavigationItem link="/logout">Logout</NavigationItem>
			) : (
				<NavigationItem link="/auth">Login</NavigationItem>
			)}
		</ul>
	);
};



export default NavigationItems;
