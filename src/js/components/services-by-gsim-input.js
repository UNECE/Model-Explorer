import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from './service-list.js'

function ServicesByGsimInput({ loaded, services }){
  if (loaded !== LOADED) return <span>loading services</span>
  return <ServiceList services={services} />
}

export default connectFromRoute(
  sparqlConnect.gsimInputServices(ServicesByGsimInput))