import React from 'react'
import { IndexRoute, Route } from 'react-router'
import GSIMExplorer from './explorer-pres'
import GSIMClassDetails from './class-details'
import { wrapRoute, transform } from '../../utils/router-mapping'

export const linkGSIMClass = transform(
  'http://rdf.unece.org/models/gsim#:GSIMClass',
  '/gsim/:GSIMClass')
  
export default wrapRoute(
  <Route path="/gsim">
    <IndexRoute component={GSIMExplorer} />
    <Route path=":GSIMClass" component={GSIMClassDetails}
      transform="http://rdf.unece.org/models/gsim#:GSIMClass"/>
  </Route>
)