import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let totalPrice = 0
  //   for (let param of query.entries()){
  //     if(param[0] === 'price'){
  //       totalPrice = param[1]
  //     }else {
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients, totalPrice})
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

    render() {
      let summary = <Redirect to='/'/>
      if(this.props.ings){
        summary = 
        <div>
          <CheckoutSummary 
        ingredients={this.props.ings}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={'/checkout/contact-data'} component={ContactData}/>
        </div> 
      }
      return summary
      
    }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)