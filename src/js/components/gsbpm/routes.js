import React from 'react'
import { IndexRoute, Route } from 'react-router'
import GSBPMExplorer from './explorer/explorer'
import GSBPMSubDetails from './details/sub'
import GSBPMPhaseDetails from './details/phase'
import { wrapRoute, transform } from '../../utils/router-mapping'

export const linkGSBPMSub = transform(
  'http://id.unece.org/models/gsbpm/:GSBPMSub',
  '/gsbpm/subprocess/:GSBPMSub')

export const linkGSBPMPhase = transform(
  'http://id.unece.org/models/gsbpm/:GSBPMPhase',
  '/gsbpm/phase/:GSBPMPhase')
    
export default wrapRoute(
  <Route path="/gsbpm">
    <IndexRoute component={GSBPMExplorer} />
    <Route
      path="subprocess/:GSBPMSub"
      component={GSBPMSubDetails}
      transform="http://id.unece.org/models/gsbpm/:GSBPMSub" />
    <Route
      path="phase/:GSBPMPhase"
      component={GSBPMPhaseDetails}
      transform="http://id.unece.org/models/gsbpm/:GSBPMPhase" />
  </Route>
)
  
