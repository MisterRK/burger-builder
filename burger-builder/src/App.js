import React, { Component } from "react";
import Layout from "./components/hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index'




class App extends Component {
  componentDidMount(){
    this.props.autoLoginCheck()
  }

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

const mapDispatchToProps = dispatch => {
  return {
    autoLoginCheck: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
