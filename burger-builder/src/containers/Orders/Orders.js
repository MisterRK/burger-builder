import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../components/hoc/withErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

   componentDidMount(){
      if(this.props.user){
         this.props.onFetchOrders(this.props.user.uid)
      }
   }
   render () {
      let orders = <Spinner/>
      if(!this.props.loading){
         orders = 
         this.props.orders.map(order => (
            <Order 
               key={order.id} 
               ingredients={order.ingredients}
               price={order.price}
            />
         ))
      }
      return(
         <div>
            {orders}
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onFetchOrders: (uid) => dispatch(actions.fetchOrders(uid))
   }
}

const mapStateToProps = state => {
   return {
      orders: state.order.orders,
      loading: state.order.loading,
      user: state.auth.user
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));