import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import ServiceList from '../shared/service-list'

function ServicesByGSBPMPhase({ services }) {
  return <ServiceList
    services={services}
    msg="No service implements this GSBPM phase" />
}

export default 
  sparqlConnect.servicesByGSBPMPhase(ServicesByGSBPMPhase)