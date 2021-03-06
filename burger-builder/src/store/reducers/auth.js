import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	error: null,
	loading: false,
	user: null,
	authRedirectPath: '/',
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		user: action.user,
		error: false,
		loading: false,
	});
};

const authFailed = (state, action) => {
   return updateObject(state, {error: action.error, loading: false})
}

const authLogout = (state, action) => {
	return updateObject(state, {user: null})
}

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, {authRedirectPath: action.path})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAILED:
			return authFailed(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action)
		case actionTypes.SET_AUTH_REDIRECT:
			return setAuthRedirectPath(state, action)
		default:
			return state;
	}
};

export default reducer;
