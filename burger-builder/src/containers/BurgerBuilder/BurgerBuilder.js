import React, { Component } from "react";
import Aux from "../../components/hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/orderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/WithErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index'
import { connect } from "react-redux";

class BurgerBuilder extends Component {
	state = {
		ordered: false,
		loading: false,
	};

	componentDidMount() {
		this.props.onInitIngredients()
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
		this.setState({ ordered: true });
	};

	purchaseCancel = () => {
		this.setState({ ordered: false });
	};

	purchaseContinue = () => {
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
		let burger = this.state.error ? (
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
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredient: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		removeIngredient: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
