import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
import { wrapRoute } from '../utils/router-mapping'
import routes from './routes'
//We work with `redux`, so our app will need a reducer
import { getReducer, setQueryURL, setPrefixes } from 'sparql-connect'
import P from '../sparql/prefixes'
import config from '../config'

setQueryURL(config.queryURL)
setPrefixes(P)

const store = configureStore(getReducer())
  
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
