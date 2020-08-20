import React, { Component } from "react";
import Layout from "./components/hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";




class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            <Switch>
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Route path='/auth' component={Auth} />
              <Route path='/logout' component={Logout}/>
              <Route exact path='/' component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
    );
  }
}

export default App;
