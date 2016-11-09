import React, { PropTypes } from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from './service-list.js'
import GSIMClassDetails from './gsim-class-details'

function ServicesByGsimInputOrOutput({ loaded, services }){
  if (loaded !== LOADED) return <span>loading services</span>
  return <ServiceList services={services} />
}

const ServicesByGsimInput = 
  sparqlConnect.servicesByGSIMInput(ServicesByGsimInputOrOutput)

const ServicesByGsimOuput =
  sparqlConnect.servicesByGSIMOutput(ServicesByGsimInputOrOutput)

function ServicesByGsimInputAndOutput({ gsimClass }) {
    return (
      <div>
        <GSIMClassDetails GSIMClass={gsimClass} />
        Input:
        <ServicesByGsimInput gsimClass={gsimClass} />
        Output:
        <ServicesByGsimOuput gsimClass={gsimClass} />
      </div>
    )
}

ServicesByGsimInputAndOutput.propTypes = {
  gsimClass: PropTypes.string.isRequired
}

export default connectFromRoute(ServicesByGsimInputAndOutput)
