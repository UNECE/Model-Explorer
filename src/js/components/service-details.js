import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import ServiceSubs from './service-subs.js'

function ServiceDetails({ service, label }) {
  return (
    <div>
      details about a service
      {label}
      <ServiceSubs service={service} />
    </div>
  )
}

export default connectFromRoute(
  sparqlConnect.serviceDetails(ServiceDetails)
)