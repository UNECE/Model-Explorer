import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import ServiceList from '../shared/service-list'

function ServicesByGSBPMSubProcess({ services }) {
  return <ServiceList
    services={services}
    msg="No service implements this GSBPM subprocess" />
}

export default 
  sparqlConnect.servicesByGSBPMSubProcess(ServicesByGSBPMSubProcess)