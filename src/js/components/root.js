
import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
import { path } from '../routes'
//We work with `redux`, so our app will need a reducer
import mainReducer from '../reducers/index'
//We need to import the components attached to the routes
//`App` is our main component. It can contain for instance an application bar.
//It will embed all the other components, thanks to `react-router` mechanism.
import App from './app'
import GSBPMExplorer from './gsbpm-explorer'
import GSIMExplorer from './gsim-explorer'
import NSIExplorer from './nsi-explorer'
import ExplorerChoice from './explorer-choice'
import Service from './service'
import Services from './services'
import ServiceCreator from './service-creator'
import GSIMGroupSelector from './gsim-group-selector'
import GSIMClassSelector from './gsim-class-selector'
import servicesBySubProcess from './service-by-subprocess'
import ServicesByGsim from './services-by-gsim'

//We need to create a store. `configureStore` add a little extra config to
//allow to work with asyncrhonous actions and to use the redux dev tools.
const store = configureStore(mainReducer)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/"
                 component={App}>
            {/* default component if the route does not match any over
                route */}
            <IndexRoute component={Services} />
            <Route path={path.create}
                  component={ServiceCreator} />
            <Route path={path.serviceDetails}
                   component={Service} />
            <Route path="/gsbpm">
              <IndexRoute component={GSBPMExplorer} />
              <Route path=":subprocess"
                component={servicesBySubProcess} />
            </Route>
            <Route path="/gsim">
                <IndexRoute component={GSIMExplorer} />
                <Route path=":gsimClass"
                       component={ServicesByGsim}/>
            </Route>
            <Route path="/nsis">
                <IndexRoute component={NSIExplorer} />
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}
