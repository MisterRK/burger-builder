import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth Reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			error: null,
			loading: false,
			user: null,
			authRedirectPath: "/",
		});
	});

	it("should store the user upon login", () => {
		expect(
			reducer(
				{
					error: null,
					loading: false,
					user: null,
					authRedirectPath: "/",
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					user: "some id",
				}
			)
		).toEqual({
			error: false,
			loading: false,
			user: "some id",
			authRedirectPath: "/",
		});
	});
});
