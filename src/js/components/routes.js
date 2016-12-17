import React from 'react'
import { Route } from 'react-router'

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

export default (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={App} onEnter={requireAuth} >
      { ServicesRoute }
      { GSBPMRoute }
      { GSIMRoute }
      { NSIRoute }
    </Route>
  </Route>
)