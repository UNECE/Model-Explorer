import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from './service-list'

//TODO add an option to `sparql-connect` to generate the pending message 
//(if(loaded !== LOADED) return <span>loading......</span>)
//automatically, so we can write:
//const ServiceBySubProcess = sparqlConnect.serviceSubprocess(ServiceList)
function ServiceBySubProcess({ loaded, services }) {
  if(loaded !== LOADED) return <span>loading......</span>
  return <ServiceList services={services} />
}

export default connectFromRoute(
  sparqlConnect.serviceBySubProcess(ServiceBySubProcess)
)
