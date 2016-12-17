
import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
//We work with `redux`, so our app will need a reducer
import mainReducer from '../reducers/index'
//We need to import the components attached to the routes
//`App` is our main component. It can contain for instance an application bar.
//It will embed all the other components, thanks to `react-router` mechanism.
import App from './app'
import Login from './login'
import GSBPMRoute from './gsbpm/routes'
import GSIMRoute from './gsim/routes'
import NSIRoute from './nsi/routes'
import ServicesRoute from './services/routes'


import { requireAuth } from '../utils/authentication'
//We need to create a store. `configureStore` add a little extra config to
//allow to work with asyncrhonous actions and to use the redux dev tools.
const store = configureStore(mainReducer)

const routes = (
  <Route path="/" component={App} onEnter={requireAuth} >
    { ServicesRoute }
    { GSBPMRoute }
    { GSIMRoute }
    { NSIRoute }
  </Route>
)
  
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/login" component={Login} />
          { routes }
        </Router>
      </Provider>
    )
  }
}
