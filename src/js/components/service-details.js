import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import ServiceSubs from './service-subs'
import ServiceInputs from './service-inputs'
import ServiceOutputs from './service-outputs'

function ServiceDetails({ service, label }) {
  return (
    <div>
      {label}
      <ServiceSubs service={service} />
      <ServiceInputs service={service} />
      <ServiceOutputs service={service} />
    </div>
  )
}

export default connectFromRoute(
  sparqlConnect.serviceDetails(ServiceDetails)
)