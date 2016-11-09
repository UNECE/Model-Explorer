import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from './service-list'

//TODO add an option to `sparql-connect` to generate the pending message 
//(if(loaded !== LOADED) return <span>loading......</span>)
//automatically, so we can write:
//const servicesBySubProcess = sparqlConnect.serviceSubprocess(ServiceList)
function servicesBySubProcess({ loaded, services }) {
  if(loaded !== LOADED) return <span>loading......</span>
  return <ServiceList services={services} />
}

export default connectFromRoute(
  sparqlConnect.servicesBySubProcess(servicesBySubProcess)
)
