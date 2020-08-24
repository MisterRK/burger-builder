import React, { Component } from "react";
import Layout from "./components/hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
	componentDidMount() {
		this.props.autoLoginCheck();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route exact path="/" component={BurgerBuilder} />
			</Switch>
		);
		if (this.props.user) {
			routes = (
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={Auth} />
					<Route exact path="/" component={BurgerBuilder} />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		autoLoginCheck: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
