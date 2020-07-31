import React, { Component } from "react";
import Aux from "../../components/hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/orderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 1,
  meat: 5,
  bacon: 2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 10,
    purchaseable: false,
    ordered: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://react---burger-builder.firebaseio.com/Ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = newCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ ordered: true });
  };

  purchaseCancel = () => {
    this.setState({ ordered: false });
  };
  purchaseContinue = () => {
    // alert('You Continue')
    //choosing the node name and add .json for firbase only
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Robert Keller",
        address: {
          street: "Test Street 1",
          zipCode: "12345",
          country: "USA",
        },
        delivery: "fastest",
      },
    };
    axios.post("/orders.json", order)
      .then((response) => this.setState({ loading: false, ordered: false }))
      .catch((error) => this.setState({ loading: false, ordered: false }));
    this.props.history.push('/checkout')
  };

  render() {
    console.log(this.props)
    const disabledInfo = {
      ...this.state.ingredients,
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
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            purchaseable={this.state.purchaseable}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseContinue={this.purchaseContinue}
          purchaseCancel={this.purchaseCancel}
          ingredients={this.state.ingredients}
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
export default withErrorHandler(BurgerBuilder, axios);
