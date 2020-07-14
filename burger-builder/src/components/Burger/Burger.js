import React from "react";
import classes from "./buger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(
    (ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((e, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      });
    }).reduce((arr, el) => {return arr.concat(el)}, [])

    if(transformedIngredients.length === 0) {
      transformedIngredients = <p> Please start adding ingredients!</p>
    }
  console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;