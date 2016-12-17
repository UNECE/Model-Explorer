import React from 'react'
import { IndexRoute, Route } from 'react-router'
import NSIExplorer from './explorer'
import NSIDetails from './details'
import { transform } from '../../utils/router-mapping'

export const linkNSI = transform(
  'http://id.unece.org/nsi/:nsi',
  '/nsis/:nsi'
)

export default (
  <Route path="/nsis">
    <IndexRoute component={NSIExplorer} />
    <Route
      path=":nsi"
      component={NSIDetails}
      transform="http://id.unece.org/nsi/:nsi" />
  </Route>
)
  
