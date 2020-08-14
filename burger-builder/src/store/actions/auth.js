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

export const authSuccess = (user) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      user: user
   }
}

export const authFailed = (error) => {
   return {
      type: actionTypes.AUTH_FAILED,
      error: error
   }
}

export const auth = (email, password, isSignUp) => {
   return dispatch => {
      dispatch(authStart());
      //if a new user is signing up create a new user in the DB
      if(isSignUp){
         firebase.auth().createUserWithEmailAndPassword(email,password)
         let user = firebase.auth().currentUser
         dispatch(authSuccess(user))
         .catch(error => {
            console.log(error.code, error.message)
         })
         dispatch(authSuccess())
      //otherwise sign in an already created user
      //get access to the user's information using global auth object
      } else {
         firebase.auth().signInWithEmailAndPassword(email, password)
         .catch(error => console.log(error.code, error.message))
      }

   }
}