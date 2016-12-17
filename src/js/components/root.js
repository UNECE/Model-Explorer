
import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
import { wrapRoute } from '../utils/router-mapping'
//We work with `redux`, so our app will need a reducer
import mainReducer from '../reducers/index'
import routes from './routes'

//We need to create a store. `configureStore` add a little extra config to
//allow to work with asyncrhonous actions and to use the redux dev tools.
const store = configureStore(mainReducer)
  
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          { wrapRoute(routes) }
        </Router>
      </Provider>
    )
  }
}
