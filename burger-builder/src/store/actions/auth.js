import * as actionTypes from './actionTypes'
import * as firebase from 'firebase/app'
import 'firebase/auth'


const firebaseConfig = {
   apiKey: "AIzaSyCOxdimshpSU4hnirKtlOkBVc1YckJoiTo",
   authDomain: "react---burger-builder.firebaseapp.com",
   databaseURL: "https://react---burger-builder.firebaseio.com",
   projectId: "project-react---burger-builder",
   storageBucket: "react---burger-builder.appspot.com",
   messagingSenderId: "1043533005563",
}
firebase.initializeApp(firebaseConfig)

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   }
}

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData
   }
}

export const authFailed = (error) => {
   return {
      type: actionTypes.AUTH_FAILED,
      error: error
   }
}

export const auth = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(response => {
         console.log(response);
      })
      .catch(error => {
         console.log(error.code, error.message)
      })
   }
}