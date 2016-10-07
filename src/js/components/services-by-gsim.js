import React, { PropTypes } from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from './service-list.js'

function ServicesByGsimInputOrOutput({ loaded, services }){
  if (loaded !== LOADED) return <span>loading services</span>
  return <ServiceList services={services} />
}

const ServicesByGsimInput = 
  sparqlConnect.gsimInputServices(ServicesByGsimInputOrOutput)

const ServicesByGsimOuput =
  sparqlConnect.gsimOutputServices(ServicesByGsimInputOrOutput)

function ServicesByGsimInputAndOutput({ gsimClass }) {
    return (
      <div>
        As input: 
        <ServicesByGsimInput gsimClass={gsimClass} />
        As output:
        <ServicesByGsimOuput gsimClass={gsimClass} />
      </div>
    )
}

ServicesByGsimInputAndOutput.propTypes = {
  gsimClass: PropTypes.string.isRequired
}

export default connectFromRoute(ServicesByGsimInputAndOutput)
