import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from '../shared/service-list'

function ServicesByGSBPMPhase({ loaded, services }) {
  //TODO remove `loaded` prop from `ServiceList` since connected components
  //handled loading status themselves
  return <ServiceList
    services={services}
    msg="No service implements this GSBPM phase"
    loaded={true} />
}

export default 
  sparqlConnect.servicesByGSBPMPhase(ServicesByGSBPMPhase)