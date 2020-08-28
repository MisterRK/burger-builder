import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './checkoutSummary.module.css'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope your burger tastes great!</h1>
          <Burger  ingredients={props.ingredients} />
        <Button 
        btnType="Danger"
        clicked={props.checkoutCancelled}>Cancel</Button>
        <Button 
        btnType="Success"
        clicked={props.checkoutContinued}>Place Order</Button>
    </div>
  )
}
export default checkoutSummary