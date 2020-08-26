//shallow creates a shallow copy of the component. Like copying state
import { configure, shallow } from "enzyme";
//you need React to read the JSX
import React from "react";
import Adapter from "enzyme-adapter-react-16";
//you need the components you are going to work with
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem.js/NavigationItem";

//connect enzyme to our React version
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should render two <NavigationItems/> when a user is NOT authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render three <NavigationItems/> when a user is authenticated", () => {
		wrapper.setProps({ user: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it("should render the logout Navigation Item when user is authenticated", () => {
		wrapper.setProps({user: true})
		expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
	});

});
