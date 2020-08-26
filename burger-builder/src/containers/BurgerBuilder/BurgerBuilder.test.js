//importing the container as a named component will allow you to render it without the connection to the Redux Store
import React from 'react'
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


configure({adapter: new Adapter()})

describe('<BurgerBuilder/>', () => {
   let wrapper;

   beforeEach(()=> {
      wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
   });
   
   it('should render <BuildControls/> when receiving ingredients', () => {
      wrapper.setProps({ings: {salad: 0}});
      expect(wrapper.find(BuildControls)).toHaveLength(1)
   })
})