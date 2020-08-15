import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	error: null,
	loading: false,
	user: null
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	console.log('[auth success in reducer', action)
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
		default:
			return state;
	}
};

export default reducer;
