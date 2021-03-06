import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders'
import * as firebase from 'firebase'



export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
      orderData: orderData,
      error: null
	};
};

export const purchaseBurgerFailed = (error) => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAILED,
      error: error
   }
}

export const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START
   }
}

export const purchaseBurger = (orderData) => {
   return dispatch => {
      dispatch(purchaseBurgerStart());
      axios
         .post("/orders.json", orderData)
			.then((response) => {
            dispatch(purchaseBurgerSuccess( response.data.name, orderData));
			})
			.catch((error) => dispatch(purchaseBurgerFailed(error)));
   }
}

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT
   }
}

export const fetchOrdersSucces = (orders) => {
   return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: orders
   }
}

export const fetchOrdersFailed = (error) =>  {
   return {
      type: actionTypes.FETCH_ORDERS_FAILED,
      error: error
   }
}

export const fetchOrdersStart = () => {
   return {
      type: actionTypes.FETCH_ORDERS_START
   }
}

export const fetchOrders = (userId) => {
   return dispatch => {
      firebase.auth().currentUser.getIdToken(true)
      .then(token => axios.get('/orders.json?auth=' + token + `&orderBy="userId"&equalTo="${userId}"`))
      .then(res => {
         let fetchedOrders = []
         for(let key in res.data){
            fetchedOrders.push({
               ...res.data[key],
               id: key})
         }
         dispatch(fetchOrdersSucces(fetchedOrders))
      })
      .catch(error => {
         console.log(error)
         dispatch(fetchOrdersFailed(error))
      })
   }
}