import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { transform } from '../../utils/router-mapping'
import Service from './service'
import Services from './list'
import ServiceCreator from './creator'

export const linkService = transform(
  'http://unece.org/services#:service',
  '/service/:service'
)

export default (
  <Route>
    {/* default component if the route does not match any over route */}
    <IndexRoute component={Services} />
    <Route path="create" component={ServiceCreator} />
    <Route 
      path="service/:service"
      component={Service}
      transform="http://unece.org/services#:service"/>
  </Route>
)