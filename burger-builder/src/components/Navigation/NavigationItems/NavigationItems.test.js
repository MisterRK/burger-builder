//shallow creates a shallow copy of the component. Like copying state
import { configure, shallow } from "enzyme";
//you need React to read the JSX
import React from "react";
import Adapter from "enzyme-adapter-react-16";
//you need the components you are going to work with
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem.js/NavigationItem";
//mock store for our connected component to work with
import configureStore from "redux-mock-store";
//import Provider from react-redux to connect store to the component to be tested.
import { Provider } from "react-redux";

//connect enzyme to our React version
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	it("should render two <NavigationItems/> when a user is NOT authenticated", () => {
		const wrapper = shallow(<NavigationItems />);
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
});
