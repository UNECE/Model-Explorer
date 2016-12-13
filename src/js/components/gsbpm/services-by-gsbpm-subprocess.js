import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from '../shared/service-list'

//TODO add an option to `sparql-connect` to generate the pending message 
//(if(loaded !== LOADED) return <span>loading......</span>)
//automatically, so we can write:
//const ServicesByGSBPMSubProcess = sparqlConnect.serviceSubprocess(ServiceList)
function ServicesByGSBPMSubProcess({ services }) {
  //TODO remove `loaded` prop from `ServiceList`
  return <ServiceList
    services={services}
    msg="No service implements this GSBPM subprocess"
    loaded={true} />
}

export default 
  sparqlConnect.servicesByGSBPMSubProcess(ServicesByGSBPMSubProcess)