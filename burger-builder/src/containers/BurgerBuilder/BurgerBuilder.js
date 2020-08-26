import React, { Component } from "react";
import Aux from "../../components/hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/orderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import * as firebase from 'firebase/app'
import 'firebase/auth'


export class BurgerBuilder extends Component {
	state = {
		ordered: false,
		loading: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
		if(this.props.user){
			firebase.auth().onAuthStateChanged(user => {
			})
		}
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((ingKey) => {
				return ingredients[ingKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	purchaseHandler = () => {
		if (this.props.user){
			this.setState({ ordered: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
		
	};

	purchaseCancel = () => {
		this.setState({ ordered: false });
	};

	purchaseContinue = () => {
		this.props.onInitPurchase()
		this.props.history.push("/checkout");
	};

	

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						price={this.props.price}
						addIngredient={this.props.addIngredient}
						removeIngredient={this.props.removeIngredient}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						isAuth={this.props.user}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					price={this.props.price}
					purchaseContinue={this.purchaseContinue}
					purchaseCancel={this.purchaseCancel}
					ingredients={this.props.ings}
				/>
			);
		}

		return (
			<Aux>
				<Modal show={this.state.ordered} modalClosed={this.purchaseCancel}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		user: state.auth.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredient: (ingName) =>
			dispatch(actions.addIngredient(ingName)),
		removeIngredient: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
