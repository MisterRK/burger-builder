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

export const firebaseApp = firebase.initializeApp(firebaseConfig)

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

export const authLogoutSuccess = () => {
   return{
      type: actionTypes.AUTH_LOGOUT,
      user: null
   }
}

export const auth = (email, password, isSignUp) => {
   return dispatch => {
      dispatch(authStart());
      //if a new user is signing up create a new user in the DB
      if(isSignUp){
         firebase.auth().createUserWithEmailAndPassword(email,password).catch(error => {
            dispatch(authFailed(error))
            console.log(error.code, error.message)
         })
         let user = firebase.auth().currentUser
         dispatch(authSuccess(user))
            
         
         
      //otherwise sign in an already created user
      //get access to the user's information using global auth object
      } else {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => console.log(error.code, error.message))
               firebase.auth().onAuthStateChanged(user => {
                  console.log("[auth action ]", user)
                  if(user){
                     dispatch(authSuccess(user))
                  }
               })
      }

   }
}

export const logout = () => {
   return dispatch => {
      firebase.auth().signOut()
      .then(response => console.log("sign out successful"))
      .catch(error => console.log(error))
      dispatch(authLogoutSuccess())
   }
}

export const setAuthRedirectPath = (path) => {
   return {
      type: actionTypes.SET_AUTH_REDIRECT,
      path: path
   }
}